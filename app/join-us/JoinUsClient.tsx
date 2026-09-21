"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BrandPartnerForm from "@/components/join-us/BrandPartnerForm";
import ModelRegistrationForm from "@/components/join-us/ModelRegistrationForm";
import { BsBuilding, BsPersonBadge } from "react-icons/bs";

export default function JoinUsClient() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"partner" | "influencer">("partner");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "model" || tabParam === "influencer") {
      setActiveTab("influencer");
    } else if (tabParam === "partner" || tabParam === "brand") {
      setActiveTab("partner");
    }
  }, [searchParams]);

  return (
    <main className="bg-light min-vh-100 pb-5">
      {/* Hero Section */}
      <section
        className="section pb-5 bg-ink text-white position-relative overflow-hidden"
        style={{ paddingTop: "8.5rem", background: "var(--ink)" }}
      >
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <span
            className="eyebrow d-inline-flex mb-3 fw-bold"
            style={{
              color: "var(--lime)",
              justifyContent: "center",
              fontSize: "14px",
              letterSpacing: "2px",
            }}
          >
            JOIN COLLABO NETWORK
          </span>

          <h1 className="mt-2 display-4 fw-bold text-white max-w-3xl mx-auto">
            Expand Your Brand or Launch Your Modeling Career
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
            Whether you are a brand looking to boost sales with creator partnerships, or an influencer / model ready for commercial campaigns — choose your path below.
          </p>
        </div>
      </section>

      {/* Tabs Container */}
      <div className="container mt-n4 position-relative" style={{ zIndex: 10,  }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            {/* Sleek Tab Switcher Bar */}
            <div
              className="bg-white rounded-pill p-2 shadow-lg mb-4 d-flex justify-content-center gap-2 max-w-xl mx-auto border mt-5"
              style={{ maxWidth: "600px" }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("partner")}
                className={`btn flex-fill new-custom-btn rounded-pill py-3 fw-bold transition-all d-flex align-items-center justify-content-center gap-2 ${
                  activeTab === "partner"
                    ? "text-white shadow"
                    : "text-secondary hover-bg-light"
                }`}
                style={{
                  background:
                    activeTab === "partner"
                      ? "linear-gradient(135deg, #7b2ff7 0%, #4f2998 100%)"
                      : "transparent",
                  border: "none",
                  fontSize: "1.05rem",
                }}
              >
                <BsBuilding className="fs-5" />
                Become our Partner
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("influencer")}
                className={`btn new-custom-btn flex-fill rounded-pill py-3 fw-bold transition-all d-flex align-items-center justify-content-center gap-2 ${
                  activeTab === "influencer"
                    ? "text-white shadow"
                    : "text-secondary hover-bg-light"
                }`}
                style={{
                  background:
                    activeTab === "influencer"
                      ? "linear-gradient(135deg, #7b2ff7 0%, #4f2998 100%)"
                      : "transparent",
                  border: "none",
                  fontSize: "1.05rem",
                }}
              >
                <BsPersonBadge className="fs-5" />
                Become our Influencer/Model
              </button>
            </div>

            {/* Active Tab Form Component */}
            <div className="tab-content transition-all">
              {activeTab === "partner" ? (
                <BrandPartnerForm />
              ) : (
                <ModelRegistrationForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
