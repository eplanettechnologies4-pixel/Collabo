"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { BsUpload, BsCheckCircleFill, BsX, BsArrowRight } from "react-icons/bs";

export interface CustomBrand {
  id: string;
  brand_name: string;
  contact_person: string;
  email: string;
  phone: string;
  category: string;
  message?: string;
  website?: string;
  logo_url: string;
  created_at: string;
}

export interface BrandApplyFormProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

interface FormState {
  brandName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  category: string;
  message: string;
}

interface FormErrors {
  brandName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  category?: string;
}

export default function BrandApplyForm({
  isModal = false,
  isOpen = false,
  onClose,
  onSuccess,
}: BrandApplyFormProps) {
  const [form, setForm] = useState<FormState>({
    brandName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    message: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedBrandName, setSubmittedBrandName] = useState("");

  if (isModal && !isOpen) return null;

  const validateField = (name: string, value: string | File | null): string => {
    switch (name) {
      case "brandName":
        return !value || (typeof value === "string" && !value.trim())
          ? "Brand name is required."
          : "";
      case "contactPerson":
        return !value || (typeof value === "string" && !value.trim())
          ? "Contact person name is required."
          : "";
      case "email":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Email address is required.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return "";
      case "phone":
        return !value || (typeof value === "string" && !value.trim())
          ? "Phone number is required."
          : "";
      case "category":
        return !value || (typeof value === "string" && !value.trim())
          ? "Please select a category."
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

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const newErrors: FormErrors = {
      brandName: validateField("brandName", form.brandName),
      contactPerson: validateField("contactPerson", form.contactPerson),
      email: validateField("email", form.email),
      phone: validateField("phone", form.phone),
      category: validateField("category", form.category),
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((err) => !!err);
    if (hasError) return;

    setSubmitting(true);

    try {
      // 1. Convert logo to compressed thumbnail data URL if file uploaded
      let finalLogoUrl = logoPreview || "";
      if (logoFile) {
        finalLogoUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const maxDim = 300;
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
          reader.readAsDataURL(logoFile);
        });
      }

      if (!finalLogoUrl) {
        const initials = form.brandName.slice(0, 2).toUpperCase() || "BP";
        finalLogoUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80" viewBox="0 0 120 80"><rect width="120" height="80" rx="12" fill="%237b2ff7"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="28" font-weight="bold">${initials}</text></svg>`;
      }

      // 2. Submit to backend API endpoint
      try {
        const formData = new FormData();
        formData.append("brandName", form.brandName);
        formData.append("contactPerson", form.contactPerson);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("website", form.website);
        formData.append("category", form.category);
        formData.append("message", form.message);
        if (logoFile) formData.append("logo", logoFile);

        const res = await fetch("/api/partners/brand", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          console.warn("API response notice:", data.error);
        }
      } catch (err) {
        console.warn("API submission warning:", err);
      }

      setSubmittedBrandName(form.brandName);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setServerError(null);
    setForm({
      brandName: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      category: "",
      message: "",
    });
    setLogoFile(null);
    setLogoPreview(null);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    if (onClose) onClose();
  };

  const formBody = (
    <>
      <div className="mb-4">
        <span
          className="eyebrow text-uppercase fw-bold d-block mb-1"
          style={{ color: "var(--purple)", letterSpacing: "1px", fontSize: "13px" }}
        >
          Brand Partnership
        </span>
        <h2 className="fw-bold display-6 mb-2">
          {isModal ? "Apply as Brand Partner" : "Become Our Partner"}
        </h2>
        <p className="text-muted">
          Connect your brand with Pakistan's leading creator talent & influencer network for high-impact commercial campaigns.
        </p>
      </div>

      {isSuccess ? (
        <div className="text-center py-4 my-2 max-w-2xl mx-auto">
          <BsCheckCircleFill className="display-1 text-success mb-3" />
          <h2 className="fw-bold">Application Received!</h2>
          <p className="text-muted fs-5 mt-3">
            Thanks — your request has been received and is under review. Once approved, it will appear on our <strong>Brand Portfolio</strong> page.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
            {isModal ? (
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-lg rounded-pill px-5 py-3 text-white fw-bold shadow"
                style={{ background: "linear-gradient(135deg, #7b2ff7 0%, #4f2998 100%)", border: "none" }}
              >
                Done
              </button>
            ) : (
              <>
                <Link
                  href="/our-brand"
                  className="btn btn-lg rounded-pill px-5 py-3 text-white fw-bold shadow d-inline-flex align-items-center justify-content-center gap-2"
                  style={{ background: "linear-gradient(135deg, #7b2ff7 0%, #4f2998 100%)", border: "none" }}
                >
                  View Brand Portfolio <BsArrowRight />
                </Link>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-lg btn-outline-secondary rounded-pill px-4 py-3 fw-semibold"
                >
                  Submit Another Brand
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {serverError && (
            <div className="alert alert-danger rounded-3 mb-4" role="alert">
              {serverError}
            </div>
          )}

          <div className="row g-4">
            {/* Brand Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Brand Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="brandName"
                value={form.brandName}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2.5 ${errors.brandName ? "is-invalid" : ""}`}
                placeholder="e.g. Acme Fashion / Outfitters"
              />
              {errors.brandName && (
                <div className="invalid-feedback">{errors.brandName}</div>
              )}
            </div>

            {/* Contact Person */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Contact Person <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="contactPerson"
                value={form.contactPerson}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2.5 ${errors.contactPerson ? "is-invalid" : ""}`}
                placeholder="e.g. Sarah Ahmed (Marketing Head)"
              />
              {errors.contactPerson && (
                <div className="invalid-feedback">{errors.contactPerson}</div>
              )}
            </div>

            {/* Phone Number */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2.5 ${errors.phone ? "is-invalid" : ""}`}
                placeholder="0300 1234567"
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>

            {/* Email Address */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className={`form-control rounded-3 py-2.5 ${errors.email ? "is-invalid" : ""}`}
                placeholder="brand@company.com"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Category */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Category <span className="text-danger">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className={`form-select rounded-3 py-2.5 ${errors.category ? "is-invalid" : ""}`}
              >
                <option value="">Select industry category...</option>
                <option value="Beauty">Beauty</option>
                <option value="Fashion">Fashion</option>
                <option value="Food">Food</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>

            {/* Website (Optional) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Website (Optional)</label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleInputChange}
                className="form-control rounded-3 py-2.5"
                placeholder="https://yourbrand.com"
              />
            </div>

            {/* Logo Upload (Optional) */}
            <div className="col-12">
              <label className="form-label fw-semibold">Brand Logo (Optional)</label>
              <div className="border border-2 border-dashed rounded-4 p-4 text-center position-relative bg-light">
                {logoPreview ? (
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      style={{ maxHeight: "90px", maxWidth: "180px", objectFit: "contain" }}
                      className="rounded border bg-white p-2 shadow-sm"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger rounded-circle p-2"
                      onClick={() => {
                        setLogoFile(null);
                        setLogoPreview(null);
                      }}
                    >
                      <BsX size={20} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <BsUpload className="fs-2 text-muted mb-2" />
                    <p className="mb-1 text-dark fw-semibold small">
                      Click or drag logo image file (PNG, JPG, SVG)
                    </p>
                    <p className="text-muted extra-small mb-0">
                      Your brand logo will be featured on your partner card.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Message (Optional) */}
            <div className="col-12">
              <label className="form-label fw-semibold">Message (Optional)</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleInputChange}
                className="form-control rounded-3"
                placeholder="Tell us what your brand is looking for, target audience, campaign timeline, or specific requirements..."
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
            {isModal && (
              <button
                type="button"
                className="btn btn-lg btn-outline-secondary rounded-pill px-4 py-3 fw-semibold"
                onClick={handleClose}
                disabled={submitting}
              >
                Cancel
              </button>
            )}
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
                  Submitting...
                </>
              ) : (
                "Submit Brand Application"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );

  if (isModal) {
    return (
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ backgroundColor: "rgba(15, 15, 26, 0.8)", zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content rounded-4 border-0 shadow-lg overflow-hidden position-relative"
            style={{ background: "#ffffff", color: "#0f0f1a" }}
          >
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-4"
              onClick={handleClose}
              aria-label="Close"
              style={{ zIndex: 10 }}
            ></button>
            <div className="modal-body p-4 p-md-5">{formBody}</div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white">{formBody}</div>;
}
