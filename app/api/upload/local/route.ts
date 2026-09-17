import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  let file: File | null = null;
  let buffer: Buffer | null = null;

  try {
    const formData = await request.formData();
    file = formData.get("file") as File | null;
    const prefix = formData.get("prefix")?.toString() || "media";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided for upload." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);

    // Sanitize prefix to avoid path traversal
    const safePrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, "");
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "influencers",
      safePrefix
    );

    await mkdir(uploadDir, { recursive: true });

    const rawName = file.name || "media-file";
    const sanitizedFileName = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${sanitizedFileName}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/influencers/${safePrefix}/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error: any) {
    console.error("Local file upload error:", error);

    // Fallback for read-only environments (e.g. serverless demo without Vercel Blob configured)
    if (file && buffer && file.type?.startsWith("image/") && file.size < 5 * 1024 * 1024) {
      const mimeType = file.type || "image/jpeg";
      const dataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
      return NextResponse.json({
        success: true,
        url: dataUrl,
      });
    }

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to save uploaded file locally. Ensure storage permissions or configure BLOB_READ_WRITE_TOKEN.",
      },
      { status: 500 }
    );
  }
}
