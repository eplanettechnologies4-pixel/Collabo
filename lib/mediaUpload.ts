import { getSupabaseClient } from "./supabase";

export interface UploadMediaOptions {
  file: File;
  prefix: "photos" | "videos" | "profiles";
  idx?: number;
  onProgress?: (percent: number) => void;
  maxSizeBytes?: number;
}

/**
 * Uploads media (images or videos) directly to Supabase Storage (partner-uploads bucket).
 * Bypasses Vercel 4.5MB serverless payload limit by uploading directly from browser.
 * Emits upload progress and falls back to Supabase SDK or local endpoint if needed.
 */
export async function uploadMediaWithFallback({
  file,
  prefix,
  idx = 0,
  onProgress,
  maxSizeBytes = 50 * 1024 * 1024, // 50MB default
}: UploadMediaOptions): Promise<string> {
  if (file.size > maxSizeBytes) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);
    throw new Error(
      `File "${file.name}" (${sizeMb}MB) exceeds the ${maxMb}MB maximum allowed size. Please choose a smaller file.`
    );
  }

  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const targetPath = `influencers/${prefix}/${Date.now()}_${prefix[0]}${idx + 1}_${sanitizedFileName}`;

  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://degpqeykfphdclzxgqkd.supabase.co"
  ).replace(/\/$/, "");

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZ3BxZXlrZnBoZGNsenhncWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NDMyMDcsImV4cCI6MjEwNTExOTIwN30.uOMjxRXRwvpGqG84O38nLzGL3yAS3sWAwHWxc1J4g-U";

  let lastError: any = null;

  // 1. Direct upload to Supabase Storage via XMLHttpRequest with real-time progress
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const uploadEndpoint = `${supabaseUrl}/storage/v1/object/partner-uploads/${targetPath}`;
        xhr.open("POST", uploadEndpoint);
        xhr.setRequestHeader("apikey", supabaseAnonKey);
        xhr.setRequestHeader("Authorization", `Bearer ${supabaseAnonKey}`);
        xhr.setRequestHeader("x-upsert", "true");
        xhr.timeout = 10 * 60 * 1000; // 10 minutes for large videos

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable && onProgress) {
            const pct = Math.min(99, Math.round((event.loaded / event.total) * 100));
            onProgress(pct);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            if (onProgress) onProgress(100);
            resolve(`${supabaseUrl}/storage/v1/object/public/partner-uploads/${targetPath}`);
          } else {
            try {
              const res = JSON.parse(xhr.responseText);
              reject(new Error(res.message || res.error || `Upload failed with status ${xhr.status}`));
            } catch {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        };

        xhr.onerror = () => reject(new Error("Network connection error during file upload."));
        xhr.ontimeout = () => reject(new Error("Upload timed out. Please check your internet connection."));

        const formData = new FormData();
        formData.append("cacheControl", "3600");
        formData.append("", file);
        xhr.send(formData);
      });

      return url;
    } catch (supaXhrErr: any) {
      console.warn("Supabase direct XHR upload failed, trying Supabase SDK fallback:", supaXhrErr);
      lastError = supaXhrErr;
    }

    // 2. Direct upload via Supabase JS SDK client
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        if (onProgress) onProgress(50);
        const { data, error } = await supabase.storage
          .from("partner-uploads")
          .upload(targetPath, file, {
            contentType: file.type || "application/octet-stream",
            upsert: true,
          });

        if (error) throw error;

        if (data) {
          if (onProgress) onProgress(100);
          const { data: pubData } = supabase.storage
            .from("partner-uploads")
            .getPublicUrl(targetPath);
          return pubData.publicUrl;
        }
      }
    } catch (sdkErr: any) {
      console.warn("Supabase JS SDK direct upload failed:", sdkErr);
      lastError = sdkErr;
    }
  }

  // 3. Fallback to /api/upload/local on localhost
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".local"));

  if (isLocalhost) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prefix", prefix);

      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload/local");
        xhr.timeout = 5 * 60 * 1000;

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable && onProgress) {
            const pct = Math.min(99, Math.round((event.loaded / event.total) * 100));
            onProgress(pct);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText);
              if (res.url) {
                if (onProgress) onProgress(100);
                resolve(res.url);
              } else {
                reject(new Error(res.error || "No URL returned from upload"));
              }
            } catch {
              reject(new Error("Invalid server response from upload"));
            }
          } else {
            try {
              const res = JSON.parse(xhr.responseText);
              reject(new Error(res.error || `Upload failed with status ${xhr.status}`));
            } catch {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        };

        xhr.onerror = () => reject(new Error("Network connection error during file upload."));
        xhr.ontimeout = () => reject(new Error("File upload timed out. Please check file size or network."));
        xhr.send(formData);
      });

      return url;
    } catch (localErr: any) {
      lastError = localErr;
    }
  }

  const mediaLabel = prefix === "photos" ? "Photo" : prefix === "profiles" ? "Profile Photo" : "Video";
  throw new Error(
    `Failed to upload ${mediaLabel} ${idx + 1} (${file.name}): ${
      lastError?.message || "Storage upload failed. Please check network connection."
    }`
  );
}
