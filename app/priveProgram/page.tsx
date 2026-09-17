"use client";

import Link from "next/link";
import "./prive-program.css";

interface CheckIconProps {
  dark?: boolean;
}

function CheckIcon({ dark = false }: CheckIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={dark ? "#fffafa" : "#0a0a0a"}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill={dark ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.12)"}
        stroke="none"
      />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      {/* Hero */}
   

    <section
    className="section pb-3 bg-ink blog-main "
    style={{ paddingTop: "10rem" }}
    >
    <div className="container">
    <span
    className="eyebrow"
    style={{
    width: "100%",
    justifyContent: "center",
    }}
    >
    Prive Program
    </span>

    <h1 className="mt-3 text-center">
    Collabo Privé
    </h1>

    <p
    className="fs-lead mt-3 text-center"
    style={{
    color: "#c9c6ba",
    maxWidth: "60ch",
    margin: "auto",
    }}
    >
    Our most exclusive program — for elite creators and brands
    that demand the highest quality UGC. 
    </p>
    </div>
    </section>

      {/* Two Cards */}
      <section className="prive-cards-section">
        <div className="container">
          <div className="row g-4">
            {/* Creators Card */}
            <div className="col-lg-6 custom-cards">
              <div className="prime-card prime-card-light">
                <span className="eyebrow-pink">For Creators</span>
                <h3 className="mt-3">Elite Membership</h3>
                <p className="muted">
                  Exclusively for our highest-scoring creators. More
                  cashback, priority brand deals, exclusive events, and an
                  official Ambassador Certificate.
                </p>
                <ul className="prime-check-list">
                  <li>
                    <CheckIcon />
                    Up to 100% cashback on all brand purchases
                  </li>
                  <li>
                    <CheckIcon />
                    Priority access to premium campaign briefs
                  </li>
                  <li>
                    <CheckIcon />
                    Exclusive brand events and creator summits
                  </li>
                  <li>
                    <CheckIcon />
                    Collabo Privé Ambassador Certificate
                  </li>
                  <li>
                    <CheckIcon/>
                    Dedicated creator success manager
                  </li>
                  <li>
                    <CheckIcon />
                    Early access to new brand partnerships
                  </li>
                </ul>

                <div className="qualify-box">
                  <strong>How to qualify:</strong> Achieve a COLLABO Score of
                  750+ and maintain it for 30 days. You&apos;ll receive an
                  automatic Privé invite in the app.
                </div>

                <Link href="/collaboScore" className="boost-link">
                  How to boost your score →
                </Link>
              </div>
            </div>

            {/* Brands Card */}
            <div className="col-lg-6 custom-cards">
              <div className="prime-card prime-card-dark">
                <span className="eyebrow-gold">For Brands</span>
                <h3 className="mt-3 text-white">Premium UGC Production</h3>
                <p className="muted-light">
                  Brief-led, ad-ready UGC from Pakistan&apos;s top nano and
                  micro influencers. Full commercial rights included. Built
                  for performance marketing teams.
                </p>
                <ul className="prime-check-list prime-check-list-dark">
                  <li>
                    <CheckIcon dark />
                    Curated top-tier creator matching
                  </li>
                  <li>
                    <CheckIcon dark />
                    Brief-led production with quality review
                  </li>
                  <li>
                    <CheckIcon dark />
                    Ad-ready assets for Meta, Instagram, YouTube
                  </li>
                  <li>
                    <CheckIcon dark />
                    Full commercial usage rights
                  </li>
                  <li>
                    <CheckIcon dark />
                    Multiple creative variations for A/B testing
                  </li>
                  <li>
                    <CheckIcon dark />
                    Dedicated brand account manager
                  </li>
                </ul>

                <a href="mailto:brands@collabo.pk" className="enquire-btn">
                  Enquire About Privé →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="prive-stats">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3 col-6">
              <h2 className="stat-number">750+</h2>
              <p className="stat-label">MIN COLLABO SCORE TO QUALIFY</p>
            </div>
            <div className="col-md-3 col-6">
              <h2 className="stat-number">3x</h2>
              <p className="stat-label">HIGHER ENGAGEMENT VS STANDARD TIER</p>
            </div>
            <div className="col-md-3 col-6">
              <h2 className="stat-number">100%</h2>
              <p className="stat-label">COMMERCIAL RIGHTS INCLUDED</p>
            </div>
            <div className="col-md-3 col-6">
              <h2 className="stat-number">48h</h2>
              <p className="stat-label">AVERAGE CONTENT TURNAROUND</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}