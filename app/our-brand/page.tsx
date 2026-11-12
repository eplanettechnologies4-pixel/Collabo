import React from "react";
import BrandPartnerSection from "@/components/partners/BrandPartnerSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Brand | Collabo Brand Network",
  description:
    "Explore Collabo's trusted brand partners in Pakistan. Discover collaborating fashion, beauty, food, and lifestyle brands.",
};

export default function OurBrandPage() {
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
            OUR BRAND DIRECTORY
          </span>

          <h1 className="mt-2 display-3 fw-bold text-white max-w-3xl mx-auto">
            Our Ecosystem of Brand Partners
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
            Discover leading fashion, beauty, food, and lifestyle brands collaborating with Pakistan's top creator community.
          </p>
        </div>
      </section>

      {/* Brand Partners Cards Grid */}
      <BrandPartnerSection />
    </main>
  );
}
