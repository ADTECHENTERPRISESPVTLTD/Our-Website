import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    let cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}🌸✨🚀💻📱🤖🎓⚡✅]/gu, '')
      .replace(/[*_#`~•]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    // Specific phonetic formatting for email addresses (e.g. hradtechenterpriseschepvtltd@gmail.com -> H R A D Tech Enterprises Private Limited at gmail dot com)
    cleanText = cleanText.replace(/(\w+)@([a-zA-Z0-9.\-]+)/gi, (match: string, username: string, domain: string) => {
      let cleanUser = username
        .replace(/hradtech/gi, 'H R A D Tech ')
        .replace(/adtech/gi, 'A D Tech ')
        .replace(/enterprises/gi, 'Enterprises ')
        .replace(/che/gi, ' ')
        .replace(/pvtltd/gi, ' Private Limited ')
        .replace(/pvt/gi, ' Private ')
        .replace(/ltd/gi, ' Limited ')
        .replace(/hr/gi, 'H R ');

      let cleanDomain = domain.replace(/\./g, ' dot ');
      return `${cleanUser} at ${cleanDomain}`;
    });

    // Format phone numbers digit-by-digit for clear speech (e.g. +91 83193 58568 -> plus 9 1, 8 3 1 9 3, 5 8 5 6 8)
    cleanText = cleanText.replace(/(\+\d{1,3})?\s*(\d{5})\s*(\d{5})/g, (m: string, country: string | undefined, p1: string, p2: string) => {
      const countryStr = country ? `plus ${country.replace('+', '').split('').join(' ')}, ` : '';
      const part1 = p1.split('').join(' ');
      const part2 = p2.split('').join(' ');
      return `${countryStr}${part1}, ${part2}`;
    });

    // Expand company & legal abbreviations phonetically
    cleanText = cleanText
      .replace(/\bpvt\.?\s*ltd\.?\b/gi, 'Private Limited')
      .replace(/\bltd\.?\b/gi, 'Limited')
      .replace(/\bpvt\.?\b/gi, 'Private')
      .replace(/\binc\.?\b/gi, 'Incorporated')
      .replace(/\bcorp\.?\b/gi, 'Corporation')
      .replace(/\bad\s*tech\b/gi, 'A D Tech')
      .replace(/\badtech\b/gi, 'A D Tech');

    // Expand departmental & tech acronyms letter-by-letter for clear TTS
    cleanText = cleanText
      .replace(/\bandroid\/ios\b/gi, 'Android or i O S')
      .replace(/[*_#`~•]/g, ' ')
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/hradtechenterpriseschepvtltd@gmail\.com/gi, 'H R AD TECH Enterprises at Gmail dot com')
      .replace(/adtechenterpriseschepvtltd@gmail\.com/gi, 'AD TECH Enterprises at Gmail dot com')
      .replace(/info@adtech\.com/gi, 'info at AD TECH dot com')
      .replace(/contact@adtech\.com/gi, 'contact at AD TECH dot com')
      .replace(/support@adtech\.com/gi, 'support at AD TECH dot com')
      .replace(/@/g, ' at ')
      .replace(/\.com\b/gi, ' dot com')
      .replace(/\.org\b/gi, ' dot org')
      .replace(/\.net\b/gi, ' dot net')
      .replace(/\.in\b/gi, ' dot in')
      .replace(/\bAndroid\/iOS\b/gi, 'Android or i O S')
      .replace(/\bResume\s*\/\s*CV\b/gi, 'Resume or C V')
      .replace(/\//g, ' or ')
      .replace(/\bUI\/UX\b/gi, 'U I or U X')
      .replace(/\bai\b/gi, 'Ay Eye')
      .replace(/\blms\b/gi, 'L M S')
      .replace(/\bev\b/gi, 'E V')
      .replace(/\bqa\b/gi, 'Q A')
      .replace(/\bapis\b/gi, 'A P Is')
      .replace(/\bapi\b/gi, 'A P I')
      .replace(/\bfaqs\b/gi, 'F A Qs')
      .replace(/\bfaq\b/gi, 'F A Q')
      .replace(/\bemi\b/gi, 'E M I')
      .replace(/\bceo\b/gi, 'C E O')
      .replace(/\bcto\b/gi, 'C T O')
      .replace(/\bcfo\b/gi, 'C F O')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      return NextResponse.json({ error: 'Empty text' }, { status: 400 });
    }

    // 1. Primary Inworld TTS API (Model: inworld-tts-2, Voice: Sarah)
    const inworldApiKey = process.env.INWORLD_API_KEY || 'T3pSZzJ1U3AySEV6MzlCc1NTSTJMLVdFQ2xubzB4SHY6WXpmX1ExV1BIX0I2YmNQcy02U01fSw==';

    if (inworldApiKey) {
      try {
        const inworldController = new AbortController();
        const inworldTimeout = setTimeout(() => inworldController.abort(), 3000); // 3s timeout
        const inworldRes = await fetch('https://api.inworld.ai/tts/v1/voice', {
          method: 'POST',
          signal: inworldController.signal,
          headers: {
            'Authorization': `Basic ${inworldApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: cleanText,
            voiceName: 'Sarah',
            voice_id: 'Sarah',
            modelId: 'inworld-tts-2',
            audioConfig: {
              speakingRate: 1.0
            },
            deliveryMode: 'FASTEST',
            language: 'AUTO'
          }),
        });
        clearTimeout(inworldTimeout);

        if (inworldRes.ok) {
          const inworldData = await inworldRes.json();
          if (inworldData.audioContent) {
            const audioBuffer = Buffer.from(inworldData.audioContent, 'base64');
            return new NextResponse(audioBuffer, {
              headers: {
                'Content-Type': 'audio/mpeg',
              },
            });
          }
        }
      } catch (inworldErr) {
        console.warn('Inworld TTS skipped (will use ElevenLabs):', (inworldErr as any)?.name);
      }
    }

    // 2. Backup ElevenLabs Voice Engine (Sarah - EXAVITQu4vr4xnSDxMaL)
    const elevenApiKey = process.env.ELEVENLABS_API_KEY || 'sk_867701a9beabb7b9a536feacafc34a18b8a1cee0323b855e';
    const voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Strictly Sarah

    if (elevenApiKey) {
      try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenApiKey,
          },
          body: JSON.stringify({
            text: cleanText,
            model_id: 'eleven_turbo_v2_5',
            voice_settings: {
              stability: 0.50,
              similarity_boost: 0.85,
              style: 0.20,
              use_speaker_boost: true,
            },
          }),
        });

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          return new NextResponse(Buffer.from(audioBuffer), {
            headers: {
              'Content-Type': 'audio/mpeg',
            },
          });
        } else {
          const errText = await response.text().catch(() => '');
          console.warn(`ElevenLabs TTS failed (${response.status}):`, errText);
        }
      } catch (e) {
        console.warn('ElevenLabs TTS error:', e);
      }
    }

    // Both APIs failed — tell the client to use browser Web Speech API
    return NextResponse.json(
      { error: 'Voice synthesis unavailable', fallback: true },
      { status: 503, headers: { 'X-Voice-Fallback': 'true' } }
    );
  } catch (error: any) {
    console.error('Voice API Route error:', error);
    return NextResponse.json({ error: error.message || 'Voice generation failed' }, { status: 500 });
  }
}
