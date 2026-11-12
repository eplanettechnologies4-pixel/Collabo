
"use client";
import "./eligibility.css";

export default function CreatorEligibility() {
  const checklist = [
    {
      title: "Public Instagram account",
      desc: "Personal creator accounts only — no private or inactive profiles.",
    },
    {
      title: "1,000+ genuine followers",
      desc: "Purchased or fake followers may affect eligibility.",
    },
    {
      title: "10+ posts or reels",
      desc: "Regular content demonstrates consistency and activity.",
    },
    {
      title: "Age 18+",
      desc: "Required for contracts and creator payments.",
    },
    {
      title: "Good engagement rate",
      desc: "Based on audience interaction and content quality.",
    },
  ];

  const faqs = [
    {
      q: "Can I apply with a new Instagram account?",
      a: "We recommend having an active account with a consistent posting history before applying.",
    },
    {
      q: "What if my account is private?",
      a: "Your account must be public during the review process.",
    },
    {
      q: "Do I need to pay to join?",
      a: "No. Joining Collabo is completely free.",
    },
    {
      q: "How do you review applications?",
      a: "We evaluate engagement, content quality, consistency, and audience authenticity.",
    },
    {
      q: "How long does approval take?",
      a: "Most applications are reviewed within 2–5 business days.",
    },
  ];

  return (
    <div className="wyld-eligibility">
      {/* ================= HERO ================= */}
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
            Creator Eligibility
          </span>

          <h1 className="mt-3 text-center">
           Are You Collabo Enough?
          </h1>

          <p
            className="fs-lead mt-3 text-center"
            style={{
              color: "#c9c6ba",
              maxWidth: "60ch",
              margin: "auto",
            }}
          >
            It takes more than followers. It takes real influence. Check if you qualify below.
          </p>
        </div>
      </section>
      {/* ================= CHECKLIST ================= */}

      <section className="eligibility-section">

        <div className="container">

          <div className="section-heading">

            <h2>
              Creator Eligibility Checklist
            </h2>

            <p>
              Complete all of these requirements to increase your chances
              of approval.
            </p>

          </div>

          <div className="checklist">

            {checklist.map((item, index) => (

              <div className="check-item" key={index}>

                <div className="check-icon">
                  ✓
                </div>

                <div>

                  <h5>{item.title}</h5>

                  <p>{item.desc}</p>

                </div>

              </div>

            ))}

          </div>

          <div className="eligibility-note">

            <h5>
              What we review behind the scenes
            </h5>

            <p>
              We analyze audience quality, engagement consistency,
              content relevance, authenticity, posting frequency,
              and creator professionalism. Accounts with fake
              engagement or purchased followers may be declined.
            </p>

          </div>

        </div>

      </section>

      {/* ================= HOW TO JOIN ================= */}

      <section className="join-section">

        <div className="container">

          <h2 className="mb-5">
            3 Ways to Join Collabo
          </h2>

          <div className="row g-4">

            <div className="col-lg-4">

              <div className="join-card">

                <span>01</span>

                <h5>Apply Directly</h5>

                <p>
                  Complete the creator application and submit your profile.
                  Our team reviews every application carefully.
                </p>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="join-card">

                <span>02</span>

                <h5>Get Referred</h5>

                <p>
                  Existing creators can invite you, helping your application
                  receive priority consideration.
                </p>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="join-card">

                <span>03</span>

                <h5>Join Campaigns</h5>

                <p>
                  Participate in open creator campaigns and showcase your
                  creativity to brands.
                </p>

              </div>

            </div>

          </div>

          <div className="text-center mt-5">

            <button className="theme-btn">
              Download App & Apply →
            </button>

            <p className="mt-3">
              Free to apply. No subscription required.
            </p>

          </div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="faq-section">

        <div className="container">

          <div className="section-heading">

            <h2>
              Eligibility FAQs
            </h2>

          </div>

          <div
            className="accordion"
            id="faqAccordion"
          >

            {faqs.map((faq, index) => (

              <div
                className="accordion-item"
                key={index}
              >

                <h2 className="accordion-header">

                  <button
                    className={`accordion-button ${
                      index !== 0 ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq${index}`}
                  >
                    {faq.q}
                  </button>

                </h2>

                <div
                  id={`faq${index}`}
                  className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                  }`}
                  data-bs-parent="#faqAccordion"
                >

                  <div className="accordion-body">

                    {faq.a}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
    </div>
  );
}