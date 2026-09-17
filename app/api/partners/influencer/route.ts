import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

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
      // First attempt selecting all fields including new model profile fields
      let influencers: any[] | null = null;
      let infError: any = null;

      const { data: fullData, error: fullError } = await supabase
        .from("influencer_partner_requests")
        .select(
          `
          id,
          full_name,
          gender,
          city,
          country,
          phone,
          email,
          height,
          weight,
          chest_bust,
          waist,
          hips,
          shoe_size,
          hair_color,
          eye_color,
          skin_tone,
          languages,
          modeling_categories,
          skills,
          previous_campaigns,
          availability,
          starting_rate,
          experience,
          profile_picture_url,
          image1_url,
          image2_url,
          image3_url,
          image4_url,
          image5_url,
          image6_url,
          video1_url,
          video2_url,
          video3_url,
          is_verified,
          created_at
        `
        )
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (fullError) {
        // Fallback to legacy fields if migration hasn't been applied yet
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("influencer_partner_requests")
          .select(
            `
            id,
            full_name,
            gender,
            city,
            phone,
            email,
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

        influencers = fallbackData;
        infError = fallbackError;
      } else {
        influencers = fullData;
      }

      if (!infError && influencers) {
        if (influencers.length === 0) {
          return NextResponse.json({ success: true, data: [] });
        }

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
          country: inf.country || "Pakistan",
          height: inf.height,
          weight: inf.weight || null,
          chest_bust: inf.chest_bust || null,
          waist: inf.waist || null,
          hips: inf.hips || null,
          shoe_size: inf.shoe_size || null,
          hair_color: inf.hair_color || null,
          eye_color: inf.eye_color || null,
          skin_tone: inf.skin_tone,
          languages: inf.languages || null,
          modeling_categories: Array.isArray(inf.modeling_categories)
            ? inf.modeling_categories
            : typeof inf.modeling_categories === "string"
            ? inf.modeling_categories.split(",").map((s: string) => s.trim())
            : [],
          skills: inf.skills || null,
          previous_campaigns: inf.previous_campaigns || null,
          availability: inf.availability || null,
          starting_rate: inf.starting_rate || null,
          experience: inf.experience,
          profile_picture_url: inf.profile_picture_url || inf.image1_url || null,
          is_verified: !!inf.is_verified,
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

        return NextResponse.json({ success: true, data: dbResult });
      }
    }

    return NextResponse.json({ success: true, data: [] });
  } catch (err) {
    console.error("GET influencer partners error:", err);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let fullName = "";
    let gender = "";
    let city = "";
    let country = "Pakistan";
    let phone = "";
    let email = "";
    let age = "";
    let height = "";
    let weight = "";
    let chestBust = "";
    let waist = "";
    let hips = "";
    let shoeSize = "";
    let hairColor = "";
    let eyeColor = "";
    let skinTone = "";
    let languages = "";
    let modelingCategories: string[] = [];
    let skills = "";
    let previousCampaigns = "";
    let availability = "";
    let startingRate = "";
    let instagramHandle = "";
    let followersCount = "";
    let tiktokYoutube = "";
    let experience = "";
    let profilePictureUrl = "";
    let brandsWorkedWith: string[] = [];
    const photoUrls: (string | null)[] = [null, null, null, null, null, null];
    const videoUrls: (string | null)[] = [null, null, null];

    if (contentType.includes("application/json")) {
      const body = await request.json();

      fullName = (body.fullName?.toString() ?? "").trim();
      gender = (body.gender?.toString() ?? "").trim();
      city = (body.city?.toString() ?? "").trim();
      country = (body.country?.toString() ?? "Pakistan").trim();
      phone = (body.phone?.toString() ?? "").trim();
      email = (body.email?.toString() ?? "").trim();
      age = (body.age?.toString() ?? "").trim();
      height = (body.height?.toString() ?? "").trim();
      weight = (body.weight?.toString() ?? "").trim();
      chestBust = (body.chestBust?.toString() ?? "").trim();
      waist = (body.waist?.toString() ?? "").trim();
      hips = (body.hips?.toString() ?? "").trim();
      shoeSize = (body.shoeSize?.toString() ?? "").trim();
      hairColor = (body.hairColor?.toString() ?? "").trim();
      eyeColor = (body.eyeColor?.toString() ?? "").trim();
      skinTone = (body.skinTone?.toString() ?? "").trim();
      languages = (body.languages?.toString() ?? "").trim();
      skills = (body.skills?.toString() ?? "").trim();
      previousCampaigns = (body.previousCampaigns?.toString() ?? "").trim();
      availability = (body.availability?.toString() ?? "").trim();
      startingRate = (body.startingRate?.toString() ?? "").trim();
      instagramHandle = (body.instagramHandle?.toString() ?? "").trim();
      followersCount = (body.followersCount?.toString() ?? "").trim();
      tiktokYoutube = (body.tiktokYoutube?.toString() ?? "").trim();
      experience = (body.experience?.toString() ?? "").trim();
      profilePictureUrl = (body.profilePictureUrl?.toString() ?? "").trim();

      modelingCategories = Array.isArray(body.modelingCategories)
        ? body.modelingCategories.map((c: any) => String(c).trim()).filter(Boolean)
        : [];

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
      country = (formData.get("country")?.toString() ?? "Pakistan").trim();
      phone = (formData.get("phone")?.toString() ?? "").trim();
      email = (formData.get("email")?.toString() ?? "").trim();
      age = (formData.get("age")?.toString() ?? "").trim();
      height = (formData.get("height")?.toString() ?? "").trim();
      weight = (formData.get("weight")?.toString() ?? "").trim();
      chestBust = (formData.get("chestBust")?.toString() ?? "").trim();
      waist = (formData.get("waist")?.toString() ?? "").trim();
      hips = (formData.get("hips")?.toString() ?? "").trim();
      shoeSize = (formData.get("shoeSize")?.toString() ?? "").trim();
      hairColor = (formData.get("hairColor")?.toString() ?? "").trim();
      eyeColor = (formData.get("eyeColor")?.toString() ?? "").trim();
      skinTone = (formData.get("skinTone")?.toString() ?? "").trim();
      languages = (formData.get("languages")?.toString() ?? "").trim();
      skills = (formData.get("skills")?.toString() ?? "").trim();
      previousCampaigns = (formData.get("previousCampaigns")?.toString() ?? "").trim();
      availability = (formData.get("availability")?.toString() ?? "").trim();
      startingRate = (formData.get("startingRate")?.toString() ?? "").trim();
      instagramHandle = (formData.get("instagramHandle")?.toString() ?? "").trim();
      followersCount = (formData.get("followersCount")?.toString() ?? "").trim();
      tiktokYoutube = (formData.get("tiktokYoutube")?.toString() ?? "").trim();
      experience = (formData.get("experience")?.toString() ?? "").trim();
      profilePictureUrl = (formData.get("profilePictureUrl")?.toString() ?? "").trim();

      const catsRaw = formData.get("modelingCategories")?.toString() ?? "[]";
      try {
        modelingCategories = JSON.parse(catsRaw);
      } catch {
        modelingCategories = [];
      }

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

    if (!profilePictureUrl && photoUrls[0]) {
      profilePictureUrl = photoUrls[0];
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

    // Supabase DB insert (is_approved set to false by default)
    if (supabase) {
      const fullInsertPayload = {
        full_name: fullName,
        gender,
        city,
        country: country || "Pakistan",
        phone,
        email,
        age: age || null,
        height,
        weight: weight || null,
        chest_bust: chestBust || null,
        waist: waist || null,
        hips: hips || null,
        shoe_size: shoeSize || null,
        hair_color: hairColor || null,
        eye_color: eyeColor || null,
        skin_tone: skinTone,
        languages: languages || null,
        modeling_categories: modelingCategories.length > 0 ? modelingCategories : null,
        skills: skills || null,
        previous_campaigns: previousCampaigns || null,
        availability: availability || null,
        starting_rate: startingRate || null,
        profile_picture_url: profilePictureUrl || null,
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
        is_approved: false,
        is_verified: false,
      };

      let { data: insertedInf, error: insertError } = await supabase
        .from("influencer_partner_requests")
        .insert(fullInsertPayload)
        .select("id")
        .single();

      // If new columns are not yet added to Supabase table, retry with base columns
      if (insertError && insertError.code === "42703") {
        console.warn("Supabase missing new columns, falling back to base schema insert:", insertError.message);
        const baseInsertPayload = {
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
          is_approved: false,
        };

        const fallbackRes = await supabase
          .from("influencer_partner_requests")
          .insert(baseInsertPayload)
          .select("id")
          .single();

        insertedInf = fallbackRes.data;
        insertError = fallbackRes.error;
      }

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

    // Send email via Nodemailer with direct links to Blob assets
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
          connectionTimeout: 4000,
          greetingTimeout: 4000,
          socketTimeout: 5000,
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

        const emailPromise = transporter.sendMail({
          from: `"Influencer Applications" <${process.env.GMAIL_USER}>`,
          to: destinationEmail,
          replyTo: email,
          subject: `New Model & Influencer Application: ${fullName}`,
          html: `
            <h2>New Model & Influencer Application</h2>
            ${profilePictureUrl ? `<p><strong>Profile Picture:</strong> <a href="${profilePictureUrl}" target="_blank">View Profile Photo</a></p>` : ""}
            <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
            <p><strong>Age / DOB:</strong> ${age ? escapeHtml(age) : "N/A"}</p>
            <p><strong>Gender:</strong> ${escapeHtml(gender)}</p>
            <p><strong>Location:</strong> ${escapeHtml(city)}, ${escapeHtml(country)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <hr/>
            <h3>Model Physical Stats & Measurements</h3>
            <p><strong>Height:</strong> ${escapeHtml(height)} | <strong>Weight:</strong> ${weight ? escapeHtml(weight) : "N/A"}</p>
            <p><strong>Chest/Bust:</strong> ${chestBust ? escapeHtml(chestBust) : "N/A"} | <strong>Waist:</strong> ${waist ? escapeHtml(waist) : "N/A"} | <strong>Hips:</strong> ${hips ? escapeHtml(hips) : "N/A"}</p>
            <p><strong>Shoe Size:</strong> ${shoeSize ? escapeHtml(shoeSize) : "N/A"} | <strong>Hair:</strong> ${hairColor ? escapeHtml(hairColor) : "N/A"} | <strong>Eyes:</strong> ${eyeColor ? escapeHtml(eyeColor) : "N/A"}</p>
            <p><strong>Skin Tone:</strong> ${escapeHtml(skinTone)}</p>
            <hr/>
            <h3>Professional Portfolio & Categories</h3>
            <p><strong>Modeling Categories:</strong> ${modelingCategories.length ? escapeHtml(modelingCategories.join(", ")) : "General"}</p>
            <p><strong>Languages:</strong> ${languages ? escapeHtml(languages) : "N/A"}</p>
            <p><strong>Skills:</strong> ${skills ? escapeHtml(skills) : "N/A"}</p>
            <p><strong>Availability:</strong> ${availability ? escapeHtml(availability) : "N/A"} | <strong>Starting Rate:</strong> ${startingRate ? escapeHtml(startingRate) : "Negotiable"}</p>
            <p><strong>Instagram Handle:</strong> @${escapeHtml(instagramHandle)} (${escapeHtml(followersCount)} followers)</p>
            <p><strong>TikTok / YouTube:</strong> ${tiktokYoutube ? escapeHtml(tiktokYoutube) : "Not provided"}</p>
            <p><strong>Previous Campaigns:</strong><br/>${previousCampaigns ? escapeHtml(previousCampaigns).replace(/\n/g, "<br/>") : "None listed"}</p>
            <p><strong>Brands Worked With:</strong> ${brandsWorkedWith.length ? escapeHtml(brandsWorkedWith.join(", ")) : "None listed"}</p>
            <p><strong>Experience / Bio:</strong><br/>${experience ? escapeHtml(experience).replace(/\n/g, "<br/>") : "None provided"}</p>
            <hr/>
            <h3>Uploaded Photos</h3>
            <ul>${uploadedPhotosHtml || "None"}</ul>
            <h3>Uploaded Videos</h3>
            <ul>${uploadedVideosHtml || "None"}</ul>
          `,
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Email sending timed out")), 4000)
        );

        await Promise.race([emailPromise, timeoutPromise]);
      } catch (mailErr) {
        console.error("Nodemailer error (non-fatal):", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: { full_name: fullName },
      message: "Application submitted successfully. It will be reviewed before appearing publicly.",
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
