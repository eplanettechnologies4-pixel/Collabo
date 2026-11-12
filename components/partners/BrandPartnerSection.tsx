"use client";

import React, { useEffect, useState } from "react";
import { BsBuilding, BsGlobe, BsArrowUpRight } from "react-icons/bs";

export interface BrandPartner {
  id: string;
  brand_name: string;
  contact_person: string;
  website?: string | null;
  logo_url: string;
}

export default function BrandPartnerSection() {
  const [brands, setBrands] = useState<BrandPartner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    setLoading(true);
    let apiBrands: BrandPartner[] = [];
    try {
      const res = await fetch("/api/partners/brand");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        apiBrands = json.data;
      }
    } catch (err) {
      console.error("Error fetching brand partners:", err);
    }

    // Clear legacy localStorage custom brands if present
    try {
      localStorage.removeItem("collabo_custom_brands");
    } catch (e) {
      // Ignore localStorage errors
    }

    setBrands(apiBrands);
    setLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <section className="py-5 my-3 position-relative">
      <div className="container">
        {/* Header */}
        <div className="mb-5">
          <span className="eyebrow text-uppercase fw-bold mb-2" style={{ color: "var(--purple)", letterSpacing: "1px" }}>
            Collaborating Brands
          </span>
          <h2 className="display-5 fw-bold mb-2">Brand Partners</h2>
          <p className="text-muted mb-0 max-w-xl" style={{ fontSize: "1.1rem" }}>
            Leading fashion, beauty, food, and lifestyle brands partnering with Pakistan's top creator community.
          </p>
        </div>

        {/* Content State */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-purple" role="status" style={{ color: "var(--purple)", width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading brands...</span>
            </div>
            <p className="text-muted mt-3">Loading brand partners...</p>
          </div>
        ) : brands.length === 0 ? (
          <div className="border rounded-4 p-5 text-center bg-light my-4">
            <div className="p-3 bg-white rounded-circle d-inline-block shadow-sm mb-3">
              <BsBuilding className="fs-1 text-muted" />
            </div>
            <h4 className="fw-bold">No partners yet</h4>
            <p className="text-muted max-w-md mx-auto mb-0">
              Our brand directory is currently being updated with verified partners.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {brands.map((brand) => (
              <div key={brand.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div
                  className="card h-100 border-0 rounded-4 shadow-sm p-4 text-center d-flex flex-column align-items-center justify-content-between"
                  style={{
                    background: "#ffffff",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(123,47,247,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.04)";
                  }}
                >
                  <div className="w-100 mb-3 d-flex align-items-center justify-content-center" style={{ height: "100px" }}>
                    <img
                      src={brand.logo_url}
                      alt={brand.brand_name}
                      style={{ maxHeight: "80px", maxWidth: "80%", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">{brand.brand_name}</h5>
                    <p className="text-muted small mb-3">Contact: {brand.contact_person}</p>
                  </div>
                  {brand.website ? (
                    <a
                      href={brand.website.startsWith("http") ? brand.website : `https://${brand.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-dark rounded-pill px-3 d-inline-flex align-items-center gap-1 mt-2"
                    >
                      <BsGlobe className="small" />
                      Visit Website
                      <BsArrowUpRight className="small" />
                    </a>
                  ) : (
                    <span className="badge bg-light text-secondary rounded-pill px-3 py-2 small fw-normal">
                      Verified Partner
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
