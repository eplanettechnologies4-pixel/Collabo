import {
  FaRocket,
  FaStar,
  FaMapMarkerAlt,
  FaSeedling,
  FaBullseye,
  FaUsers,
} from "react-icons/fa";

import "./careers.css";

const values = [
  {
    icon: <FaRocket />,
    label: "Move fast",
  },
  {
    icon: <FaStar />,
    label: "Creator-first culture",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Faisalabad HQ",
  },
  {
    icon: <FaSeedling />,
    label: "Early-stage equity",
  },
  {
    icon: <FaBullseye />,
    label: "Direct impact",
  },
  {
    icon: <FaUsers />,
    label: "Team events",
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
  We&apos;re Hiring
  </span>

  <h1 className="mt-3 text-center">
  Build Pakistan&apos;s  <br />
   Creator Economy
  </h1>

  <p
  className="fs-lead mt-3 text-center"
  style={{
  color: "#c9c6ba",
  maxWidth: "60ch",
  margin: "auto",
  }}
  >
    We&apos;re the team behind Pakistan&apos;s fastest-growing UGC
    platform. Come build with us.   
  </p> 
  </div>
  </section>

      {/* Why Collabo */}
      <section className="section" >
        <div className="container">
          <h2 className="why-title">Why Collabo</h2>
          <p className="why-sub">
            We&apos;re a small team doing big things. Fast-growing creator
            base, hundreds of brand partners — and we&apos;re just getting
            started.
          </p>

          <div className="row g-3 mt-2" style={{justifyContent:"center"}}>
            {values.map((v) => (
              <div className="col-6 col-md-3" key={v.label}>
                <div className="value-card">
                  <span className="value-icon">{v.icon}</span>
                  <span className="value-label">{v.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section pt-0">
        <div className="container">
          <h2 className="why-title">Open Roles</h2>
          <div className="open-roles-box text-center">
            <p className="mb-3">
              No specific roles listed yet. We&apos;re always looking for
              exceptional people.
            </p>
            <p className="mb-0">
              Send your CV to{" "}
              <a href="mailto:careers@collabo.pk">careers@collabo.pk</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}