import { NextResponse } from "next/server";
export async function POST(request: Request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Please provide a valid inquiry." },
      { status: 400 },
    );
  }
  const {
    name,
    email,
    company = "",
    phone = "",
    interest = "",
    message,
  } = data ?? {};
  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 120 ||
    typeof email !== "string" ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== "string" ||
    message.trim().length < 15 ||
    message.length > 5000 ||
    typeof company !== "string" ||
    company.length > 180 ||
    typeof phone !== "string" ||
    phone.length > 30 ||
    typeof interest !== "string" ||
    interest.length > 100
  ) {
    return NextResponse.json(
      {
        message:
          "Please check your name, email and requirements (at least 15 characters).",
      },
      { status: 400 },
    );
  }
  if (!process.env.RESEND_API_KEY || !process.env.INQUIRY_FROM_EMAIL) {
    return NextResponse.json(
      {
        message:
          "Email delivery is not configured yet. Your inquiry has not been sent. Please email info@kbenggepc.in or contact +91 73395 17139 on WhatsApp.",
      },
      { status: 503 },
    );
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL,
        to: ["info@kbenggepc.in"],
        reply_to: email,
        subject: `Website inquiry: ${interest || "General inquiry"}`,
        text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return NextResponse.json({
      message: "Thank you. Your inquiry has been sent to K B Engineering.",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "We could not send your inquiry. Please email info@kbenggepc.in or contact us on WhatsApp.",
      },
      { status: 502 },
    );
  }
}
