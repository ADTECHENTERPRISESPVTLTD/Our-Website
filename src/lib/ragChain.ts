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
  'services', 'service', 'internship', 'internships', 'intern', 'hiring', 'career', 'careers',
  'contact', 'email', 'phone', 'website', 'android', 'ios', 'automation', 'ai',
  'learning', 'installment', 'overview', 'vision', 'mission', 'maths', 'development',
  'application', 'solutions', 'requirements', 'callback', 'process', 'project', 'pricing'
];

/**
 * Normalizes common misspelled words into standard keywords via Levenshtein fuzzy matching
 */
export function normalizeQueryTypos(query: string): string {
  const words = query.toLowerCase().split(/\s+/);
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
      const docWords = (contentLower + ' ' + keywordsLower).split(/\W+/).filter(w => w.length > 2);
      
      let score = 0;
      queryTerms.forEach(term => {
        const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const wordRegex = new RegExp(`\\b${safeTerm}\\b`, 'i');

        if (wordRegex.test(keywordsLower)) {
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
    callToAction = "You can send your resume and portfolio directly to AD TECH's team at hradtechenterpriseschepvtltd@gmail.com!";
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
    return `Hahaha 😊 I'm an AI assistant! I am trained to answer questions about ${COMPANY_NAME}'s software services, projects, and developer internship programs. Unnecessary or general dictionary definitions like that aren't my field. Would you like to contact our team at ${EMAIL} or call ${PHONE}?`;
  }

  // 2. Company Role / Purpose / Mission Intent ("companys role", "company role", "role of company", "company mission", "company vision")
  if (
    q.includes('company role') || q.includes('companys role') || q.includes("company's role") || 
    q.includes('role of company') || q.includes('role of ad tech') || q.includes('our role') ||
    q.includes('company mission') || q.includes('company vision') || q.includes('company purpose')
  ) {
    return `AD TECH Enterprises Pvt. Ltd. serves as a technology partner and software innovation firm dedicated to "Building Future Tech Talent" and delivering production-ready AI, web, and mobile solutions for businesses. Would you like to explore how we can partner with your organization?`;
  }

  // 3. Mail / Email Request Intent ("can you mail me", "send mail", "email details")
  if (
    q.includes('mail me') || q.includes('send mail') || q.includes('email me') || 
    q.includes('send email') || q.includes('mail details') || q.includes('share email') ||
    q.includes('give email') || q.includes('company email') || q.includes('mail info')
  ) {
    return `You can connect directly with our team via email at **${EMAIL}** or call us at **${PHONE}**! AD TECH Enterprises Pvt. Ltd. builds custom web applications, mobile apps, and AI solutions for growing businesses. Would you like to schedule a callback session with our team?`;
  }

  // 4. Internship / Evaluation Sprint Intent
  if (
    q === 'internship' || q.includes('what is internship') || q.includes('internship program') || 
    q.includes('intern program') || q.includes('developer internship') || q.includes('eval sprint') ||
    q.includes('5 day sprint') || q.includes('apply for internship') || q.includes('join as intern')
  ) {
    return `Our Developer Internship Program is an immersive, hands-on experience where candidates work in structured team roles across AI, Frontend, and Backend 5-day evaluation sprints. You can send your resume and portfolio directly to AD TECH's team at **${EMAIL}**!`;
  }

  // 5. Resume / Application Submission Intent
  if (
    q.includes('resume') || q.includes('cv') || q.includes('submit resu') || 
    q.includes('send resu') || q.includes('portfolio') || q.includes('how to apply') ||
    q.includes('apply for job') || q.includes('submit application')
  ) {
    return `You can submit your resume and portfolio directly to AD TECH's team via email at **${EMAIL}**! We review candidate applications for developer roles and 5-day evaluation sprint projects.`;
  }

  // 6. What do you do / Company Overview Intent
  if (
    q.includes('what do you do') || q.includes('what do u do') || 
    q.includes('what does ad tech do') || q.includes('what work do you do') ||
    q.includes('what is your work') || q.includes('whats your work') ||
    q.includes('about ad tech') || q.includes('about company') || q.includes('tell me about company')
  ) {
    return "AD TECH Enterprises Pvt. Ltd. is a modern software engineering and AI Automation firm. We build web applications, mobile apps (Android & iOS), artificial intelligence solutions, Learning Management Systems (LMS), and EV financing software. Would you like to explore how we can help your business?";
  }

  // 7. Web Application Development
  if (
    q.includes('webdev') || q.includes('web-dev') || q.includes('web serv') || 
    q.includes('web dev') || q.includes('web app') || q.includes('website serv')
  ) {
    return "We design and develop high-performance web applications, enterprise portals, admin dashboards, and SaaS platforms using React, Next.js, and Tailwind CSS. Would you like to discuss a custom web project for your organization?";
  }

  // 8. Android Application Development
  if (q.includes('android')) {
    return "Our team builds scalable native Android applications for business operations, e-commerce, student management, and internal workforce workflows. Would you like to see how we can build your mobile app?";
  }

  // 9. iOS Application Development
  if (q.includes('ios') || q.includes('iphone') || q.includes('apple')) {
    return "We create premium, high-security iOS applications optimized for Apple's ecosystem with elegant user interfaces and native performance. Would you like to discuss an iOS app tailored for your business?";
  }

  // 10. AI & Automation Services
  if (q.includes('ai serv') || q.includes('ai autom') || q.includes('chatbot') || q.includes('ai agent')) {
    return "AD TECH specializes in custom AI chatbots, autonomous AI agents, document processing tools, and workflow automation pipelines to improve operational efficiency. Would you like to discuss pilot AI automation for your company?";
  }

  // 11. Learning Management Systems (LMS)
  if (q.includes('lms') || q.includes('learning management') || q.includes('school') || q.includes('teacher portal')) {
    return "We develop comprehensive digital learning platforms for schools, colleges, and coaching institutes featuring Student Portals, Teacher Dashboards, Attendance, and Progress Analytics. Would you like to explore an LMS solution for your institution?";
  }

  // 12. EV Installment Management Solutions
  if (/\bev\b/i.test(q) || q.includes('electric vehicle') || q.includes('installment') || q.includes('emi tracking')) {
    return "At AD TECH, we build specialized software platforms for Electric Vehicle (EV) companies to manage EMI tracking, dealer dashboards, customer payments, and vehicle inventory. Would you like to discuss a custom EV solution for your business?";
  }

  // 13. AD TECH Core Services Intent (When explicitly asking what services AD TECH provides)
  if (
    q.includes('what services') || q.includes('services do you') || 
    q.includes('what are the services') || q.includes('your services') || 
    q.includes('our services') || q.includes('ad tech services') ||
    q.includes('services offered') || q.includes('what can you do') ||
    q === 'all services' || q === 'core services'
  ) {
    return "AD TECH provides end-to-end technology solutions across six major service domains: • **Web Application Development** (responsive sites, enterprise portals, SaaS) • **Android Application Development** (business, student, and e-commerce apps) • **iOS Application Development** (premium iOS solutions optimized for Apple's ecosystem) • **Artificial Intelligence & Automation** (custom chatbots, agents, workflow automation) • **Learning Management Systems (LMS)** (student/teacher portals, progress tracking) • **EV Installment Management Solutions** (financing, EMI tracking, vehicle inventory). Would you like to explore how AD TECH can build this for your organization?";
  }

  // 14. How are you / Courtesy questions
  if (q.includes('how are you') || q.includes('how are u') || q.includes('how r u') || q.includes('how do you do')) {
    return "I'm doing great, thank you for asking! 😊 I am the official AI Assistant for AD TECH Enterprises. How can I help empower your business with AD TECH's software or AI solutions today?";
  }

  // 15. Greetings & Good morning / Good afternoon variations
  if (
    q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ') ||
    q.includes('goodmorning') || q.includes('good morning') || 
    q.includes('goodafternoon') || q.includes('good afternoon') ||
    q.includes('goodevening') || q.includes('good evening') ||
    q === 'gm' || q === 'gn'
  ) {
    return "Hello! I am the official AI Assistant for AD TECH Enterprises. How can I help empower your business with AD TECH's software or AI solutions today?";
  }

  // 16. Organization / Company Name
  if (
    q.includes('organisation name') || q.includes('organization name') || q.includes('company name') || 
    q.includes('what is your name') || q.includes('whats your name') || q.includes('who are u') || q.includes('who are you')
  ) {
    return `Our company is **${COMPANY_NAME}** ("Building Future Tech Talent"). We partner with schools, MSMEs, startups, and enterprises to build scalable software and AI-first solutions.`;
  }

  // 17. Contact Info
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('call us') || q.includes('reach you')) {
    return `You can connect directly with our team via email at **${EMAIL}** or call us at **${PHONE}**. Would you like to book a callback session?`;
  }

  // 18. Unnecessary / Out-of-Scope / Personal Questions (Age, Weather, Calendar, Trivia, Movies, Sports, Cooking, News, General)
  const unnecessaryKeywords = [
    'age', 'weather', 'calendar', 'date', 'life', 'married', 'single', 'family', 
    'feeling', 'love', 'girlfriend', 'boyfriend', 'birthday', 'temperature', 'rain',
    'joke', 'movie', 'song', 'cook', 'recipe', 'pizza', 'pasta', 'dish', 'kitchen', 'food', 'eat',
    'dance', 'prime minister', 'capital', 'world cup', 'stock', 'finance', 'game', 'sport', 'car',
    'house', 'actor', 'actress', 'news', 'politics', 'music', 'funny', 'president', 'how to make', 'how to cook'
  ];
  if (unnecessaryKeywords.some(kw => q.includes(kw))) {
    return `Hahaha 😊 I'm an AI assistant! I am trained to answer questions about ${COMPANY_NAME}'s software services, projects, and developer internship programs. Unnecessary or general topics like that aren't my field. Would you like to contact our team at ${EMAIL} or call ${PHONE}?`;
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
  const { docs: retrievedDocs, maxScore } = vectorStore.similaritySearchWithScore(message, 3);

  // Strict Fallback for unnecessary / out-of-scope queries
  if (maxScore === 0 || retrievedDocs.length === 0) {
    return {
      response: `Hahaha 😊 I'm not sure about that. I am AD TECH's AI Assistant and I am trained to answer questions about our company, core services, and developer internship programs. Unnecessary or general topics like that aren't my field. Would you like to contact our team at ${EMAIL} or call ${PHONE}?`,
      mode: 'online',
      source: 'langchain_out_of_scope_fallback',
      retrievedDocs: []
    };
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
You are the official AI Website Assistant for {company_name}.
Synthesize a warm, direct, 2-sentence conversational answer to the user's question: "{question}" using the retrieved context from our Vector Database.

Retrieved Context from Vector Database:
{context}

User Question: {question}

Strict Instructions:
1. Provide a warm, direct 2-sentence answer specifically for "{question}". Do NOT dump raw long paragraphs or full brochures.
2. Use company facts from context. 
3. End with a polite, helpful follow-up call-to-action (e.g., "Would you like to discuss a custom solution for your business?").
4. Keep the tone friendly, modern, and professional.
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
        systemInstruction: `You are the AI Assistant for ${COMPANY_NAME}. Answer concisely in 2 sentences based on context.`
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
