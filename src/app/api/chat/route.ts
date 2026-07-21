import { NextResponse } from 'next/server';
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first'); // Force IPv4 first to prevent Windows fetch issues

import { GoogleGenerativeAI } from '@google/generative-ai';
import { KNOWLEDGE_BASE, COMPANY_NAME, EMAIL, PHONE } from '@/data/knowledgeBase';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If API Key is not set, run local rule-based response match
    if (!apiKey) {
      const lowerMsg = message.toLowerCase().trim();
      
      // Match greetings
      const greetings = ['hi', 'hello', 'hey', 'greetings', 'hola', 'good morning', 'good afternoon', 'hey there'];
      if (greetings.some(g => lowerMsg === g || lowerMsg.startsWith(g + ' ') || lowerMsg.endsWith(' ' + g))) {
        return NextResponse.json({ 
          response: "Hello! I am the AD TECH AI Assistant. How can I help you today? You can ask about our services, internship programs, hiring process, or choose one of our quick actions below.", 
          source: 'local_greeting' 
        });
      }

      // Match keywords in knowledge base
      let matchedAnswer = '';
      for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some(kw => lowerMsg.includes(kw))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      if (matchedAnswer) {
        return NextResponse.json({ response: matchedAnswer, source: 'local_kb' });
      }

      // Default fallback when not matched
      const fallback = `I'm not sure about that. Would you like to contact our team directly? You can email us at ${EMAIL} or call ${PHONE}. You can also use the quick action buttons to explore our services or apply for an internship.`;
      return NextResponse.json({ response: fallback, source: 'local_fallback' });
    }

    // Initialize Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Format Knowledge Base Context
    const kbContext = KNOWLEDGE_BASE.map(item => {
      return `Category: ${item.category}\nKeywords: ${item.keywords.join(', ')}\nQuestion: ${item.question}\nAnswer: ${item.answer}`;
    }).join('\n\n');

    // Create system prompt
    const systemPrompt = `You are the official AI Website Assistant for ${COMPANY_NAME}.
Your role is to help visitors find information about the company, our services, the internship program, hiring process, and contact details.

Here is the official company knowledge base:
${kbContext}

Strict instructions:
1. Only answer questions using the facts provided in the knowledge base above.
2. Be extremely concise, accurate, professional, and friendly.
3. If a visitor asks an unknown question, or asks about something not covered in the knowledge base, respond exactly with a helpful fallback that directs them to contact us:
"I'm not sure about that. Would you like to contact our team? You can email us at ${EMAIL} or call ${PHONE}. I can also guide you to relevant sections of the website."
4. If they ask to see services, careers, or contact info, encourage them to use the quick action buttons or scroll to that section.
5. Do not make up or hallucinate any facts.

Use the conversation history to maintain context during the session. Keep answers brief (typically 1-3 sentences).`;

    // Format history for Gemini
    // Gemini chat API expects history format: { role: 'user' | 'model', parts: [{ text: string }] }
    const geminiHistory = (history || [])
      .filter((h: any) => h.role === 'user' || h.role === 'model' || h.role === 'assistant')
      .map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      }));

    // Gemini requires the first message in the chat history to be from the 'user'.
    // If the first message is a welcome message from the model, we filter it out.
    let firstUserIndex = -1;
    for (let i = 0; i < geminiHistory.length; i++) {
      if (geminiHistory[i].role === 'user') {
        firstUserIndex = i;
        break;
      }
    }
    const slicedHistory = firstUserIndex !== -1 ? geminiHistory.slice(firstUserIndex) : [];

    // Start chat session
    const chat = model.startChat({
      history: slicedHistory,
      systemInstruction: systemPrompt,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText, source: 'gemini' });
  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
