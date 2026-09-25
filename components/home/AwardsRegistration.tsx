"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./AwardsRegistration.module.css";
import {
  FiUser,
  FiAward,
  FiMic,
  FiShare2,
  FiBriefcase,
  FiCheckCircle,
  FiDollarSign,
  FiAlertCircle,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiStar,
  FiX,
} from "react-icons/fi";

const CREATOR_TYPES = [
  "Influencer",
  "UGC Creator",
  "TikTok Creator",
  "Instagram Creator",
  "YouTuber",
  "Blogger",
  "Vlogger",
  "Model",
  "Actor / Performer",
  "Podcaster",
  "Content Creator",
  "Other",
];

const CONTENT_NICHES = [
  "Fashion",
  "Beauty & Makeup",
  "Skincare",
  "Lifestyle",
  "Food",
  "Travel",
  "Fitness",
  "Technology",
  "Gaming",
  "Comedy",
  "Entertainment",
  "Education",
  "Business",
  "Parenting",
  "Automotive",
  "Sports",
  "Music",
  "Photography",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–2 years",
  "2–4 years",
  "4–6 years",
  "6+ years",
];

const FOLLOWER_RANGES = [
  "Under 5K",
  "5K–10K",
  "10K–50K",
  "50K–100K",
  "100K–500K",
  "500K–1M",
  "1M+",
];

const MONTHLY_REACH_RANGES = [
  "Under 10K",
  "10K–50K",
  "50K–100K",
  "100K–500K",
  "500K–1M",
  "1M–5M",
  "5M+",
];

const PAID_COLLAB_RANGES = ["1–5", "6–10", "11–25", "26–50", "50+"];

const COLLAB_TYPES = [
  "UGC Videos",
  "Instagram Reels",
  "Instagram Posts",
  "Stories",
  "TikTok Videos",
  "YouTube Videos",
  "Product Reviews",
  "Brand Ambassador",
  "Event Appearance",
  "Live Streaming",
  "Other",
];

const AWARD_CATEGORIES = [
  "Creator of the Year",
  "TikTok Creator of the Year",
  "Instagram Creator of the Year",
  "UGC Creator of the Year",
  "Rising Creator of the Year",
  "Fashion Creator of the Year",
  "Beauty Creator of the Year",
  "Lifestyle Creator of the Year",
  "Food Creator of the Year",
  "Entertainment Creator of the Year",
  "Comedy Creator of the Year",
  "Best New Creator",
  "Other",
];

const TALENT_TYPES = [
  "Singing",
  "Dancing",
  "Acting",
  "Comedy",
  "Stand-up Comedy",
  "Modeling",
  "Poetry / Spoken Word",
  "Public Speaking",
  "Instrument / Music",
  "Storytelling",
  "Content Creation",
  "Other",
];

const HEARD_ABOUT_OPTIONS = [
  "Instagram",
  "TikTok",
  "Facebook",
  "YouTube",
  "Google/Search",
  "Friend / Referral",
  "Event",
  "Other",
];

interface FormDataState {
  website_url_hp: string; // Honeypot field
  personal: {
    fullName: string;
    age: string;
    gender: string;
    city: string;
    whatsappNumber: string;
    email: string;
  };
  creatorProfile: {
    creatorTypes: string[];
    creatorTypeOther: string;
    contentNiches: string[];
    contentNicheOther: string;
    creatorExperience: string;
  };
  social: {
    instagram: string;
    tiktok: string;
    youtube: string;
    facebook: string;
    followerRange: string;
    monthlyReach: string;
    engagementRate: string;
  };
  brandExperience: {
    workedWithBrands: "Yes" | "No";
    brandsWorkedWith: string;
    paidCollaborations: string;
    collaborationTypes: string[];
    collaborationTypeOther: string;
    successfulCollaboration: string;
  };
  awards: {
    interestedInAwards: "Yes" | "No";
    awardCategory: string;
    awardCategoryOther: string;
    biggestAchievement: string;
    previousAward: "Yes" | "No";
    viralContentLinks: string;
    whyConsidered: string;
  };
  talent: {
    interestedInTalentHunt: "Yes" | "No";
    talentType: string;
    talentTypeOther: string;
    talentDescription: string;
    plannedPerformance: string;
    talentVideo: string;
    physicalAttendance: "Yes" | "No" | "Maybe";
    stageComfort: "Yes" | "No";
    promotionalContent: "Yes" | "No";
    futureBrandCampaigns: "Yes" | "No";
  };
  commercial: {
    startingRate: string;
    expectations: string;
    heardAboutCollabo: string;
    heardAboutOther: string;
    joinCreatorNetwork: "Yes" | "No";
    contactPermission: "Yes" | "No";
  };
  consent: {
    agreed: boolean;
  };
}

const INITIAL_FORM: FormDataState = {
  website_url_hp: "",
  personal: {
    fullName: "",
    age: "",
    gender: "",
    city: "",
    whatsappNumber: "",
    email: "",
  },
  creatorProfile: {
    creatorTypes: [],
    creatorTypeOther: "",
    contentNiches: [],
    contentNicheOther: "",
    creatorExperience: "",
  },
  social: {
    instagram: "",
    tiktok: "",
    youtube: "",
    facebook: "",
    followerRange: "",
    monthlyReach: "",
    engagementRate: "",
  },
  brandExperience: {
    workedWithBrands: "No",
    brandsWorkedWith: "",
    paidCollaborations: "",
    collaborationTypes: [],
    collaborationTypeOther: "",
    successfulCollaboration: "",
  },
  awards: {
    interestedInAwards: "No",
    awardCategory: "",
    awardCategoryOther: "",
    biggestAchievement: "",
    previousAward: "No",
    viralContentLinks: "",
    whyConsidered: "",
  },
  talent: {
    interestedInTalentHunt: "No",
    talentType: "",
    talentTypeOther: "",
    talentDescription: "",
    plannedPerformance: "",
    talentVideo: "",
    physicalAttendance: "Yes",
    stageComfort: "Yes",
    promotionalContent: "Yes",
    futureBrandCampaigns: "Yes",
  },
  commercial: {
    startingRate: "",
    expectations: "",
    heardAboutCollabo: "",
    heardAboutOther: "",
    joinCreatorNetwork: "Yes",
    contactPermission: "Yes",
  },
  consent: {
    agreed: false,
  },
};

const STEPS = [
  { id: 1, label: "Personal Info", icon: FiUser },
  { id: 2, label: "Creator Profile", icon: FiStar },
  { id: 3, label: "Socials & Reach", icon: FiShare2 },
  { id: 4, label: "Brand Experience", icon: FiBriefcase },
  { id: 5, label: "Awards 2026", icon: FiAward },
  { id: 6, label: "Talent Hunt", icon: FiMic },
  { id: 7, label: "Commercial", icon: FiDollarSign },
  { id: 8, label: "Consent & Submit", icon: FiCheckCircle },
];

export default function AwardsRegistration() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const scrollToFormTop = () => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Helper updates
  const updatePersonal = (field: keyof FormDataState["personal"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
    if (errors[`personal.${field}`]) {
      setErrors((prev) => ({ ...prev, [`personal.${field}`]: "" }));
    }
  };

  const updateCreatorProfile = (
    field: keyof FormDataState["creatorProfile"],
    value: unknown
  ) => {
    setFormData((prev) => ({
      ...prev,
      creatorProfile: { ...prev.creatorProfile, [field]: value },
    }));
    if (errors[`creatorProfile.${field}`]) {
      setErrors((prev) => ({ ...prev, [`creatorProfile.${field}`]: "" }));
    }
  };

  const toggleCreatorType = (type: string) => {
    setFormData((prev) => {
      const exists = prev.creatorProfile.creatorTypes.includes(type);
      const nextTypes = exists
        ? prev.creatorProfile.creatorTypes.filter((t) => t !== type)
        : [...prev.creatorProfile.creatorTypes, type];
      return {
        ...prev,
        creatorProfile: { ...prev.creatorProfile, creatorTypes: nextTypes },
      };
    });
    if (errors["creatorProfile.creatorTypes"]) {
      setErrors((prev) => ({ ...prev, "creatorProfile.creatorTypes": "" }));
    }
  };

  const toggleContentNiche = (niche: string) => {
    setFormData((prev) => {
      const exists = prev.creatorProfile.contentNiches.includes(niche);
      const nextNiches = exists
        ? prev.creatorProfile.contentNiches.filter((n) => n !== niche)
        : [...prev.creatorProfile.contentNiches, niche];
      return {
        ...prev,
        creatorProfile: { ...prev.creatorProfile, contentNiches: nextNiches },
      };
    });
    if (errors["creatorProfile.contentNiches"]) {
      setErrors((prev) => ({ ...prev, "creatorProfile.contentNiches": "" }));
    }
  };

  const updateSocial = (field: keyof FormDataState["social"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [field]: value },
    }));
    if (errors[`social.${field}`]) {
      setErrors((prev) => ({ ...prev, [`social.${field}`]: "" }));
    }
  };

  const updateBrandExperience = (
    field: keyof FormDataState["brandExperience"],
    value: unknown
  ) => {
    setFormData((prev) => ({
      ...prev,
      brandExperience: { ...prev.brandExperience, [field]: value },
    }));
    if (errors[`brandExperience.${field}`]) {
      setErrors((prev) => ({ ...prev, [`brandExperience.${field}`]: "" }));
    }
  };

  const toggleCollabType = (type: string) => {
    setFormData((prev) => {
      const exists = prev.brandExperience.collaborationTypes.includes(type);
      const nextTypes = exists
        ? prev.brandExperience.collaborationTypes.filter((c) => c !== type)
        : [...prev.brandExperience.collaborationTypes, type];
      return {
        ...prev,
        brandExperience: {
          ...prev.brandExperience,
          collaborationTypes: nextTypes,
        },
      };
    });
  };

  const updateAwards = (field: keyof FormDataState["awards"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      awards: { ...prev.awards, [field]: value },
    }));
    if (errors[`awards.${field}`]) {
      setErrors((prev) => ({ ...prev, [`awards.${field}`]: "" }));
    }
  };

  const updateTalent = (field: keyof FormDataState["talent"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      talent: { ...prev.talent, [field]: value },
    }));
    if (errors[`talent.${field}`]) {
      setErrors((prev) => ({ ...prev, [`talent.${field}`]: "" }));
    }
  };

  const updateCommercial = (
    field: keyof FormDataState["commercial"],
    value: unknown
  ) => {
    setFormData((prev) => ({
      ...prev,
      commercial: { ...prev.commercial, [field]: value },
    }));
    if (errors[`commercial.${field}`]) {
      setErrors((prev) => ({ ...prev, [`commercial.${field}`]: "" }));
    }
  };

  // Validation function per step
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.personal.fullName.trim()) {
        errs["personal.fullName"] = "Full name is required";
      }
      if (
        !formData.personal.age ||
        isNaN(Number(formData.personal.age)) ||
        Number(formData.personal.age) < 5 ||
        Number(formData.personal.age) > 120
      ) {
        errs["personal.age"] = "Please enter a valid age (e.g. 24)";
      }
      if (!formData.personal.gender) {
        errs["personal.gender"] = "Please select your gender";
      }
      if (!formData.personal.city.trim()) {
        errs["personal.city"] = "City is required";
      }
      if (!formData.personal.whatsappNumber.trim()) {
        errs["personal.whatsappNumber"] = "WhatsApp number is required";
      }
      if (
        !formData.personal.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personal.email.trim())
      ) {
        errs["personal.email"] = "Please enter a valid email address";
      }
    }

    if (step === 2) {
      if (formData.creatorProfile.creatorTypes.length === 0) {
        errs["creatorProfile.creatorTypes"] =
          "Please select at least one Creator Type";
      }
      if (
        formData.creatorProfile.creatorTypes.includes("Other") &&
        !formData.creatorProfile.creatorTypeOther.trim()
      ) {
        errs["creatorProfile.creatorTypeOther"] =
          "Please specify your creator type";
      }
      if (formData.creatorProfile.contentNiches.length === 0) {
        errs["creatorProfile.contentNiches"] =
          "Please select at least one Content Niche";
      }
      if (
        formData.creatorProfile.contentNiches.includes("Other") &&
        !formData.creatorProfile.contentNicheOther.trim()
      ) {
        errs["creatorProfile.contentNicheOther"] =
          "Please specify your content niche";
      }
      if (!formData.creatorProfile.creatorExperience) {
        errs["creatorProfile.creatorExperience"] =
          "Please select how long you have been creating content";
      }
    }

    if (step === 3) {
      if (!formData.social.followerRange) {
        errs["social.followerRange"] =
          "Please select your follower range across main platforms";
      }
      if (!formData.social.monthlyReach) {
        errs["social.monthlyReach"] =
          "Please select your average monthly reach/views";
      }
      // Validate URLs if provided
      const urlRegex = /^https?:\/\/.+/i;
      if (
        formData.social.instagram.trim() &&
        !urlRegex.test(formData.social.instagram.trim()) &&
        !formData.social.instagram.startsWith("@")
      ) {
        errs["social.instagram"] =
          "Enter a valid URL (https://...) or username (@handle)";
      }
      if (
        formData.social.tiktok.trim() &&
        !urlRegex.test(formData.social.tiktok.trim()) &&
        !formData.social.tiktok.startsWith("@")
      ) {
        errs["social.tiktok"] =
          "Enter a valid URL (https://...) or username (@handle)";
      }
      if (
        formData.social.youtube.trim() &&
        !urlRegex.test(formData.social.youtube.trim())
      ) {
        errs["social.youtube"] = "Enter a valid channel link (https://...)";
      }
      if (
        formData.social.facebook.trim() &&
        !urlRegex.test(formData.social.facebook.trim())
      ) {
        errs["social.facebook"] = "Enter a valid Facebook link (https://...)";
      }
    }

    if (step === 4) {
      if (formData.brandExperience.workedWithBrands === "Yes") {
        if (!formData.brandExperience.brandsWorkedWith.trim()) {
          errs["brandExperience.brandsWorkedWith"] =
            "Please list brands you have worked with";
        }
        if (!formData.brandExperience.paidCollaborations) {
          errs["brandExperience.paidCollaborations"] =
            "Please select how many paid collaborations you have completed";
        }
        if (formData.brandExperience.collaborationTypes.length === 0) {
          errs["brandExperience.collaborationTypes"] =
            "Please select at least one type of collaboration offered";
        }
        if (
          formData.brandExperience.collaborationTypes.includes("Other") &&
          !formData.brandExperience.collaborationTypeOther.trim()
        ) {
          errs["brandExperience.collaborationTypeOther"] =
            "Please specify collaboration type";
        }
        if (!formData.brandExperience.successfulCollaboration.trim()) {
          errs["brandExperience.successfulCollaboration"] =
            "Please tell us about your most successful brand collaboration";
        }
      }
    }

    if (step === 5) {
      if (formData.awards.interestedInAwards === "Yes") {
        if (!formData.awards.awardCategory) {
          errs["awards.awardCategory"] =
            "Please select an award category to be considered for";
        }
        if (
          formData.awards.awardCategory === "Other" &&
          !formData.awards.awardCategoryOther.trim()
        ) {
          errs["awards.awardCategoryOther"] = "Please specify award category";
        }
        if (!formData.awards.biggestAchievement.trim()) {
          errs["awards.biggestAchievement"] =
            "Please describe your biggest achievement as a creator";
        }
        if (!formData.awards.viralContentLinks.trim()) {
          errs["awards.viralContentLinks"] =
            "Please share links to your viral/best content";
        }
        if (!formData.awards.whyConsidered.trim()) {
          errs["awards.whyConsidered"] =
            "Please share why you should be considered for the awards";
        }
      }
    }

    if (step === 6) {
      if (formData.talent.interestedInTalentHunt === "Yes") {
        if (!formData.talent.talentType) {
          errs["talent.talentType"] = "Please select your talent";
        }
        if (
          formData.talent.talentType === "Other" &&
          !formData.talent.talentTypeOther.trim()
        ) {
          errs["talent.talentTypeOther"] = "Please specify your talent";
        }
        if (!formData.talent.talentDescription.trim()) {
          errs["talent.talentDescription"] =
            "Please tell us briefly about your talent";
        }
        if (!formData.talent.plannedPerformance.trim()) {
          errs["talent.plannedPerformance"] =
            "Please describe what you would perform";
        }
        if (
          !formData.talent.talentVideo.trim() ||
          !/^https?:\/\/.+/i.test(formData.talent.talentVideo.trim())
        ) {
          errs["talent.talentVideo"] =
            "Please provide a valid video link (YouTube, TikTok, Instagram, Drive)";
        }
      }
    }

    if (step === 7) {
      if (!formData.commercial.startingRate.trim()) {
        errs["commercial.startingRate"] =
          "Please indicate your starting rate (e.g. PKR 25,000)";
      }
      if (!formData.commercial.expectations.trim()) {
        errs["commercial.expectations"] =
          "Please let us know what you expect from Collabo";
      }
      if (!formData.commercial.heardAboutCollabo) {
        errs["commercial.heardAboutCollabo"] =
          "Please let us know how you heard about Collabo";
      }
      if (
        formData.commercial.heardAboutCollabo === "Other" &&
        !formData.commercial.heardAboutOther.trim()
      ) {
        errs["commercial.heardAboutOther"] = "Please specify";
      }
    }

    if (step === 8) {
      if (!formData.consent.agreed) {
        errs["consent.agreed"] =
          "You must agree to the Consent & Declaration to submit.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setSubmitError("");
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      scrollToFormTop();
    }
  };

  const handlePrev = () => {
    setSubmitError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    scrollToFormTop();
  };

  const handleStepClick = (stepId: number) => {
    // Only allow navigating to previous steps directly or next if current is valid
    if (stepId < currentStep) {
      setSubmitError("");
      setCurrentStep(stepId);
      scrollToFormTop();
    } else if (stepId === currentStep + 1) {
      handleNext();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(8)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/awards-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit registration. Please try again.");
      }

      setIsSuccess(true);
      scrollToFormTop();
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setIsSuccess(false);
    setSubmitError("");
    setCurrentStep(1);
    setIsModalOpen(false);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const progressPercentage = Math.round((currentStep / STEPS.length) * 100);

  return (
    <section ref={sectionRef} id="awards-talent-hunt-registration" className={styles.awardsSection}>
      <div className={`container ${styles.sectionInner}`}>
        {/* Section Header & Subheading */}
        <div className="text-center">
          <h2 className={styles.title}>
            COLLABO Influencers Awards &amp;<br /> Talent Hunt 2026
          </h2>

          <h3 className={styles.subheading} style={{ marginTop: "1rem" }}>
            Creator Registration &amp; Data Collection Form
          </h3>
        </div>

        {/* Banner with Overlay & Open Form Button */}
        <div className={styles.bannerContainer}>
          <div
            className={styles.bannerCard}
            onClick={() => setIsModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsModalOpen(true);
              }
            }}
            aria-label="Open Collabo Awards Registration Form"
          >
            <img
              src="/assets/awards-banner.jpg"
              alt="Collabo Influencers Awards & Talent Hunt 2026 - Where Creators Meet Brands"
              className={styles.bannerImage}
            />
            <div className={styles.bannerOverlay}>
              <div className={styles.bannerOverlayContent}>
                {/* <div className={styles.bannerPill}>
                  <FiAward size={14} />
                  <span>Official Registrations Open</span>
                </div> */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className={styles.bannerCtaBtn}
                  id="awards-registration-open-btn"
                >
                  <span>Register Now</span>
                  <div className={styles.btnIconWrap}>
                    <FiArrowRight size={18} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Popup with Form */}
        {mounted && isModalOpen && createPortal(
          <div
            className={styles.modalBackdrop}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalOpen(false);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Awards & Talent Hunt Registration Form"
          >
            <div
              className={styles.modalDialog}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close registration form"
              >
                <FiX size={20} />
              </button>

              <div ref={modalScrollRef} className={styles.modalScrollArea}>
                <div ref={formTopRef} className={styles.formCardModal}>
                  {isSuccess ? (
                    /* Success State */
                    <div className={styles.successCard}>
                      <div className={styles.successIcon}>
                        <FiCheck />
                      </div>

                      <h2 className={styles.successTitle}>
                        Registration Submitted Successfully!
                      </h2>

                      <p className={styles.successDesc}>
                        Thank you for registering with Collabo. Your profile has been successfully submitted and may be reviewed by the Collabo team for Influencer Awards, Talent Hunt, Brand Collaborations, Creator Campaigns, UGC Opportunities and Collabo Events.
                      </p>

                      <div className={styles.successPillsGrid}>
                        <div className={styles.successPillItem}>🏆 Influencer Awards</div>
                        <div className={styles.successPillItem}>🎤 Talent Hunt</div>
                        <div className={styles.successPillItem}>🤝 Brand Collaborations</div>
                        <div className={styles.successPillItem}>📱 Creator Campaigns</div>
                        <div className={styles.successPillItem}>🎬 UGC Opportunities</div>
                        <div className={styles.successPillItem}>🎉 Collabo Events</div>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className={styles.btnNext}
                          style={{ padding: "0.9rem 2.5rem", fontSize: "16px" }}
                        >
                          Back to Homepage
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Multi-Step Wizard */
                    <form onSubmit={handleSubmit} noValidate>
                      {/* Anti-spam honeypot */}
                      <input
                        type="text"
                        name="website_url_hp"
                        value={formData.website_url_hp}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            website_url_hp: e.target.value,
                          }))
                        }
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {/* Wizard Nav */}
                      <div className={styles.wizardNav}>
                        <div className={styles.progressBarTrack}>
                          <div
                            className={styles.progressBarFill}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>

                        <div className={styles.stepPillsList}>
                          {STEPS.map((s) => {
                            const isActive = s.id === currentStep;
                            const isCompleted = s.id < currentStep;
                            const StepIcon = s.icon;

                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => handleStepClick(s.id)}
                                className={`${styles.stepPill} ${isActive ? styles.stepPillActive : ""
                                  } ${isCompleted ? styles.stepPillCompleted : ""}`}
                                aria-current={isActive ? "step" : undefined}
                              >
                                <span className={styles.stepBadge}>
                                  {isCompleted ? <FiCheck size={12} /> : s.id}
                                </span>
                                <StepIcon size={14} />
                                <span className="d-none d-md-inline">{s.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className={styles.stepBody}>
                        {submitError && (
                          <div className={styles.alertError}>
                            <FiAlertCircle size={18} />
                            <span>{submitError}</span>
                          </div>
                        )}

                        {/* STEP 1: Personal Information */}
                        {currentStep === 1 && (
                          <div>
                            <div className={styles.stepTitleWrap}>
                              <div className={styles.stepNumberTag}>Step 1 of 8</div>
                              <h4 className={styles.stepMainTitle}>Personal Information</h4>
                              <p className={styles.stepDesc}>
                                Please enter your accurate contact and personal details so our team can reach you.
                              </p>
                            </div>

                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="fullName">
                                  Full Name <span className={styles.requiredMark}>*</span>
                                </label>
                                <input
                                  id="fullName"
                                  type="text"
                                  className={`${styles.inputField} ${errors["personal.fullName"] ? styles.inputError : ""
                                    }`}
                                  placeholder="e.g. Ayesha Khan"
                                  value={formData.personal.fullName}
                                  onChange={(e) => updatePersonal("fullName", e.target.value)}
                                />
                                {errors["personal.fullName"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["personal.fullName"]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="age">
                                  Age <span className={styles.requiredMark}>*</span>
                                </label>
                                <input
                                  id="age"
                                  type="number"
                                  min="10"
                                  max="100"
                                  className={`${styles.inputField} ${errors["personal.age"] ? styles.inputError : ""
                                    }`}
                                  placeholder="e.g. 24"
                                  value={formData.personal.age}
                                  onChange={(e) => updatePersonal("age", e.target.value)}
                                />
                                {errors["personal.age"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["personal.age"]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label}>
                                  Gender <span className={styles.requiredMark}>*</span>
                                </label>
                                <div className="d-flex flex-wrap gap-2">
                                  {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                                    <button
                                      key={g}
                                      type="button"
                                      onClick={() => updatePersonal("gender", g)}
                                      className={`${styles.optionCard} ${formData.personal.gender === g
                                        ? styles.optionCardSelected
                                        : ""
                                        }`}
                                      style={{ flex: "1 1 45%", padding: "10px 14px" }}
                                    >
                                      <span
                                        className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                      >
                                        {formData.personal.gender === g && (
                                          <div
                                            style={{
                                              width: 8,
                                              height: 8,
                                              borderRadius: "50%",
                                              background: "#fff",
                                            }}
                                          />
                                        )}
                                      </span>
                                      <span>{g}</span>
                                    </button>
                                  ))}
                                </div>
                                {errors["personal.gender"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["personal.gender"]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="city">
                                  City <span className={styles.requiredMark}>*</span>
                                </label>
                                <input
                                  id="city"
                                  type="text"
                                  className={`${styles.inputField} ${errors["personal.city"] ? styles.inputError : ""
                                    }`}
                                  placeholder="e.g. Karachi, Lahore, Islamabad"
                                  value={formData.personal.city}
                                  onChange={(e) => updatePersonal("city", e.target.value)}
                                />
                                {errors["personal.city"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["personal.city"]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="whatsappNumber">
                                  WhatsApp Number <span className={styles.requiredMark}>*</span>
                                </label>
                                <input
                                  id="whatsappNumber"
                                  type="tel"
                                  className={`${styles.inputField} ${errors["personal.whatsappNumber"] ? styles.inputError : ""
                                    }`}
                                  placeholder="+92 300 1234567"
                                  value={formData.personal.whatsappNumber}
                                  onChange={(e) =>
                                    updatePersonal("whatsappNumber", e.target.value)
                                  }
                                />
                                {errors["personal.whatsappNumber"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} />{" "}
                                    {errors["personal.whatsappNumber"]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="email">
                                  Email Address <span className={styles.requiredMark}>*</span>
                                </label>
                                <input
                                  id="email"
                                  type="email"
                                  className={`${styles.inputField} ${errors["personal.email"] ? styles.inputError : ""
                                    }`}
                                  placeholder="creator@example.com"
                                  value={formData.personal.email}
                                  onChange={(e) => updatePersonal("email", e.target.value)}
                                />
                                {errors["personal.email"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["personal.email"]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 2: Creator Profile */}
                        {currentStep === 2 && (
                          <div>
                            <div className={styles.stepTitleWrap}>
                              <div className={styles.stepNumberTag}>Step 2 of 8</div>
                              <h4 className={styles.stepMainTitle}>Creator Profile</h4>
                              <p className={styles.stepDesc}>
                                Define your creator identity and choose your primary content niches.
                              </p>
                            </div>

                            <div className="mb-4">
                              <label className={styles.label}>
                                Which best describes you? (Select all that apply){" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className={styles.optionsGrid}>
                                {CREATOR_TYPES.map((type) => {
                                  const isSelected =
                                    formData.creatorProfile.creatorTypes.includes(type);
                                  return (
                                    <div
                                      key={type}
                                      onClick={() => toggleCreatorType(type)}
                                      className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""
                                        }`}
                                    >
                                      <span className={styles.optionCheckmark}>
                                        {isSelected && <FiCheck size={12} />}
                                      </span>
                                      <span>{type}</span>
                                    </div>
                                  );
                                })}
                              </div>
                              {errors["creatorProfile.creatorTypes"] && (
                                <div className={styles.errorText}>
                                  <FiAlertCircle size={12} />{" "}
                                  {errors["creatorProfile.creatorTypes"]}
                                </div>
                              )}

                              {formData.creatorProfile.creatorTypes.includes("Other") && (
                                <div className="mt-3">
                                  <label className={styles.label} htmlFor="creatorTypeOther">
                                    Please specify other creator type{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <input
                                    id="creatorTypeOther"
                                    type="text"
                                    className={`${styles.inputField} ${errors["creatorProfile.creatorTypeOther"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="e.g. Animator, Voice Artist, Live Streamer"
                                    value={formData.creatorProfile.creatorTypeOther}
                                    onChange={(e) =>
                                      updateCreatorProfile(
                                        "creatorTypeOther",
                                        e.target.value
                                      )
                                    }
                                  />
                                  {errors["creatorProfile.creatorTypeOther"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["creatorProfile.creatorTypeOther"]}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="mb-4">
                              <label className={styles.label}>
                                What is your primary content niche? (Select all that apply){" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className={styles.optionsGrid}>
                                {CONTENT_NICHES.map((niche) => {
                                  const isSelected =
                                    formData.creatorProfile.contentNiches.includes(niche);
                                  return (
                                    <div
                                      key={niche}
                                      onClick={() => toggleContentNiche(niche)}
                                      className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""
                                        }`}
                                    >
                                      <span className={styles.optionCheckmark}>
                                        {isSelected && <FiCheck size={12} />}
                                      </span>
                                      <span>{niche}</span>
                                    </div>
                                  );
                                })}
                              </div>
                              {errors["creatorProfile.contentNiches"] && (
                                <div className={styles.errorText}>
                                  <FiAlertCircle size={12} />{" "}
                                  {errors["creatorProfile.contentNiches"]}
                                </div>
                              )}

                              {formData.creatorProfile.contentNiches.includes("Other") && (
                                <div className="mt-3">
                                  <label className={styles.label} htmlFor="contentNicheOther">
                                    Please specify other niche{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <input
                                    id="contentNicheOther"
                                    type="text"
                                    className={`${styles.inputField} ${errors["creatorProfile.contentNicheOther"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="e.g. Architecture, Real Estate, History"
                                    value={formData.creatorProfile.contentNicheOther}
                                    onChange={(e) =>
                                      updateCreatorProfile(
                                        "contentNicheOther",
                                        e.target.value
                                      )
                                    }
                                  />
                                  {errors["creatorProfile.contentNicheOther"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["creatorProfile.contentNicheOther"]}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="mb-3">
                              <label className={styles.label}>
                                How long have you been creating content?{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className="d-flex flex-wrap gap-2">
                                {EXPERIENCE_OPTIONS.map((exp) => (
                                  <button
                                    key={exp}
                                    type="button"
                                    onClick={() =>
                                      updateCreatorProfile("creatorExperience", exp)
                                    }
                                    className={`${styles.optionCard} ${formData.creatorProfile.creatorExperience === exp
                                      ? styles.optionCardSelected
                                      : ""
                                      }`}
                                    style={{ flex: "1 1 180px" }}
                                  >
                                    <span
                                      className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                    >
                                      {formData.creatorProfile.creatorExperience ===
                                        exp && (
                                          <div
                                            style={{
                                              width: 8,
                                              height: 8,
                                              borderRadius: "50%",
                                              background: "#fff",
                                            }}
                                          />
                                        )}
                                    </span>
                                    <span>{exp}</span>
                                  </button>
                                ))}
                              </div>
                              {errors["creatorProfile.creatorExperience"] && (
                                <div className={styles.errorText}>
                                  <FiAlertCircle size={12} />{" "}
                                  {errors["creatorProfile.creatorExperience"]}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* STEP 3: Social Media Information */}
                        {currentStep === 3 && (
                          <div>
                            <div className={styles.stepTitleWrap}>
                              <div className={styles.stepNumberTag}>Step 3 of 8</div>
                              <h4 className={styles.stepMainTitle}>
                                Social Media Information
                              </h4>
                              <p className={styles.stepDesc}>
                                Share your active profiles and reach metrics across your top channels.
                              </p>
                            </div>

                            <div className="row g-3 mb-4">
                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="instagram">
                                  Instagram Profile Link
                                </label>
                                <input
                                  id="instagram"
                                  type="url"
                                  className={`${styles.inputField} ${errors["social.instagram"] ? styles.inputError : ""
                                    }`}
                                  placeholder="https://instagram.com/yourusername"
                                  value={formData.social.instagram}
                                  onChange={(e) => updateSocial("instagram", e.target.value)}
                                />
                                {errors["social.instagram"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["social.instagram"]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="tiktok">
                                  TikTok Profile Link
                                </label>
                                <input
                                  id="tiktok"
                                  type="url"
                                  className={`${styles.inputField} ${errors["social.tiktok"] ? styles.inputError : ""
                                    }`}
                                  placeholder="https://tiktok.com/@yourusername"
                                  value={formData.social.tiktok}
                                  onChange={(e) => updateSocial("tiktok", e.target.value)}
                                />
                                {errors["social.tiktok"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["social.tiktok"]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="youtube">
                                  YouTube Channel Link
                                </label>
                                <input
                                  id="youtube"
                                  type="url"
                                  className={`${styles.inputField} ${errors["social.youtube"] ? styles.inputError : ""
                                    }`}
                                  placeholder="https://youtube.com/@yourchannel"
                                  value={formData.social.youtube}
                                  onChange={(e) => updateSocial("youtube", e.target.value)}
                                />
                                {errors["social.youtube"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["social.youtube"]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label} htmlFor="facebook">
                                  Facebook Profile/Page Link
                                </label>
                                <input
                                  id="facebook"
                                  type="url"
                                  className={`${styles.inputField} ${errors["social.facebook"] ? styles.inputError : ""
                                    }`}
                                  placeholder="https://facebook.com/yourpage"
                                  value={formData.social.facebook}
                                  onChange={(e) => updateSocial("facebook", e.target.value)}
                                />
                                {errors["social.facebook"] && (
                                  <div className={styles.errorText}>
                                    <FiAlertCircle size={12} /> {errors["social.facebook"]}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-4">
                              <label className={styles.label}>
                                Total Followers Across Your Main Platforms{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className={styles.optionsGrid}>
                                {FOLLOWER_RANGES.map((fRange) => (
                                  <div
                                    key={fRange}
                                    onClick={() => updateSocial("followerRange", fRange)}
                                    className={`${styles.optionCard} ${formData.social.followerRange === fRange
                                      ? styles.optionCardSelected
                                      : ""
                                      }`}
                                  >
                                    <span
                                      className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                    >
                                      {formData.social.followerRange === fRange && (
                                        <div
                                          style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: "#fff",
                                          }}
                                        />
                                      )}
                                    </span>
                                    <span>{fRange}</span>
                                  </div>
                                ))}
                              </div>
                              {errors["social.followerRange"] && (
                                <div className={styles.errorText}>
                                  <FiAlertCircle size={12} />{" "}
                                  {errors["social.followerRange"]}
                                </div>
                              )}
                            </div>

                            <div className="mb-4">
                              <label className={styles.label}>
                                Average Monthly Reach / Views{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className={styles.optionsGrid}>
                                {MONTHLY_REACH_RANGES.map((mRange) => (
                                  <div
                                    key={mRange}
                                    onClick={() => updateSocial("monthlyReach", mRange)}
                                    className={`${styles.optionCard} ${formData.social.monthlyReach === mRange
                                      ? styles.optionCardSelected
                                      : ""
                                      }`}
                                  >
                                    <span
                                      className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                    >
                                      {formData.social.monthlyReach === mRange && (
                                        <div
                                          style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: "#fff",
                                          }}
                                        />
                                      )}
                                    </span>
                                    <span>{mRange}</span>
                                  </div>
                                ))}
                              </div>
                              {errors["social.monthlyReach"] && (
                                <div className={styles.errorText}>
                                  <FiAlertCircle size={12} />{" "}
                                  {errors["social.monthlyReach"]}
                                </div>
                              )}
                            </div>

                            <div className="mb-2">
                              <label className={styles.label} htmlFor="engagementRate">
                                Average Engagement Rate
                              </label>
                              <input
                                id="engagementRate"
                                type="text"
                                className={styles.inputField}
                                placeholder="e.g. 4.5% or 7.8%"
                                value={formData.social.engagementRate}
                                onChange={(e) =>
                                  updateSocial("engagementRate", e.target.value)
                                }
                              />
                              <div className={styles.helperText}>
                                Allow values such as: 2.5%, 5%, 7.8%
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 4: Brand Collaboration Experience */}
                        {currentStep === 4 && (
                          <div>
                            <div className={styles.stepTitleWrap}>
                              <div className={styles.stepNumberTag}>Step 4 of 8</div>
                              <h4 className={styles.stepMainTitle}>
                                Brand Collaboration Experience
                              </h4>
                              <p className={styles.stepDesc}>
                                Share your history with sponsored campaigns, UGC, and brand partnerships.
                              </p>
                            </div>

                            <div className="mb-4">
                              <label className={styles.label}>
                                Have you worked with brands before?{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className={styles.toggleRow}>
                                <button
                                  type="button"
                                  onClick={() => updateBrandExperience("workedWithBrands", "Yes")}
                                  className={`${styles.toggleBtn} ${formData.brandExperience.workedWithBrands === "Yes"
                                    ? styles.toggleBtnActive
                                    : ""
                                    }`}
                                >
                                  <FiCheck size={16} /> Yes, I have brand experience
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateBrandExperience("workedWithBrands", "No")}
                                  className={`${styles.toggleBtn} ${formData.brandExperience.workedWithBrands === "No"
                                    ? styles.toggleBtnActive
                                    : ""
                                    }`}
                                >
                                  No, I am new to brand collabs
                                </button>
                              </div>
                            </div>

                            {formData.brandExperience.workedWithBrands === "Yes" && (
                              <div className={styles.conditionalPanel}>
                                <div className="mb-3">
                                  <label className={styles.label} htmlFor="brandsWorkedWith">
                                    Which brands have you worked with?{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <textarea
                                    id="brandsWorkedWith"
                                    className={`${styles.textareaField} ${errors["brandExperience.brandsWorkedWith"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="e.g. Khaadi, Sapphire, Glow Recipe, Daraz, Foodpanda, local startups..."
                                    value={formData.brandExperience.brandsWorkedWith}
                                    onChange={(e) =>
                                      updateBrandExperience(
                                        "brandsWorkedWith",
                                        e.target.value
                                      )
                                    }
                                  />
                                  {errors["brandExperience.brandsWorkedWith"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["brandExperience.brandsWorkedWith"]}
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3">
                                  <label className={styles.label}>
                                    Approximately how many paid brand collaborations have you completed?{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <div className="d-flex flex-wrap gap-2">
                                    {PAID_COLLAB_RANGES.map((range) => (
                                      <button
                                        key={range}
                                        type="button"
                                        onClick={() =>
                                          updateBrandExperience(
                                            "paidCollaborations",
                                            range
                                          )
                                        }
                                        className={`${styles.optionCard} ${formData.brandExperience.paidCollaborations ===
                                          range
                                          ? styles.optionCardSelected
                                          : ""
                                          }`}
                                        style={{ flex: "1 1 120px" }}
                                      >
                                        <span
                                          className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                        >
                                          {formData.brandExperience
                                            .paidCollaborations === range && (
                                              <div
                                                style={{
                                                  width: 8,
                                                  height: 8,
                                                  borderRadius: "50%",
                                                  background: "#fff",
                                                }}
                                              />
                                            )}
                                        </span>
                                        <span>{range}</span>
                                      </button>
                                    ))}
                                  </div>
                                  {errors["brandExperience.paidCollaborations"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["brandExperience.paidCollaborations"]}
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3">
                                  <label className={styles.label}>
                                    What type of collaborations do you offer? (Select all that apply){" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <div className={styles.optionsGrid}>
                                    {COLLAB_TYPES.map((cType) => {
                                      const isSelected =
                                        formData.brandExperience.collaborationTypes.includes(
                                          cType
                                        );
                                      return (
                                        <div
                                          key={cType}
                                          onClick={() => toggleCollabType(cType)}
                                          className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""
                                            }`}
                                        >
                                          <span className={styles.optionCheckmark}>
                                            {isSelected && <FiCheck size={12} />}
                                          </span>
                                          <span>{cType}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  {errors["brandExperience.collaborationTypes"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["brandExperience.collaborationTypes"]}
                                    </div>
                                  )}

                                  {formData.brandExperience.collaborationTypes.includes(
                                    "Other"
                                  ) && (
                                      <div className="mt-3">
                                        <label
                                          className={styles.label}
                                          htmlFor="collabTypeOther"
                                        >
                                          Please specify collaboration type{" "}
                                          <span className={styles.requiredMark}>*</span>
                                        </label>
                                        <input
                                          id="collabTypeOther"
                                          type="text"
                                          className={`${styles.inputField} ${errors[
                                            "brandExperience.collaborationTypeOther"
                                          ]
                                            ? styles.inputError
                                            : ""
                                            }`}
                                          placeholder="e.g. Masterclass, Podcast Sponsorship"
                                          value={
                                            formData.brandExperience.collaborationTypeOther
                                          }
                                          onChange={(e) =>
                                            updateBrandExperience(
                                              "collaborationTypeOther",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    )}
                                </div>

                                <div className="mb-2">
                                  <label
                                    className={styles.label}
                                    htmlFor="successfulCollab"
                                  >
                                    Tell us about your most successful brand collaboration{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <textarea
                                    id="successfulCollab"
                                    className={`${styles.textareaField} ${errors["brandExperience.successfulCollaboration"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="Describe the campaign, your deliverables, and the reach or sales results achieved..."
                                    value={
                                      formData.brandExperience.successfulCollaboration
                                    }
                                    onChange={(e) =>
                                      updateBrandExperience(
                                        "successfulCollaboration",
                                        e.target.value
                                      )
                                    }
                                  />
                                  {errors["brandExperience.successfulCollaboration"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {
                                        errors[
                                        "brandExperience.successfulCollaboration"
                                        ]
                                      }
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* STEP 5: Collabo Influencers Awards */}
                        {currentStep === 5 && (
                          <div>
                            <div className={styles.stepTitleWrap}>
                              <div className={styles.stepNumberTag}>Step 5 of 8</div>
                              <h4 className={styles.stepMainTitle}>
                                Collabo Influencers Awards
                              </h4>
                              <p className={styles.stepDesc}>
                                Compete for Pakistan's prestigious creator awards and gain national industry recognition.
                              </p>
                            </div>

                            <div className="mb-4">
                              <label className={styles.label}>
                                Would you like to be considered for the Collabo Influencers Awards?{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className={styles.toggleRow}>
                                <button
                                  type="button"
                                  onClick={() => updateAwards("interestedInAwards", "Yes")}
                                  className={`${styles.toggleBtn} ${formData.awards.interestedInAwards === "Yes"
                                    ? styles.toggleBtnActive
                                    : ""
                                    }`}
                                >
                                  <FiAward size={16} /> Yes, Nominate Me
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateAwards("interestedInAwards", "No")}
                                  className={`${styles.toggleBtn} ${formData.awards.interestedInAwards === "No"
                                    ? styles.toggleBtnActive
                                    : ""
                                    }`}
                                >
                                  No, Skip for Now
                                </button>
                              </div>
                            </div>

                            {formData.awards.interestedInAwards === "Yes" && (
                              <div className={styles.conditionalPanel}>
                                <div className="mb-3">
                                  <label className={styles.label}>
                                    Which award category would you like to be considered for?{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <div className={styles.optionsGrid}>
                                    {AWARD_CATEGORIES.map((cat) => (
                                      <div
                                        key={cat}
                                        onClick={() => updateAwards("awardCategory", cat)}
                                        className={`${styles.optionCard} ${formData.awards.awardCategory === cat
                                          ? styles.optionCardSelected
                                          : ""
                                          }`}
                                      >
                                        <span
                                          className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                        >
                                          {formData.awards.awardCategory === cat && (
                                            <div
                                              style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: "#fff",
                                              }}
                                            />
                                          )}
                                        </span>
                                        <span>{cat}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {errors["awards.awardCategory"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["awards.awardCategory"]}
                                    </div>
                                  )}

                                  {formData.awards.awardCategory === "Other" && (
                                    <div className="mt-3">
                                      <label className={styles.label} htmlFor="awardOther">
                                        Please specify award category{" "}
                                        <span className={styles.requiredMark}>*</span>
                                      </label>
                                      <input
                                        id="awardOther"
                                        type="text"
                                        className={`${styles.inputField} ${errors["awards.awardCategoryOther"]
                                          ? styles.inputError
                                          : ""
                                          }`}
                                        placeholder="e.g. Tech Reviewer of the Year"
                                        value={formData.awards.awardCategoryOther}
                                        onChange={(e) =>
                                          updateAwards(
                                            "awardCategoryOther",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3">
                                  <label className={styles.label} htmlFor="biggestAchieve">
                                    What is your biggest achievement as a creator?{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <textarea
                                    id="biggestAchieve"
                                    className={`${styles.textareaField} ${errors["awards.biggestAchievement"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="e.g. Reached 500K followers organically, launched own merchandise line, featured in national media..."
                                    value={formData.awards.biggestAchievement}
                                    onChange={(e) =>
                                      updateAwards("biggestAchievement", e.target.value)
                                    }
                                  />
                                  {errors["awards.biggestAchievement"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["awards.biggestAchievement"]}
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3">
                                  <label className={styles.label}>
                                    Have you previously won or been nominated for any award?{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <div className="d-flex gap-2">
                                    {["Yes", "No"].map((opt) => (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() => updateAwards("previousAward", opt)}
                                        className={`${styles.optionCard} ${formData.awards.previousAward === opt
                                          ? styles.optionCardSelected
                                          : ""
                                          }`}
                                        style={{ flex: "1 1 120px" }}
                                      >
                                        <span
                                          className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                        >
                                          {formData.awards.previousAward === opt && (
                                            <div
                                              style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: "#fff",
                                              }}
                                            />
                                          )}
                                        </span>
                                        <span>{opt}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <label className={styles.label} htmlFor="viralContentLinks">
                                    Share links to your best-performing / viral content{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <textarea
                                    id="viralContentLinks"
                                    className={`${styles.textareaField} ${errors["awards.viralContentLinks"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="Paste links to your top TikToks, Reels, YouTube videos or posts (one per line)..."
                                    value={formData.awards.viralContentLinks}
                                    onChange={(e) =>
                                      updateAwards("viralContentLinks", e.target.value)
                                    }
                                  />
                                  <div className={styles.helperText}>
                                    You can share Instagram, TikTok, YouTube, Facebook or other relevant links.
                                  </div>
                                  {errors["awards.viralContentLinks"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["awards.viralContentLinks"]}
                                    </div>
                                  )}
                                </div>

                                <div className="mb-2">
                                  <label className={styles.label} htmlFor="whyConsidered">
                                    Why should you be considered for the Collabo Influencers Awards?{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <textarea
                                    id="whyConsidered"
                                    className={`${styles.textareaField} ${errors["awards.whyConsidered"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="Share what makes your content unique, your community impact, and why you stand out..."
                                    value={formData.awards.whyConsidered}
                                    onChange={(e) =>
                                      updateAwards("whyConsidered", e.target.value)
                                    }
                                  />
                                  {errors["awards.whyConsidered"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["awards.whyConsidered"]}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* STEP 6: Collabo Talent Hunt */}
                        {currentStep === 6 && (
                          <div>
                            <div className={styles.stepTitleWrap}>
                              <div className={styles.stepNumberTag}>Step 6 of 8</div>
                              <h4 className={styles.stepMainTitle}>Collabo Talent Hunt</h4>
                              <p className={styles.stepDesc}>
                                Showcase your live performance talent on stage at the 2026 Grand Gala.
                              </p>
                            </div>

                            <div className="mb-4">
                              <label className={styles.label}>
                                Would you like to participate in the Collabo Talent Hunt?{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className={styles.toggleRow}>
                                <button
                                  type="button"
                                  onClick={() => updateTalent("interestedInTalentHunt", "Yes")}
                                  className={`${styles.toggleBtn} ${formData.talent.interestedInTalentHunt === "Yes"
                                    ? styles.toggleBtnActive
                                    : ""
                                    }`}
                                >
                                  <FiMic size={16} /> Yes, I want to audition
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateTalent("interestedInTalentHunt", "No")}
                                  className={`${styles.toggleBtn} ${formData.talent.interestedInTalentHunt === "No"
                                    ? styles.toggleBtnActive
                                    : ""
                                    }`}
                                >
                                  No, Skip for Now
                                </button>
                              </div>
                            </div>

                            {formData.talent.interestedInTalentHunt === "Yes" && (
                              <div className={styles.conditionalPanel}>
                                <div className="mb-3">
                                  <label className={styles.label}>
                                    What is your talent?{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <div className={styles.optionsGrid}>
                                    {TALENT_TYPES.map((t) => (
                                      <div
                                        key={t}
                                        onClick={() => updateTalent("talentType", t)}
                                        className={`${styles.optionCard} ${formData.talent.talentType === t
                                          ? styles.optionCardSelected
                                          : ""
                                          }`}
                                      >
                                        <span
                                          className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                        >
                                          {formData.talent.talentType === t && (
                                            <div
                                              style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: "#fff",
                                              }}
                                            />
                                          )}
                                        </span>
                                        <span>{t}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {errors["talent.talentType"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["talent.talentType"]}
                                    </div>
                                  )}

                                  {formData.talent.talentType === "Other" && (
                                    <div className="mt-3">
                                      <label className={styles.label} htmlFor="talentOther">
                                        Please specify talent{" "}
                                        <span className={styles.requiredMark}>*</span>
                                      </label>
                                      <input
                                        id="talentOther"
                                        type="text"
                                        className={`${styles.inputField} ${errors["talent.talentTypeOther"]
                                          ? styles.inputError
                                          : ""
                                          }`}
                                        placeholder="e.g. Magic, Beatboxing, Martial Arts Demo"
                                        value={formData.talent.talentTypeOther}
                                        onChange={(e) =>
                                          updateTalent("talentTypeOther", e.target.value)
                                        }
                                      />
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3">
                                  <label className={styles.label} htmlFor="talentDesc">
                                    Tell us briefly about your talent{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <textarea
                                    id="talentDesc"
                                    className={`${styles.textareaField} ${errors["talent.talentDescription"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="How did you start? Have you performed live before? What makes your style distinct?"
                                    value={formData.talent.talentDescription}
                                    onChange={(e) =>
                                      updateTalent("talentDescription", e.target.value)
                                    }
                                  />
                                  {errors["talent.talentDescription"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["talent.talentDescription"]}
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3">
                                  <label className={styles.label} htmlFor="plannedPerform">
                                    What would you perform if selected for the event?{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <textarea
                                    id="plannedPerform"
                                    className={`${styles.textareaField} ${errors["talent.plannedPerformance"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="Describe your planned routine, act, song, dance choreography, comedy set or presentation..."
                                    value={formData.talent.plannedPerformance}
                                    onChange={(e) =>
                                      updateTalent("plannedPerformance", e.target.value)
                                    }
                                  />
                                  {errors["talent.plannedPerformance"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["talent.plannedPerformance"]}
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3">
                                  <label className={styles.label} htmlFor="talentVideo">
                                    Share a video demonstrating your talent{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <input
                                    id="talentVideo"
                                    type="url"
                                    className={`${styles.inputField} ${errors["talent.talentVideo"] ? styles.inputError : ""
                                      }`}
                                    placeholder="https://..."
                                    value={formData.talent.talentVideo}
                                    onChange={(e) =>
                                      updateTalent("talentVideo", e.target.value)
                                    }
                                  />
                                  <div className={styles.helperText}>
                                    YouTube / TikTok / Instagram / Google Drive link
                                  </div>
                                  {errors["talent.talentVideo"] && (
                                    <div className={styles.errorText}>
                                      <FiAlertCircle size={12} />{" "}
                                      {errors["talent.talentVideo"]}
                                    </div>
                                  )}
                                </div>

                                <div className="row g-3">
                                  <div className="col-md-6">
                                    <label className={styles.label}>
                                      Are you available to attend physically?{" "}
                                      <span className={styles.requiredMark}>*</span>
                                    </label>
                                    <div className="d-flex gap-2">
                                      {["Yes", "No", "Maybe"].map((opt) => (
                                        <button
                                          key={opt}
                                          type="button"
                                          onClick={() =>
                                            updateTalent("physicalAttendance", opt)
                                          }
                                          className={`${styles.optionCard} ${formData.talent.physicalAttendance === opt
                                            ? styles.optionCardSelected
                                            : ""
                                            }`}
                                          style={{ flex: 1, padding: "8px 12px" }}
                                        >
                                          <span
                                            className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                          >
                                            {formData.talent.physicalAttendance ===
                                              opt && (
                                                <div
                                                  style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: "#fff",
                                                  }}
                                                />
                                              )}
                                          </span>
                                          <span>{opt}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <label className={styles.label}>
                                      Are you comfortable appearing on stage?{" "}
                                      <span className={styles.requiredMark}>*</span>
                                    </label>
                                    <div className="d-flex gap-2">
                                      {["Yes", "No"].map((opt) => (
                                        <button
                                          key={opt}
                                          type="button"
                                          onClick={() =>
                                            updateTalent("stageComfort", opt)
                                          }
                                          className={`${styles.optionCard} ${formData.talent.stageComfort === opt
                                            ? styles.optionCardSelected
                                            : ""
                                            }`}
                                          style={{ flex: 1, padding: "8px 12px" }}
                                        >
                                          <span
                                            className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                          >
                                            {formData.talent.stageComfort === opt && (
                                              <div
                                                style={{
                                                  width: 8,
                                                  height: 8,
                                                  borderRadius: "50%",
                                                  background: "#fff",
                                                }}
                                              />
                                            )}
                                          </span>
                                          <span>{opt}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <label className={styles.label}>
                                      Interested in promotional content before event?{" "}
                                      <span className={styles.requiredMark}>*</span>
                                    </label>
                                    <div className="d-flex gap-2">
                                      {["Yes", "No"].map((opt) => (
                                        <button
                                          key={opt}
                                          type="button"
                                          onClick={() =>
                                            updateTalent("promotionalContent", opt)
                                          }
                                          className={`${styles.optionCard} ${formData.talent.promotionalContent === opt
                                            ? styles.optionCardSelected
                                            : ""
                                            }`}
                                          style={{ flex: 1, padding: "8px 12px" }}
                                        >
                                          <span
                                            className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                          >
                                            {formData.talent.promotionalContent ===
                                              opt && (
                                                <div
                                                  style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: "#fff",
                                                  }}
                                                />
                                              )}
                                          </span>
                                          <span>{opt}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <label className={styles.label}>
                                      Interested in future Collabo brand campaigns?{" "}
                                      <span className={styles.requiredMark}>*</span>
                                    </label>
                                    <div className="d-flex gap-2">
                                      {["Yes", "No"].map((opt) => (
                                        <button
                                          key={opt}
                                          type="button"
                                          onClick={() =>
                                            updateTalent("futureBrandCampaigns", opt)
                                          }
                                          className={`${styles.optionCard} ${formData.talent.futureBrandCampaigns === opt
                                            ? styles.optionCardSelected
                                            : ""
                                            }`}
                                          style={{ flex: 1, padding: "8px 12px" }}
                                        >
                                          <span
                                            className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                          >
                                            {formData.talent.futureBrandCampaigns ===
                                              opt && (
                                                <div
                                                  style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: "#fff",
                                                  }}
                                                />
                                              )}
                                          </span>
                                          <span>{opt}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* STEP 7: Creator / Commercial Information */}
                        {currentStep === 7 && (
                          <div>
                            <div className={styles.stepTitleWrap}>
                              <div className={styles.stepNumberTag}>Step 7 of 8</div>
                              <h4 className={styles.stepMainTitle}>
                                Creator / Commercial Information
                              </h4>
                              <p className={styles.stepDesc}>
                                Commercial rates, platform expectations, and network partnership preferences.
                              </p>
                            </div>

                            <div className="mb-4">
                              <label className={styles.label} htmlFor="startingRate">
                                Your starting rate for a brand collaboration{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <input
                                id="startingRate"
                                type="text"
                                className={`${styles.inputField} ${errors["commercial.startingRate"] ? styles.inputError : ""
                                  }`}
                                placeholder="e.g. PKR 25,000"
                                value={formData.commercial.startingRate}
                                onChange={(e) =>
                                  updateCommercial("startingRate", e.target.value)
                                }
                              />
                              {errors["commercial.startingRate"] && (
                                <div className={styles.errorText}>
                                  <FiAlertCircle size={12} />{" "}
                                  {errors["commercial.startingRate"]}
                                </div>
                              )}
                            </div>

                            <div className="mb-4">
                              <label className={styles.label} htmlFor="expectations">
                                What do you expect from Collabo?{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <textarea
                                id="expectations"
                                className={`${styles.textareaField} ${errors["commercial.expectations"] ? styles.inputError : ""
                                  }`}
                                placeholder="e.g. Premium brand deals, fast payments, networking events, content mentorship, fair rates..."
                                value={formData.commercial.expectations}
                                onChange={(e) =>
                                  updateCommercial("expectations", e.target.value)
                                }
                              />
                              {errors["commercial.expectations"] && (
                                <div className={styles.errorText}>
                                  <FiAlertCircle size={12} />{" "}
                                  {errors["commercial.expectations"]}
                                </div>
                              )}
                            </div>

                            <div className="mb-4">
                              <label className={styles.label}>
                                How did you hear about Collabo?{" "}
                                <span className={styles.requiredMark}>*</span>
                              </label>
                              <div className={styles.optionsGrid}>
                                {HEARD_ABOUT_OPTIONS.map((channel) => (
                                  <div
                                    key={channel}
                                    onClick={() =>
                                      updateCommercial("heardAboutCollabo", channel)
                                    }
                                    className={`${styles.optionCard} ${formData.commercial.heardAboutCollabo === channel
                                      ? styles.optionCardSelected
                                      : ""
                                      }`}
                                  >
                                    <span
                                      className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                    >
                                      {formData.commercial.heardAboutCollabo ===
                                        channel && (
                                          <div
                                            style={{
                                              width: 8,
                                              height: 8,
                                              borderRadius: "50%",
                                              background: "#fff",
                                            }}
                                          />
                                        )}
                                    </span>
                                    <span>{channel}</span>
                                  </div>
                                ))}
                              </div>
                              {errors["commercial.heardAboutCollabo"] && (
                                <div className={styles.errorText}>
                                  <FiAlertCircle size={12} />{" "}
                                  {errors["commercial.heardAboutCollabo"]}
                                </div>
                              )}

                              {formData.commercial.heardAboutCollabo === "Other" && (
                                <div className="mt-3">
                                  <label className={styles.label} htmlFor="heardOther">
                                    Please specify{" "}
                                    <span className={styles.requiredMark}>*</span>
                                  </label>
                                  <input
                                    id="heardOther"
                                    type="text"
                                    className={`${styles.inputField} ${errors["commercial.heardAboutOther"]
                                      ? styles.inputError
                                      : ""
                                      }`}
                                    placeholder="e.g. College campus, WhatsApp group, Billboard"
                                    value={formData.commercial.heardAboutOther}
                                    onChange={(e) =>
                                      updateCommercial(
                                        "heardAboutOther",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>

                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className={styles.label}>
                                  Would you like to join the Collabo Creator Network?{" "}
                                  <span className={styles.requiredMark}>*</span>
                                </label>
                                <div className="d-flex gap-2">
                                  {["Yes", "No"].map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() =>
                                        updateCommercial("joinCreatorNetwork", opt)
                                      }
                                      className={`${styles.optionCard} ${formData.commercial.joinCreatorNetwork === opt
                                        ? styles.optionCardSelected
                                        : ""
                                        }`}
                                      style={{ flex: 1, padding: "8px 12px" }}
                                    >
                                      <span
                                        className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                      >
                                        {formData.commercial.joinCreatorNetwork ===
                                          opt && (
                                            <div
                                              style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: "#fff",
                                              }}
                                            />
                                          )}
                                      </span>
                                      <span>{opt}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="col-md-6">
                                <label className={styles.label}>
                                  May the Collabo team contact you regarding awards, talent, and brand campaigns?{" "}
                                  <span className={styles.requiredMark}>*</span>
                                </label>
                                <div className="d-flex gap-2">
                                  {["Yes", "No"].map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() =>
                                        updateCommercial("contactPermission", opt)
                                      }
                                      className={`${styles.optionCard} ${formData.commercial.contactPermission === opt
                                        ? styles.optionCardSelected
                                        : ""
                                        }`}
                                      style={{ flex: 1, padding: "8px 12px" }}
                                    >
                                      <span
                                        className={`${styles.optionCheckmark} ${styles.optionRadio}`}
                                      >
                                        {formData.commercial.contactPermission ===
                                          opt && (
                                            <div
                                              style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: "#fff",
                                              }}
                                            />
                                          )}
                                      </span>
                                      <span>{opt}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 8: Consent & Declaration */}
                        {currentStep === 8 && (
                          <div>
                            <div className={styles.stepTitleWrap}>
                              <div className={styles.stepNumberTag}>Step 8 of 8</div>
                              <h4 className={styles.stepMainTitle}>
                                Consent &amp; Declaration
                              </h4>
                              <p className={styles.stepDesc}>
                                Please review your registration summary and provide consent before submitting.
                              </p>
                            </div>

                            {/* Summary Preview */}
                            <div className={styles.summaryCard}>
                              <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Full Name:</span>
                                <span className={styles.summaryValue}>
                                  {formData.personal.fullName || "—"}
                                </span>
                              </div>
                              <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Email &amp; WhatsApp:</span>
                                <span className={styles.summaryValue}>
                                  {formData.personal.email} • {formData.personal.whatsappNumber}
                                </span>
                              </div>
                              <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Location:</span>
                                <span className={styles.summaryValue}>
                                  {formData.personal.city}
                                </span>
                              </div>
                              <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Creator Types:</span>
                                <span className={styles.summaryValue}>
                                  {formData.creatorProfile.creatorTypes.join(", ") || "—"}
                                </span>
                              </div>
                              <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Niches:</span>
                                <span className={styles.summaryValue}>
                                  {formData.creatorProfile.contentNiches.join(", ") || "—"}
                                </span>
                              </div>
                              <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Awards Consideration:</span>
                                <span className={styles.summaryValue}>
                                  {formData.awards.interestedInAwards === "Yes"
                                    ? `Yes (${formData.awards.awardCategory})`
                                    : "No"}
                                </span>
                              </div>
                              <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Talent Hunt:</span>
                                <span className={styles.summaryValue}>
                                  {formData.talent.interestedInTalentHunt === "Yes"
                                    ? `Yes (${formData.talent.talentType})`
                                    : "No"}
                                </span>
                              </div>
                              <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Starting Rate:</span>
                                <span className={styles.summaryValue}>
                                  {formData.commercial.startingRate || "—"}
                                </span>
                              </div>
                            </div>

                            {/* Prominent Consent Box */}
                            <div className={styles.consentBox}>
                              <div className={styles.consentHeading}>
                                <FiCheckCircle size={20} />
                                <span>Consent &amp; Declaration</span>
                              </div>

                              <p className={styles.consentText}>
                                "I confirm that the information provided in this form is accurate to the best of my knowledge. I agree that Collabo may use the information provided to evaluate my participation in the Influencers Awards and Talent Hunt and to contact me regarding relevant creator, brand collaboration and event opportunities."
                              </p>

                              <div
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    consent: { agreed: !prev.consent.agreed },
                                  }))
                                }
                                className={styles.agreeCheckWrap}
                              >
                                <div
                                  className={`${styles.agreeCheckbox} ${formData.consent.agreed
                                    ? styles.agreeCheckboxChecked
                                    : ""
                                    }`}
                                >
                                  {formData.consent.agreed && <FiCheck size={14} />}
                                </div>
                                <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "15px" }}>
                                  I Agree <span className={styles.requiredMark}>*</span>
                                </span>
                              </div>

                              {errors["consent.agreed"] && (
                                <div className={styles.errorText} style={{ marginTop: "10px" }}>
                                  <FiAlertCircle size={14} /> {errors["consent.agreed"]}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Wizard Footer Controls */}
                      <div className={styles.wizardFooter}>
                        <div>
                          {currentStep > 1 && (
                            <button
                              type="button"
                              onClick={handlePrev}
                              className={styles.btnBack}
                              disabled={isSubmitting}
                            >
                              <FiArrowLeft size={16} /> Previous
                            </button>
                          )}
                        </div>

                        <div>
                          {currentStep < STEPS.length ? (
                            <button
                              type="button"
                              onClick={handleNext}
                              className={styles.btnNext}
                            >
                              Next Step <FiArrowRight size={16} />
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled={isSubmitting || !formData.consent.agreed}
                              className={styles.btnSubmit}
                            >
                              {isSubmitting ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                  Submitting Registration...
                                </>
                              ) : (
                                <>
                                  Submit Registration <FiCheckCircle size={18} />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
