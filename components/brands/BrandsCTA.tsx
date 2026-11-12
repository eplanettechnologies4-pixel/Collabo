// export default function BrandsCTA(){
//     return (
//     <>
//     <section className="showcase-cta" id="contact">
//   <div className="showcase-grid">
//     <img src="https://picsum.photos/seed/collab-sc1/300/500" alt="Featured creator content" />
//     <img src="https://picsum.photos/seed/collab-sc2/300/500" alt="Featured creator content" />
//     <img src="https://picsum.photos/seed/collab-sc3/300/500" alt="Featured creator content" />
//     <img src="https://picsum.photos/seed/collab-sc4/300/500" alt="Featured creator content" />
//     <img src="https://picsum.photos/seed/collab-sc5/300/500" alt="Featured creator content" />
//     <img src="https://picsum.photos/seed/collab-sc6/300/500" alt="Featured creator content" />
//   </div>
//   <div className="showcase-overlay"></div>
//   <div className="showcase-content">
//    <h2>Want creators to feature your brand?</h2>
//     <button type="button" className="btn btn-orange showcase-btn" data-bs-toggle="modal" data-bs-target="#strategyCallModal">Contact us ↗</button>
//   </div>
// </section>


// <div className="modal fade" id="strategyCallModal" tabIndex={-1} aria-hidden="true">
//   <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//     <div className="modal-content strategy-modal-content">
//       <div className="modal-header border-0 pb-0">
//         <span className="model-tag" style={{background:"rgba(255,138,30,.14)",color:"var(--orange-dark)"}}>Get Started</span>
//         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div className="modal-body pt-2">
//         <h3 className="mb-2" style={{fontSize:"1.6rem"}}>Ready to discuss your campaign?</h3>
// <p className="small mb-4" style={{color:"black"}}>Tell us a little about your brand and what you want to achieve. Our team will review your details and get in touch to discuss the next steps.</p>
//         <form data-demo>
//           <div className="mb-3">
//             <label className="form-label">Brand / Company Name</label>
//             <input type="text" className="form-control" placeholder="Your brand name" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Brand Website / Instagram Handle</label>
//             <input type="text" className="form-control" placeholder="yourwebsite.com or @yourbrand" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Monthly Marketing Budget</label>
//           <select className="form-select" defaultValue="">
//           <option value="" disabled>
//           Select budget range
//           </option>
//           <option value="Under ₨1 Lakh">Under ₨1 Lakh</option>
//           <option value="₨1L – ₨5L">₨1L – ₨5L</option>
//           <option value="₨5L – ₨20L">₨5L – ₨20L</option>
//           <option value="₨20L+">₨20L+</option>
//           </select>
//           </div>
//           <div className="row g-3 mb-3">
//             <div className="col-sm-6">
//               <label className="form-label">Your Work Email</label>
//               <input type="email" className="form-control" placeholder="you@yourcompany.com" required />
//             </div>
//             <div className="col-sm-6">
//               <label className="form-label">Mobile Number</label>
//               <input type="tel" className="form-control" placeholder="+92 300 1234567" required />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="form-label">Campaign Goal <span className="fw-normal text-lowercase" style={{color:"var(--muted)"}}>(optional)</span></label>
//             <textarea className="form-control" rows={3} placeholder="Tell us what you're trying to achieve..."></textarea>
//           </div>
//           <button type="submit" className="btn btn-orange w-100">Book a Strategy Call</button>
//           <p className="form-note small mt-2 d-none"></p>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>

//     </>
//     )
// }




"use client";
import { useState } from "react";

export default function BrandsCTA() {
  const [form, setForm] = useState({
    brandName: "",
    brandWebsite: "",
    budget: "",
    email: "",
    phone: "",
    goal: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/strategy-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setForm({ brandName: "", brandWebsite: "", budget: "", email: "", phone: "", goal: "" });
    setStatus("idle");
  };

  return (
    <>
      <section className="showcase-cta" id="contact">
        <div className="showcase-grid">
          <img src="https://picsum.photos/seed/collab-sc1/300/500" alt="Featured creator content" />
          <img src="https://picsum.photos/seed/collab-sc2/300/500" alt="Featured creator content" />
          <img src="https://picsum.photos/seed/collab-sc3/300/500" alt="Featured creator content" />
          <img src="https://picsum.photos/seed/collab-sc4/300/500" alt="Featured creator content" />
          <img src="https://picsum.photos/seed/collab-sc5/300/500" alt="Featured creator content" />
          <img src="https://picsum.photos/seed/collab-sc6/300/500" alt="Featured creator content" />
        </div>
        <div className="showcase-overlay"></div>
        <div className="showcase-content">
          <h2>Want creators to feature your brand?</h2>
          <button
            type="button"
            className="btn btn-orange showcase-btn"
            data-bs-toggle="modal"
            data-bs-target="#strategyCallModal"
          >
            Contact us ↗
          </button>
        </div>
      </section>

      <div
        className="modal fade"
        id="strategyCallModal"
        tabIndex={-1}
        aria-hidden="true"
        onTransitionEnd={() => {
          // optional: reset form after modal fully closes so it's fresh next time
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content strategy-modal-content">
            <div className="modal-header border-0 pb-0">
              <span
                className="model-tag"
                style={{ background: "rgba(255,138,30,.14)", color: "var(--orange-dark)" }}
              >
                Get Started
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              ></button>
            </div>

            <div className="modal-body pt-2">
              {status === "success" ? (
                <div className="text-center py-4">
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="fw-bold mb-3">You're in the queue!</h3>
                  <p className="text-muted" style={{ maxWidth: 320, margin: "0 auto" }}>
                    A Collabo strategist will reach out to{" "}
                    <strong style={{ color: "#000" }}>{form.email}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="mb-2" style={{ fontSize: "1.6rem" }}>Ready to discuss your campaign?</h3>
                  <p className="small mb-4" style={{ color: "black" }}>
                    Tell us a little about your brand and what you want to achieve. Our team will review your details and get in touch to discuss the next steps.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Brand / Company Name</label>
                      <input
                        type="text"
                        name="brandName"
                        className="form-control"
                        placeholder="Your brand name"
                        value={form.brandName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Brand Website / Instagram Handle</label>
                      <input
                        type="text"
                        name="brandWebsite"
                        className="form-control"
                        placeholder="yourwebsite.com or @yourbrand"
                        value={form.brandWebsite}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Monthly Marketing Budget</label>
                      <select
                        name="budget"
                        className="form-select"
                        value={form.budget}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select budget range</option>
                        <option value="Under ₨1 Lakh">Under ₨1 Lakh</option>
                        <option value="₨1L – ₨5L">₨1L – ₨5L</option>
                        <option value="₨5L – ₨20L">₨5L – ₨20L</option>
                        <option value="₨20L+">₨20L+</option>
                      </select>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label">Your Work Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="you@yourcompany.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Mobile Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="+92 300 1234567"
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">
                        Campaign Goal{" "}
                        <span className="fw-normal text-lowercase" style={{ color: "var(--muted)" }}>(optional)</span>
                      </label>
                      <textarea
                        name="goal"
                        className="form-control"
                        rows={3}
                        placeholder="Tell us what you're trying to achieve..."
                        value={form.goal}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-orange w-100 hover-scale" disabled={status === "loading"}>
                      {status === "loading" ? "Sending..." : "Book a Strategy Call"}
                    </button>
                    {status === "error" && (
                      <p className="form-note small mt-2 text-danger">Something went wrong. Please try again.</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}