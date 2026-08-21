import { KNOWLEDGE_BASE } from '@/data/knowledgeBase';

const COMPANY_NAME = "AD TECH Enterprises Pvt. Ltd.";
const EMAIL = "hradtechenterpriseschepvtltd@gmail.com";
const PHONE = "+91 83193 58568";

export function normalizeQueryTypos(query: string): string {
  let q = query.toLowerCase().trim();
  const replacements: Record<string, string> = {
    'servises': 'services',
    'intrenship': 'internship',
    'intren': 'intern',
    'web site': 'website',
    'appication': 'application',
    'contect': 'contact',
    'priciing': 'pricing',
    'costing': 'cost',
    'stipand': 'stipend',
  };
  Object.keys(replacements).forEach((bad) => {
    q = q.replace(new RegExp(`\\b${bad}\\b`, 'g'), replacements[bad]);
  });
  return q;
}

export function handleConversationalIntents(query: string): string | null {
  const q = query.toLowerCase().trim();

  // Greetings
  if (
    q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ') ||
    q.includes('good morning') || q.includes('good afternoon') || q.includes('good evening') ||
    q === 'gm' || q === 'gn'
  ) {
    return "Hello! I'm Asha, AD TECH's AI Voice Assistant. How can I help you today?";
  }

  // Identity / Name
  if (q.includes('who are you') || q.includes('your name') || q.includes('who is asha')) {
    return `I am Asha, the official AI Voice Assistant for ${COMPANY_NAME}. We specialize in web development, custom software, mobile apps, and AI automation!`;
  }

  // Contact
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('call')) {
    return `You can reach AD TECH at **${EMAIL}** or call us at **${PHONE}**!`;
  }

  // Thanks
  if (q.includes('thank') || q.includes('thanks') || q.includes('great') || q.includes('good job')) {
    return "You're very welcome! 😊 Is there anything else about our services or internship program I can help with?";
  }

  return null;
}

export function searchKnowledgeBase(query: string): string | null {
  const q = normalizeQueryTypos(query);

  let bestMatch: { score: number; answer: string } = { score: 0, answer: "" };

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > bestMatch.score) {
      bestMatch = { score, answer: entry.answer };
    }
  }

  if (bestMatch.score > 0) {
    return bestMatch.answer;
  }

  return null;
}

export async function runLangChainRAG(
  message: string,
  history: any[] = []
): Promise<{ response: string; mode: string; source: string }> {
  // Check direct conversational intents
  const directResponse = handleConversationalIntents(message);
  if (directResponse) {
    return {
      response: directResponse,
      mode: 'online',
      source: 'intent_matcher',
    };
  }

  // Search Knowledge Base
  const kbMatch = searchKnowledgeBase(message);

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 0 && !apiKey.includes('YOUR_GEMINI_API_KEY')) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Asha, the official AI Voice Assistant for ${COMPANY_NAME}.
User question: "${message}"

Context Knowledge:
${kbMatch || "AD TECH Enterprises provides web development, mobile app development, custom software, AI automation, LMS, and EV financing platforms. Tagline: 'Building Future Tech Talent'."}

Instructions:
- Keep the response short, warm, and conversational (1-2 sentences maximum).
- Sound helpful and professional.
- Refer to the company as "we".
- If asked for contact details, mention email ${EMAIL} or phone ${PHONE}.`
                  }
                ]
              }
            ]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            response: text.trim(),
            mode: 'online',
            source: 'gemini_ai',
          };
        }
      }
    } catch (e) {
      console.warn("Gemini API call fallback to Knowledge Base:", e);
    }
  }

  // Fallback to Knowledge Base answer or default helpful message
  if (kbMatch) {
    return {
      response: kbMatch,
      mode: 'offline',
      source: 'knowledge_base',
    };
  }

  return {
    response: `We specialize in custom web development, mobile apps, SaaS, and AI solutions. Connect with our team at **${EMAIL}** or call **${PHONE}** to discuss your project!`,
    mode: 'offline',
    source: 'default_fallback',
  };
}
