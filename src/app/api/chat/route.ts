import { NextResponse } from 'next/server';
import { runLangChainRAG } from '@/lib/ragChain';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message string is required' }, { status: 400 });
    }

    const ragResult = await runLangChainRAG(message, history);

    return NextResponse.json({
      response: ragResult.response,
      source: ragResult.source,
      mode: ragResult.mode,
    });
  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
