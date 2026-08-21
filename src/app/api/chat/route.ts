import { NextResponse } from 'next/server';
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first'); // Force IPv4 first for Windows network compatibility

import { runLangChainRAG } from '@/lib/ragChain';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message string is required' }, { status: 400 });
    }

    // Execute LangChain + Vector Database (RAG) Pipeline
    const ragResult = await runLangChainRAG(message, history);

    return NextResponse.json({
      response: ragResult.response,
      source: ragResult.source,
      mode: ragResult.mode,
      retrievedDocs: ragResult.retrievedDocs || []
    });

  } catch (error: any) {
    console.error('Error in LangChain chat route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
