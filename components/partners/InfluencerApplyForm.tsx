"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  BsUpload,
  BsCheckCircleFill,
  BsX,
  BsPlus,
  BsFilm,
  BsImage,
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
  phone: string;
  email: string;
  height: string;
  skinTone: string;
  instagramHandle: string;
  followersCount: string;
  tiktokYoutube: string;
  experience: string;
}

interface FormErrors {
  fullName?: string;
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

export default function InfluencerApplyForm({
  isOpen,
  onClose,
  onSuccess,
}: InfluencerApplyFormProps) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    gender: "",
    city: "",
    phone: "",
    email: "",
    height: "",
    skinTone: "",
    instagramHandle: "",
    followersCount: "",
    tiktokYoutube: "",
    experience: "",
  });

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

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "fullName":
        return !value || !value.trim() ? "Full name is required." : "";
      case "gender":
        return !value ? "Gender selection is required." : "";
      case "city":
        return !value || !value.trim() ? "City is required." : "";
      case "phone":
        return !value || !value.trim() ? "Phone number is required." : "";
      case "email":
        if (!value || !value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Invalid email address.";
        return "";
      case "height":
        return !value || !value.trim() ? 'Height is required (e.g. 5\'7").' : "";
      case "skinTone":
        return !value ? "Skin tone selection is required." : "";
      case "instagramHandle":
        return !value || !value.trim() ? "Instagram handle is required." : "";
      case "followersCount":
        return !value || !value.trim() ? "Followers count is required." : "";
      case "photo1":
        return !value ? "First photo (Photo 1) is required." : "";
      case "video1":
        return !value ? "First video (Video 1) is required." : "";
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
    setUploadStatus("Uploading portfolio media to storage...");
    setPhotoProgress([0, 0, 0, 0, 0, 0]);
    setVideoProgress([0, 0, 0]);

    try {
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
        prefix: "photos" | "videos",
        idx: number,
        onProgress: (pct: number) => void
      ): Promise<string> => {
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const targetPath = `influencers/${prefix}/${Date.now()}_${prefix[0]}${idx + 1}_${sanitizedFileName}`;

        // 1. Direct upload to Supabase Storage bucket (partner-uploads)
        // This completely bypasses Vercel 4.5MB serverless limits and works consistently on live & local
        const supabaseUrl =
          (process.env.NEXT_PUBLIC_SUPABASE_URL ||
            "https://degpqeykfphdclzxgqkd.supabase.co").replace(/\/$/, "");
        const supabaseAnonKey =
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZ3BxZXlrZnBoZGNsenhncWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NDMyMDcsImV4cCI6MjEwNTExOTIwN30.uOMjxRXRwvpGqG84O38nLzGL3yAS3sWAwHWxc1J4g-U";

        if (supabaseUrl && supabaseAnonKey) {
          try {
            const url = await new Promise<string>((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              const uploadEndpoint = `${supabaseUrl}/storage/v1/object/partner-uploads/${targetPath}`;
              xhr.open("POST", uploadEndpoint);
              xhr.setRequestHeader("apikey", supabaseAnonKey);
              xhr.setRequestHeader("Authorization", `Bearer ${supabaseAnonKey}`);
              xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
              xhr.setRequestHeader("x-upsert", "true");
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

              xhr.send(file);
            });

            return url;
          } catch (supaErr: any) {
            console.warn(
              `Supabase direct storage upload failed (${supaErr?.message || "Storage error"}), trying local fallback.`
            );
          }
        }

        // 2. Fallback to /api/upload/local (for offline development)
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
        } catch (fallbackErr: any) {
          throw new Error(
            `Failed to upload ${prefix === "photos" ? "Photo" : "Video"} ${idx + 1} (${file.name}): ${
              fallbackErr?.message || "Upload failed"
            }`
          );
        }
      };

      // 1. Upload photos in parallel
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

      // 2. Upload videos sequentially to maintain dedicated connection bandwidth
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

      // Submit application with public Blob URLs as a lightweight JSON payload
      const res = await fetch("/api/partners/influencer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          gender: form.gender,
          city: form.city,
          phone: form.phone,
          email: form.email,
          height: form.height,
          skinTone: form.skinTone,
          instagramHandle: form.instagramHandle,
          followersCount: form.followersCount,
          tiktokYoutube: form.tiktokYoutube,
          experience: form.experience,
          brandsWorkedWith,
          photoUrls: uploadedPhotoUrls,
          videoUrls: uploadedVideoUrls,
        }),
      });

      if (!res.ok) {
        let errorMsg = `Server error (${res.status}${res.statusText ? `: ${res.statusText}` : ""})`;
        try {
          const errorData = await res.json();
          if (errorData?.error) {
            errorMsg = errorData.error;
          }
        } catch {
          const rawText = await res.text();
          if (rawText && rawText.length < 300) {
            errorMsg = rawText;
          }
        }
        setServerError(errorMsg);
        return;
      }

      const data = await res.json();

      if (data?.error) {
        setServerError(data.error);
        return;
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
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
      phone: "",
      email: "",
      height: "",
      skinTone: "",
      instagramHandle: "",
      followersCount: "",
      tiktokYoutube: "",
      experience: "",
    });
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

                {/* Personal Information */}
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">
                  1. Personal Information
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
                    </select>
                    {errors.gender && (
                      <div className="invalid-feedback">{errors.gender}</div>
                    )}
                  </div>

                  {/* City */}
                  <div className="col-md-4">
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

                  {/* Phone */}
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className={`form-control rounded-3 py-2 ${errors.email ? "is-invalid" : ""}`}
                      placeholder="ayesha@example.com"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Attributes & Social */}
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">
                  2. Physical Stats & Socials
                </h5>
                <div className="row g-3 mb-4">
                  {/* Height */}
                  <div className="col-md-3">
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

                  {/* Skin Tone */}
                  <div className="col-md-3">
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

                  {/* Instagram Handle */}
                  <div className="col-md-3">
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
                        placeholder="handle"
                      />
                    </div>
                    {errors.instagramHandle && (
                      <div className="text-danger small mt-1">
                        {errors.instagramHandle}
                      </div>
                    )}
                  </div>

                  {/* Followers Count */}
                  <div className="col-md-3">
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
                      placeholder="e.g. 45K"
                    />
                    {errors.followersCount && (
                      <div className="invalid-feedback">
                        {errors.followersCount}
                      </div>
                    )}
                  </div>

                  {/* TikTok / YouTube */}
                  <div className="col-md-6">
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
                      placeholder="https://tiktok.com/@username or YouTube link"
                    />
                  </div>

                  {/* Brands Worked With (Multi-tag input) */}
                  <div className="col-md-6">
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
                        placeholder="Type brand name & click Add..."
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
                      placeholder="Briefly describe your modeling/influencer campaigns, commercial shoots, or brand ambassador roles..."
                    />
                  </div>
                </div>

                {/* Photos & Videos Portfolio */}
                <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">
                  3. Portfolio Media
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
