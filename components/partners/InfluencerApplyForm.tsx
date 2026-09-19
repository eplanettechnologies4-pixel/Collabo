"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import {
  BsUpload,
  BsCheckCircleFill,
  BsX,
  BsPlus,
  BsFilm,
  BsImage,
  BsCamera,
  BsPersonCircle,
  BsCheck,
  BsRulers,
  BsStar,
} from "react-icons/bs";

interface InfluencerApplyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormState {
  fullName: string;
  gender: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  chestBust: string;
  waist: string;
  hips: string;
  shoeSize: string;
  hairColor: string;
  eyeColor: string;
  skinTone: string;
  languages: string;
  skills: string;
  previousCampaigns: string;
  availability: string;
  startingRate: string;
  instagramHandle: string;
  followersCount: string;
  tiktokYoutube: string;
  experience: string;
}

interface FormErrors {
  fullName?: string;
  profilePhoto?: string;
  gender?: string;
  city?: string;
  phone?: string;
  email?: string;
  height?: string;
  skinTone?: string;
  instagramHandle?: string;
  followersCount?: string;
  photo1?: string;
  video1?: string;
}

const AVAILABLE_CATEGORIES = [
  "Fashion",
  "Commercial",
  "Runway",
  "Editorial",
  "Fitness",
  "Glamour",
  "UGC Creator",
  "Bridal",
  "Acting",
  "Parts Model",
];

export default function InfluencerApplyForm({
  isOpen,
  onClose,
  onSuccess,
}: InfluencerApplyFormProps) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    gender: "",
    city: "",
    country: "Pakistan",
    phone: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    chestBust: "",
    waist: "",
    hips: "",
    shoeSize: "",
    hairColor: "",
    eyeColor: "",
    skinTone: "",
    languages: "",
    skills: "",
    previousCampaigns: "",
    availability: "Available for Projects",
    startingRate: "",
    instagramHandle: "",
    followersCount: "",
    tiktokYoutube: "",
    experience: "",
  });

  // Dedicated Model Profile Photo / Headshot
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [profilePhotoProgress, setProfilePhotoProgress] = useState<number>(0);

  // Selected Modeling Categories
  const [modelingCategories, setModelingCategories] = useState<string[]>([
    "Fashion",
    "Commercial",
  ]);

  // Brands worked with tags
  const [brandTagInput, setBrandTagInput] = useState("");
  const [brandsWorkedWith, setBrandsWorkedWith] = useState<string[]>([]);

  // Photos (up to 6)
  const [photos, setPhotos] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [photoPreviews, setPhotoPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [photoProgress, setPhotoProgress] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);

  // Videos (up to 3)
  const [videos, setVideos] = useState<(File | null)[]>([null, null, null]);
  const [videoNames, setVideoNames] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [videoProgress, setVideoProgress] = useState<number[]>([0, 0, 0]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleCategory = (cat: string) => {
    if (submitting) return;
    setModelingCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "fullName":
        return !value || !value.trim() ? "Full name is required." : "";
      case "profilePhoto":
        return !value ? "Model profile headshot is required." : "";
      case "gender":
        return !value ? "Gender selection is required." : "";
      case "city":
        return !value || !value.trim() ? "City is required." : "";
      case "phone":
        return !value || !value.trim() ? "Phone number is required." : "";
      case "email":
        if (value && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Invalid email address.";
        }
        return "";
      case "height":
        return !value || !value.trim() ? 'Height is required (e.g. 5\'7" or 170cm).' : "";
      case "skinTone":
        return !value ? "Skin tone selection is required." : "";
      case "instagramHandle":
        return !value || !value.trim() ? "Instagram handle is required." : "";
      case "followersCount":
        return !value || !value.trim() ? "Followers count is required." : "";
      case "photo1":
        return !value ? "First portfolio photo (Photo 1) is required." : "";
      case "video1":
        return !value ? "First video / reel (Video 1) is required." : "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // Profile photo handler
  const handleProfilePhotoChange = (file: File | null) => {
    if (file && file.size > 20 * 1024 * 1024) {
      alert(`The selected profile photo "${file.name}" exceeds the 20MB limit. Please choose a smaller image.`);
      return;
    }
    setProfilePhoto(file);
    if (file) {
      setProfilePhotoPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, profilePhoto: "" }));
    } else {
      setProfilePhotoPreview(null);
    }
  };

  // Add brand tag
  const handleAddBrandTag = () => {
    const trimmed = brandTagInput.trim();
    if (trimmed && !brandsWorkedWith.includes(trimmed)) {
      setBrandsWorkedWith((prev) => [...prev, trimmed]);
      setBrandTagInput("");
    }
  };

  const handleRemoveBrandTag = (index: number) => {
    setBrandsWorkedWith((prev) => prev.filter((_, i) => i !== index));
  };

  // Photo handlers
  const handlePhotoChange = (index: number, file: File | null) => {
    if (file && file.size > 25 * 1024 * 1024) {
      alert(`The selected photo "${file.name}" exceeds the 25MB limit. Please choose a smaller image.`);
      return;
    }
    const newPhotos = [...photos];
    const newPreviews = [...photoPreviews];
    newPhotos[index] = file;
    if (file) {
      newPreviews[index] = URL.createObjectURL(file);
    } else {
      newPreviews[index] = null;
    }
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);

    if (index === 0) {
      setErrors((prev) => ({ ...prev, photo1: validateField("photo1", file) }));
    }
  };

  // Video handlers
  const handleVideoChange = (index: number, file: File | null) => {
    if (file && file.size > 50 * 1024 * 1024) {
      alert(`The selected video "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 50MB storage limit. Please select a video under 50MB.`);
      return;
    }
    const newVideos = [...videos];
    const newNames = [...videoNames];
    newVideos[index] = file;
    newNames[index] = file ? file.name : null;
    setVideos(newVideos);
    setVideoNames(newNames);

    if (index === 0) {
      setErrors((prev) => ({ ...prev, video1: validateField("video1", file) }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const newErrors: FormErrors = {
      fullName: validateField("fullName", form.fullName),
      profilePhoto: validateField("profilePhoto", profilePhoto || photos[0]),
      gender: validateField("gender", form.gender),
      city: validateField("city", form.city),
      phone: validateField("phone", form.phone),
      email: validateField("email", form.email),
      height: validateField("height", form.height),
      skinTone: validateField("skinTone", form.skinTone),
      instagramHandle: validateField("instagramHandle", form.instagramHandle),
      followersCount: validateField("followersCount", form.followersCount),
      photo1: validateField("photo1", photos[0]),
      video1: validateField("video1", videos[0]),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => !!err);
    if (hasError) return;

    setSubmitting(true);
    setUploadStatus("Uploading media to storage...");
    setProfilePhotoProgress(0);
    setPhotoProgress([0, 0, 0, 0, 0, 0]);
    setVideoProgress([0, 0, 0]);

    try {
      let uploadedProfilePhotoUrl = "";
      const uploadedPhotoUrls: (string | null)[] = [
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      const uploadedVideoUrls: (string | null)[] = [null, null, null];

      // Helper to upload media file directly to storage (Supabase public storage with fallback)
      const uploadMediaWithFallback = async (
        file: File,
        prefix: "photos" | "videos" | "profiles",
        idx: number,
        onProgress: (pct: number) => void
      ): Promise<string> => {
        // Enforce 50MB Supabase Storage limit up-front with helpful error
        const MAX_SIZE = 50 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          throw new Error(
            `File "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 50MB maximum allowed upload size. Please select a smaller or compressed file.`
          );
        }

        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const targetPath = `influencers/${prefix}/${Date.now()}_${prefix[0]}${idx + 1}_${sanitizedFileName}`;

        // Direct upload to Supabase Storage bucket (partner-uploads)
        // This completely bypasses Vercel 4.5MB serverless limits and works consistently on live & local
        const supabaseUrl = (
          process.env.NEXT_PUBLIC_SUPABASE_URL ||
          "https://degpqeykfphdclzxgqkd.supabase.co"
        ).replace(/\/$/, "");
        const supabaseAnonKey =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZ3BxZXlrZnBoZGNsenhncWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NDMyMDcsImV4cCI6MjEwNTExOTIwN30.uOMjxRXRwvpGqG84O38nLzGL3yAS3sWAwHWxc1J4g-U";

        let lastError: any = null;

        if (supabaseUrl && supabaseAnonKey) {
          // 1. Direct upload to Supabase Storage via FormData XMLHttpRequest (with real-time progress events)
          try {
            const url = await new Promise<string>((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              const uploadEndpoint = `${supabaseUrl}/storage/v1/object/partner-uploads/${targetPath}`;
              xhr.open("POST", uploadEndpoint);
              xhr.setRequestHeader("apikey", supabaseAnonKey);
              xhr.setRequestHeader("Authorization", `Bearer ${supabaseAnonKey}`);
              xhr.setRequestHeader("x-upsert", "true");
              // Note: Do not set Content-Type manually; browser automatically sets multipart/form-data with boundary
              xhr.timeout = 10 * 60 * 1000; // 10 minutes for large videos

              xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                  const pct = Math.min(99, Math.round((event.loaded / event.total) * 100));
                  onProgress(pct);
                }
              };

              xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  onProgress(100);
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

              xhr.onerror = () =>
                reject(new Error("Network connection error during file upload."));
              xhr.ontimeout = () =>
                reject(new Error("Upload timed out. Please check your internet connection."));

              const formData = new FormData();
              formData.append("cacheControl", "3600");
              formData.append("", file);
              xhr.send(formData);
            });

            return url;
          } catch (supaXhrErr: any) {
            console.warn(
              `Supabase direct XHR upload failed (${supaXhrErr?.message || "Storage error"}), trying Supabase SDK.`
            );
            lastError = supaXhrErr;
          }

          // 2. Direct upload via Supabase JS SDK client (official SDK fallback)
          try {
            const supabase = getSupabaseClient();
            if (supabase) {
              onProgress(50);
              const { data, error } = await supabase.storage
                .from("partner-uploads")
                .upload(targetPath, file, {
                  contentType: file.type || "application/octet-stream",
                  upsert: true,
                });

              if (error) {
                throw error;
              }

              if (data) {
                onProgress(100);
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

        // 3. Fallback to /api/upload/local ONLY on localhost development (never on production where Vercel 4.5MB limit causes 413)
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
                if (event.lengthComputable) {
                  const pct = Math.min(99, Math.round((event.loaded / event.total) * 100));
                  onProgress(pct);
                }
              };

              xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  try {
                    const res = JSON.parse(xhr.responseText);
                    if (res.url) {
                      onProgress(100);
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

              xhr.onerror = () =>
                reject(new Error("Network connection error during file upload."));
              xhr.ontimeout = () =>
                reject(new Error("File upload timed out. Please check file size or network."));
              xhr.send(formData);
            });

            return url;
          } catch (localErr: any) {
            lastError = localErr;
          }
        }

        throw new Error(
          `Failed to upload ${prefix === "photos" ? "Photo" : prefix === "profiles" ? "Profile Photo" : "Video"} ${idx + 1} (${file.name}): ${
            lastError?.message || "Storage upload failed. Please check network connection."
          }`
        );
      };

      // 1. Upload Model Profile Headshot if selected
      if (profilePhoto) {
        setUploadStatus("Uploading model profile photo...");
        uploadedProfilePhotoUrl = await uploadMediaWithFallback(
          profilePhoto,
          "profiles",
          0,
          (pct) => setProfilePhotoProgress(pct)
        );
      }

      // 2. Upload photos in parallel
      setUploadStatus("Uploading portfolio photos...");
      const photoUploadTasks = photos.map(async (file, idx) => {
        if (!file) return;
        const url = await uploadMediaWithFallback(file, "photos", idx, (pct) => {
          setPhotoProgress((prev) => {
            const next = [...prev];
            next[idx] = pct;
            return next;
          });
        });
        uploadedPhotoUrls[idx] = url;
      });

      await Promise.all(photoUploadTasks);

      // 3. Upload videos sequentially to maintain dedicated connection bandwidth
      setUploadStatus("Uploading portfolio videos...");
      for (let idx = 0; idx < videos.length; idx++) {
        const file = videos[idx];
        if (!file) continue;
        const url = await uploadMediaWithFallback(file, "videos", idx, (pct) => {
          setVideoProgress((prev) => {
            const next = [...prev];
            next[idx] = pct;
            return next;
          });
        });
        uploadedVideoUrls[idx] = url;
      }

      setUploadStatus("Saving application details...");

      // Submit application with public media URLs
      let submitSuccess = false;
      let apiErrorMessage = "";

      try {
        const res = await fetch("/api/partners/influencer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: form.fullName,
            gender: form.gender,
            city: form.city,
            country: form.country,
            phone: form.phone,
            email: form.email,
            age: form.age,
            height: form.height,
            weight: form.weight,
            chestBust: form.chestBust,
            waist: form.waist,
            hips: form.hips,
            shoeSize: form.shoeSize,
            hairColor: form.hairColor,
            eyeColor: form.eyeColor,
            skinTone: form.skinTone,
            languages: form.languages,
            modelingCategories,
            skills: form.skills,
            previousCampaigns: form.previousCampaigns,
            availability: form.availability,
            startingRate: form.startingRate,
            profilePictureUrl: uploadedProfilePhotoUrl || uploadedPhotoUrls[0] || "",
            instagramHandle: form.instagramHandle,
            followersCount: form.followersCount,
            tiktokYoutube: form.tiktokYoutube,
            experience: form.experience,
            brandsWorkedWith,
            photoUrls: uploadedPhotoUrls,
            videoUrls: uploadedVideoUrls,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (!data?.error) {
            submitSuccess = true;
          } else {
            apiErrorMessage = data.error;
          }
        } else {
          try {
            const errorData = await res.json();
            apiErrorMessage = errorData?.error || `Server error (${res.status})`;
          } catch {
            apiErrorMessage = `Server error (${res.status})`;
          }
        }
      } catch (fetchErr) {
        console.warn(
          "API route submission encountered fetch error, falling back to direct database insertion:",
          fetchErr
        );
      }

      // If API route succeeded, finalize application
      if (submitSuccess) {
        setIsSuccess(true);
        if (onSuccess) onSuccess();
        return;
      }

      // Direct Supabase database insertion fallback (bypasses Vercel deployment protection / SSO / proxy blocks)
      try {
        const supabase = getSupabaseClient();
        if (supabase) {
          const payload = {
            full_name: form.fullName,
            gender: form.gender,
            city: form.city,
            country: form.country || "Pakistan",
            phone: form.phone,
            email: form.email,
            age: form.age || null,
            height: form.height,
            weight: form.weight || null,
            chest_bust: form.chestBust || null,
            waist: form.waist || null,
            hips: form.hips || null,
            shoe_size: form.shoeSize || null,
            hair_color: form.hairColor || null,
            eye_color: form.eyeColor || null,
            skin_tone: form.skinTone,
            languages: form.languages || null,
            modeling_categories: modelingCategories.length > 0 ? modelingCategories : null,
            skills: form.skills || null,
            previous_campaigns: form.previousCampaigns || null,
            availability: form.availability || null,
            starting_rate: form.startingRate || null,
            profile_picture_url: uploadedProfilePhotoUrl || uploadedPhotoUrls[0] || null,
            instagram_handle: form.instagramHandle,
            followers_count: form.followersCount,
            tiktok_youtube: form.tiktokYoutube || null,
            experience: form.experience || null,
            image1_url: uploadedPhotoUrls[0] || "",
            image2_url: uploadedPhotoUrls[1] || null,
            image3_url: uploadedPhotoUrls[2] || null,
            image4_url: uploadedPhotoUrls[3] || null,
            image5_url: uploadedPhotoUrls[4] || null,
            image6_url: uploadedPhotoUrls[5] || null,
            video1_url: uploadedVideoUrls[0] || "",
            video2_url: uploadedVideoUrls[1] || null,
            video3_url: uploadedVideoUrls[2] || null,
            is_approved: false,
          };

          let { data: insertedInf, error: dbErr } = await supabase
            .from("influencer_partner_requests")
            .insert(payload)
            .select("id")
            .single();

          if (dbErr && dbErr.code === "42703") {
            // Fallback to base columns if migration not run
            const basePayload = {
              full_name: form.fullName,
              gender: form.gender,
              city: form.city,
              phone: form.phone,
              email: form.email,
              height: form.height,
              skin_tone: form.skinTone,
              instagram_handle: form.instagramHandle,
              followers_count: form.followersCount,
              tiktok_youtube: form.tiktokYoutube || null,
              experience: form.experience || null,
              image1_url: uploadedPhotoUrls[0] || "",
              image2_url: uploadedPhotoUrls[1] || null,
              image3_url: uploadedPhotoUrls[2] || null,
              image4_url: uploadedPhotoUrls[3] || null,
              image5_url: uploadedPhotoUrls[4] || null,
              image6_url: uploadedPhotoUrls[5] || null,
              video1_url: uploadedVideoUrls[0] || "",
              video2_url: uploadedVideoUrls[1] || null,
              video3_url: uploadedVideoUrls[2] || null,
              is_approved: false,
            };
            const fallbackDb = await supabase
              .from("influencer_partner_requests")
              .insert(basePayload)
              .select("id")
              .single();
            insertedInf = fallbackDb.data;
            dbErr = fallbackDb.error;
          }

          if (dbErr) {
            throw dbErr;
          }

          if (insertedInf?.id && brandsWorkedWith.length > 0) {
            const tagRows = brandsWorkedWith.map((brandNameTag) => ({
              influencer_id: insertedInf.id,
              brand_name: brandNameTag.trim(),
            }));
            await supabase.from("influencer_brands_worked_with").insert(tagRows);
          }

          setIsSuccess(true);
          if (onSuccess) onSuccess();
          return;
        }
      } catch (dbFallbackErr: any) {
        console.error("Direct Supabase insertion failed:", dbFallbackErr);
        throw new Error(
          apiErrorMessage ||
            dbFallbackErr?.message ||
            "Unable to save your application. Please check your internet connection and try again."
        );
      }

      if (apiErrorMessage) {
        setServerError(apiErrorMessage);
        return;
      }
    } catch (err: any) {
      console.error("Application submission error:", err);
      setServerError(
        err?.message ||
          "An unexpected error occurred while uploading media or submitting the form. Please try again."
      );
    } finally {
      setSubmitting(false);
      setUploadStatus(null);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setServerError(null);
    setUploadStatus(null);
    setErrors({});
    setForm({
      fullName: "",
      gender: "",
      city: "",
      country: "Pakistan",
      phone: "",
      email: "",
      age: "",
      height: "",
      weight: "",
      chestBust: "",
      waist: "",
      hips: "",
      shoeSize: "",
      hairColor: "",
      eyeColor: "",
      skinTone: "",
      languages: "",
      skills: "",
      previousCampaigns: "",
      availability: "Available for Projects",
      startingRate: "",
      instagramHandle: "",
      followersCount: "",
      tiktokYoutube: "",
      experience: "",
    });
    setProfilePhoto(null);
    setProfilePhotoPreview(null);
    setProfilePhotoProgress(0);
    setModelingCategories(["Fashion", "Commercial"]);
    setBrandsWorkedWith([]);
    setBrandTagInput("");
    setPhotos([null, null, null, null, null, null]);
    setPhotoPreviews([null, null, null, null, null, null]);
    setPhotoProgress([0, 0, 0, 0, 0, 0]);
    setVideos([null, null, null]);
    setVideoNames([null, null, null]);
    setVideoProgress([0, 0, 0]);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(15, 15, 26, 0.8)", zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div
          className="modal-content rounded-4 border-0 shadow-lg overflow-hidden"
          style={{ background: "#ffffff", color: "#0f0f1a" }}
        >
          {/* Header */}
          <div className="modal-header border-0 pb-0 px-4 pt-4 position-relative">
            <div>
              <span
                className="eyebrow text-uppercase fw-bold"
                style={{ color: "var(--purple)", fontSize: "13px" }}
              >
                Creator & Model Application
              </span>
              <h3 className="modal-title mt-1 fw-bold fs-3">
                Apply as Influencer / Model Partner
              </h3>
            </div>
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-4"
              onClick={resetAndClose}
              aria-label="Close"
              disabled={submitting}
            ></button>
          </div>

          <div className="modal-body p-4">
            {isSuccess ? (
              <div className="text-center py-5">
                <BsCheckCircleFill className="text-success display-1 mb-3" />
                <h3 className="fw-bold">
                  Thanks, we'll review and get back to you.
                </h3>
                <p className="text-muted max-w-md mx-auto">
                  Your portfolio and application details have been submitted
                  successfully. Our talent directors will get in touch with
                  approved candidates.
                </p>
                <button
                  onClick={resetAndClose}
                  className="btn btn-dark rounded-pill px-5 py-2 mt-3 fw-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {serverError && (
                  <div
                    className="alert alert-danger rounded-3 mb-4 d-flex align-items-center justify-content-between"
                    role="alert"
                  >
                    <div>
                      <strong>Submission Error:</strong> {serverError}
                    </div>
                    <button
                      type="button"
                      className="btn-close ms-3"
                      onClick={() => setServerError(null)}
                      aria-label="Dismiss error"
                    ></button>
                  </div>
                )}

                {/* Model Profile Headshot Banner */}
                <div className="card border-0 bg-light rounded-4 p-3 mb-4 shadow-sm">
                  <div className="d-flex flex-column flex-sm-row align-items-center gap-4">
                    <div className="position-relative" style={{ width: "115px", height: "115px", minWidth: "115px" }}>
                      <div
                        className={`w-100 h-100 rounded-circle overflow-hidden border border-3 shadow-sm bg-white d-flex align-items-center justify-content-center position-relative ${
                          errors.profilePhoto ? "border-danger" : "border-white"
                        }`}
                      >
                        {profilePhotoPreview ? (
                          <img
                            src={profilePhotoPreview}
                            alt="Model Profile"
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <BsPersonCircle className="text-secondary" style={{ fontSize: "70px" }} />
                        )}

                        {submitting && profilePhotoProgress > 0 && profilePhotoProgress < 100 && (
                          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 text-white">
                            <span className="small fw-bold">{profilePhotoProgress}%</span>
                          </div>
                        )}
                      </div>
                      <label
                        className="btn btn-sm rounded-circle position-absolute bottom-0 end-0 p-2 shadow text-white cursor-pointer"
                        style={{
                          background: "var(--purple)",
                          borderColor: "var(--purple)",
                          transform: "translate(4px, 4px)",
                          zIndex: 3,
                        }}
                        title="Upload Model Profile Picture"
                      >
                        <BsCamera className="fs-6" />
                        <input
                          type="file"
                          accept="image/*"
                          className="d-none"
                          disabled={submitting}
                          onChange={(e) =>
                            handleProfilePhotoChange(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    </div>

                    <div className="text-center text-sm-start flex-grow-1">
                      <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">
                        <h6 className="fw-bold mb-0 text-dark">
                          Model Profile Picture (Headshot) <span className="text-danger">*</span>
                        </h6>
                      </div>
                      <p className="text-muted small mb-2">
                        Upload a clear close-up face portrait / headshot. This will be prominently displayed on your model card and talent profile.
                      </p>
                      {profilePhoto ? (
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1 small">
                          ✓ {profilePhoto.name} selected
                        </span>
                      ) : (
                        <label className="btn btn-sm btn-outline-dark rounded-pill px-3 py-1 small cursor-pointer">
                          Choose Headshot
                          <input
                            type="file"
                            accept="image/*"
                            className="d-none"
                            disabled={submitting}
                            onChange={(e) =>
                              handleProfilePhotoChange(e.target.files?.[0] || null)
                            }
                          />
                        </label>
                      )}
                      {errors.profilePhoto && (
                        <div className="text-danger small mt-1 fw-medium">{errors.profilePhoto}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 1: Personal & Contact Information */}
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">
                  1. Personal & Contact Information
                </h5>
                <div className="row g-3 mb-4">
                  {/* Full Name */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-control rounded-3 py-2 ${errors.fullName ? "is-invalid" : ""}`}
                      placeholder="e.g. Ayesha Malik"
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      Gender <span className="text-danger">*</span>
                    </label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-select rounded-3 py-2 ${errors.gender ? "is-invalid" : ""}`}
                    >
                      <option value="">Select gender...</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-binary">Non-binary / Other</option>
                    </select>
                    {errors.gender && (
                      <div className="invalid-feedback">{errors.gender}</div>
                    )}
                  </div>

                  {/* Date of Birth / Age */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      Date of Birth / Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={form.age}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. 23 years or 2001-08-14"
                    />
                  </div>

                  {/* City */}
                  <div className="col-md-3">
                    <label className="form-label fw-semibold small">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-control rounded-3 py-2 ${errors.city ? "is-invalid" : ""}`}
                      placeholder="e.g. Lahore / Karachi"
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>

                  {/* Country */}
                  <div className="col-md-3">
                    <label className="form-label fw-semibold small">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="Pakistan"
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-3">
                    <label className="form-label fw-semibold small">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-control rounded-3 py-2 ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="+92 300 0000000"
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-3">
                    <label className="form-label fw-semibold small">
                      Email Address <span className="text-muted fw-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-control rounded-3 py-2 ${errors.email ? "is-invalid" : ""}`}
                      placeholder="ayesha@example.com (optional)"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Section 2: Model Measurements & Physical Appearance */}
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2 d-flex align-items-center gap-2">
                  <BsRulers className="text-purple" /> 2. Model Measurements & Physical Stats
                </h5>
                <div className="row g-3 mb-4">
                  {/* Height */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Height <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="height"
                      value={form.height}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-control rounded-3 py-2 ${errors.height ? "is-invalid" : ""}`}
                      placeholder='e.g. 5&#39;7" or 170cm'
                    />
                    {errors.height && (
                      <div className="invalid-feedback">{errors.height}</div>
                    )}
                  </div>

                  {/* Weight */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Weight
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={form.weight}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. 54 kg / 119 lbs"
                    />
                  </div>

                  {/* Chest / Bust */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Chest / Bust
                    </label>
                    <input
                      type="text"
                      name="chestBust"
                      value={form.chestBust}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder='e.g. 34B or 34"'
                    />
                  </div>

                  {/* Waist */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Waist
                    </label>
                    <input
                      type="text"
                      name="waist"
                      value={form.waist}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder='e.g. 26"'
                    />
                  </div>

                  {/* Hips */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Hips
                    </label>
                    <input
                      type="text"
                      name="hips"
                      value={form.hips}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder='e.g. 36"'
                    />
                  </div>

                  {/* Shoe Size */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Shoe Size
                    </label>
                    <input
                      type="text"
                      name="shoeSize"
                      value={form.shoeSize}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. 38 EU / 7 US"
                    />
                  </div>

                  {/* Hair Color */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Hair Color
                    </label>
                    <select
                      name="hairColor"
                      value={form.hairColor}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-select rounded-3 py-2"
                    >
                      <option value="">Select hair color...</option>
                      <option value="Black">Black</option>
                      <option value="Dark Brown">Dark Brown</option>
                      <option value="Medium Brown">Medium Brown</option>
                      <option value="Light Brown">Light Brown</option>
                      <option value="Blonde">Blonde</option>
                      <option value="Auburn / Red">Auburn / Red</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Eye Color */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Eye Color
                    </label>
                    <select
                      name="eyeColor"
                      value={form.eyeColor}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-select rounded-3 py-2"
                    >
                      <option value="">Select eye color...</option>
                      <option value="Dark Brown">Dark Brown</option>
                      <option value="Brown">Brown</option>
                      <option value="Hazel">Hazel</option>
                      <option value="Green">Green</option>
                      <option value="Blue">Blue</option>
                      <option value="Grey">Grey</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Skin Tone */}
                  <div className="col-md-3 col-sm-6">
                    <label className="form-label fw-semibold small">
                      Skin Tone <span className="text-danger">*</span>
                    </label>
                    <select
                      name="skinTone"
                      value={form.skinTone}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-select rounded-3 py-2 ${errors.skinTone ? "is-invalid" : ""}`}
                    >
                      <option value="">Select tone...</option>
                      <option value="Fair">Fair</option>
                      <option value="Wheatish">Wheatish</option>
                      <option value="Medium">Medium</option>
                      <option value="Dusky">Dusky</option>
                      <option value="Deep">Deep</option>
                    </select>
                    {errors.skinTone && (
                      <div className="invalid-feedback">{errors.skinTone}</div>
                    )}
                  </div>
                </div>

                {/* Section 3: Professional Modeling Profile & Categories */}
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2 d-flex align-items-center gap-2">
                  <BsStar className="text-purple" /> 3. Modeling Categories & Professional Profile
                </h5>
                <div className="row g-3 mb-4">
                  {/* Modeling Categories Pills */}
                  <div className="col-12">
                    <label className="form-label fw-semibold small d-block mb-1">
                      Modeling Categories (Click to select all that apply)
                    </label>
                    <div className="d-flex flex-wrap gap-2 pt-1">
                      {AVAILABLE_CATEGORIES.map((cat) => {
                        const isSelected = modelingCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            disabled={submitting}
                            className={`btn btn-sm rounded-pill px-3 py-1 fw-medium transition-all ${
                              isSelected
                                ? "btn-primary text-white shadow-sm"
                                : "btn-outline-secondary"
                            }`}
                            style={
                              isSelected
                                ? { background: "var(--purple)", borderColor: "var(--purple)" }
                                : {}
                            }
                          >
                            {isSelected ? `✓ ${cat}` : `+ ${cat}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      Languages Spoken
                    </label>
                    <input
                      type="text"
                      name="languages"
                      value={form.languages}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. English, Urdu, Punjabi"
                    />
                  </div>

                  {/* Skills */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      Special Skills
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={form.skills}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. Ramp Walk, Acting, Posing, Dancing"
                    />
                  </div>

                  {/* Availability */}
                  <div className="col-md-2">
                    <label className="form-label fw-semibold small">
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={form.availability}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-select rounded-3 py-2"
                    >
                      <option value="Available for Projects">Open for Projects</option>
                      <option value="Full-Time Available">Full-Time</option>
                      <option value="Part-Time Available">Part-Time</option>
                      <option value="Available for Travel">Available for Travel</option>
                      <option value="Weekends Only">Weekends Only</option>
                    </select>
                  </div>

                  {/* Starting Rate */}
                  <div className="col-md-2">
                    <label className="form-label fw-semibold small">
                      Starting Rate / Day
                    </label>
                    <input
                      type="text"
                      name="startingRate"
                      value={form.startingRate}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. PKR 30K or Quote"
                    />
                  </div>

                  {/* Previous Campaigns */}
                  <div className="col-12">
                    <label className="form-label fw-semibold small">
                      Previous Campaigns / Highlights
                    </label>
                    <input
                      type="text"
                      name="previousCampaigns"
                      value={form.previousCampaigns}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. Gul Ahmed Summer 2024, Sapphire Fest, Khaadi Campaign"
                    />
                  </div>
                </div>

                {/* Section 4: Socials & Collaborations */}
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">
                  4. Social Handles & Brand Collaborations
                </h5>
                <div className="row g-3 mb-4">
                  {/* Instagram Handle */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      Instagram Handle <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light rounded-start-3">
                        @
                      </span>
                      <input
                        type="text"
                        name="instagramHandle"
                        value={form.instagramHandle}
                        onChange={handleInputChange}
                        disabled={submitting}
                        className={`form-control rounded-end-3 py-2 ${errors.instagramHandle ? "is-invalid" : ""}`}
                        placeholder="username"
                      />
                    </div>
                    {errors.instagramHandle && (
                      <div className="text-danger small mt-1">
                        {errors.instagramHandle}
                      </div>
                    )}
                  </div>

                  {/* Followers Count */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      Followers Count <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="followersCount"
                      value={form.followersCount}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-control rounded-3 py-2 ${errors.followersCount ? "is-invalid" : ""}`}
                      placeholder="e.g. 45K or 120K"
                    />
                    {errors.followersCount && (
                      <div className="invalid-feedback">
                        {errors.followersCount}
                      </div>
                    )}
                  </div>

                  {/* TikTok / YouTube */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small">
                      TikTok / YouTube Links (Optional)
                    </label>
                    <input
                      type="text"
                      name="tiktokYoutube"
                      value={form.tiktokYoutube}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3 py-2"
                      placeholder="https://tiktok.com/@username"
                    />
                  </div>

                  {/* Brands Worked With (Multi-tag input) */}
                  <div className="col-12">
                    <label className="form-label fw-semibold small">
                      Brands Worked With
                    </label>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        value={brandTagInput}
                        disabled={submitting}
                        onChange={(e) => setBrandTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddBrandTag();
                          }
                        }}
                        className="form-control rounded-3"
                        placeholder="Type brand name (e.g. Sana Safinaz) and click Add..."
                      />
                      <button
                        type="button"
                        onClick={handleAddBrandTag}
                        disabled={submitting}
                        className="btn btn-outline-dark rounded-3 px-3 d-flex align-items-center gap-1"
                      >
                        <BsPlus className="fs-5" /> Add
                      </button>
                    </div>

                    {/* Chips Display */}
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {brandsWorkedWith.map((brand, idx) => (
                        <span
                          key={idx}
                          className="badge bg-light text-dark border rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2"
                        >
                          {brand}
                          {!submitting && (
                            <BsX
                              className="cursor-pointer text-danger fs-6"
                              onClick={() => handleRemoveBrandTag(idx)}
                            />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="col-12">
                    <label className="form-label fw-semibold small">
                      Experience / Bio
                    </label>
                    <textarea
                      name="experience"
                      rows={2}
                      value={form.experience}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="form-control rounded-3"
                      placeholder="Briefly describe your modeling experience, runway shows, editorial features, or brand collaborations..."
                    />
                  </div>
                </div>

                {/* Section 5: Portfolio Media */}
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">
                  5. Portfolio Media (Photos & Videos)
                </h5>

                {/* Photos Uploads (up to 6) */}
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <label className="form-label fw-semibold small mb-0">
                      Portfolio Photos (Up to 6 images, Photo 1 Required{" "}
                      <span className="text-danger">*</span>)
                    </label>
                    {errors.photo1 && (
                      <span className="text-danger small">{errors.photo1}</span>
                    )}
                  </div>

                  <div className="row g-3">
                    {photos.map((_, idx) => (
                      <div key={idx} className="col-6 col-sm-4 col-md-2">
                        <div
                          className={`border border-2 border-dashed rounded-3 p-2 text-center position-relative bg-light d-flex flex-column align-items-center justify-content-center overflow-hidden ${
                            idx === 0 && errors.photo1 ? "border-danger" : ""
                          }`}
                          style={{ height: "110px" }}
                        >
                          {photoPreviews[idx] ? (
                            <div className="w-100 h-100 position-relative">
                              <img
                                src={photoPreviews[idx]!}
                                alt={`Photo ${idx + 1}`}
                                className="w-100 h-100 rounded"
                                style={{ objectFit: "cover" }}
                              />
                              {!submitting && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-0"
                                  style={{
                                    width: "22px",
                                    height: "22px",
                                    lineHeight: "1",
                                  }}
                                  onClick={() => handlePhotoChange(idx, null)}
                                >
                                  &times;
                                </button>
                              )}
                              {submitting && (
                                <div
                                  className="position-absolute top-0 start-0 w-100 h-100 rounded d-flex flex-column align-items-center justify-content-center p-1"
                                  style={{
                                    backgroundColor: "rgba(15, 15, 26, 0.78)",
                                    color: "#fff",
                                    zIndex: 2,
                                  }}
                                >
                                  {photoProgress[idx] >= 100 ? (
                                    <span className="badge bg-success shadow-sm px-2 py-1 small d-flex align-items-center gap-1">
                                      <BsCheckCircleFill /> Ready
                                    </span>
                                  ) : (
                                    <>
                                      <div
                                        className="spinner-border text-light spinner-border-sm mb-1"
                                        role="status"
                                      ></div>
                                      <span
                                        className="extra-small fw-bold"
                                        style={{ fontSize: "11px" }}
                                      >
                                        {photoProgress[idx]}%
                                      </span>
                                      <div
                                        className="progress w-100 mt-1"
                                        style={{ height: "4px" }}
                                      >
                                        <div
                                          className="progress-bar bg-primary"
                                          style={{
                                            width: `${photoProgress[idx]}%`,
                                          }}
                                        ></div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <BsImage className="text-secondary fs-4 mb-1" />
                              <p className="mb-0 text-muted extra-small fw-medium">
                                {idx === 0 ? "Photo 1 *" : `Photo ${idx + 1}`}
                              </p>
                              <input
                                type="file"
                                accept="image/*"
                                disabled={submitting}
                                onChange={(e) =>
                                  handlePhotoChange(
                                    idx,
                                    e.target.files?.[0] || null
                                  )
                                }
                                className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videos Uploads (up to 3) */}
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <label className="form-label fw-semibold small mb-0">
                      Portfolio Videos (Up to 3 videos, Video 1 Required{" "}
                      <span className="text-danger">*</span>)
                    </label>
                    {errors.video1 && (
                      <span className="text-danger small">{errors.video1}</span>
                    )}
                  </div>

                  <div className="row g-3">
                    {videos.map((_, idx) => (
                      <div key={idx} className="col-12 col-md-4">
                        <div
                          className={`border border-2 border-dashed rounded-3 p-3 text-center position-relative bg-light ${
                            idx === 0 && errors.video1 ? "border-danger" : ""
                          }`}
                        >
                          {videoNames[idx] ? (
                            <div>
                              <div className="d-flex align-items-center justify-content-between">
                                <span className="small text-truncate me-2 fw-medium">
                                  🎬 {videoNames[idx]}
                                </span>
                                {!submitting && (
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger rounded-circle p-1"
                                    onClick={() => handleVideoChange(idx, null)}
                                  >
                                    <BsX size={18} />
                                  </button>
                                )}
                              </div>
                              {submitting && (
                                <div className="mt-2 text-start">
                                  <div className="d-flex justify-content-between text-muted extra-small mb-1">
                                    <span className="fw-semibold text-dark">
                                      {videoProgress[idx] >= 100
                                        ? "Upload ready"
                                        : "Uploading video..."}
                                    </span>
                                    <span className="fw-bold">
                                      {videoProgress[idx]}%
                                    </span>
                                  </div>
                                  <div
                                    className="progress"
                                    style={{ height: "6px" }}
                                  >
                                    <div
                                      className={`progress-bar ${
                                        videoProgress[idx] >= 100
                                          ? "bg-success"
                                          : "progress-bar-striped progress-bar-animated bg-primary"
                                      }`}
                                      role="progressbar"
                                      style={{ width: `${videoProgress[idx]}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <BsFilm className="text-secondary fs-4 mb-1" />
                              <p className="mb-0 text-muted small fw-medium">
                                {idx === 0
                                  ? "Upload Video 1 *"
                                  : `Upload Video ${idx + 1}`}
                              </p>
                              <input
                                type="file"
                                accept="video/*"
                                disabled={submitting}
                                onChange={(e) =>
                                  handleVideoChange(
                                    idx,
                                    e.target.files?.[0] || null
                                  )
                                }
                                className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4 pt-2 border-top flex-wrap gap-2">
                  <div>
                    {submitting && uploadStatus && (
                      <div className="text-muted small d-flex align-items-center gap-2">
                        <span
                          className="spinner-border spinner-border-sm text-primary"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="fw-medium">{uploadStatus}</span>
                      </div>
                    )}
                  </div>
                  <div className="d-flex gap-2 ms-auto">
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-pill px-4"
                      onClick={resetAndClose}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill px-5 fw-semibold"
                      style={{
                        background: "var(--purple)",
                        borderColor: "var(--purple)",
                      }}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
