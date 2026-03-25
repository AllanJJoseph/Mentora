import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const eventParams = await request.json();

    const { RESEND_API_KEY, RESEND_TEST_EMAIL } = process.env;

    if (!RESEND_API_KEY || !RESEND_TEST_EMAIL) {
      console.warn("⚠️ Resend credentials missing. Email simulated.");
      return NextResponse.json({ success: true, simulated: true, message: "Credentials missing, email simulated." });
    }

    const resend = new Resend(RESEND_API_KEY);
    const formattedDate = new Date(eventParams.date).toLocaleDateString();

    const data = await resend.emails.send({
      from: 'Mentora App <onboarding@resend.dev>', // Free tier default sender address
      to: [RESEND_TEST_EMAIL], // Free tier requires this to be your own signed-up email
      subject: `[Mentora] New Session Scheduled: ${eventParams.topic}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; p-4 border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4F46E5;">New Mentorship Session Scheduled! 🚀</h2>
          <p>A new class has been booked securely via the Mentora Platform.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; color: #111;">
            <p style="margin: 5px 0;"><strong>Topic:</strong> ${eventParams.topic}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${eventParams.startTime} - ${eventParams.endTime}</p>
          </div>
          <a href="${eventParams.meetingLink}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Join Google Meet
          </a>
          <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">This is an automated message from the Mentora AI System. Do not reply.</p>
        </div>
      `,
    });

    console.log("📨 Resend Response:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error sending email via Resend:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
