"use client";

import Link from "next/link";
import "./creator-stories.css";

const stories = [
  {
    handle: "@amna.creates",
    meta: "12.4K followers · Beauty & Skincare",
    quote:
      "I was already creating content and sharing it online. COLLABO gave me a way to turn that work into actual earning opportunities.",
    amount: "₨38,000/month",
  },
  {
    handle: "@usman.fits",
    meta: "31.8K followers · Men's Fashion",
    quote:
      "I started with no monthly earnings from my content. Six months later, I'm earning around ₨85K a month through campaigns with brands I genuinely like.",
    amount: "₨85,000/month",
  },
  {
    handle: "@hira_reels",
    meta: "15.3K followers · Lifestyle",
    quote:
      "Before COLLABO, I never really thought of myself as a professional creator. Now I have regular opportunities to work with brands and earn from the content I create.",
    amount: "₨52,000/month",
  },
];

export default function Page() {
  return (
    <>

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
  Creator Stories
  </span>

  <h1 className="mt-3 text-center">
  Real Creators.
  <br />
  Real Earnings.
  </h1>

  <p
  className="fs-lead mt-3 text-center"
  style={{
  color: "#c9c6ba",
  maxWidth: "60ch",
  margin: "auto",
  }}
  >
  See how creators are using their Instagram presence to find brand
  opportunities and earn through COLLABO.  
  </p>
  </div>
  </section>



      {/* Story Grid */}
      <section className="section">
        <div className="container">
          <div className="row g-4">
            {stories.map((story) => (
              <div className="col-md-4" key={story.handle}>
                <div className="story-card">
                  <div className="d-flex align-items-center gap-3">
                    <div className="story-avatar"></div>
                    <div>
                      <p className="story-handle">{story.handle}</p>
                      <p className="story-meta mb-0">{story.meta}</p>
                    </div>
                  </div>
                  <p className="story-quote">&quot;{story.quote}&quot;</p>
                  <span className="story-earn-badge">
                    <span className="story-earn-label">Monthly Earnings</span>
                    <span className="story-earn-amount">{story.amount}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link href="/brands" className="btn btn-cta-hero">
              Start Creating With COLLABO →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}