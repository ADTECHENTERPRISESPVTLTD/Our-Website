import { Document } from '@langchain/core/documents';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { KNOWLEDGE_BASE, COMPANY_NAME, EMAIL, PHONE } from '@/data/knowledgeBase';

/**
 * LangChain + Vector DB (In-Memory Vector Store & RAG Chain)
 * Official Business RAG Architecture for AD TECH Enterprises Pvt. Ltd.
 */

// 1. Convert Knowledge Base items into LangChain Document instances
export function getLangChainDocuments(): Document[] {
  return KNOWLEDGE_BASE.map(
    (item, index) =>
      new Document({
        id: `doc-${index}`,
        pageContent: `Category: ${item.category}\nQuestion: ${item.question}\nAnswer: ${item.answer}`,
        metadata: {
          category: item.category,
          question: item.question,
          keywords: item.keywords.join(', ')
        }
      })
  );
}

// Stop words for vector indexing
const STOP_WORDS = new Set([
  'what', 'whats', 'your', 'you', 'the', 'this', 'that', 'with', 'from', 'have', 
  'does', 'did', 'is', 'are', 'was', 'were', 'tell', 'about', 'how', 'when', 
  'where', 'why', 'today', 'provide'
]);

/**
 * Calculate Levenshtein Distance between two strings.
 * Used for typo tolerance (e.g., "servises" -> "services", "intrenship" -> "internship").
 */
export function getLevenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Known domain dictionary terms for auto-correcting typos in queries
 */
const DICTIONARY_TERMS = [
  'services', 'service', 'internship', 'internships', 'intern', 'hiring', 'career', 'careers', 'carrier', 'carriers',
  'contact', 'email', 'phone', 'website', 'android', 'ios', 'automation', 'ai',
  'learning', 'installment', 'overview', 'vision', 'mission', 'development',
  'application', 'solutions', 'requirements', 'callback', 'process', 'project', 'pricing',
  'furniture', 'restaurant', 'hotel', 'clinic', 'hospital', 'retail', 'salon', 'bakery',
  'construction', 'logistics', 'agriculture', 'coaching', 'fashion', 'manufacturing',
  'pharmacy', 'tourism', 'grocery', 'jewellery', 'business', 'company', 'consultation',
  'ecommerce', 'fitness', 'transport', 'education', 'budget', 'timeline', 'delivery',
  'stipend', 'certificate', 'selection', 'screening', 'evaluation', 'sprint', 'portfolio', 'resume', 'dashboard'
];

/**
 * Normalizes common misspelled words into standard keywords via Levenshtein fuzzy matching
 */
export function normalizeQueryTypos(query: string): string {
  let prep = query.toLowerCase()
    .replace(/\b(carrier|carriers|carrer|carrerr|kareer|kareers|carear)\b/gi, 'careers')
    .replace(/\b(sevice|sevices|survice|survices|servis)\b/gi, 'services')
    .replace(/\b(cantact|kontact)\b/gi, 'contact')
    .replace(/\b(intrenship|internschip|internsip)\b/gi, 'internship');

  const words = prep.split(/\s+/);
  const normalizedWords = words.map(word => {
    const cleanWord = word.replace(/[^\w]/g, '');
    if (cleanWord.length <= 3) return word; // skip short words like "is", "a", "of"

    let bestMatch = cleanWord;
    let minDistance = Infinity;

    for (const dictWord of DICTIONARY_TERMS) {
      const dist = getLevenshteinDistance(cleanWord, dictWord);
      const maxEdits = dictWord.length <= 5 ? 1 : 2;

      if (dist <= maxEdits && dist < minDistance) {
        minDistance = dist;
        bestMatch = dictWord;
      }
    }

    return word.replace(cleanWord, bestMatch);
  });

  return normalizedWords.join(' ');
}

/**
 * In-Memory Vector Database with Semantic & Levenshtein Fuzzy Matching
 */
export class LangChainVectorStore {
  private docs: Document[];

  constructor(docs: Document[]) {
    this.docs = docs;
  }

  public similaritySearchWithScore(query: string, k = 3): { docs: Document[]; maxScore: number } {
    const normalizedQuery = normalizeQueryTypos(query);
    const queryTerms = normalizedQuery.toLowerCase().split(/\W+/).filter(t => t.length > 2 && !STOP_WORDS.has(t));
    
    if (queryTerms.length === 0) {
      return { docs: [], maxScore: 0 };
    }

    const scoredDocs = this.docs.map(doc => {
      const contentLower = doc.pageContent.toLowerCase();
      const keywordsLower = (doc.metadata.keywords || '').toLowerCase();
      const questionLower = (doc.metadata.question || '').toLowerCase();
      const docWords = (contentLower + ' ' + keywordsLower + ' ' + questionLower).split(/\W+/).filter(w => w.length > 2);
      
      let score = 0;

      // 1. Exact multi-word phrase matching bonus (+10 score boost!)
      const cleanQuery = normalizedQuery.replace(/[^\w\s]/g, '').trim();
      if (cleanQuery.length >= 4 && keywordsLower.includes(cleanQuery)) {
        score += 10;
      }
      if (cleanQuery.length >= 4 && questionLower.includes(cleanQuery)) {
        score += 8;
      }

      // 2. Individual term scoring
      queryTerms.forEach(term => {
        const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const wordRegex = new RegExp(`\\b${safeTerm}\\b`, 'i');

        if (wordRegex.test(keywordsLower)) {
          score += 4;
        } else if (wordRegex.test(questionLower)) {
          score += 3;
        } else if (wordRegex.test(contentLower)) {
          score += 1;
        } else {
          // Check Levenshtein Fuzzy Matching for typos
          const maxEdits = term.length <= 4 ? 1 : 2;
          const hasFuzzyMatch = docWords.some(dw => getLevenshteinDistance(term, dw) <= maxEdits);
          if (hasFuzzyMatch) {
            score += 2;
          }
        }
      });

      return { doc, score };
    });

    scoredDocs.sort((a, b) => b.score - a.score);
    const maxScore = scoredDocs.length > 0 ? scoredDocs[0].score : 0;
    const matchingDocs = scoredDocs.filter(item => item.score > 0).slice(0, k).map(item => item.doc);

    return { docs: matchingDocs, maxScore };
  }
}

/**
 * Professional Business Style Formatter (Converts ANY raw text into a warm 2-sentence summary + Call to Action)
 */
function formatKnowledgeToBusinessStyle(rawText: string, message: string): string {
  let text = rawText
    .replace(/Category:\s*[\s\S]*?\n/gi, '')
    .replace(/Question:\s*[\s\S]*?\n/gi, '')
    .replace(/Answer:\s*/gi, '')
    .trim();

  // Replace common abbreviations like "e.g.", "i.e.", "Pvt. Ltd." so period splitting won't cut them mid-sentence
  text = text
    .replace(/\be\.g\./gi, 'for example')
    .replace(/\bi\.e\./gi, 'that is')
    .replace(/\bPvt\. Ltd\./gi, 'Pvt Ltd')
    .replace(/^[0-9]+\)\s*/gm, '')
    .replace(/^[•*-]\s*/gm, '');

  const cleanParagraph = text.split('\n').map(l => l.trim()).filter(l => l.length > 0).join(' ');

  const sentences = cleanParagraph.match(/[^.!?]+[.!?]+/g) || [cleanParagraph];
  let summary = sentences.slice(0, 2).join(' ').trim();
  if (!summary.endsWith('.') && !summary.endsWith('!') && !summary.endsWith('?')) {
    summary += '.';
  }

  const queryLower = message.toLowerCase();
  let callToAction = "Would you like to discuss a custom solution with AD TECH?";

  if (queryLower.includes('intern') || queryLower.includes('career') || queryLower.includes('apply') || queryLower.includes('hiring') || queryLower.includes('resume')) {
    callToAction = "You can send your resume and portfolio directly to AD TECH's team at ad.tech.enterprises.pvt.ltd@gmail.com!";
  } else if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('phone') || queryLower.includes('reach') || queryLower.includes('mail')) {
    callToAction = "Would you like to schedule a callback session with AD TECH's technical team?";
  } else if (queryLower.includes('web') || queryLower.includes('app') || queryLower.includes('ai') || queryLower.includes('service') || queryLower.includes('tech stack')) {
    callToAction = "Would you like to explore how AD TECH can build this for your organization?";
  }

  return `${summary} ${callToAction}`;
}

/**
 * Professional Smart Business Intent Matcher (Fuzzy Pattern Matching & Intent Normalizer)
 */
function handleConversationalIntents(query: string): string | null {
  const q = query.toLowerCase().trim();

  // Incomplete prompt handling
  const incompletePrompts = [
    'what do you know about', 'what do u know about', 'tell me about', 
    'can you tell me about', 'do you know about', 'what about'
  ];
  if (incompletePrompts.some(p => q === p || q === p + '?')) {
    return "Which topic would you like to explore? You can ask about our company background, core service domains (Web, Mobile, AI, LMS, EV), or developer internship opportunities!";
  }

  // Hardware / Physical Component Queries ("can you produce hardware components", "produce hardware", "manufacture hardware", "physical hardware")
  if (
    q.includes('hardware') || q.includes('produce hardware') || q.includes('manufacture hardware') || 
    q.includes('physical product') || q.includes('physical component')
  ) {
    return "We're a software and AI company — not hardware. But we do build dashboards and software to manage and monitor hardware systems. Want to explore that?";
  }

  // 1. Generic Abstract / Dictionary Definition Filter (e.g. "what is service", "what is web", "what is mobile", "what is app", "what is company")
  const genericAbstractTerms = [
    'services', 'service', 'web', 'mobile', 'android', 'ios', 'app', 'apps', 'application', 
    'company', 'firm', 'organisation', 'organization', 'system', 'systems', 'team', 
    'technology', 'software', 'hardware', 'work', 'hiring', 'business', 'internet', 'process', 'sprint'
  ];
  
  const isGenericDefinitionQuery = genericAbstractTerms.some(term => {
    return q === `what is ${term}` || q === `what is ${term}?` ||
           q === `what is a ${term}` || q === `what is a ${term}?` ||
           q === `what is an ${term}` || q === `what is an ${term}?` ||
           q === `what is the ${term}` || q === `what is the ${term}?` ||
           q === `define ${term}` || q === `define ${term}?` ||
           q === term;
  });

  if (isGenericDefinitionQuery) {
    return `I'm trained specifically on AD TECH's services, internship program, and AI solutions. What would you like to know about us?`;
  }

  // 2. Company Role / Purpose / Mission Intent ("companys role", "company role", "role of company", "company mission", "company vision")
  if (
    q.includes('company role') || q.includes('companys role') || q.includes("company's role") ||
    q.includes('role of company') || q.includes('role of ad tech') || q.includes('our role') ||
    q.includes('company mission') || q.includes('company vision') || q.includes('company purpose')
  ) {
    return `AD TECH is a tech partner that builds web apps, mobile apps, and AI solutions with the mission of "Building Future Tech Talent." How can we help your business?`;
  }

  // 3. Mail / Email Request Intent ("can you mail me", "send mail", "email details")
  if (
    q.includes('mail me') || q.includes('send mail') || q.includes('email me') ||
    q.includes('send email') || q.includes('mail details') || q.includes('share email') ||
    q.includes('give email') || q.includes('company email') || q.includes('mail info')
  ) {
    return `Sure! You can reach us at **${EMAIL}** or call **${PHONE}**. We'd love to connect!`;
  }

  // 4. Internship / Evaluation Sprint Intent
  if (
    q === 'internship' || q.includes('what is internship') || q.includes('internship program') ||
    q.includes('intern program') || q.includes('developer internship') || q.includes('eval sprint') ||
    q.includes('5 day sprint') || q.includes('apply for internship') || q.includes('join as intern')
  ) {
    return `Our internship program gives you real-world experience in AI, Frontend, or Backend through a 5-day sprint project. Send your resume to **${EMAIL}** to apply!`;
  }

  // 4b. Hiring Process & Selection Intent ("hiring process", "selection process", "interview process", "whats hiring process")
  if (
    q.includes('hiring process') || q.includes('selection process') || q.includes('interview process') ||
    q.includes('hiring steps') || q.includes('how do you hire') || q.includes('recruitment process') ||
    q.includes('whats hiring') || q.includes('what is hiring')
  ) {
    return `We follow 3 steps: Resume screening, a 5-day project sprint, then an offer based on performance. Email your resume to **${EMAIL}** to get started!`;
  }

  // 5. Resume / Application Submission Intent
  if (
    q.includes('resume') || q.includes('cv') || q.includes('submit resu') ||
    q.includes('send resu') || q.includes('portfolio') || q.includes('how to apply') ||
    q.includes('apply for job') || q.includes('submit application')
  ) {
    return `Just send your resume and GitHub portfolio to **${EMAIL}** — we review applications for all developer roles!`;
  }

  // 6. What do you do / Company Overview Intent
  if (
    q.includes('what do you do') || q.includes('what do u do') || 
    q.includes('what does ad tech do') || q.includes('what work do you do') ||
    q.includes('what is your work') || q.includes('whats your work') ||
    q.includes('about ad tech') || q.includes('about company') || q.includes('tell me about company')
  ) {
    return "AD TECH builds web apps, mobile apps, AI solutions, Learning Management Systems, and EV financing software. Think of us as your full-stack tech partner!";
  }

  // 7. Web Application Development & Website Creation
  if (
    q.includes('create website') || q.includes('build website') || q.includes('make website') ||
    q.includes('create a website') || q.includes('build a website') || q.includes('make a website') ||
    q.includes('website creation') || q.includes('website development') ||
    q.includes('webdev') || q.includes('web-dev') || q.includes('web serv') ||
    q.includes('web dev') || q.includes('web app') || q.includes('website serv')
  ) {
    return "Absolutely! We specialize in building fast, modern websites and web apps using React and Next.js. Want to kick off your project with us?";
  }

  // 8. Android Application Development
  if (q.includes('android')) {
    return "We build native Android apps for businesses, e-commerce, student management, and employee workflows. Want to see how we can help?";
  }

  // 9. iOS Application Development
  if (q.includes('ios') || q.includes('iphone') || q.includes('apple')) {
    return "We create premium iOS apps with elegant UI and native performance, optimized for Apple's ecosystem. Shall we discuss your app idea?";
  }

  // 10. AI & Automation Services
  if (q.includes('ai serv') || q.includes('ai autom') || q.includes('chatbot') || q.includes('ai agent') || q.includes('automation')) {
    return "We build AI chatbots, autonomous agents, and workflow automation tools that save your team hours every day. Want to explore AI for your business?";
  }

  // 11. Learning Management Systems (LMS)
  if (q.includes('lms') || q.includes('learning management') || q.includes('school') || q.includes('teacher portal')) {
    return "We build digital learning platforms for schools and coaching institutes with student portals, attendance, and progress analytics. Want to explore an LMS for your institution?";
  }

  // 12. EV Installment Management Solutions
  if (/\bev\b/i.test(q) || q.includes('electric vehicle') || q.includes('installment') || q.includes('emi tracking')) {
    return "We build EV software for EMI tracking, dealer dashboards, and customer payment management. Want to discuss a custom EV solution?";
  }

  // 13. AD TECH Core Services Intent (When explicitly asking what services AD TECH provides)
  if (
    q.includes('what services') || q.includes('services do you') || 
    q.includes('what are the services') || q.includes('your services') || 
    q.includes('our services') || q.includes('ad tech services') ||
    q.includes('services offered') || q.includes('what can you do') ||
    q === 'all services' || q === 'core services'
  ) {
    return "We offer Web Apps, Android & iOS Apps, AI Automation, Learning Management Systems, and EV Financing Software. Which of these fits your needs?";
  }

  // 14. Casual Courtesy & Conversation Questions ("whats going on", "what's up", "how are you", "what are you doing")
  if (
    q.includes('going on') || q.includes('whats up') || q.includes("what's up") || q.includes('what up') ||
    q.includes('how are you') || q.includes('how are u') || q.includes('how r u') || q.includes('how do you do') ||
    q.includes('how is it going') || q.includes("how's it going") || q.includes('what are you doing') ||
    q.includes('what u doing') || q === 'sup' || q === 'yo' || q.includes('how are things')
  ) {
    return "I'm great, thanks for asking! I'm here to help you explore AD TECH's services and solutions. What can I do for you?";
  }

  // 14b. Praise, Compliments & Courtesy ("good job", "great job", "nice job", "well done", "thank you", "thanks")
  if (
    q.includes('good job') || q.includes('great job') || q.includes('nice job') ||
    q.includes('well done') || q.includes('awesome') || q.includes('amazing work') ||
    q.includes('thank you') || q.includes('thanks') || q.includes('thank u') ||
    q === 'good' || q === 'great' || q === 'nice' || q === 'good job' || q === 'good job?'
  ) {
    return "Thank you! 😊 Is there anything else I can help you with?";
  }

  // 15. Greetings & Good morning / Good afternoon variations
  if (
    q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ') ||
    q.includes('goodmorning') || q.includes('good morning') ||
    q.includes('goodafternoon') || q.includes('good afternoon') ||
    q.includes('goodevening') || q.includes('good evening') ||
    q === 'gm' || q === 'gn'
  ) {
    return "Hello! I'm Asha, AD TECH's AI Assistant. How can I help you today?";
  }

  // 15b. Software Company Founder / Startup Intent ("open a company", "open a software company", "start a company")
  if (
    q.includes('open a company') || q.includes('start a company') || q.includes('software company') ||
    q.includes('open a software') || q.includes('start a software') || q.includes('build a company') ||
    q.includes('open company') || q.includes('start company')
  ) {
    return `We help startups launch fast — custom software, SaaS, mobile apps, and AI without heavy engineering overhead. Connect at **${EMAIL}** or call **${PHONE}**!`;
  }

  // 16. Organization / Company Name
  if (
    q.includes('organisation name') || q.includes('organization name') || q.includes('company name') ||
    q.includes('what is your name') || q.includes('whats your name') || q.includes('who are u') || q.includes('who are you')
  ) {
    return `We are **${COMPANY_NAME}** — a software and AI firm with the mission of "Building Future Tech Talent." How can I help?`;
  }

  // 17. Contact Info
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('call us') || q.includes('reach you')) {
    return `Reach us at **${EMAIL}** or call **${PHONE}**. We're ready to connect!`;
  }

  // 18. Out-of-Scope / Personal Questions
  const unnecessaryKeywords = [
    'age', 'weather', 'calendar', 'date', 'life', 'married', 'single', 'family', 
    'feeling', 'love', 'girlfriend', 'boyfriend', 'birthday', 'temperature', 'rain',
    'joke', 'movie', 'song', 'cook', 'recipe', 'pizza', 'pasta', 'dish', 'kitchen', 'food', 'eat',
    'dance', 'prime minister', 'capital', 'world cup', 'stock', 'finance', 'game', 'sport', 'car',
    'house', 'actor', 'actress', 'news', 'politics', 'music', 'funny', 'president', 'how to make', 'how to cook'
  ];
  if (unnecessaryKeywords.some(kw => q.includes(kw))) {
    return `That's outside my area! I'm trained on AD TECH's services and internship program. Can I help you with something tech-related?`;
  }

  // 19. Business Owner / Industry Consultation Intent
  const businessOwnerPatterns = [
    'i own', 'i run', 'i have a', 'my company', 'my business', 'my shop', 'my store',
    'my clinic', 'my restaurant', 'my hotel', 'my school', 'my institute',
    'company owner', 'business owner', 'startup founder',
    'how can you help me', 'how can ad tech help', 'how ad tech can help',
    'can you help my', 'help my business', 'help my company',
    'need a website', 'need an app', 'need a mobile app', 'need software',
    'website or app', 'app or website', 'should i get', 'which is better for',
    'do i need a website', 'do i need an app', 'will a website work', 'will an app work',
    'furniture', 'restaurant', 'hotel', 'real estate', 'clinic', 'hospital',
    'salon', 'gym', 'fitness', 'bakery', 'cafe', 'grocery', 'jewellery', 'jewelry',
    'construction', 'logistics', 'transport', 'agriculture', 'farming',
    'coaching', 'fashion', 'textile', 'pharma', 'travel', 'tourism'
  ];
  if (businessOwnerPatterns.some(p => q.includes(p))) {
    return null; // Let RAG handle this with the rich consultation knowledge base entry
  }

  return null;
}

/**
 * Main LangChain RAG Chain Execution Handler
 */
export async function runLangChainRAG(
  message: string, 
  history: any[] = []
): Promise<{ response: string; mode: string; source: string; retrievedDocs?: string[] }> {
  const apiKey = process.env.GEMINI_API_KEY;
  const isApiKeyMissing = !apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_GEMINI_API_KEY');

  // Normalize spelling typos (e.g. "servises" -> "services", "intrenship" -> "internship")
  const normalizedMessage = normalizeQueryTypos(message);

  // Check direct conversational intent matching first (with normalized query & original fallback)
  const directResponse = handleConversationalIntents(normalizedMessage) || handleConversationalIntents(message);
  if (directResponse) {
    return {
      response: directResponse,
      mode: 'online',
      source: 'langchain_intent_matcher',
      retrievedDocs: []
    };
  }

  // Load Vector Database
  const docs = getLangChainDocuments();
  const vectorStore = new LangChainVectorStore(docs);

  // Perform Vector Similarity Search Retrieval (RAG Step 1)
  let { docs: retrievedDocs, maxScore } = vectorStore.similaritySearchWithScore(message, 3);

  // If no document scored above 0, use core company knowledge documents (Company Overview, Core Services & Web Dev)
  if (maxScore === 0 || retrievedDocs.length === 0) {
    retrievedDocs = [docs[0], docs[2], docs[3]];
  }

  const context = retrievedDocs.map(d => d.pageContent).join('\n\n---\n\n');
  const retrievedTitles = retrievedDocs.map(d => d.metadata.question || 'Knowledge Base');

  // Offline fallback
  if (isApiKeyMissing) {
    const topMatch = retrievedDocs[0];
    const formatted = formatKnowledgeToBusinessStyle(topMatch.pageContent, message);
    return {
      response: formatted,
      mode: 'offline',
      source: 'langchain_vector_db_offline',
      retrievedDocs: retrievedTitles
    };
  }

  // Execute LangChain RAG Chain (RAG Step 2: Prompt + LLM + Parser)
  try {
    const promptTemplate = PromptTemplate.fromTemplate(`
You are "Asha", the official AI Voice Assistant for {company_name}.
Answer the user's question: "{question}" using the retrieved knowledge base context below.

Retrieved Context:
{context}

Strict Instructions:
1. Give a SHORT, CONVERSATIONAL answer — 1 to 2 sentences maximum. This will be spoken aloud.
2. Sound warm, friendly, and professional — like a knowledgeable human assistant.
3. If asked about services, internship, hiring, or AI — answer directly with the key facts.
4. If asked about a specific industry or business need — give tailored advice in one sentence.
5. End with a natural CTA: suggest emailing {email}, calling {phone}, or saying "Want me to navigate there?"
6. Never use bullet points, numbered lists, or markdown symbols — plain spoken language only.
7. Use "we" when referring to AD TECH.
`);

    let responseText = "";
    try {
      const llm = new ChatGoogleGenerativeAI({
        model: 'gemini-1.5-flash-latest',
        apiKey: apiKey,
        temperature: 0.3
      });
      const chain = promptTemplate.pipe(llm).pipe(new StringOutputParser());
      responseText = await chain.invoke({
        company_name: COMPANY_NAME,
        email: EMAIL,
        phone: PHONE,
        context: context,
        question: message
      });
    } catch (langChainError) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: `You are Asha, the AI Voice Assistant for ${COMPANY_NAME}. Answer in 1-2 short conversational sentences — no lists, no markdown. Sound warm and natural, like a helpful human assistant.`
      });
      const result = await model.generateContent(message);
      responseText = result.response.text();
    }

    return {
      response: responseText.trim(),
      mode: 'online',
      source: 'langchain_vector_rag',
      retrievedDocs: retrievedTitles
    };
  } catch (err: any) {
    console.warn("LangChain RAG Execution notice:", err.message || err);

    const topMatch = retrievedDocs[0];
    const formatted = formatKnowledgeToBusinessStyle(topMatch.pageContent, message);
    return {
      response: formatted,
      mode: 'offline',
      source: 'langchain_vector_db_fallback',
      retrievedDocs: retrievedTitles
    };
  }
}
