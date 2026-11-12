import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    configured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  // Gracefully report when BLOB_READ_WRITE_TOKEN is not configured
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error: "BLOB_READ_WRITE_TOKEN is not configured in environment variables.",
        missingToken: true,
      },
      { status: 503 }
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body" },
      { status: 400 }
    );
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string) => {
        return {
          allowedContentTypes: [
            // Images
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/avif",
            "image/heic",
            "image/heif",
            // Videos
            "video/mp4",
            "video/quicktime",
            "video/webm",
            "video/x-matroska",
            "video/mpeg",
            "video/avi",
            "video/x-msvideo",
          ],
          addRandomSuffix: true,
          // Support videos and photos up to 500MB
          maximumSizeInBytes: 500 * 1024 * 1024,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Vercel Blob client upload completed:", blob.pathname, blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error generating client upload token:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to generate upload token." },
      { status: 400 }
    );
  }
}
