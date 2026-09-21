import React, { Suspense } from "react";
import JoinUsClient from "./JoinUsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Us | Become a Partner or Model | Collabo",
  description:
    "Join Pakistan's leading creator & brand ecosystem. Register your brand to partner with us or sign up as a commercial model and influencer.",
};

export default function JoinUsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-vh-100 bg-ink d-flex align-items-center justify-content-center text-white">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <JoinUsClient />
    </Suspense>
  );
}
