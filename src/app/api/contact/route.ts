import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CONTACT_EMAIL = "belhachemiamohammed@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Here you would typically send an email using a service like:
    // - Resend
    // - SendGrid
    // - AWS SES
    // - Nodemailer
    
    // For now, we'll log it and return success
    console.log("Contact form submission:", {
      to: CONTACT_EMAIL,
      from: email,
      name,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // If you want to integrate with an email service, uncomment and configure:
    /*
    // Example with Resend:
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "noreply@yourdomain.com",
        to: CONTACT_EMAIL,
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }
    */

    return NextResponse.json(
      { 
        success: true, 
        message: "Message received successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
