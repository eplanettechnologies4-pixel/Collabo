export default function BrandsHero(){
    return (
        <>
      <header className="hero bg-ink">
  <div className="container">
    <div className="row align-items-center g-5">
      <div className="col-lg-6">
        <span className="eyebrow">For Brands</span>
        <h1 className="hero-title mt-3">Find the right creators for your brand.</h1>
        <p className="hero-sub mt-3" style={{color:"#cfcdc4"}}>Plan your campaign, find creators who fit your brand, and manage everything in one place. COLLABO helps you connect with creators based on their audience, content, and campaign requirements. Payments can also be held securely until the agreed content is approved.</p>
        <div className="d-flex flex-wrap gap-3 mt-4 custom-button">
          <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#strategyCallModal">Get a Free Strategy Call</button>
        
        </div>
      </div>
      <div className="col-lg-6">
        <div className="city-network">
          <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block"}}>
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop stopColor="#ff8a1e" stopOpacity="0.95"/>
                <stop offset="100%" stopColor="#e8650a" stopOpacity="0.95"/>
              </radialGradient>
            </defs>

            <g stroke="rgba(255,138,30,.45)" strokeWidth="1.5" strokeDasharray="4 5" fill="none">
              <line x1="95" y1="90" x2="330" y2="55"/>
              <line x1="330" y1="55" x2="300" y2="150"/>
              <line x1="300" y1="150" x2="480" y2="150"/>
              <line x1="480" y1="150" x2="360" y2="255"/>
              <line x1="300" y1="150" x2="185" y2="205"/>
              <line x1="185" y1="205" x2="360" y2="255"/>
              <line x1="360" y1="255" x2="495" y2="275"/>
              <line x1="185" y1="205" x2="265" y2="345"/>
              <line x1="360" y1="255" x2="265" y2="345"/>
            </g>

            <circle cx="95" cy="90" r="15" fill="url(#nodeGlow)" stroke="rgba(255,138,30,.5)" strokeWidth="6"/>

            <g className="city-node" data-city="Lahore" tabIndex={0} role="button" aria-label="Show Lahore creators">
              <circle cx="330" cy="55" r="32" fill="url(#nodeGlow)" stroke="rgba(255,138,30,.35)" strokeWidth="8"/>
              <text x="330" y="102" textAnchor="middle" fill="#f6f1e7" fontFamily="Inter, sans-serif" fontSize="15">Lahore Creator</text>
            </g>

            <circle cx="300" cy="150" r="13" fill="url(#nodeGlow)" stroke="rgba(255,138,30,.5)" strokeWidth="5"/>

            <g className="city-node" data-city="Islamabad" tabIndex={0} role="button" aria-label="Show Islamabad creators">
              <circle cx="480" cy="150" r="30" fill="url(#nodeGlow)" stroke="rgba(255,138,30,.35)" strokeWidth="8"/>
              <text x="480" y="195" textAnchor="middle" fill="#f6f1e7" fontFamily="Inter, sans-serif" fontSize="15">Islamabad Creator</text>
            </g>

            <g className="city-node" data-city="Multan" tabIndex={0} role="button" aria-label="Show Multan creators">
              <circle cx="185" cy="205" r="26" fill="url(#nodeGlow)" stroke="rgba(255,138,30,.35)" strokeWidth="7"/>
              <text x="185" y="246" textAnchor="middle" fill="#f6f1e7" fontFamily="Inter, sans-serif" fontSize="15">Multan Creator</text>
            </g>

            <g className="city-node" data-city="Rawalpindi" tabIndex={0} role="button" aria-label="Show Rawalpindi creators">
              <circle cx="360" cy="255" r="22" fill="url(#nodeGlow)" stroke="rgba(255,138,30,.35)" strokeWidth="7"/>
              <text x="360" y="292" textAnchor="middle" fill="#f6f1e7" fontFamily="Inter, sans-serif" fontSize="15">Rawalpindi Creator</text>
            </g>

            <g className="city-node" data-city="Faisalabad" tabIndex={0} role="button" aria-label="Show Faisalabad creators">
              <circle cx="495" cy="275" r="19" fill="url(#nodeGlow)" stroke="rgba(255,138,30,.35)" strokeWidth="6"/>
              <text x="495" y="308" textAnchor="middle" fill="#f6f1e7" fontFamily="Inter, sans-serif" fontSize="15">Faisalabad Creator</text>
            </g>

            <g className="city-node" data-city="Karachi" tabIndex={0} role="button" aria-label="Show Karachi creators">
              <circle cx="265" cy="345" r="36" fill="url(#nodeGlow)" stroke="rgba(255,138,30,.35)" strokeWidth="9"/>
              <text x="265" y="397" textAnchor="middle" fill="#f6f1e7" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="600">Karachi Creator</text>
            </g>
          </svg>

          <p className="city-network-hint">Click a city to see creators from there</p>
          <div id="cityCreatorPanel" className="city-creator-panel"></div>
        </div>
      </div>
    </div>
  </div>
</header>

</>
    )
}