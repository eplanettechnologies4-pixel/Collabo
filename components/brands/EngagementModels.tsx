export default function EngagementModels(){
    return (
        <>
        <section className="section pb-4" id="pick-your-model" style={{background:"var(--ink)"}}>
  <div className="container">
    <span className="eyebrow" style={{color:"var(--orange)"}}>Engagement Models</span>
    <h2 className="mt-3" style={{color:"var(--paper)"}}>Pick Your Model</h2>
    <p className="fs-lead mt-3" style={{color:"#c9c6ba",maxWidth:"60ch"}}>Choose the campaign model that works best for your brand and budget.</p>

    <div className="row g-4 mt-4">
      <div className="col-lg-3 col-md-6">
        <div className="model-card" id="savings-model">
        <div >
          <span className="model-tag">Entry Level</span>
          <h5 className="mt-3 mb-1">Savings Model</h5>
          <p className="fst-italic small mb-3" style={{color:"#a9a89e"}}>Turn customer activity into content</p>
          <p className="small" style={{color:"#c9c6ba"}}>Give existing customers a reason to share their experience with your brand and earn rewards when they do.</p>
          <hr style={{borderColor:"rgba(246,241,231,.12)"}} />
          <p className="small mb-1" style={{color:"#c9c6ba"}}><strong style={{color:"var(--paper)"}}>Best for:</strong> Large brands (₨500Cr+ annual sales)</p>
          <p className="small mb-0" style={{color:"#c9c6ba"}}><strong style={{color:"var(--paper)"}}>Cost:</strong> Cashback on sales only</p>
          </div>
          <div>
          <span className="model-card-note">For large-scale brands only</span>
          <a href="#contact" className="btn btn-outline-light btn-sm model-card-cta">Learn More →</a>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="model-card" id="barter-program">
          <div>
          <span className="model-tag" style={{background:"rgba(51,85,255,.18)",color:"#9db1ff"}}>Affordable</span>
          <h5 className="mt-3 mb-1">Barter Campaigns</h5>
          <p className="fst-italic small mb-3" style={{color:"#a9a89e"}}>Get content through product collaborations</p>
          <p className="small" style={{color:"#c9c6ba"}}>Work with nano creators through product-based collaborations. This model is useful when you need more content while keeping the campaign cost lower.</p>
          <hr style={{borderColor:"rgba(246,241,231,.12)"}} />
          <p className="small mb-1" style={{color:"#c9c6ba"}}><strong style={{color:"var(--paper)"}}>Best for:</strong> New brands, launches, content libraries</p>
          <p className="small mb-0" style={{color:"#c9c6ba"}}><strong style={{color:"var(--paper)"}}>Cost:</strong> Product value only</p>
          </div>
          <div>
          <a href="#contact" className="btn btn-outline-light btn-sm model-card-cta">Start with Barter →</a>
        </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="model-card model-card-recommended" id="prime-ugc">
          <div>
          <span className="model-recommended-badge">Recommended</span>
          <span className="model-tag" style={{background:"white",color:"var(--orange)"}}>★ Recommended</span>
          <h5 className="mt-3 mb-1">COLLABO Prime</h5>
          <p className="fst-italic small mb-3" style={{color:"white"}}>A managed campaign from start to finish.</p>
          <p className="small" style={{color:"#c9c6ba"}}>A dedicated COLLABO strategist helps manage the campaign, including creator selection, briefs, content reviews, delivery, and usage rights.</p>
          <hr style={{borderColor:"rgba(255,138,30,.2)"}} />
          <p className="small mb-1" style={{color:"#c9c6ba"}}><strong style={{color:"var(--paper)"}}>Best for:</strong> Brands that want results, hands-free</p>
          <p className="small mb-0" style={{color:"#c9c6ba"}}><strong style={{color:"var(--paper)"}}>Cost:</strong> Custom pricing</p>
          </div>
          <div>
          <span className="model-card-note model-card-note-accent" style={{color:"white"}}>Limited brand slots</span>
          <a href="#contact" className="btn btn-orange btn-sm model-card-cta">Apply for Prime →</a>
        </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="model-card" id="ai-ugc">
          <div>
          <span className="model-tag" style={{background:"rgba(123,47,247,.18)",color:"#c9a3ff"}}>New</span>
          <h5 className="mt-3 mb-1">AI UGC</h5>
          <p className="fst-italic small mb-3" style={{color:"#a9a89e"}}>Create more ad variations, faster</p>
          <p className="small" style={{color:"#c9c6ba"}}>Create UGC-style video ads from your campaign brief and test different creative ideas for your paid campaigns.</p>
          <hr style={{borderColor:"rgba(246,241,231,.12)"}} />
          <p className="small mb-1" style={{color:"#c9c6ba"}}><strong style={{color:"var(--paper)"}}>Best for:</strong> Performance marketing, paid ads, A/B testing</p>
          <p className="small mb-0" style={{color:"#c9c6ba"}}><strong style={{color:"var(--paper)"}}>Cost:</strong> Per-video pricing</p>
          </div>
          <div>
          <a href="#contact" className="btn btn-outline-light btn-sm model-card-cta">Learn More →</a>
        </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </>
    )
}