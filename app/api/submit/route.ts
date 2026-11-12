import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const REQUIRED_FIELDS = ["name", "email", "phone", "niche"] as const;

type PlatformEntry = {
  platform: string;
  handle: string;
  followers: string;
  profileUrl?: string;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const values: Record<string, string> = {};
    for (const field of REQUIRED_FIELDS) {
      values[field] = (formData.get(field)?.toString() ?? "").trim();
    }
    const message =
      (formData.get("message")?.toString() ?? "").trim() || "Not provided";

    const missing = REQUIRED_FIELDS.filter((field) => !values[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const platformsRaw = formData.get("platforms")?.toString();
    if (!platformsRaw) {
      return NextResponse.json(
        { error: "Please fill in at least one platform's details." },
        { status: 400 }
      );
    }

    let platforms: PlatformEntry[];
    try {
      platforms = JSON.parse(platformsRaw);
    } catch {
      return NextResponse.json(
        { error: "Invalid platform data." },
        { status: 400 }
      );
    }

    if (!Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json(
        { error: "Please fill in at least one platform's details." },
        { status: 400 }
      );
    }

    console.log("GMAIL_USER =", process.env.GMAIL_USER);
console.log("GMAIL_APP_PASSWORD =", process.env.GMAIL_APP_PASSWORD);

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars.");
      return NextResponse.json(
        { error: "Email is not configured. Please contact the site owner." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const destinationEmail =
      process.env.SUBMISSIONS_EMAIL || "collabopakistan@gmail.com";

    const { name, email, phone, niche } = values;

    const attachments: {
      filename: string;
      content: Buffer;
      contentType: string;
    }[] = [];

    let platformsHtml = "";
    for (const entry of platforms) {
      platformsHtml += `
        <div style="margin-bottom:16px;padding:12px;border:1px solid #eee;border-radius:8px;">
          <p style="margin:0 0 6px;"><strong>${escapeHtml(entry.platform)}</strong></p>
          <p style="margin:0;">Handle: @${escapeHtml(entry.handle)}</p>
          ${
            entry.profileUrl
              ? `<p style="margin:0;">URL: ${escapeHtml(entry.profileUrl)}</p>`
              : ""
          }
          <p style="margin:0;">Followers: ${escapeHtml(entry.followers)}</p>
        </div>
      `;

      const file = formData.get(`screenshot_${entry.platform}`) as File | null;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: `${entry.platform}-${file.name || "screenshot.png"}`,
          content: buffer,
          contentType: file.type || "image/png",
        });
      }
    }

    const platformNames = platforms.map((p) => p.platform).join(", ");

    await transporter.sendMail({
      from: `"Creator Applications" <${process.env.GMAIL_USER}>`,
      to: destinationEmail,
      replyTo: email,
      subject: `New Creator Application: ${name} (${platformNames})`,
      html: `
        <h2>New Influencer / Creator Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Niche / Category:</strong> ${escapeHtml(niche)}</p>
        <h3>Platforms</h3>
        ${platformsHtml}
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
      attachments,
    });

    try {
      await transporter.sendMail({
        from: `"eplanet Technologies" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "We received your creator application!",
        html: `
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thanks for applying to partner with us! We've received your details and our team will review your profile shortly.</p>
          <p>— eplanet Technologies</p>
        `,
      });
    } catch (confirmationError) {
      console.error("Confirmation email failed:", confirmationError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}