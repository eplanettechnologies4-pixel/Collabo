import React from "react";
import InfluencerPartnerSection from "@/components/partners/InfluencerPartnerSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Model | Collabo Model & Creator Directory",
  description:
    "Explore Collabo's verified commercial models, fashion talent, and content creators in Pakistan. Book models for commercial campaigns.",
};

export default function OurModelPage() {
  return (
    <main className="bg-white min-vh-100 pb-5">
      {/* Hero Banner */}
      <section
        className="section pb-5 bg-ink blog-main text-white"
        style={{ paddingTop: "8.5rem", background: "var(--ink)" }}
      >
        <div className="container text-center">
          <span
            className="eyebrow d-inline-flex mb-3 fw-bold"
            style={{
              color: "var(--lime)",
              justifyContent: "center",
              fontSize: "14px",
              letterSpacing: "2px",
            }}
          >
            THE COLLAB TALENT ECOSYSTEM
          </span>

          <h1 className="mt-2 display-3 fw-bold text-white max-w-3xl mx-auto">
            Our Ecosystem of Model & Creator Talent
          </h1>

          <p
            className="fs-lead mt-3 text-center opacity-85"
            style={{
              color: "#c9c6ba",
              maxWidth: "68ch",
              margin: "auto",
              fontSize: "1.15rem",
            }}
          >
            We connect industry-leading brands with Pakistan's top commercial models, influencers, and content creators to craft powerful authentic campaigns.
          </p>
        </div>
      </section>

      {/* Influencer & Model Partners Section ONLY */}
      <InfluencerPartnerSection />
    </main>
  );
}
