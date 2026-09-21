"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const toggleCategory = (cat: string) => {
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
        if (!value || !value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Invalid email address.";
        return "";
      case "height":
        return !value || !value.trim() ? 'Height is required (e.g. 5\'8" or 172cm).' : "";
      case "skinTone":
        return !value ? "Skin tone selection is required." : "";
      case "profilePic":
        return !value ? "Profile picture is required." : "";
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
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, profilePic: "" }));
    }
  };

  const handlePortfolioPhotoChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
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
    const newFiles = [...portfolioVideos];
    const newPreviews = [...portfolioVideoPreviews];
    newFiles[index] = file;
    if (file) {
      newPreviews[index] = URL.createObjectURL(file);
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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      fullName: validateField("fullName", form.fullName),
      gender: validateField("gender", form.gender),
      city: validateField("city", form.city),
      phone: validateField("phone", form.phone),
      email: validateField("email", form.email),
      height: validateField("height", form.height),
      skinTone: validateField("skinTone", form.skinTone),
      profilePic: validateField("profilePic", profilePicFile || portfolioFiles[0]),
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((err) => !!err);
    if (hasError) return;

    setSubmitting(true);

    try {
      // Image compression helper
      const compressMedia = async (file: File, maxDim = 400): Promise<string> => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              let w = img.width;
              let h = img.height;
              if (w > h) {
                if (w > maxDim) {
                  h = Math.round((h * maxDim) / w);
                  w = maxDim;
                }
              } else {
                if (h > maxDim) {
                  w = Math.round((w * maxDim) / h);
                  h = maxDim;
                }
              }
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL("image/jpeg", 0.7));
              } else {
                resolve((e.target?.result as string) || "");
              }
            };
            img.onerror = () => resolve((e.target?.result as string) || "");
            img.src = (e.target?.result as string) || "";
          };
          reader.onerror = () => resolve("");
          reader.readAsDataURL(file);
        });
      };

      // 1. Process Profile Picture data URL
      let mainProfilePicUrl = profilePicPreview || "";
      if (profilePicFile) {
        mainProfilePicUrl = await compressMedia(profilePicFile, 400);
      }

      // Process Portfolio Photos data URLs
      const portfolioPhotoUrls: string[] = [];
      for (let i = 0; i < portfolioFiles.length; i++) {
        const file = portfolioFiles[i];
        if (file) {
          const dataUrl = await compressMedia(file, 500);
          portfolioPhotoUrls.push(dataUrl);
        } else if (portfolioPreviews[i]) {
          portfolioPhotoUrls.push(portfolioPreviews[i]!);
        }
      }

      if (!mainProfilePicUrl && portfolioPhotoUrls.length > 0) {
        mainProfilePicUrl = portfolioPhotoUrls[0];
      }

      if (!mainProfilePicUrl) {
        // SVG Avatar Fallback
        const initials = form.fullName.slice(0, 2).toUpperCase() || "MD";
        mainProfilePicUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="360" viewBox="0 0 300 360"><rect width="300" height="360" fill="%231a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%237b2ff7" font-family="sans-serif" font-size="64" font-weight="bold">${initials}</text></svg>`;
      }

      // 2. Process 3 Portfolio Videos (File uploads or pasted URLs)
      const compiledVideoUrls: string[] = [];
      for (let i = 0; i < 3; i++) {
        const file = portfolioVideos[i];
        const pastedUrl = portfolioVideoUrls[i]?.trim();
        if (file) {
          const videoDataUrl = portfolioVideoPreviews[i] || (await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve((e.target?.result as string) || "");
            reader.onerror = () => resolve("");
            reader.readAsDataURL(file);
          }));
          if (videoDataUrl) compiledVideoUrls.push(videoDataUrl);
        } else if (pastedUrl) {
          compiledVideoUrls.push(pastedUrl);
        }
      }

      // 3. Submit to backend API if available
      try {
        await fetch("/api/partners/influencer", {
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
            instagramHandle: form.instagramHandle,
            followersCount: "10K+",
            tiktokYoutube: form.tiktokYoutube,
            photoUrls: portfolioPhotoUrls.length > 0 ? portfolioPhotoUrls : [mainProfilePicUrl],
            videoUrls: compiledVideoUrls,
          }),
        });
      } catch (err) {
        console.warn("API submission non-fatal warning:", err);
      }

      setSubmittedName(form.fullName);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
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
                Email Address <span className="text-danger">*</span>
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
                    <div className="rounded-3 overflow-hidden bg-black mb-2" style={{ maxHeight: "160px" }}>
                      <video
                        controls
                        src={portfolioVideoPreviews[idx]!}
                        className="w-100 h-100"
                        style={{ maxHeight: "160px", objectFit: "contain" }}
                      />
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
                      onChange={(e) => handleVideoUrlChange(idx, e.target.value)}
                      className="form-control form-control-sm rounded-3"
                      placeholder="https://instagram.com/reel/..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="d-flex justify-content-end mt-4 pt-3 border-top">
          <button
            type="submit"
            className="btn btn-lg rounded-pill px-5 py-3 text-white fw-bold shadow"
            style={{
              background: "linear-gradient(135deg, #7b2ff7 0%, #4f2998 100%)",
              border: "none",
            }}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Registering Model...
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
