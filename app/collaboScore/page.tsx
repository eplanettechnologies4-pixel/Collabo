"use client";
import "./collabo-score.css";


export default function WyldScore() {
  const tiers = [
    {
      range: "0–250",
      name: "Starter",
      desc: "Just getting started. Build your content consistency and engagement.",
      cashback: "30%",
      tier: "starter",
    },
    {
      range: "251–500",
      name: "Rising",
      desc: "Growing creator with solid engagement. Unlock mid-tier brand campaigns.",
      cashback: "50%",
      tier: "rising",
    },
    {
      range: "501–750",
      name: "Influencer",
      desc: "Established presence. Access premium campaigns and higher earnings.",
      cashback: "70%",
      tier: "influencer",
    },
    {
      range: "751–1000",
      name: "Elite",
      desc: "Top 1% of Collabo creators. Maximum cashback and exclusive brand deals.",
      cashback: "Up to 100%",
      tier: "elite",
    },
  ];

  const factors = [
    {
      icon: "👥",
      title: "Follower Count",
      weight: "20%",
      desc: "More real followers = higher base score. Quality matters more than quantity.",
    },
    {
      icon: "💬",
      title: "Engagement Rate",
      weight: "30%",
      desc: "Likes, comments, saves, and shares relative to your follower count. Most important factor.",
    },
    {
      icon: "🎨",
      title: "Content Quality",
      weight: "20%",
      desc: "Visual quality, caption quality, and consistency of your posting style.",
    },
    {
      icon: "🔍",
      title: "Follower Authenticity",
      weight: "20%",
      desc: "Real vs. bot followers. Any purchased followers significantly lower your score.",
    },
    {
      icon: "📅",
      title: "Posting Frequency",
      weight: "10%",
      desc: "Regular posting shows you're an active creator. Aim for 3–4 posts per week.",
    },
  ];

  const improvements = [
    {
      priority: "high",
      label: "HIGH",
      title: "Post 3–4x/week",
      desc: "Consistent posting signals an active, reliable creator to brands.",
    },
    {
      priority: "high",
      label: "HIGH",
      title: "Reply to comments",
      desc: "Every comment reply boosts your engagement rate meaningfully.",
    },
    {
      priority: "medium",
      label: "MEDIUM",
      title: "Tag brands & locations",
      desc: "Contextual tagging signals content relevance and increases reach.",
    },
    {
      priority: "medium",
      label: "MEDIUM",
      title: "Use relevant hashtags",
      desc: "Reach new audiences organically and grow real followers.",
    },
    {
      priority: "critical",
      label: "CRITICAL",
      title: "Never buy followers",
      desc: "Purchased followers permanently damage your score and can get you banned.",
    },
  ];

  return (
    <div className="wyld-score">
      {/* ================= HERO ================= */}
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
            Creator Score
          </span>

          <h1 className="mt-3 text-center">
          Your Social Score.<br/>
          Your Cashback Power.
          </h1>

          <p
            className="fs-lead mt-3 text-center"
            style={{
              color: "#c9c6ba",
              maxWidth: "60ch",
              margin: "auto",
            }}
          >
Collabo Score is your 0–1000 Instagram influence rating. Higher score = higher cashback at 500+ brands. Updated every 15 days.
          </p>
        </div>
      </section>

      {/* ================= SCORE TIERS ================= */}
      <section className="tiers-section">
        <div className="container">
          <div className="section-heading section-heading-left">
            <h2>Score Tiers &amp; Cashback</h2>
            <p>The higher your score, the more you earn. Simple.</p>
          </div>

          <div className="tier-list">
            {tiers.map((t, i) => (
              <div className={`tier-item tier-${t.tier}`} key={i}>
                <div className="tier-left">
                  <span className="tier-range">{t.range}</span>
                  <h5 className="tier-name">{t.name}</h5>
                </div>

                <p className="tier-desc">{t.desc}</p>

                <div className="tier-right">
                  <span className="tier-cashback-label">Cashback</span>
                  <span className="tier-cashback-value">{t.cashback}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="tier-footnote">
            * Exact cashback percentages may vary by brand and campaign.
            Tiers to be confirmed with product team.
          </p>
        </div>
      </section>

      {/* ================= WHAT AFFECTS YOUR SCORE ================= */}
      <section className="factors-section">
        <div className="container">
          <div className="section-heading section-heading-left">
            <h2>What Affects Your Score</h2>
            <p>5 factors, all within your control.</p>
          </div>

          <div className="factor-list">
            {factors.map((f, i) => (
              <div className="factor-item" key={i}>
                <div className="factor-icon">{f.icon}</div>

                <div className="factor-body">
                  <div className="factor-heading">
                    <h5>{f.title}</h5>
                    <span className="factor-weight">{f.weight}</span>
                  </div>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW TO IMPROVE ================= */}
      <section className="improve-section">
        <div className="container">
          <h2 className="mb-5">How to Improve Your Score</h2>

          <div className="improve-grid">
            {improvements.map((item, i) => (
              <div className={`improve-card priority-${item.priority}`} key={i}>
                <span className={`priority-badge priority-badge-${item.priority}`}>
                  {item.label}
                </span>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="update-note">
            <p>
              <strong>Score updates every 15 days.</strong> Changes to your
              account (new posts, engagement growth, follower changes) are
              reflected in the next score update cycle.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="score-cta-section">
        <div className="container text-center">
          <h2>Ready to Find Out Your Score?</h2>
          <p>
            Download the Collabo app, connect your Instagram, and get your Collabo
            Score in minutes.
          </p>

          <button className="theme-btn">Get Your Collabo Score →</button>

          <p className="mt-3 eligibility-link-wrap">
            Not sure if you qualify?{" "}
            <a href="/eligibility" className="eligibility-link">
              Check eligibility →
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
