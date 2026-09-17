"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { BsUpload, BsCheckCircleFill, BsX } from "react-icons/bs";

interface BrandApplyFormProps {
  isOpen: boolean;
  onClose: () => void;
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
  logo?: string;
}

export default function BrandApplyForm({
  isOpen,
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

  if (!isOpen) return null;

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
      case "logo":
        return !value ? "Brand logo image is required." : "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error on change if fixed
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      setErrors((prev) => ({ ...prev, logo: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all required fields
    const newErrors: FormErrors = {
      brandName: validateField("brandName", form.brandName),
      contactPerson: validateField("contactPerson", form.contactPerson),
      email: validateField("email", form.email),
      phone: validateField("phone", form.phone),
      category: validateField("category", form.category),
      logo: validateField("logo", logoFile),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => !!err);
    if (hasError) return;

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("brandName", form.brandName);
      formData.append("contactPerson", form.contactPerson);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("website", form.website);
      formData.append("category", form.category);
      formData.append("message", form.message);
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const res = await fetch("/api/partners/brand", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setServerError(data.error || "Failed to submit brand request.");
      } else {
        setIsSuccess(true);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error(err);
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setServerError(null);
    setErrors({});
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
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(15, 15, 26, 0.8)", zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden" style={{ background: "#ffffff", color: "#0f0f1a" }}>
          
          {/* Header */}
          <div className="modal-header border-0 pb-0 px-4 pt-4 position-relative">
            <div>
              <span className="eyebrow text-uppercase fw-bold" style={{ color: "var(--purple)", fontSize: "13px" }}>
                Brand Partnership
              </span>
              <h3 className="modal-title mt-1 fw-bold fs-3">Apply as Brand Partner</h3>
            </div>
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-4"
              onClick={resetAndClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            {isSuccess ? (
              <div className="text-center py-5">
                <BsCheckCircleFill className="text-success display-1 mb-3" />
                <h3 className="fw-bold">Thanks, we'll be in touch.</h3>
                <p className="text-muted max-w-md mx-auto">
                  Your brand partner application has been received. Our team will review your pitch and get back to you shortly.
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
                  <div className="alert alert-danger rounded-3 mb-4" role="alert">
                    {serverError}
                  </div>
                )}

                <div className="row g-3">
                  {/* Brand Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">
                      Brand Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="brandName"
                      value={form.brandName}
                      onChange={handleInputChange}
                      className={`form-control rounded-3 py-2 ${errors.brandName ? "is-invalid" : ""}`}
                      placeholder="e.g. Acme Wear"
                    />
                    {errors.brandName && (
                      <div className="invalid-feedback">{errors.brandName}</div>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">
                      Contact Person <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={form.contactPerson}
                      onChange={handleInputChange}
                      className={`form-control rounded-3 py-2 ${errors.contactPerson ? "is-invalid" : ""}`}
                      placeholder="e.g. Sarah Khan"
                    />
                    {errors.contactPerson && (
                      <div className="invalid-feedback">{errors.contactPerson}</div>
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
                      className={`form-control rounded-3 py-2 ${errors.email ? "is-invalid" : ""}`}
                      placeholder="sarah@brand.com"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
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
                      className={`form-control rounded-3 py-2 ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="+92 300 1234567"
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  {/* Website */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">Website (Optional)</label>
                    <input
                      type="url"
                      name="website"
                      value={form.website}
                      onChange={handleInputChange}
                      className="form-control rounded-3 py-2"
                      placeholder="https://yourbrand.com"
                    />
                  </div>

                  {/* Category */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">
                      Category <span className="text-danger">*</span>
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className={`form-select rounded-3 py-2 ${errors.category ? "is-invalid" : ""}`}
                    >
                      <option value="">Select category...</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Food">Food</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>

                  {/* Logo Upload */}
                  <div className="col-12">
                    <label className="form-label fw-semibold small">
                      Brand Logo (Image) <span className="text-danger">*</span>
                    </label>
                    <div className="border border-2 border-dashed rounded-4 p-3 text-center position-relative bg-light">
                      {logoPreview ? (
                        <div className="d-flex align-items-center justify-content-center gap-3">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            style={{ maxHeight: "80px", maxWidth: "160px", objectFit: "contain" }}
                            className="rounded border bg-white p-1"
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-circle p-1"
                            onClick={() => {
                              setLogoFile(null);
                              setLogoPreview(null);
                              setErrors((prev) => ({ ...prev, logo: "Brand logo image is required." }));
                            }}
                          >
                            <BsX size={20} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <BsUpload className="fs-3 text-secondary mb-2" />
                          <p className="mb-1 text-muted small fw-medium">
                            Click to upload your brand logo (PNG, JPG, SVG)
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
                    {errors.logo && (
                      <div className="text-danger small mt-1">{errors.logo}</div>
                    )}
                  </div>

                  {/* Pitch / Message */}
                  <div className="col-12">
                    <label className="form-label fw-semibold small">Message / Pitch</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleInputChange}
                      className="form-control rounded-3"
                      placeholder="Tell us briefly about your brand goals and what type of creators you're looking to collaborate with..."
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
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
                    style={{ background: "var(--purple)", borderColor: "var(--purple)" }}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
