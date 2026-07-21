import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { formType, name, phone, email, company, scope, budget } = data;

    const adminEmail = 'sohamsantoshamne@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    // Log the lead details to the server console (Mock Alert)
    console.log('\n=========================================');
    console.log(`🚨 NEW LEAD RECEIVED (${formType === 'callback' ? 'CALLBACK REQUEST' : 'PROJECT SCOPE'})`);
    console.log('-----------------------------------------');
    console.log(`Customer Name:    ${name}`);
    if (phone) console.log(`Phone Number:     ${phone}`);
    if (email) console.log(`Email Address:    ${email}`);
    if (company) console.log(`Company Name:     ${company}`);
    if (scope) console.log(`Project Scope:    ${scope}`);
    if (budget) console.log(`Estimated Budget:  $${budget}`);
    console.log('-----------------------------------------');
    console.log(`[MOCK EMAIL ALERT SENT TO: ${adminEmail}]`);
    console.log('=========================================\n');

    // If live Resend API key exists, send real email
    if (resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'AD TECH Chatbot <onboarding@resend.dev>',
            to: adminEmail,
            subject: `AD TECH Chatbot: New ${formType === 'callback' ? 'Callback' : 'Project Scope'} from ${name}`,
            html: `
              <h2>New Lead Captured via Website Chatbot</h2>
              <p><strong>Type:</strong> ${formType === 'callback' ? 'Callback Request' : 'Project Scope Submission'}</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Email:</strong> ${email || 'N/A'}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              ${scope ? `<p><strong>Scope:</strong> ${scope}</p>` : ''}
              ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
              <br/>
              <p><em>Sent automatically by AD TECH AI Chatbot.</em></p>
            `,
          }),
        });

        if (response.ok) {
          return NextResponse.json({ success: true, message: 'Email sent successfully via Resend' });
        } else {
          const errData = await response.json();
          console.error('Resend API failed:', errData);
        }
      } catch (emailErr) {
        console.error('Failed to send email:', emailErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Mock email alert logged to console' });
  } catch (error: any) {
    console.error('Error in leads API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
