import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// In-memory fallback store for local dev when Supabase environment variables are missing
let memoryInfluencers: Array<{
  id: string;
  full_name: string;
  gender: string;
  city: string;
  height: string;
  skin_tone: string;
  experience?: string | null;
  brands_worked_with: string[];
  images: string[];
  videos: string[];
}> = [];

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data: influencers, error: infError } = await supabase
        .from("influencer_partner_requests")
        .select(
          `
          id,
          full_name,
          gender,
          city,
          height,
          skin_tone,
          experience,
          image1_url,
          image2_url,
          image3_url,
          image4_url,
          image5_url,
          image6_url,
          video1_url,
          video2_url,
          video3_url,
          created_at
        `
        )
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (!infError && influencers && influencers.length > 0) {
        const influencerIds = influencers.map((inf) => inf.id);
        const { data: brandTags } = await supabase
          .from("influencer_brands_worked_with")
          .select("influencer_id, brand_name")
          .in("influencer_id", influencerIds);

        const tagsMap: Record<string, string[]> = {};
        if (brandTags) {
          for (const row of brandTags) {
            if (!tagsMap[row.influencer_id]) {
              tagsMap[row.influencer_id] = [];
            }
            tagsMap[row.influencer_id].push(row.brand_name);
          }
        }

        const dbResult = influencers.map((inf) => ({
          id: inf.id,
          full_name: inf.full_name,
          gender: inf.gender,
          city: inf.city,
          height: inf.height,
          skin_tone: inf.skin_tone,
          experience: inf.experience,
          brands_worked_with: tagsMap[inf.id] || [],
          images: [
            inf.image1_url,
            inf.image2_url,
            inf.image3_url,
            inf.image4_url,
            inf.image5_url,
            inf.image6_url,
          ].filter(Boolean),
          videos: [
            inf.video1_url,
            inf.video2_url,
            inf.video3_url,
          ].filter(Boolean),
        }));

        return NextResponse.json({ success: true, data: [...dbResult, ...memoryInfluencers] });
      }
    }

    return NextResponse.json({ success: true, data: memoryInfluencers });
  } catch (err) {
    console.error("GET influencer partners error:", err);
    return NextResponse.json({ success: true, data: memoryInfluencers });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let fullName = "";
    let gender = "";
    let city = "";
    let phone = "";
    let email = "";
    let height = "";
    let skinTone = "";
    let instagramHandle = "";
    let followersCount = "";
    let tiktokYoutube = "";
    let experience = "";
    let brandsWorkedWith: string[] = [];
    const photoUrls: (string | null)[] = [null, null, null, null, null, null];
    const videoUrls: (string | null)[] = [null, null, null];

    if (contentType.includes("application/json")) {
      const body = await request.json();

      fullName = (body.fullName?.toString() ?? "").trim();
      gender = (body.gender?.toString() ?? "").trim();
      city = (body.city?.toString() ?? "").trim();
      phone = (body.phone?.toString() ?? "").trim();
      email = (body.email?.toString() ?? "").trim();
      height = (body.height?.toString() ?? "").trim();
      skinTone = (body.skinTone?.toString() ?? "").trim();
      instagramHandle = (body.instagramHandle?.toString() ?? "").trim();
      followersCount = (body.followersCount?.toString() ?? "").trim();
      tiktokYoutube = (body.tiktokYoutube?.toString() ?? "").trim();
      experience = (body.experience?.toString() ?? "").trim();

      brandsWorkedWith = Array.isArray(body.brandsWorkedWith)
        ? body.brandsWorkedWith.map((b: any) => String(b).trim()).filter(Boolean)
        : [];

      const rawPhotos: string[] = Array.isArray(body.photoUrls)
        ? body.photoUrls
        : Array.isArray(body.imageUrls)
        ? body.imageUrls
        : [];

      const rawVideos: string[] = Array.isArray(body.videoUrls)
        ? body.videoUrls
        : [];

      for (let i = 0; i < 6; i++) {
        photoUrls[i] = rawPhotos[i] ? String(rawPhotos[i]).trim() : null;
      }
      for (let i = 0; i < 3; i++) {
        videoUrls[i] = rawVideos[i] ? String(rawVideos[i]).trim() : null;
      }
    } else {
      // Fallback for multipart form data if needed
      const formData = await request.formData();

      fullName = (formData.get("fullName")?.toString() ?? "").trim();
      gender = (formData.get("gender")?.toString() ?? "").trim();
      city = (formData.get("city")?.toString() ?? "").trim();
      phone = (formData.get("phone")?.toString() ?? "").trim();
      email = (formData.get("email")?.toString() ?? "").trim();
      height = (formData.get("height")?.toString() ?? "").trim();
      skinTone = (formData.get("skinTone")?.toString() ?? "").trim();
      instagramHandle = (formData.get("instagramHandle")?.toString() ?? "").trim();
      followersCount = (formData.get("followersCount")?.toString() ?? "").trim();
      tiktokYoutube = (formData.get("tiktokYoutube")?.toString() ?? "").trim();
      experience = (formData.get("experience")?.toString() ?? "").trim();

      const brandsRaw = formData.get("brandsWorkedWith")?.toString() ?? "[]";
      try {
        brandsWorkedWith = JSON.parse(brandsRaw);
      } catch {
        brandsWorkedWith = [];
      }

      for (let i = 1; i <= 6; i++) {
        const photoVal =
          formData.get(`photoUrl${i}`)?.toString() ||
          formData.get(`imageUrl${i}`)?.toString();
        if (photoVal) {
          photoUrls[i - 1] = photoVal;
        }
      }
      for (let i = 1; i <= 3; i++) {
        const videoVal = formData.get(`videoUrl${i}`)?.toString();
        if (videoVal) {
          videoUrls[i - 1] = videoVal;
        }
      }
    }

    if (
      !fullName ||
      !gender ||
      !city ||
      !phone ||
      !email ||
      !height ||
      !skinTone ||
      !instagramHandle ||
      !followersCount ||
      !photoUrls[0] ||
      !videoUrls[0]
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required fields (Full Name, Gender, City, Phone, Email, Height, Skin Tone, Instagram Handle, Followers Count, Photo 1, and Video 1).",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Supabase DB insert (is_approved set to true by default)
    if (supabase) {
      const { data: insertedInf, error: insertError } = await supabase
        .from("influencer_partner_requests")
        .insert({
          full_name: fullName,
          gender,
          city,
          phone,
          email,
          height,
          skin_tone: skinTone,
          instagram_handle: instagramHandle,
          followers_count: followersCount,
          tiktok_youtube: tiktokYoutube || null,
          experience: experience || null,
          image1_url: photoUrls[0] || "",
          image2_url: photoUrls[1] || null,
          image3_url: photoUrls[2] || null,
          image4_url: photoUrls[3] || null,
          image5_url: photoUrls[4] || null,
          image6_url: photoUrls[5] || null,
          video1_url: videoUrls[0] || "",
          video2_url: videoUrls[1] || null,
          video3_url: videoUrls[2] || null,
          is_approved: true, // Default to approved so it displays immediately after submission
        })
        .select("id")
        .single();

      if (insertError) {
        console.error("Supabase insert error:", insertError);
      }

      if (insertedInf?.id && brandsWorkedWith.length > 0) {
        const tagRows = brandsWorkedWith.map((brandNameTag) => ({
          influencer_id: insertedInf.id,
          brand_name: brandNameTag.trim(),
        }));
        await supabase.from("influencer_brands_worked_with").insert(tagRows);
      }
    }

    // Always push to in-memory store so card displays immediately without manual approval
    const newInfluencerItem = {
      id: `influencer-${Date.now()}`,
      full_name: fullName,
      gender,
      city,
      height,
      skin_tone: skinTone,
      experience: experience || null,
      brands_worked_with: brandsWorkedWith,
      images: photoUrls.filter(Boolean) as string[],
      videos: videoUrls.filter(Boolean) as string[],
    };
    memoryInfluencers.unshift(newInfluencerItem);

    // Send email via Nodemailer with direct links to Blob assets
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const destinationEmail =
          process.env.SUBMISSIONS_EMAIL || "collabopakistan@gmail.com";

        const uploadedPhotosHtml = photoUrls
          .filter(Boolean)
          .map(
            (url, idx) =>
              `<li>Photo ${idx + 1}: <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></li>`
          )
          .join("");

        const uploadedVideosHtml = videoUrls
          .filter(Boolean)
          .map(
            (url, idx) =>
              `<li>Video ${idx + 1}: <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></li>`
          )
          .join("");

        await transporter.sendMail({
          from: `"Influencer Applications" <${process.env.GMAIL_USER}>`,
          to: destinationEmail,
          replyTo: email,
          subject: `New Influencer Application: ${fullName}`,
          html: `
            <h2>New Influencer & Model Application</h2>
            <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
            <p><strong>Gender:</strong> ${escapeHtml(gender)}</p>
            <p><strong>City:</strong> ${escapeHtml(city)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Height:</strong> ${escapeHtml(height)}</p>
            <p><strong>Skin Tone:</strong> ${escapeHtml(skinTone)}</p>
            <p><strong>Instagram Handle:</strong> @${escapeHtml(instagramHandle)}</p>
            <p><strong>Followers Count:</strong> ${escapeHtml(followersCount)}</p>
            <p><strong>TikTok / YouTube:</strong> ${tiktokYoutube ? escapeHtml(tiktokYoutube) : "Not provided"}</p>
            <p><strong>Brands Worked With:</strong> ${brandsWorkedWith.length ? escapeHtml(brandsWorkedWith.join(", ")) : "None listed"}</p>
            <p><strong>Experience:</strong><br/>${experience ? escapeHtml(experience).replace(/\n/g, "<br/>") : "None provided"}</p>
            <h3>Uploaded Photos</h3>
            <ul>${uploadedPhotosHtml || "None"}</ul>
            <h3>Uploaded Videos</h3>
            <ul>${uploadedVideosHtml || "None"}</ul>
          `,
        });
      } catch (mailErr) {
        console.error("Nodemailer error:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: newInfluencerItem,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Influencer partner submission error:", error);
    return NextResponse.json(
      {
        error:
          (error as Error)?.message ||
          "Something went wrong submitting your application. Please try again.",
      },
      { status: 500 }
    );
  }
}
