import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { brandName, brandWebsite, budget, email, phone, goal } = await req.json();

    if (!brandName || !brandWebsite || !budget || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Strategy Call Form" <${process.env.GMAIL_USER}>`,
      to: process.env.SUBMISSIONS_EMAIL,
      replyTo: email,
      subject: `New Strategy Call Request — ${brandName}`,
      html: `
        <h2>New Strategy Call Request</h2>
        <p><strong>Brand:</strong> ${brandName}</p>
        <p><strong>Website/Instagram:</strong> ${brandWebsite}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Goal:</strong> ${goal || "—"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}