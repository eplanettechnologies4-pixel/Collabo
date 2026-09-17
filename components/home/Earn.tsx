export default function Earn() {
  return (
    <>
<section className="section pb-4">
  <div className="container">
    <span className="eyebrow-pill">For Creators</span>
    <h2 className="mt-3" style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)" }}>Earn.</h2>
    <p className="fs-lead muted mt-3" style={{ maxWidth: "52ch" }}>Create content for brands you actually want to work with and get paid for it. Browse available campaigns, apply to the ones that suit you, and receive your payment once your content has been approved.
</p>
    {/* <a href="campaigns.html" className="custom-button earn-btn">Browse Campaigns →</a> */}

    <p className="eyebrow mt-3 mb-4">Active Campaigns</p>
    <div className="row g-4">
      <div className="col-md-4">
        <div className="campaign-mini">
          <div className="campaign-mini-avatar">SN</div>
          <p className="cat-label mb-0">Instagram Reel</p>
          <p className="price-range mb-3 mt-2">₨8,000 – ₨12,000</p>
          <p className="muted small mb-0">Make a fun Instagram Reel to help introduce Studio Noor's new beauty collection.
</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="campaign-mini">
          <div className="campaign-mini-avatar">GL</div>
          <p className="cat-label mb-0">UGC Video</p>
          <p className="price-range mb-3 mt-2">₨6,000 – ₨9,500</p>
          <p className="muted small mb-0">Create a short review-style video sharing your experience with one of Glowlab's serums.
</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="campaign-mini">
          <div className="campaign-mini-avatar">HE</div>
          <p className="cat-label mb-0">YouTube Short</p>
          <p className="price-range mb-3 mt-2">₨12,000 – ₨18,000</p>
          <p className="muted small mb-0">Show Home Edit's product in a short home makeover video.
</p>
        </div>
      </div>
    </div>
  </div>
</section>


   </>
  );
}