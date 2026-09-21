"use client";

import React, { useEffect, useState } from "react";
import {
  BsPersonHeart,
  BsPlayCircle,
  BsGeoAlt,
  BsRulers,
  BsPersonCheck,
  BsWhatsapp,
  BsPatchCheckFill,
  BsCalendarCheck,
} from "react-icons/bs";

export interface InfluencerPartner {
  id: string;
  full_name: string;
  gender: string;
  city: string;
  country?: string;
  age?: string;
  height: string;
  weight?: string | null;
  chest_bust?: string | null;
  waist?: string | null;
  hips?: string | null;
  shoe_size?: string | null;
  hair_color?: string | null;
  eye_color?: string | null;
  skin_tone: string;
  languages?: string | null;
  modeling_categories?: string[];
  skills?: string | null;
  previous_campaigns?: string | null;
  availability?: string | null;
  starting_rate?: string | null;
  experience?: string | null;
  profile_picture_url?: string | null;
  is_verified?: boolean;
  brands_worked_with: string[];
  images: string[];
  videos: string[];
}

const BOOKING_PHONE = "923158053198"; // 0315-8053198

const getWhatsAppBookingLink = (fullName: string, city: string, startingRate?: string | null) => {
  let text = `Hi! I would like to book model: ${fullName} (City: ${city}).`;
  if (startingRate) {
    text += ` Expected rate: ${startingRate}.`;
  }
  text += ` Please share booking details and availability schedule.`;
  return `https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(text)}`;
};

export default function InfluencerPartnerSection() {
  const [influencers, setInfluencers] = useState<InfluencerPartner[]>([]);
  const [loading, setLoading] = useState(true);

  // Model Profile Modal state
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerPartner | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos" | "stats">("photos");

  const fetchInfluencers = async () => {
    setLoading(true);
    let apiInfluencers: InfluencerPartner[] = [];
    try {
      const res = await fetch("/api/partners/influencer");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        apiInfluencers = json.data;
      }
    } catch (err) {
      console.error("Error fetching influencer partners:", err);
    }

    // Clear legacy localStorage custom models if present
    try {
      localStorage.removeItem("collabo_custom_models");
    } catch (e) {
      // Ignore localStorage errors
    }

    setInfluencers(apiInfluencers);
    setLoading(false);
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  return (
    <section className="py-5 my-3 position-relative bg-light md-rounded-5 px-3 px-md-5">
      <div className="container">
        {/* Header */}
        <div className="mb-5">
          <span className="eyebrow text-uppercase fw-bold mb-2" style={{ color: "var(--purple)", letterSpacing: "1px" }}>
            Creators & Models Directory
          </span>
          <h2 className="display-5 fw-bold mb-2">Influencer & Model Partners</h2>
          <p className="text-muted mb-0 max-w-xl" style={{ fontSize: "1.1rem" }}>
            Discover featured fashion models, commercial talent, and authentic content creators available for commercial campaigns and brand collaborations.
          </p>
        </div>

        {/* Loading / Empty / Content */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-purple" role="status" style={{ color: "var(--purple)", width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading creators...</span>
            </div>
            <p className="text-muted mt-3">Loading talent directory...</p>
          </div>
        ) : influencers.length === 0 ? (
          <div className="border rounded-4 p-5 text-center bg-white my-4 shadow-sm">
            <div className="p-3 bg-light rounded-circle d-inline-block mb-3">
              <BsPersonHeart className="fs-1 text-muted" />
            </div>
            <h4 className="fw-bold">No partners yet</h4>
            <p className="text-muted max-w-md mx-auto mb-0">
              Our talent directory is currently being updated with verified models and creators.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {influencers.map((inf) => {
              const profileImage =
                inf.profile_picture_url ||
                inf.images[0] ||
                "/assets/collabo-logo.png";

              return (
                <div key={inf.id} className="col-12 col-md-6 col-lg-3">
                  <div
                    className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden d-flex flex-column justify-content-between position-relative"
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
                    {/* Model Photo Container */}
                    <div className="position-relative" style={{ height: "360px", width: "100%", backgroundColor: "#f8f9fa" }}>
                      <img
                        src={profileImage}
                        alt={inf.full_name}
                        className="w-100 h-100"
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                      />

                      {/* Top Overlay Badges */}
                      <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-start" style={{ zIndex: 2 }}>
                        {inf.is_verified ? (
                          <span className="badge rounded-pill bg-white text-primary px-3 py-2 shadow-sm d-flex align-items-center gap-1 small fw-semibold">
                            <BsPatchCheckFill className="fs-6" /> Verified Model
                          </span>
                        ) : (
                          <span className="badge rounded-pill bg-white text-dark px-3 py-2 shadow-sm small fw-semibold">
                            Talent Partner
                          </span>
                        )}

                        <span className="badge rounded-pill bg-black bg-opacity-75 text-white px-3 py-2 small fw-semibold backdrop-blur">
                          {inf.images.length} Photos {inf.videos.length > 0 ? `• ${inf.videos.length} Videos` : ""}
                        </span>
                      </div>

                      {/* Bottom Name & Meta Overlay */}
                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex align-items-end justify-content-between"
                        style={{
                          background: "linear-gradient(to top, rgba(15,15,26,0.92) 0%, rgba(15,15,26,0.4) 60%, transparent 100%)",
                          zIndex: 2,
                        }}
                      >
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h4 className="fw-bold mb-0 text-white">{inf.full_name}</h4>
                            {inf.is_verified && (
                              <BsPatchCheckFill className="text-info fs-5" title="Verified Model" />
                            )}
                          </div>
                          <span className="small opacity-85 d-block mt-1">
                            {inf.gender} {inf.age ? `(${inf.age})` : ""} • {inf.city}, {inf.country || "Pakistan"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                      <div>
                        {/* Modeling Categories Chips */}
                        {/* {inf.modeling_categories && inf.modeling_categories.length > 0 && (
                          <div className="d-flex flex-wrap gap-1 mb-3">
                            {inf.modeling_categories.slice(0, 3).map((cat, idx) => (
                              <span
                                key={idx}
                                className="badge rounded-pill px-2 py-1 extra-small fw-semibold"
                                style={{ backgroundColor: "#f1e7fe", color: "var(--purple)" }}
                              >
                                {cat}
                              </span>
                            ))}
                            {inf.modeling_categories.length > 3 && (
                              <span className="badge rounded-pill bg-light text-muted px-2 py-1 extra-small border">
                                +{inf.modeling_categories.length - 3} more
                              </span>
                            )}
                          </div>
                        )} */}

                        {/* Physical Stats Badges */}
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
                          {/* {inf.shoe_size && (
                            <span className="badge bg-light text-dark border rounded-pill px-3 py-2">
                              Shoe: {inf.shoe_size}
                            </span>
                          )} */}
                        </div>

                        {/* Measurements compact strip if available */}
                        {/* {(inf.chest_bust || inf.waist || inf.hips) && (
                          <div className="p-2 mb-3 rounded-3 bg-light border extra-small text-muted d-flex justify-content-around text-center">
                            {inf.chest_bust && <div><strong>Bust:</strong> {inf.chest_bust}</div>}
                            {inf.waist && <div><strong>Waist:</strong> {inf.waist}</div>}
                            {inf.hips && <div><strong>Hips:</strong> {inf.hips}</div>}
                            {inf.weight && <div><strong>Weight:</strong> {inf.weight}</div>}
                          </div>
                        )} */}

                        {/* Starting Rate & Availability Strip */}
                        {(inf.starting_rate || inf.availability) && (
                          <div className="d-flex align-items-center justify-content-between mb-3 text-muted small">
                            {inf.starting_rate && (
                              <span className="fw-semibold text-dark">
                                Rate: <span className="text-success fw-bold">{inf.starting_rate}</span>
                              </span>
                            )}
                            {inf.availability && (
                              <span className="badge bg-light text-dark border rounded-pill px-2 py-1 extra-small">
                                <BsCalendarCheck className="me-1 text-primary" /> {inf.availability}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Experience */}
                        {inf.experience && (
                          <p
                            className="small text-muted mb-3"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {inf.experience}
                          </p>
                        )}

                        {/* Brands Worked With Chips */}
                        {/* {inf.brands_worked_with && inf.brands_worked_with.length > 0 && (
                          <div className="mb-3">
                            <span className="extra-small text-uppercase text-muted fw-bold d-block mb-1">
                              Worked With:
                            </span>
                            <div className="d-flex flex-wrap gap-1">
                              {inf.brands_worked_with.map((b, idx) => (
                                <span
                                  key={idx}
                                  className="badge rounded-pill px-2 py-1 extra-small border"
                                  style={{ backgroundColor: "#f8f9fa", color: "#333" }}
                                >
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                        )} */}
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex flex-column gap-2 mt-2">
                        <a
                          href={getWhatsAppBookingLink(inf.full_name, inf.city, inf.starting_rate)}
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
                          View Rising Studio Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rising Studio Model Profile Lightbox Modal */}
        {selectedInfluencer && (
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ backgroundColor: "rgba(15, 15, 26, 0.9)", zIndex: 1060 }}
          >
            <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
              <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden bg-white">
                {/* Modal Header */}
                <div className="modal-header border-0 pb-3 px-4 pt-4 position-relative bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle overflow-hidden border border-3 border-white shadow-sm"
                      style={{ width: "70px", height: "70px", minWidth: "70px" }}
                    >
                      <img
                        src={
                          selectedInfluencer.profile_picture_url ||
                          selectedInfluencer.images[0] ||
                          "/assets/collabo-logo.png"
                        }
                        alt={selectedInfluencer.full_name}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="eyebrow text-uppercase fw-bold" style={{ color: "var(--purple)", fontSize: "12px" }}>
                          Rising Studio Model Profile
                        </span>
                        {selectedInfluencer.is_verified && (
                          <span className="badge bg-primary text-white rounded-pill px-2 py-1 extra-small d-inline-flex align-items-center gap-1">
                            <BsPatchCheckFill /> Verified
                          </span>
                        )}
                      </div>
                      <h3 className="fw-bold mb-1 d-flex align-items-center gap-2">
                        {selectedInfluencer.full_name}
                      </h3>
                      <p className="text-muted mb-0 small">
                        {selectedInfluencer.gender} {selectedInfluencer.age ? `• Age: ${selectedInfluencer.age}` : ""} • {selectedInfluencer.city}, {selectedInfluencer.country || "Pakistan"}
                        {selectedInfluencer.starting_rate && ` • Starting Rate: ${selectedInfluencer.starting_rate}`}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-4"
                    onClick={() => setSelectedInfluencer(null)}
                  ></button>
                </div>

                <div className="modal-body p-4">
                  {/* Modeling Categories Pills */}
                  {selectedInfluencer.modeling_categories && selectedInfluencer.modeling_categories.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {selectedInfluencer.modeling_categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="badge rounded-pill px-3 py-2 small fw-semibold"
                          style={{ backgroundColor: "#f1e7fe", color: "var(--purple)" }}
                        >
                          ★ {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Comp Card / Physical Measurements Grid */}
                  <div className="card border-0 bg-light rounded-4 p-4 mb-4">
                    <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                      <BsRulers className="text-purple" /> Model Comp-Card & Physical Stats
                    </h6>
                    <div className="row g-3 text-center">
                      <div className="col-4 col-md-2">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Height</span>
                          <strong className="small text-dark">{selectedInfluencer.height}</strong>
                        </div>
                      </div>
                      <div className="col-4 col-md-2">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Weight</span>
                          <strong className="small text-dark">{selectedInfluencer.weight || "—"}</strong>
                        </div>
                      </div>
                      <div className="col-4 col-md-2">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Chest/Bust</span>
                          <strong className="small text-dark">{selectedInfluencer.chest_bust || "—"}</strong>
                        </div>
                      </div>
                      <div className="col-4 col-md-2">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Waist</span>
                          <strong className="small text-dark">{selectedInfluencer.waist || "—"}</strong>
                        </div>
                      </div>
                      <div className="col-4 col-md-2">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Hips</span>
                          <strong className="small text-dark">{selectedInfluencer.hips || "—"}</strong>
                        </div>
                      </div>
                      <div className="col-4 col-md-2">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Shoe Size</span>
                          <strong className="small text-dark">{selectedInfluencer.shoe_size || "—"}</strong>
                        </div>
                      </div>
                      <div className="col-4 col-md-3">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Hair Color</span>
                          <strong className="small text-dark">{selectedInfluencer.hair_color || "—"}</strong>
                        </div>
                      </div>
                      <div className="col-4 col-md-3">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Eye Color</span>
                          <strong className="small text-dark">{selectedInfluencer.eye_color || "—"}</strong>
                        </div>
                      </div>
                      <div className="col-4 col-md-3">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Skin Tone</span>
                          <strong className="small text-dark">{selectedInfluencer.skin_tone}</strong>
                        </div>
                      </div>
                      <div className="col-12 col-md-3">
                        <div className="p-2 bg-white rounded-3 shadow-xs border">
                          <span className="extra-small text-muted d-block">Languages</span>
                          <strong className="small text-dark">{selectedInfluencer.languages || "Urdu, English"}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    {(selectedInfluencer.skills || selectedInfluencer.previous_campaigns || selectedInfluencer.availability) && (
                      <div className="row g-3 mt-1 pt-3 border-top">
                        {selectedInfluencer.skills && (
                          <div className="col-md-4">
                            <span className="extra-small text-muted fw-bold d-block text-uppercase">Special Skills</span>
                            <span className="small text-dark">{selectedInfluencer.skills}</span>
                          </div>
                        )}
                        {selectedInfluencer.availability && (
                          <div className="col-md-4">
                            <span className="extra-small text-muted fw-bold d-block text-uppercase">Availability</span>
                            <span className="small text-dark">{selectedInfluencer.availability}</span>
                          </div>
                        )}
                        {selectedInfluencer.previous_campaigns && (
                          <div className="col-md-4">
                            <span className="extra-small text-muted fw-bold d-block text-uppercase">Notable Campaigns</span>
                            <span className="small text-dark">{selectedInfluencer.previous_campaigns}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Portfolio Navigation Tabs */}
                  <ul className="nav nav-pills mb-4 gap-2 border-bottom pb-3">
                    <li className="nav-item">
                      <button
                        className={`nav-link rounded-pill px-4 ${activeTab === "photos" ? "active bg-dark text-white" : "bg-light text-dark"}`}
                        onClick={() => setActiveTab("photos")}
                      >
                        Portfolio Photos ({selectedInfluencer.images.length})
                      </button>
                    </li>
                    {selectedInfluencer.videos.length > 0 && (
                      <li className="nav-item">
                        <button
                          className={`nav-link rounded-pill px-4 ${activeTab === "videos" ? "active bg-dark text-white" : "bg-light text-dark"}`}
                          onClick={() => setActiveTab("videos")}
                        >
                          Videos & Runway Reels ({selectedInfluencer.videos.length})
                        </button>
                      </li>
                    )}
                  </ul>

                  {/* Photos Grid */}
                  {activeTab === "photos" && (
                    <div className="row g-3">
                      {selectedInfluencer.images.map((imgUrl, idx) => (
                        <div key={idx} className="col-12 col-sm-6 col-md-4">
                          <div className="rounded-4 overflow-hidden shadow-sm border bg-light position-relative" style={{ height: "340px" }}>
                            <img
                              src={imgUrl}
                              alt={`${selectedInfluencer.full_name} portfolio shoot ${idx + 1}`}
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                            <span className="position-absolute bottom-0 start-0 m-2 badge bg-black bg-opacity-75 text-white px-2 py-1 extra-small">
                              Photo {idx + 1}
                            </span>
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
                              style={{ maxHeight: "420px" }}
                            >
                              <source src={videoUrl} />
                              Your browser does not support HTML5 video playback.
                            </video>
                            <div className="p-2 bg-dark text-white extra-small text-center">
                              Reel / Video {idx + 1}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Brands & Bio */}
                  {selectedInfluencer.brands_worked_with && selectedInfluencer.brands_worked_with.length > 0 && (
                    <div className="mt-4 pt-3 border-top">
                      <span className="extra-small text-uppercase text-muted fw-bold d-block mb-2">
                        Brand Collaborations:
                      </span>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedInfluencer.brands_worked_with.map((b, idx) => (
                          <span
                            key={idx}
                            className="badge rounded-pill px-3 py-2 small border"
                            style={{ backgroundColor: "#f8f9fa", color: "var(--purple)" }}
                          >
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedInfluencer.experience && (
                    <div className="mt-3">
                      <span className="extra-small text-uppercase text-muted fw-bold d-block mb-1">
                        Professional Bio:
                      </span>
                      <p className="text-muted small mb-0">{selectedInfluencer.experience}</p>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer border-0 p-4 pt-0 d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setSelectedInfluencer(null)}
                  >
                    Close Profile
                  </button>
                  <a
                    href={getWhatsAppBookingLink(selectedInfluencer.full_name, selectedInfluencer.city, selectedInfluencer.starting_rate)}
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
