export default function WhyUGC(){
     return (
        <>
  <section className="section bg-paper-dim">
  <div className="container">
    <div className="row " style={{alignItems:"end"}}>
      <div className="col-lg-6">
        <span className="eyebrow">Why UGC</span>
        <h2 className="mt-3">What is UGC — and why are more brands using it?</h2>
        <p className="muted fs-lead mt-3">UGC (User-Generated Content) is content made by real people about a product or brand. This can include reviews, unboxings, tutorials, and short videos. For many brands, this type of content feels more natural and relatable than traditional advertising.</p>

        <div className="row g-3 mt-3">
          <div className="">
            <div className="stat-card-big">
              <p className="stat-num-big mb-1">92%</p>
              <p className="mb-0 small fw-semibold">of consumers say authentic content influences their buying decisions</p>
              <p className="muted small mb-0 mt-1">Source: Nielsen</p>
            </div>
          </div>
          <div className="">
            <div className="stat-card-big">
              <p className="stat-num-big mb-1">4×</p>
              <p className="mb-0 small fw-semibold">higher click-through rate compared to traditional brand content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <p className="eyebrow mb-4">Content Trust Pyramid</p>
        <div className="trust-pyramid">
          <div className="trust-bar trust-bar-1">
            <div className="trust-bar-fill" style={{width:"100%"}}></div>
            <span className="trust-bar-note">Nano Influencer UGC<br/>← Where COLLABO lives</span>
          </div>
          <div className="trust-bar trust-bar-2">
            <div className="trust-bar-fill trust-bar-fill-dim" style={{width:"68%"}}></div>
            <span className="trust-bar-note muted">Micro Influencer</span>
          </div>
          <div className="trust-bar trust-bar-3">
            <div className="trust-bar-fill trust-bar-fill-dim" style={{width:"42%"}}></div>
            <span className="trust-bar-note muted">Macro Influencer</span>
          </div>
          <div className="trust-bar trust-bar-4">
            <div className="trust-bar-fill trust-bar-fill-dim" style={{width:"22%"}}></div>
            <span className="trust-bar-note muted">Traditional Brand Ads</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</>
    )
}