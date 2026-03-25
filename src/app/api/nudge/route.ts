import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import twilio from 'twilio';

// The system requires Twilio and Resend API keys inside .env.local
export async function POST(request: Request) {
  try {
    const { menteeName, mentorName, missedCount, studentEmail, mentorEmail, ngoEmail, studentPhone, mentorPhone } = await request.json();

    console.log(`🚨 INTEGRATION TRIGGERED: Mentee ${menteeName} missed ${missedCount} sessions.`);
    const results: string[] = [];

    // 1. RESEND EMAIL INTEGRATION
    const { RESEND_API_KEY, RESEND_TEST_EMAIL } = process.env;
    if (RESEND_API_KEY && RESEND_TEST_EMAIL) {
      const resend = new Resend(RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: 'Mentora Nudge System <onboarding@resend.dev>',
          to: [RESEND_TEST_EMAIL], // Resend Free Tier strict requirement
          subject: `[URGENT] Mentora Attendance Alert: ${menteeName}`,
          html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 2px solid #ef4444; border-radius: 10px;">
              <h2 style="color: #ef4444;">Critical Attendance Alert ⚠️</h2>
              <div style="background-color: #fff3cd; padding: 10px; border-radius: 5px; font-size: 12px; margin-bottom: 15px; border: 1px solid #ffeeba;">
                <strong>Hackathon Demo Note:</strong> This email was securely routed to your verified Resend email (${RESEND_TEST_EMAIL}) to bypass free-tier API restrictions. In production, this was dispatched to <em>${studentEmail}, ${mentorEmail}, and ${ngoEmail}</em>.
              </div>
              <p>This is an automated Smart Nudge from the Mentora AI System.</p>
              <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; color: #991b1b; border: 1px solid #fecaca;">
                <p style="margin: 5px 0;"><strong>Mentee:</strong> ${menteeName}</p>
                <p style="margin: 5px 0;"><strong>Mentor:</strong> ${mentorName}</p>
                <p style="font-size: 18px; font-weight: bold; margin-top: 15px;">Target Missed: ${missedCount} Consecutive Sessions</p>
              </div>
              <p><strong>Action Required:</strong> The NGO Admin has been notified. ${menteeName}, please reach out to ${mentorName} immediately to reschedule or your matching status may be revoked.</p>
            </div>
          `,
        });
        results.push("Email Sent via Resend ✅");
      } catch (err) {
        results.push("Email Failed to Send via Resend ❌");
      }
    } else {
      results.push("Emails Skipped: No Resend API Key in .env.local ⚠️");
    }

    // 2. TWILIO SMS INTEGRATION
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER) {
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      
      const textMessage = `[Mentora Alert] ${menteeName} has missed ${missedCount} consecutive sessions with ${mentorName}. Please intervene immediately to prevent program drop-out.`;
      
      try {
        // Texting the Student
        await client.messages.create({
          body: textMessage,
          from: TWILIO_PHONE_NUMBER,
          to: studentPhone // e.g. +917994093409
        });
        
        // Texting the Mentor
        await client.messages.create({
          body: textMessage,
          from: TWILIO_PHONE_NUMBER,
          to: mentorPhone // e.g. +919447823670
        });

        results.push("SMS Sent via Twilio ✅");
      } catch (err: any) {
        console.error("Twilio SMS Error:", err);
        results.push(`SMS Failed to Send via Twilio ❌ (${err.message})`);
      }
    } else {
      results.push("SMS Skipped: No Twilio API Keys in .env.local ⚠️");
    }

    return NextResponse.json({ 
      success: true, 
      message: "Nudge evaluation completed",
      logs: results 
    });

  } catch (error) {
    console.error("❌ Fatal Error in Nudge API:", error);
    return NextResponse.json({ success: false, error: "System failure" }, { status: 500 });
  }
}
