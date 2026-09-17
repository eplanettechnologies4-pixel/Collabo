import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

// In-memory fallback array for local dev if Supabase is not yet populated in .env
let memoryBrands: Array<{
  id: string;
  brand_name: string;
  contact_person: string;
  website?: string | null;
  logo_url: string;
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
      const { data, error } = await supabase
        .from("brand_partner_requests")
        .select("id, brand_name, contact_person, website, logo_url")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return NextResponse.json({ success: true, data: [...data, ...memoryBrands] });
      }
    }

    return NextResponse.json({ success: true, data: memoryBrands });
  } catch (err) {
    console.error("GET brand partners error:", err);
    return NextResponse.json({ success: true, data: memoryBrands });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const brandName = (formData.get("brandName")?.toString() ?? "").trim();
    const contactPerson = (formData.get("contactPerson")?.toString() ?? "").trim();
    const email = (formData.get("email")?.toString() ?? "").trim();
    const phone = (formData.get("phone")?.toString() ?? "").trim();
    const website = (formData.get("website")?.toString() ?? "").trim();
    const category = (formData.get("category")?.toString() ?? "").trim();
    const message = (formData.get("message")?.toString() ?? "").trim();
    const logoFile = formData.get("logo") as File | null;

    if (!brandName || !contactPerson || !email || !phone || !category || !logoFile) {
      return NextResponse.json(
        { error: "Please complete all required fields (Brand Name, Contact Person, Email, Phone, Category, and Logo)." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    let logoUrl = "";

    if (logoFile) {
      const arrayBuffer = await logoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (supabase) {
        const fileExt = logoFile.name ? logoFile.name.split(".").pop() : "png";
        const fileName = `brand-logos/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("partner-uploads")
          .upload(fileName, buffer, {
            contentType: logoFile.type || "image/png",
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from("partner-uploads")
            .getPublicUrl(uploadData.path);
          logoUrl = publicUrlData.publicUrl;
        }
      }

      // If storage upload didn't run or failed, convert image to data URL for local display
      if (!logoUrl) {
        const mimeType = logoFile.type || "image/png";
        logoUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
      }
    }

    if (supabase) {
      const { error: insertError } = await supabase
        .from("brand_partner_requests")
        .insert({
          brand_name: brandName,
          contact_person: contactPerson,
          email,
          phone,
          website: website || null,
          category,
          logo_url: logoUrl,
          message: message || null,
          is_approved: true, // Default to approved so it displays immediately after submission
        });

      if (insertError) {
        console.error("Supabase Brand Request Insert Error:", insertError);
      }
    }

    // Always push to in-memory store so card displays immediately without manual approval
    const newBrandItem = {
      id: `brand-${Date.now()}`,
      brand_name: brandName,
      contact_person: contactPerson,
      website: website || null,
      logo_url: logoUrl,
    };
    memoryBrands.unshift(newBrandItem);

    // Nodemailer Email Notification
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

        const destinationEmail = process.env.SUBMISSIONS_EMAIL || "collabopakistan@gmail.com";

        const attachments = [];
        if (logoFile) {
          const logoBuffer = Buffer.from(await logoFile.arrayBuffer());
          attachments.push({
            filename: logoFile.name || "logo.png",
            content: logoBuffer,
            contentType: logoFile.type || "image/png",
          });
        }

        const emailPromise = transporter.sendMail({
          from: `"Brand Partner Applications" <${process.env.GMAIL_USER}>`,
          to: destinationEmail,
          replyTo: email,
          subject: `New Brand Partner Application: ${brandName}`,
          html: `
            <h2>New Brand Partner Application</h2>
            <p><strong>Brand Name:</strong> ${escapeHtml(brandName)}</p>
            <p><strong>Contact Person:</strong> ${escapeHtml(contactPerson)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Website:</strong> ${website ? escapeHtml(website) : "Not provided"}</p>
            <p><strong>Category:</strong> ${escapeHtml(category)}</p>
            <p><strong>Logo URL:</strong> ${logoUrl ? `<a href="${logoUrl}" target="_blank">${logoUrl.substring(0, 100)}...</a>` : "Attached"}</p>
            <p><strong>Message / Pitch:</strong><br/>${message ? escapeHtml(message).replace(/\n/g, "<br/>") : "None"}</p>
          `,
          attachments,
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
      data: newBrandItem,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Brand partner submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong processing your request. Please try again." },
      { status: 500 }
    );
  }
}
