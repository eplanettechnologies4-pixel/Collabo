import { NextResponse } from "next/server";
import { getMailTransporter, getAdminRecipients, getSenderEmail } from "@/lib/mail";

export const runtime = "nodejs";

function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) return "";
  const str = String(input);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function formatList(items?: string[]): string {
  if (!items || !Array.isArray(items) || items.length === 0) return "None selected";
  return items.map((i) => escapeHtml(i)).join(", ");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Anti-spam honeypot verification
    if (body.website_url_hp || body.honeyPot) {
      console.warn("Spam submission detected and discarded via honeypot.");
      // Respond with 200 so bots think they succeeded without flooding
      return NextResponse.json({ success: true, message: "Registration received." });
    }

    const {
      personal = {},
      creatorProfile = {},
      social = {},
      brandExperience = {},
      awards = {},
      talent = {},
      commercial = {},
      consent = {},
    } = body;

    // 2. Server-side validation
    // Personal validation
    if (!personal.fullName?.trim()) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }
    if (!personal.age || isNaN(Number(personal.age)) || Number(personal.age) < 5 || Number(personal.age) > 120) {
      return NextResponse.json({ error: "Please enter a valid age." }, { status: 400 });
    }
    if (!personal.gender?.trim()) {
      return NextResponse.json({ error: "Gender selection is required." }, { status: 400 });
    }
    if (!personal.city?.trim()) {
      return NextResponse.json({ error: "City is required." }, { status: 400 });
    }
    if (!personal.whatsappNumber?.trim()) {
      return NextResponse.json({ error: "WhatsApp Number is required." }, { status: 400 });
    }
    if (!personal.email?.trim() || !isValidEmail(personal.email.trim())) {
      return NextResponse.json({ error: "A valid Email Address is required." }, { status: 400 });
    }

    // Creator Profile validation
    if (!Array.isArray(creatorProfile.creatorTypes) || creatorProfile.creatorTypes.length === 0) {
      return NextResponse.json({ error: "Please select at least one Creator Type." }, { status: 400 });
    }
    if (creatorProfile.creatorTypes.includes("Other") && !creatorProfile.creatorTypeOther?.trim()) {
      return NextResponse.json({ error: "Please specify your custom Creator Type." }, { status: 400 });
    }
    if (!Array.isArray(creatorProfile.contentNiches) || creatorProfile.contentNiches.length === 0) {
      return NextResponse.json({ error: "Please select at least one Content Niche." }, { status: 400 });
    }
    if (creatorProfile.contentNiches.includes("Other") && !creatorProfile.contentNicheOther?.trim()) {
      return NextResponse.json({ error: "Please specify your custom Content Niche." }, { status: 400 });
    }
    if (!creatorProfile.creatorExperience?.trim()) {
      return NextResponse.json({ error: "Content creation experience is required." }, { status: 400 });
    }

    // Social Media URL validation (if provided)
    if (social.instagram && social.instagram.trim() && !isValidUrl(social.instagram.trim()) && !social.instagram.startsWith("@")) {
      return NextResponse.json({ error: "Please enter a valid Instagram profile link or handle." }, { status: 400 });
    }
    if (social.tiktok && social.tiktok.trim() && !isValidUrl(social.tiktok.trim()) && !social.tiktok.startsWith("@")) {
      return NextResponse.json({ error: "Please enter a valid TikTok profile link or handle." }, { status: 400 });
    }
    if (social.youtube && social.youtube.trim() && !isValidUrl(social.youtube.trim()) && !social.youtube.startsWith("@")) {
      return NextResponse.json({ error: "Please enter a valid YouTube channel link." }, { status: 400 });
    }
    if (social.facebook && social.facebook.trim() && !isValidUrl(social.facebook.trim())) {
      return NextResponse.json({ error: "Please enter a valid Facebook profile or page link." }, { status: 400 });
    }

    // Brand Collaboration validation
    if (brandExperience.workedWithBrands === "Yes") {
      if (!brandExperience.brandsWorkedWith?.trim()) {
        return NextResponse.json({ error: "Please specify which brands you have worked with." }, { status: 400 });
      }
      if (!brandExperience.paidCollaborations?.trim()) {
        return NextResponse.json({ error: "Please indicate how many paid collaborations you have completed." }, { status: 400 });
      }
    }

    // Awards conditional validation
    if (awards.interestedInAwards === "Yes") {
      if (!awards.awardCategory?.trim()) {
        return NextResponse.json({ error: "Please select an Award Category." }, { status: 400 });
      }
      if (awards.awardCategory === "Other" && !awards.awardCategoryOther?.trim()) {
        return NextResponse.json({ error: "Please specify your custom Award Category." }, { status: 400 });
      }
      if (!awards.biggestAchievement?.trim()) {
        return NextResponse.json({ error: "Please share your biggest achievement as a creator." }, { status: 400 });
      }
      if (!awards.viralContentLinks?.trim()) {
        return NextResponse.json({ error: "Please share links to your best-performing / viral content." }, { status: 400 });
      }
      if (!awards.whyConsidered?.trim()) {
        return NextResponse.json({ error: "Please explain why you should be considered for the awards." }, { status: 400 });
      }
    }

    // Talent Hunt conditional validation
    if (talent.interestedInTalentHunt === "Yes") {
      if (!talent.talentType?.trim()) {
        return NextResponse.json({ error: "Please select your talent category." }, { status: 400 });
      }
      if (talent.talentType === "Other" && !talent.talentTypeOther?.trim()) {
        return NextResponse.json({ error: "Please specify your custom talent." }, { status: 400 });
      }
      if (!talent.talentDescription?.trim()) {
        return NextResponse.json({ error: "Please tell us briefly about your talent." }, { status: 400 });
      }
      if (!talent.plannedPerformance?.trim()) {
        return NextResponse.json({ error: "Please share what you would perform if selected." }, { status: 400 });
      }
      if (!talent.talentVideo?.trim() || (!isValidUrl(talent.talentVideo.trim()) && !talent.talentVideo.startsWith("http"))) {
        return NextResponse.json({ error: "Please provide a valid video link demonstrating your talent." }, { status: 400 });
      }
    }

    // Commercial / network
    if (!commercial.startingRate?.trim()) {
      return NextResponse.json({ error: "Starting rate for a brand collaboration is required." }, { status: 400 });
    }

    // Consent validation
    if (!consent.agreed) {
      return NextResponse.json(
        { error: "You must agree to the Consent & Declaration before submitting." },
        { status: 400 }
      );
    }

    // 3. Nodemailer transporter instantiation
    const transporter = getMailTransporter();
    if (!transporter) {
      console.error("Transporter could not be created because email env credentials are missing.");
      return NextResponse.json(
        { error: "Email notification service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const destinationEmail = getAdminRecipients();
    const creatorTypesDisplay = formatList(
      creatorProfile.creatorTypes.map((t: string) =>
        t === "Other" && creatorProfile.creatorTypeOther ? `Other (${creatorProfile.creatorTypeOther})` : t
      )
    );
    const contentNichesDisplay = formatList(
      creatorProfile.contentNiches.map((n: string) =>
        n === "Other" && creatorProfile.contentNicheOther ? `Other (${creatorProfile.contentNicheOther})` : n
      )
    );
    const collaborationTypesDisplay = formatList(
      (brandExperience.collaborationTypes || []).map((c: string) =>
        c === "Other" && brandExperience.collaborationTypeOther ? `Other (${brandExperience.collaborationTypeOther})` : c
      )
    );
    const awardCategoryDisplay =
      awards.awardCategory === "Other" && awards.awardCategoryOther
        ? `Other (${awards.awardCategoryOther})`
        : awards.awardCategory || "N/A";
    const talentTypeDisplay =
      talent.talentType === "Other" && talent.talentTypeOther
        ? `Other (${talent.talentTypeOther})`
        : talent.talentType || "N/A";
    const heardAboutDisplay =
      commercial.heardAboutCollabo === "Other" && commercial.heardAboutOther
        ? `Other (${commercial.heardAboutOther})`
        : commercial.heardAboutCollabo || "Not specified";

    const cleanWhatsapp = personal.whatsappNumber.replace(/[^0-9+]/g, "");
    const whatsappLink = `https://wa.me/${cleanWhatsapp.replace(/^\+/, "")}`;

    // 4. Construct professional HTML email for Admin
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Collabo Registration</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d14; color: #1a1a2e; margin: 0; padding: 24px 12px; }
    .container { max-width: 720px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.25); border: 1px solid #e5e7eb; }
    .header { background: #0f0f1a; padding: 32px 28px; text-align: center; border-bottom: 3px solid #7b2ff7; }
    .header h1 { margin: 0 0 8px 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; color: #c9c6ba; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
    .badge-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 14px; }
    .tag { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: rgba(255,255,255,0.12); color: #fdf497; }
    .content { padding: 28px; background: #fdfdfd; }
    .section-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 22px; padding: 18px 22px; }
    .section-title { margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #0f0f1a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; display: flex; align-items: center; gap: 8px; }
    .field-row { margin-bottom: 10px; line-height: 1.5; font-size: 14px; }
    .field-row:last-child { margin-bottom: 0; }
    .field-label { font-weight: 600; color: #4b5563; min-width: 170px; display: inline-block; }
    .field-value { color: #111827; font-weight: 500; }
    .highlight-pill { background: #ede9fe; color: #6d28d9; padding: 2px 8px; border-radius: 6px; font-weight: 600; font-size: 13px; }
    .yes-pill { background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 6px; font-weight: 700; }
    .no-pill { background: #f3f4f6; color: #6b7280; padding: 2px 8px; border-radius: 6px; }
    .text-box { background: #f8fafc; border-left: 3px solid #7b2ff7; padding: 10px 14px; margin-top: 6px; border-radius: 4px; font-size: 13px; color: #1e293b; white-space: pre-wrap; }
    .footer { background: #0f0f1a; padding: 20px 28px; text-align: center; color: #9ca3af; font-size: 12px; }
    a { color: #7b2ff7; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>COLLABO 2026 OFFICIAL REGISTRATION</p>
      <h1>Collabo Influencers Awards &amp; Talent Hunt 2026</h1>
      <div class="badge-bar">
        <span class="tag">🏆 Influencer Awards</span>
        <span class="tag">🎤 Talent Hunt</span>
        <span class="tag">🤝 Brand Collaborations</span>
        <span class="tag">🌐 Creator Network</span>
      </div>
    </div>

    <div class="content">
      <!-- 1. Personal Info -->
      <div class="section-card">
        <div class="section-title">👤 1. Personal Information</div>
        <div class="field-row"><span class="field-label">Full Name:</span> <strong class="field-value">${escapeHtml(personal.fullName)}</strong></div>
        <div class="field-row"><span class="field-label">Age:</span> <span class="field-value">${escapeHtml(personal.age)}</span></div>
        <div class="field-row"><span class="field-label">Gender:</span> <span class="field-value">${escapeHtml(personal.gender)}</span></div>
        <div class="field-row"><span class="field-label">City:</span> <span class="field-value">${escapeHtml(personal.city)}</span></div>
        <div class="field-row">
          <span class="field-label">WhatsApp Number:</span> 
          <span class="field-value"><a href="${whatsappLink}" target="_blank">${escapeHtml(personal.whatsappNumber)}</a> (Direct Chat)</span>
        </div>
        <div class="field-row">
          <span class="field-label">Email Address:</span> 
          <span class="field-value"><a href="mailto:${escapeHtml(personal.email)}">${escapeHtml(personal.email)}</a></span>
        </div>
      </div>

      <!-- 2. Creator Profile -->
      <div class="section-card">
        <div class="section-title">🎨 2. Creator Profile</div>
        <div class="field-row"><span class="field-label">Creator Types:</span> <span class="field-value highlight-pill">${creatorTypesDisplay}</span></div>
        <div class="field-row"><span class="field-label">Content Niches:</span> <span class="field-value highlight-pill">${contentNichesDisplay}</span></div>
        <div class="field-row"><span class="field-label">Experience in Content:</span> <span class="field-value">${escapeHtml(creatorProfile.creatorExperience)}</span></div>
      </div>

      <!-- 3. Social Media Information -->
      <div class="section-card">
        <div class="section-title">📱 3. Social Media Information &amp; Reach</div>
        <div class="field-row">
          <span class="field-label">Instagram:</span> 
          <span class="field-value">${social.instagram ? `<a href="${escapeHtml(social.instagram)}" target="_blank">${escapeHtml(social.instagram)}</a>` : "Not provided"}</span>
        </div>
        <div class="field-row">
          <span class="field-label">TikTok:</span> 
          <span class="field-value">${social.tiktok ? `<a href="${escapeHtml(social.tiktok)}" target="_blank">${escapeHtml(social.tiktok)}</a>` : "Not provided"}</span>
        </div>
        <div class="field-row">
          <span class="field-label">YouTube:</span> 
          <span class="field-value">${social.youtube ? `<a href="${escapeHtml(social.youtube)}" target="_blank">${escapeHtml(social.youtube)}</a>` : "Not provided"}</span>
        </div>
        <div class="field-row">
          <span class="field-label">Facebook:</span> 
          <span class="field-value">${social.facebook ? `<a href="${escapeHtml(social.facebook)}" target="_blank">${escapeHtml(social.facebook)}</a>` : "Not provided"}</span>
        </div>
        <div class="field-row"><span class="field-label">Total Followers:</span> <strong class="field-value">${escapeHtml(social.followerRange || "Not specified")}</strong></div>
        <div class="field-row"><span class="field-label">Average Monthly Reach:</span> <span class="field-value">${escapeHtml(social.monthlyReach || "Not specified")}</span></div>
        <div class="field-row"><span class="field-label">Engagement Rate:</span> <span class="field-value">${escapeHtml(social.engagementRate || "Not provided")}</span></div>
      </div>

      <!-- 4. Brand Collaboration Experience -->
      <div class="section-card">
        <div class="section-title">🤝 4. Brand Collaboration Experience</div>
        <div class="field-row">
          <span class="field-label">Worked with Brands:</span> 
          <span class="${brandExperience.workedWithBrands === "Yes" ? "yes-pill" : "no-pill"}">${escapeHtml(brandExperience.workedWithBrands || "No")}</span>
        </div>
        ${brandExperience.workedWithBrands === "Yes" ? `
          <div class="field-row"><span class="field-label">Paid Collaborations:</span> <span class="field-value">${escapeHtml(brandExperience.paidCollaborations || "None")}</span></div>
          <div class="field-row"><span class="field-label">Collaboration Types:</span> <span class="field-value">${collaborationTypesDisplay}</span></div>
          <div class="field-row">
            <span class="field-label">Brands Worked With:</span>
            <div class="text-box">${escapeHtml(brandExperience.brandsWorkedWith || "None")}</div>
          </div>
          <div class="field-row">
            <span class="field-label">Most Successful Collaboration:</span>
            <div class="text-box">${escapeHtml(brandExperience.successfulCollaboration || "None")}</div>
          </div>
        ` : ""}
      </div>

      <!-- 5. Collabo Influencers Awards -->
      <div class="section-card">
        <div class="section-title">🏆 5. Collabo Influencers Awards Consideration</div>
        <div class="field-row">
          <span class="field-label">Apply for Awards:</span> 
          <span class="${awards.interestedInAwards === "Yes" ? "yes-pill" : "no-pill"}">${escapeHtml(awards.interestedInAwards || "No")}</span>
        </div>
        ${awards.interestedInAwards === "Yes" ? `
          <div class="field-row"><span class="field-label">Award Category:</span> <strong class="field-value">${awardCategoryDisplay}</strong></div>
          <div class="field-row"><span class="field-label">Previously Won / Nominated:</span> <span class="field-value">${escapeHtml(awards.previousAward || "No")}</span></div>
          <div class="field-row">
            <span class="field-label">Biggest Achievement:</span>
            <div class="text-box">${escapeHtml(awards.biggestAchievement)}</div>
          </div>
          <div class="field-row">
            <span class="field-label">Viral / Best Content Links:</span>
            <div class="text-box">${escapeHtml(awards.viralContentLinks)}</div>
          </div>
          <div class="field-row">
            <span class="field-label">Why Should Be Considered:</span>
            <div class="text-box">${escapeHtml(awards.whyConsidered)}</div>
          </div>
        ` : ""}
      </div>

      <!-- 6. Collabo Talent Hunt -->
      <div class="section-card">
        <div class="section-title">🎤 6. Collabo Talent Hunt Participation</div>
        <div class="field-row">
          <span class="field-label">Participate in Talent Hunt:</span> 
          <span class="${talent.interestedInTalentHunt === "Yes" ? "yes-pill" : "no-pill"}">${escapeHtml(talent.interestedInTalentHunt || "No")}</span>
        </div>
        ${talent.interestedInTalentHunt === "Yes" ? `
          <div class="field-row"><span class="field-label">Talent:</span> <strong class="field-value">${talentTypeDisplay}</strong></div>
          <div class="field-row">
            <span class="field-label">Talent Video Demo:</span>
            <span class="field-value"><a href="${escapeHtml(talent.talentVideo)}" target="_blank">Watch Video Link</a></span>
          </div>
          <div class="field-row"><span class="field-label">Physical Attendance:</span> <span class="field-value">${escapeHtml(talent.physicalAttendance || "N/A")}</span></div>
          <div class="field-row"><span class="field-label">Comfortable on Stage:</span> <span class="field-value">${escapeHtml(talent.stageComfort || "N/A")}</span></div>
          <div class="field-row"><span class="field-label">Promotional Content:</span> <span class="field-value">${escapeHtml(talent.promotionalContent || "N/A")}</span></div>
          <div class="field-row"><span class="field-label">Future Brand Campaigns:</span> <span class="field-value">${escapeHtml(talent.futureBrandCampaigns || "N/A")}</span></div>
          <div class="field-row">
            <span class="field-label">Talent Description:</span>
            <div class="text-box">${escapeHtml(talent.talentDescription)}</div>
          </div>
          <div class="field-row">
            <span class="field-label">Planned Performance:</span>
            <div class="text-box">${escapeHtml(talent.plannedPerformance)}</div>
          </div>
        ` : ""}
      </div>

      <!-- 7. Creator / Commercial Information -->
      <div class="section-card">
        <div class="section-title">💼 7. Creator / Commercial Information</div>
        <div class="field-row"><span class="field-label">Starting Rate:</span> <strong class="field-value">${escapeHtml(commercial.startingRate || "Not specified")}</strong></div>
        <div class="field-row"><span class="field-label">Heard About Collabo:</span> <span class="field-value">${heardAboutDisplay}</span></div>
        <div class="field-row"><span class="field-label">Join Creator Network:</span> <span class="field-value">${escapeHtml(commercial.joinCreatorNetwork || "Yes")}</span></div>
        <div class="field-row"><span class="field-label">Contact Permission:</span> <span class="field-value">${escapeHtml(commercial.contactPermission || "Yes")}</span></div>
        <div class="field-row">
          <span class="field-label">Expectations from Collabo:</span>
          <div class="text-box">${escapeHtml(commercial.expectations || "None specified")}</div>
        </div>
      </div>

      <!-- 8. Consent -->
      <div class="section-card" style="border-color: #22c55e;">
        <div class="section-title">✅ 8. Consent &amp; Declaration</div>
        <div class="field-row"><span class="field-label">Agreed to Declaration:</span> <span class="yes-pill">Confirmed / Agreed</span></div>
        <div class="field-row"><span class="field-label">Submission Timestamp:</span> <span class="field-value">${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT</span></div>
      </div>
    </div>

    <div class="footer">
      <p style="margin:0 0 6px 0;">COLLABO — Pakistan's Premier Creator &amp; Influencer Platform</p>
      <p style="margin:0;">This is an automated notification from the Collabo Influencers Awards &amp; Talent Hunt 2026 registration engine.</p>
    </div>
  </div>
</body>
</html>
    `;

    // 5. Send Email to Admin (guaranteed to include eplanettechnologies4@gmail.com)
    await transporter.sendMail({
      from: `"Creator Applications" <${process.env.GMAIL_USER || "eplanettechnologies4@gmail.com"}>`,
      to: destinationEmail,
      replyTo: personal.email,
      subject: `New Collabo Influencers Awards & Talent Hunt 2026 Registration — ${personal.fullName}`,
      html: adminHtml,
    });
    console.log(`Admin email successfully sent to: ${destinationEmail}`);

    // 6. Send Confirmation Email to the Creator (same as creator application form)
    try {
      await transporter.sendMail({
        from: `"eplanet Technologies" <${process.env.GMAIL_USER || "eplanettechnologies4@gmail.com"}>`,
        to: personal.email,
        subject: "We received your creator application!",
        html: `
          <p>Hi ${escapeHtml(personal.fullName)},</p>
          <p>Thanks for applying to partner with us! We've received your details for the Collabo Influencers Awards &amp; Talent Hunt 2026 and our team will review your profile shortly.</p>
          <p>— eplanet Technologies</p>
        `,
      });
      console.log(`Confirmation email sent successfully to: ${personal.email}`);
    } catch (confError) {
      console.error("Confirmation email to creator failed:", confError);
    }

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully!",
    });
  } catch (error) {
    console.error("Awards registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong while submitting your registration. Please try again." },
      { status: 500 }
    );
  }
}
