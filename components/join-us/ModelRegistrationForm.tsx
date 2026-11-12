"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { uploadMediaWithFallback } from "@/lib/mediaUpload";
import {
  BsUpload,
  BsCheckCircleFill,
  BsX,
  BsPlus,
  BsArrowRight,
  BsPersonSquare,
  BsCameraFill,
  BsRulers,
  BsFilm,
  BsPlayCircle,
  BsLink45Deg,
} from "react-icons/bs";

export interface CustomModel {
  id: string;
  full_name: string;
  gender: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  age?: string;
  height: string;
  weight?: string;
  chest_bust?: string;
  waist?: string;
  hips?: string;
  shoe_size?: string;
  hair_color?: string;
  eye_color?: string;
  skin_tone: string;
  languages?: string;
  modeling_categories: string[];
  experience?: string;
  instagram_handle?: string;
  tiktok_youtube?: string;
  profile_picture_url: string;
  images: string[];
  videos: string[];
  brands_worked_with: string[];
  created_at: string;
}

const CATEGORY_OPTIONS = [
  "Beauty",
  "Fashion",
  "Food",
  "Lifestyle",
  "Fitness",
  "Other",
];

export default function ModelRegistrationForm() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    country: "Pakistan",
    phone: "",
    email: "",
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
    experience: "",
    instagramHandle: "",
    tiktokYoutube: "",
  });

  // Profile Picture state
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);

  // Modeling Categories multi-select
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Fashion",
    "Beauty",
  ]);

  // Multiple portfolio photos (up to 4)
  const [portfolioFiles, setPortfolioFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [portfolioPreviews, setPortfolioPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  // 3 Portfolio Videos state (File uploads and Video URL links)
  const [portfolioVideos, setPortfolioVideos] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [portfolioVideoPreviews, setPortfolioVideoPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [portfolioVideoUrls, setPortfolioVideoUrls] = useState<string[]>(["", "", ""]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState<number[]>([0, 0, 0]);
  const [photoProgress, setPhotoProgress] = useState<number[]>([0, 0, 0, 0]);
  const [profilePicProgress, setProfilePicProgress] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const toggleCategory = (cat: string) => {
    if (submitting) return;
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

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
        if (value && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Invalid email address.";
        return "";
      case "height":
        return !value || !value.trim() ? 'Height is required (e.g. 5\'8" or 172cm).' : "";
      case "skinTone":
        return !value ? "Skin tone selection is required." : "";
      case "profilePic":
        return !value ? "Profile picture is required." : "";
      case "video1":
        return !portfolioVideos[0] && !portfolioVideoUrls[0]?.trim()
          ? "At least one portfolio video file or reel link is required."
          : "";
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

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 25 * 1024 * 1024) {
      alert(`The selected profile picture "${file.name}" exceeds the 25MB limit.`);
      return;
    }
    setProfilePicFile(file);
    if (file) {
      setProfilePicPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, profilePic: "" }));
    } else {
      setProfilePicPreview(null);
    }
  };

  const handlePortfolioPhotoChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 25 * 1024 * 1024) {
      alert(`The selected photo "${file.name}" exceeds the 25MB limit.`);
      return;
    }
    const newFiles = [...portfolioFiles];
    const newPreviews = [...portfolioPreviews];
    newFiles[index] = file;
    if (file) {
      newPreviews[index] = URL.createObjectURL(file);
    } else {
      newPreviews[index] = null;
    }
    setPortfolioFiles(newFiles);
    setPortfolioPreviews(newPreviews);
  };

  const handlePortfolioVideoChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 50 * 1024 * 1024) {
      alert(
        `The selected video "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 50MB storage limit. Please select a video under 50MB.`
      );
      return;
    }
    const newFiles = [...portfolioVideos];
    const newPreviews = [...portfolioVideoPreviews];
    newFiles[index] = file;
    if (file) {
      newPreviews[index] = URL.createObjectURL(file);
      if (index === 0) {
        setErrors((prev) => ({ ...prev, video1: "" }));
      }
    } else {
      newPreviews[index] = null;
    }
    setPortfolioVideos(newFiles);
    setPortfolioVideoPreviews(newPreviews);
  };

  const handleVideoUrlChange = (index: number, url: string) => {
    const newUrls = [...portfolioVideoUrls];
    newUrls[index] = url;
    setPortfolioVideoUrls(newUrls);
    if (index === 0 && url.trim()) {
      setErrors((prev) => ({ ...prev, video1: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const newErrors: Record<string, string> = {
      fullName: validateField("fullName", form.fullName),
      gender: validateField("gender", form.gender),
      city: validateField("city", form.city),
      phone: validateField("phone", form.phone),
      email: validateField("email", form.email),
      height: validateField("height", form.height),
      skinTone: validateField("skinTone", form.skinTone),
      profilePic: validateField("profilePic", profilePicFile || portfolioFiles[0]),
      video1: validateField("video1", portfolioVideos[0]),
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((err) => !!err);
    if (hasError) return;

    setSubmitting(true);
    setUploadStatus("Uploading media files to cloud storage...");
    setVideoProgress([0, 0, 0]);
    setPhotoProgress([0, 0, 0, 0]);
    setProfilePicProgress(0);

    try {
      // 1. Upload Profile Picture to Supabase Storage
      let mainProfilePicUrl = "";
      if (profilePicFile) {
        setUploadStatus("Uploading model profile photo...");
        mainProfilePicUrl = await uploadMediaWithFallback({
          file: profilePicFile,
          prefix: "profiles",
          idx: 0,
          onProgress: (pct) => setProfilePicProgress(pct),
        });
      }

      // 2. Upload Portfolio Photos to Supabase Storage
      setUploadStatus("Uploading portfolio photos...");
      const portfolioPhotoUrls: string[] = [];
      for (let i = 0; i < portfolioFiles.length; i++) {
        const file = portfolioFiles[i];
        if (file) {
          const photoUrl = await uploadMediaWithFallback({
            file,
            prefix: "photos",
            idx: i,
            onProgress: (pct) => {
              setPhotoProgress((prev) => {
                const next = [...prev];
                next[i] = pct;
                return next;
              });
            },
          });
          portfolioPhotoUrls.push(photoUrl);
        }
      }

      if (!mainProfilePicUrl && portfolioPhotoUrls.length > 0) {
        mainProfilePicUrl = portfolioPhotoUrls[0];
      }

      if (!mainProfilePicUrl) {
        const initials = form.fullName.slice(0, 2).toUpperCase() || "MD";
        mainProfilePicUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="360" viewBox="0 0 300 360"><rect width="300" height="360" fill="%231a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%237b2ff7" font-family="sans-serif" font-size="64" font-weight="bold">${initials}</text></svg>`;
      }

      // 3. Upload Portfolio Videos to Supabase Storage (permanent public URLs, completely avoids blob URLs)
      setUploadStatus("Uploading portfolio videos...");
      const compiledVideoUrls: string[] = [];
      for (let i = 0; i < 3; i++) {
        const file = portfolioVideos[i];
        const pastedUrl = portfolioVideoUrls[i]?.trim();

        if (file) {
          setUploadStatus(`Uploading Video ${i + 1} (${file.name})...`);
          const uploadedVideoUrl = await uploadMediaWithFallback({
            file,
            prefix: "videos",
            idx: i,
            onProgress: (pct) => {
              setVideoProgress((prev) => {
                const next = [...prev];
                next[i] = pct;
                return next;
              });
            },
          });
          compiledVideoUrls.push(uploadedVideoUrl);
        } else if (pastedUrl && !pastedUrl.startsWith("blob:")) {
          compiledVideoUrls.push(pastedUrl);
        }
      }

      if (compiledVideoUrls.length === 0) {
        throw new Error(
          "Please upload at least one video file or provide a valid video URL."
        );
      }

      setUploadStatus("Saving model registration details...");

      // 4. Submit to backend API
      const res = await fetch("/api/partners/influencer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          modelingCategories: selectedCategories,
          experience: form.experience,
          profilePictureUrl: mainProfilePicUrl,
          instagramHandle:
            form.instagramHandle ||
            form.fullName.toLowerCase().replace(/\s+/g, "_"),
          followersCount: "10K+",
          tiktokYoutube: form.tiktokYoutube,
          photoUrls:
            portfolioPhotoUrls.length > 0
              ? portfolioPhotoUrls
              : [mainProfilePicUrl],
          videoUrls: compiledVideoUrls,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || `Server error (${res.status})`);
      }

      setSubmittedName(form.fullName);
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Model registration submission failed:", err);
      setServerError(
        err?.message ||
          "Failed to upload media or save your registration. Please check your network connection and try again."
      );
    } finally {
      setSubmitting(false);
      setUploadStatus(null);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setServerError(null);
    setUploadStatus(null);
    setForm({
      fullName: "",
      age: "",
      gender: "",
      city: "",
      country: "Pakistan",
      phone: "",
      email: "",
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
      experience: "",
      instagramHandle: "",
      tiktokYoutube: "",
    });
    setProfilePicFile(null);
    setProfilePicPreview(null);
    setPortfolioFiles([null, null, null, null]);
    setPortfolioPreviews([null, null, null, null]);
    setPortfolioVideos([null, null, null]);
    setPortfolioVideoPreviews([null, null, null]);
    setPortfolioVideoUrls(["", "", ""]);
    setVideoProgress([0, 0, 0]);
    setPhotoProgress([0, 0, 0, 0]);
    setProfilePicProgress(0);
    setErrors({});
  };

  if (isSuccess) {
    return (
      <div className="card border-0 rounded-4 shadow-lg p-5 text-center bg-white my-4 mx-auto max-w-2xl">
        <div className="mb-4">
          <BsCheckCircleFill className="display-1 text-success mb-3" />
          <h2 className="fw-bold">Registration Received!</h2>
          <p className="text-muted fs-5 mt-3">
            Thanks — your request has been received and is under review. Once approved, it will appear on our <strong>Model/Influencer Portfolio</strong> page.
          </p>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
          <Link
            href="/our-model"
            className="btn btn-lg rounded-pill px-5 py-3 text-white fw-bold shadow d-inline-flex align-items-center justify-content-center gap-2"
            style={{
              background: "linear-gradient(135deg, #7b2ff7 0%, #4f2998 100%)",
              border: "none",
            }}
          >
            View Model/Influencer Portfolio <BsArrowRight />
          </Link>
          <button
            onClick={resetForm}
            className="btn btn-lg btn-outline-secondary rounded-pill px-4 py-3 fw-semibold"
          >
            Register Another Model
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white">
      <div className="mb-4">
        <span
          className="eyebrow text-uppercase fw-bold d-block mb-1"
          style={{ color: "var(--purple)", letterSpacing: "1px", fontSize: "13px" }}
        >
          Model & Creator Network
        </span>
        <h2 className="fw-bold display-6 mb-2">Become Our Influencer / Model</h2>
        <p className="text-muted">
          Join Collabo's exclusive commercial model roster. Submit your measurements, portfolio photos, and video reels to get booked for top brand campaigns.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Section 1: Basic Info & Profile Picture */}
        <div className="border-bottom pb-4 mb-4">
          <h5 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
            <BsPersonSquare className="text-purple" /> 1. Basic Info & Profile Headshot
          </h5>

          {/* Profile Picture Upload Box */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Profile Headshot Picture <span className="text-danger">*</span>
            </label>
            <div className="border border-2 border-dashed rounded-4 p-3 text-center position-relative bg-light">
              {profilePicPreview ? (
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <img
                    src={profilePicPreview}
                    alt="Headshot preview"
                    style={{ height: "110px", width: "90px", objectFit: "cover" }}
                    className="rounded-3 border bg-white p-1 shadow-sm"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger rounded-circle p-2"
                    onClick={() => {
                      setProfilePicFile(null);
                      setProfilePicPreview(null);
                    }}
                  >
                    <BsX size={20} />
                  </button>
                </div>
              ) : (
                <div>
                  <BsUpload className="fs-3 text-muted mb-2" />
                  <p className="mb-1 text-dark fw-semibold small">
                    Click to upload main profile headshot (PNG, JPG)
                  </p>
                  <p className="text-muted extra-small mb-0">
                    High quality portrait image recommended.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            {errors.profilePic && (
              <div className="text-danger small mt-1">{errors.profilePic}</div>
            )}
          </div>

          <div className="row g-3">
            {/* Full Name */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2.5 ${errors.fullName ? "is-invalid" : ""}`}
                placeholder="e.g. Ayesha Khan"
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>

            {/* Age */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Age</label>
              <input
                type="text"
                name="age"
                value={form.age}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2.5"
                placeholder="e.g. 23"
              />
            </div>

            {/* Gender */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Gender <span className="text-danger">*</span>
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleInputChange}
                className={`form-select rounded-3 py-2.5 ${errors.gender ? "is-invalid" : ""}`}
              >
                <option value="">Select gender...</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender}</div>
              )}
            </div>

            {/* City */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                City <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2.5 ${errors.city ? "is-invalid" : ""}`}
                placeholder="e.g. Karachi / Lahore / Islamabad"
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>

            {/* Country */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Country</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2.5"
                placeholder="Pakistan"
              />
            </div>

            {/* Phone Number */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2.5 ${errors.phone ? "is-invalid" : ""}`}
                placeholder="0315 8053198"
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>

            {/* Email */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2.5 ${errors.email ? "is-invalid" : ""}`}
                placeholder="model@gmail.com"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Physical Measurements & Stats */}
        <div className="border-bottom pb-4 mb-4">
          <h5 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
            <BsRulers className="text-purple" /> 2. Model Physical Stats & Measurements
          </h5>
          <div className="row g-3">
            {/* Height */}
            <div className="col-6 col-md-3">
              <label className="form-label fw-semibold">
                Height <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="height"
                value={form.height}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2 ${errors.height ? "is-invalid" : ""}`}
                placeholder='e.g. 5&#39;8" (173cm)'
              />
              {errors.height && (
                <div className="invalid-feedback">{errors.height}</div>
              )}
            </div>

            {/* Weight */}
            <div className="col-6 col-md-3">
              <label className="form-label fw-semibold">Weight</label>
              <input
                type="text"
                name="weight"
                value={form.weight}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2"
                placeholder="e.g. 55 kg"
              />
            </div>

            {/* Chest / Bust */}
            <div className="col-6 col-md-3">
              <label className="form-label fw-semibold">Chest / Bust</label>
              <input
                type="text"
                name="chestBust"
                value={form.chestBust}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2"
                placeholder='e.g. 34"'
              />
            </div>

            {/* Waist */}
            <div className="col-6 col-md-3">
              <label className="form-label fw-semibold">Waist</label>
              <input
                type="text"
                name="waist"
                value={form.waist}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2"
                placeholder='e.g. 26"'
              />
            </div>

            {/* Hips */}
            <div className="col-6 col-md-3">
              <label className="form-label fw-semibold">Hips</label>
              <input
                type="text"
                name="hips"
                value={form.hips}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2"
                placeholder='e.g. 36"'
              />
            </div>

            {/* Shoe Size */}
            <div className="col-6 col-md-3">
              <label className="form-label fw-semibold">Shoe Size</label>
              <input
                type="text"
                name="shoeSize"
                value={form.shoeSize}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2"
                placeholder="e.g. 38 EU / 7 US"
              />
            </div>

            {/* Hair Color */}
            <div className="col-6 col-md-3">
              <label className="form-label fw-semibold">Hair Color</label>
              <input
                type="text"
                name="hairColor"
                value={form.hairColor}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2"
                placeholder="Dark Brown / Black"
              />
            </div>

            {/* Eye Color */}
            <div className="col-6 col-md-3">
              <label className="form-label fw-semibold">Eye Color</label>
              <input
                type="text"
                name="eyeColor"
                value={form.eyeColor}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2"
                placeholder="Brown / Hazel"
              />
            </div>

            {/* Skin Tone */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Skin Tone <span className="text-danger">*</span>
              </label>
              <select
                name="skinTone"
                value={form.skinTone}
                onChange={handleInputChange}
                className={`form-select rounded-3 py-2 ${errors.skinTone ? "is-invalid" : ""}`}
              >
                <option value="">Select skin tone...</option>
                <option value="Fair">Fair</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Olive">Olive</option>
                <option value="Tan">Tan</option>
                <option value="Deep">Deep</option>
              </select>
              {errors.skinTone && (
                <div className="invalid-feedback">{errors.skinTone}</div>
              )}
            </div>

            {/* Languages */}
            <div className="col-md-8">
              <label className="form-label fw-semibold">Languages Spoken</label>
              <input
                type="text"
                name="languages"
                value={form.languages}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2"
                placeholder="e.g. English, Urdu, Punjabi"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Categories & Social Media */}
        <div className="border-bottom pb-4 mb-4">
          <h5 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
            <BsCameraFill className="text-purple" /> 3. Categories & Social Presence
          </h5>

          {/* Modeling Categories */}
          <div className="mb-4">
            <label className="form-label fw-semibold d-block">
              Modeling & Content Categories
            </label>
            <div className="d-flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`btn btn-sm rounded-pill px-3 py-2 transition-all ${
                      isSelected
                        ? "btn-dark text-white fw-bold shadow-sm"
                        : "btn-outline-secondary"
                    }`}
                  >
                    {isSelected ? `✓ ${cat}` : `+ ${cat}`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="row g-3">
            {/* Instagram Handle */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Instagram Profile Link / Handle</label>
              <input
                type="text"
                name="instagramHandle"
                value={form.instagramHandle}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2.5"
                placeholder="e.g. @ayeshakhan or instagram.com/username"
              />
            </div>

            {/* TikTok / YouTube */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">TikTok / YouTube Links (Optional)</label>
              <input
                type="text"
                name="tiktokYoutube"
                value={form.tiktokYoutube}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2.5"
                placeholder="e.g. tiktok.com/@username"
              />
            </div>

            {/* Experience / Bio */}
            <div className="col-12">
              <label className="form-label fw-semibold">Experience / Bio</label>
              <textarea
                name="experience"
                rows={3}
                value={form.experience}
                onChange={handleInputChange}
                className="form-control rounded-3"
                placeholder="Briefly describe your modeling experience, major brand shoots, or acting background..."
              />
            </div>
          </div>
        </div>

        {/* Section 4: Model Portfolio Photos Upload */}
        <div className="border-bottom pb-4 mb-4">
          <h5 className="fw-bold mb-2 text-dark d-flex align-items-center gap-2">
            <BsUpload className="text-purple" /> 4. Model Portfolio Photos
          </h5>
          <p className="text-muted small mb-3">
            Upload portfolio photos / editorial shoots (PNG or JPG).
          </p>

          <div className="row g-3">
            {portfolioPreviews.map((preview, idx) => (
              <div key={idx} className="col-6 col-md-3">
                <div
                  className="border border-2 border-dashed rounded-4 p-2 text-center position-relative bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "160px" }}
                >
                  {preview ? (
                    <div className="w-100 h-100 position-relative">
                      <img
                        src={preview}
                        alt={`Portfolio shoot ${idx + 1}`}
                        className="w-100 h-100 rounded-3"
                        style={{ objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-1"
                        onClick={() => {
                          const newFiles = [...portfolioFiles];
                          const newPreviews = [...portfolioPreviews];
                          newFiles[idx] = null;
                          newPreviews[idx] = null;
                          setPortfolioFiles(newFiles);
                          setPortfolioPreviews(newPreviews);
                        }}
                      >
                        <BsX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <BsPlus className="fs-1 text-muted" />
                      <span className="d-block extra-small text-muted fw-semibold">
                        Photo {idx + 1}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePortfolioPhotoChange(idx, e)}
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Model Portfolio Videos (3 Videos) */}
        <div className="mb-4">
          <h5 className="fw-bold mb-2 text-dark d-flex align-items-center gap-2">
            <BsFilm className="text-purple" /> 5. Model Portfolio Videos (3 Videos)
          </h5>
          <p className="text-muted small mb-3">
            Upload reel/walkthrough video files (MP4/WebM) or paste Reel, TikTok, or YouTube Shorts links.
          </p>

          <div className="row g-3">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className="card h-100 border rounded-4 p-3 bg-light position-relative shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold small text-dark d-flex align-items-center gap-1">
                      <BsPlayCircle className="text-purple" /> Video {idx + 1}
                    </span>
                    {(portfolioVideoPreviews[idx] || portfolioVideoUrls[idx]) && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger rounded-circle p-1"
                        onClick={() => {
                          const newFiles = [...portfolioVideos];
                          const newPreviews = [...portfolioVideoPreviews];
                          const newUrls = [...portfolioVideoUrls];
                          newFiles[idx] = null;
                          newPreviews[idx] = null;
                          newUrls[idx] = "";
                          setPortfolioVideos(newFiles);
                          setPortfolioVideoPreviews(newPreviews);
                          setPortfolioVideoUrls(newUrls);
                        }}
                      >
                        <BsX size={16} />
                      </button>
                    )}
                  </div>

                  {portfolioVideoPreviews[idx] ? (
                    <div>
                      <div
                        className="rounded-3 overflow-hidden bg-black mb-2 position-relative shadow-sm"
                        style={{ height: "200px" }}
                      >
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          src={portfolioVideoPreviews[idx]!}
                          className="w-100 h-100"
                          style={{ objectFit: "contain", display: "block" }}
                        >
                          <source src={portfolioVideoPreviews[idx]!} />
                          Your browser does not support HTML5 video preview.
                        </video>
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-1 mb-2">
                        <span
                          className="extra-small text-truncate text-muted fw-semibold"
                          style={{ maxWidth: "80%" }}
                          title={portfolioVideos[idx]?.name || `Video ${idx + 1}`}
                        >
                          🎬 {portfolioVideos[idx]?.name || `Video ${idx + 1}`}{" "}
                          {portfolioVideos[idx]?.size
                            ? `(${(portfolioVideos[idx]!.size / (1024 * 1024)).toFixed(1)} MB)`
                            : ""}
                        </span>
                        {!submitting && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-circle p-1"
                            title="Remove video"
                            onClick={() => {
                              const newFiles = [...portfolioVideos];
                              const newPreviews = [...portfolioVideoPreviews];
                              newFiles[idx] = null;
                              newPreviews[idx] = null;
                              setPortfolioVideos(newFiles);
                              setPortfolioVideoPreviews(newPreviews);
                            }}
                          >
                            <BsX size={16} />
                          </button>
                        )}
                      </div>
                      {submitting && (
                        <div className="mt-1 mb-2">
                          <div className="d-flex justify-content-between text-muted extra-small mb-1">
                            <span className="fw-semibold text-dark">
                              {videoProgress[idx] >= 100
                                ? "Upload ready"
                                : "Uploading video..."}
                            </span>
                            <span className="fw-bold">{videoProgress[idx]}%</span>
                          </div>
                          <div className="progress" style={{ height: "5px" }}>
                            <div
                              className={`progress-bar ${
                                videoProgress[idx] >= 100
                                  ? "bg-success"
                                  : "progress-bar-striped progress-bar-animated bg-primary"
                              }`}
                              style={{ width: `${videoProgress[idx]}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border border-2 border-dashed rounded-3 p-3 text-center position-relative bg-white mb-2">
                      <BsFilm className="fs-3 text-secondary mb-1" />
                      <p className="mb-0 text-muted extra-small fw-semibold">
                        Click to upload Video {idx + 1} (MP4 / WebM)
                      </p>
                      <input
                        type="file"
                        accept="video/*"
                        disabled={submitting}
                        onChange={(e) => handlePortfolioVideoChange(idx, e)}
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                      />
                    </div>
                  )}

                  <div className="mt-1">
                    <label className="form-label extra-small text-muted fw-semibold mb-1">
                      <BsLink45Deg /> Or paste Video / Reel Link:
                    </label>
                    <input
                      type="url"
                      value={portfolioVideoUrls[idx]}
                      disabled={submitting}
                      onChange={(e) => handleVideoUrlChange(idx, e.target.value)}
                      className="form-control form-control-sm rounded-3"
                      placeholder="https://instagram.com/reel/... or https://..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.video1 && (
            <div className="text-danger small mt-2 fw-medium">
              {errors.video1}
            </div>
          )}
        </div>

        {/* Server error banner */}
        {serverError && (
          <div className="alert alert-danger rounded-4 p-3 mb-3 d-flex align-items-center justify-content-between shadow-sm">
            <span className="small fw-medium">{serverError}</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setServerError(null)}
            ></button>
          </div>
        )}

        {/* Live Upload Status */}
        {submitting && uploadStatus && (
          <div className="p-3 mb-3 rounded-4 bg-light border d-flex align-items-center gap-3">
            <div className="spinner-border spinner-border-sm text-primary" role="status" />
            <span className="small fw-semibold text-dark">{uploadStatus}</span>
          </div>
        )}

        {/* Submit button */}
        <div className="d-flex justify-content-end mt-4 pt-3 border-top">
          <button
            type="submit"
            className="w-100 btn btn-lg rounded-pill px-5 py-3 text-white fw-bold shadow"
            style={{
              background: "linear-gradient(135deg, #7b2ff7 0%, #4f2998 100%)",
              border: "none",
            }}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                {uploadStatus || "Registering Model..."}
              </>
            ) : (
              "Submit Model Registration"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
