"use client";

import React, { useEffect, useState } from "react";
import {
  BsPersonHeart,
  BsPlusCircle,
  BsPlayCircle,
  BsGeoAlt,
  BsRulers,
  BsPersonCheck,
  BsWhatsapp,
} from "react-icons/bs";
import InfluencerApplyForm from "./InfluencerApplyForm";

export interface InfluencerPartner {
  id: string;
  full_name: string;
  gender: string;
  city: string;
  height: string;
  skin_tone: string;
  experience?: string | null;
  brands_worked_with: string[];
  images: string[];
  videos: string[];
}

const BOOKING_PHONE = "923158053198"; // 0315-8053198

const getWhatsAppBookingLink = (fullName: string, city: string) => {
  const text = `Hi! I would like to book model: ${fullName} (City: ${city}). Please share booking details and availability.`;
  return `https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(text)}`;
};

export default function InfluencerPartnerSection() {
  const [influencers, setInfluencers] = useState<InfluencerPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gallery Modal state
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerPartner | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const fetchInfluencers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partners/influencer");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setInfluencers(json.data);
      }
    } catch (err) {
      console.error("Error fetching influencer partners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  return (
    <section className="py-5 my-3 position-relative bg-light rounded-5 px-3 px-md-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-5 gap-3">
          <div>
            <span className="eyebrow text-uppercase fw-bold mb-2" style={{ color: "var(--purple)", letterSpacing: "1px" }}>
              Creators & Models
            </span>
            <h2 className="display-5 fw-bold mb-2">Influencer & Model Partners</h2>
            <p className="text-muted mb-0 max-w-xl" style={{ fontSize: "1.1rem" }}>
              Discover featured models and authentic content creators available for brand campaigns and commercial collaborations.
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-lg rounded-pill px-4 py-2 text-white fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #7b2ff7 0%, #4f2998 100%)",
                border: "none",
              }}
            >
              <BsPlusCircle className="fs-5" />
              Apply as Influencer / Model
            </button>
          </div>
        </div>

        {/* Loading / Empty / Content */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-purple" role="status" style={{ color: "var(--purple)", width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading creators...</span>
            </div>
            <p className="text-muted mt-3">Loading influencer partners...</p>
          </div>
        ) : influencers.length === 0 ? (
          <div className="border rounded-4 p-5 text-center bg-white my-4 shadow-sm">
            <div className="p-3 bg-light rounded-circle d-inline-block mb-3">
              <BsPersonHeart className="fs-1 text-muted" />
            </div>
            <h4 className="fw-bold">No partners yet</h4>
            <p className="text-muted max-w-md mx-auto mb-4">
              Join our talent directory to get featured and land partnerships with top Pakistani & international brands.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-dark rounded-pill px-4 py-2 fw-medium"
            >
              Submit Application
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {influencers.map((inf) => {
              const coverImage = inf.images[0] || "/assets/collabo-logo.png";
              return (
                <div key={inf.id} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden d-flex flex-column justify-content-between"
                    style={{
                      background: "#ffffff",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.04)";
                    }}
                  >
                    {/* Cover Image & Media Badges */}
                    <div className="position-relative" style={{ height: "320px", width: "100%" }}>
                      <img
                        src={coverImage}
                        alt={inf.full_name}
                        className="w-100 h-100"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                      <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-dark text-white d-flex align-items-end justify-content-between"
                        style={{ background: "linear-gradient(to top, rgba(15,15,26,0.85) 0%, transparent 100%)" }}>
                        <div>
                          <h4 className="fw-bold mb-0 text-white">{inf.full_name}</h4>
                          <span className="small opacity-75">{inf.gender} • {inf.city}</span>
                        </div>
                        <span className="badge rounded-pill bg-white text-dark px-3 py-2 small fw-semibold">
                          {inf.images.length} Photos {inf.videos.length > 0 ? `• ${inf.videos.length} Videos` : ""}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                      <div>
                        {/* Stats Badges */}
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                            <BsGeoAlt className="me-1 text-purple" /> {inf.city}
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                            <BsRulers className="me-1 text-purple" /> {inf.height}
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                            <BsPersonCheck className="me-1 text-purple" /> {inf.skin_tone} Tone
                          </span>
                        </div>

                        {/* Experience */}
                        {inf.experience && (
                          <p className="small text-muted mb-3 text-truncate-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {inf.experience}
                          </p>
                        )}

                        {/* Brands Worked With Chips */}
                        {inf.brands_worked_with && inf.brands_worked_with.length > 0 && (
                          <div className="mb-3">
                            <span className="extra-small text-uppercase text-muted fw-bold d-block mb-1">Worked With:</span>
                            <div className="d-flex flex-wrap gap-1">
                              {inf.brands_worked_with.map((b, idx) => (
                                <span key={idx} className="badge bg-purple-soft text-purple rounded-pill px-2 py-1 extra-small" style={{ backgroundColor: "#f1e7fe", color: "var(--purple)" }}>
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex flex-column gap-2 mt-3">
                        <a
                          href={getWhatsAppBookingLink(inf.full_name, inf.city)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success rounded-pill w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 text-white shadow-sm"
                          style={{ background: "#25D366", borderColor: "#25D366" }}
                        >
                          <BsWhatsapp className="fs-5" />
                          Book Your Model
                        </a>
                        <button
                          onClick={() => {
                            setSelectedInfluencer(inf);
                            setActiveTab("photos");
                          }}
                          className="btn btn-outline-dark rounded-pill w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        >
                          <BsPlayCircle />
                          View Portfolio Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Apply Modal */}
        <InfluencerApplyForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchInfluencers();
          }}
        />

        {/* Portfolio Lightbox Modal */}
        {selectedInfluencer && (
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ backgroundColor: "rgba(15, 15, 26, 0.9)", zIndex: 1060 }}
          >
            <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
              <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden bg-white">
                <div className="modal-header border-0 pb-0 px-4 pt-4 position-relative">
                  <div>
                    <h3 className="fw-bold mb-1">{selectedInfluencer.full_name}</h3>
                    <p className="text-muted mb-0 small">
                      {selectedInfluencer.gender} • {selectedInfluencer.city} • Height: {selectedInfluencer.height} • Skin Tone: {selectedInfluencer.skin_tone}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-4"
                    onClick={() => setSelectedInfluencer(null)}
                  ></button>
                </div>

                <div className="modal-body p-4">
                  {/* Tabs */}
                  <ul className="nav nav-pills mb-4 gap-2 border-bottom pb-3">
                    <li className="nav-item">
                      <button
                        className={`nav-link rounded-pill px-4 ${activeTab === "photos" ? "active bg-dark text-white" : "bg-light text-dark"}`}
                        onClick={() => setActiveTab("photos")}
                      >
                        Photos ({selectedInfluencer.images.length})
                      </button>
                    </li>
                    {selectedInfluencer.videos.length > 0 && (
                      <li className="nav-item">
                        <button
                          className={`nav-link rounded-pill px-4 ${activeTab === "videos" ? "active bg-dark text-white" : "bg-light text-dark"}`}
                          onClick={() => setActiveTab("videos")}
                        >
                          Videos ({selectedInfluencer.videos.length})
                        </button>
                      </li>
                    )}
                  </ul>

                  {/* Photos Grid */}
                  {activeTab === "photos" && (
                    <div className="row g-3">
                      {selectedInfluencer.images.map((imgUrl, idx) => (
                        <div key={idx} className="col-12 col-sm-6 col-md-4">
                          <div className="rounded-3 overflow-hidden shadow-sm border bg-light" style={{ height: "300px" }}>
                            <img
                              src={imgUrl}
                              alt={`${selectedInfluencer.full_name} photo ${idx + 1}`}
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Videos Grid */}
                  {activeTab === "videos" && (
                    <div className="row g-4">
                      {selectedInfluencer.videos.map((videoUrl, idx) => (
                        <div key={idx} className="col-12 col-md-6">
                          <div className="rounded-4 overflow-hidden shadow-sm border bg-black">
                            <video
                              controls
                              src={videoUrl}
                              className="w-100"
                              style={{ maxHeight: "400px" }}
                            >
                              <source src={videoUrl} />
                              Your browser does not support HTML5 video playback.
                            </video>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="modal-footer border-0 p-4 pt-0 d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setSelectedInfluencer(null)}
                  >
                    Close Portfolio
                  </button>
                  <a
                    href={getWhatsAppBookingLink(selectedInfluencer.full_name, selectedInfluencer.city)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 text-white shadow-sm"
                    style={{ background: "#25D366", borderColor: "#25D366" }}
                  >
                    <BsWhatsapp className="fs-5" />
                    Book {selectedInfluencer.full_name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
