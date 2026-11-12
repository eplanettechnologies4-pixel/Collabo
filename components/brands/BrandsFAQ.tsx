export default function BrandsFAQ(){
    return (
        <>
        <section className="section pb-4">
  <div className="container" style={{maxWidth:"820px"}}>
    <span className="eyebrow">Help Center</span>
    <h2 className="mt-3">Questions brands often ask</h2>
    <p className="muted small mb-4">Click a question to expand. Need more? Visit the full <a href="faq.html" style={{color:"var(--cobalt)",textDecoration:"underline"}}>FAQ page</a>.</p>

    <div className="accordion" id="accBrandsHome">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#bh1">What exactly is COLLABO, and how is it different from other influencer marketing agencies?</button>
        </h2>
        <div id="bh1" className="accordion-collapse collapse show" data-bs-parent="#accBrandsHome">
          <div className="accordion-body">COLLABO is a platform that helps brands find and work with nano and micro creators. Brands can review creator information, launch campaigns, manage content, and track campaign progress from one place.</div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bh2">What is UGC and why should my brand invest in it?</button>
        </h2>
        <div id="bh2" className="accordion-collapse collapse" data-bs-parent="#accBrandsHome">
          <div className="accordion-body">UGC (User-Generated Content) is content made by real people about a product or brand. This can include unboxings, reviews, tutorials, and short videos. Through COLLABO, brands can work with creators to produce this type of content for their marketing campaigns.</div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bh3">Do I own the content creators post?</button>
        </h2>
        <div id="bh3" className="accordion-collapse collapse" data-bs-parent="#accBrandsHome">
          <div className="accordion-body">Content usage depends on the agreement for each campaign. The campaign terms will clearly explain how the brand can use the content created by the creator.</div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bh4">How quickly can a campaign go live?</button>
        </h2>
        <div id="bh4" className="accordion-collapse collapse" data-bs-parent="#accBrandsHome">
          <div className="accordion-body">The timeline depends on the campaign type, creator availability, and how quickly the brief and content are approved. Once we review your requirements, our team can give you a more accurate timeline.</div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bh5">What's the minimum budget to start?</button>
        </h2>
        <div id="bh5" className="accordion-collapse collapse" data-bs-parent="#accBrandsHome">
          <div className="accordion-body">The cost depends on the campaign model, number of creators, content requirements, and usage rights. Contact us to discuss the right option for your brand.</div>
        </div>
      </div>
    </div>
  </div>
</section>

        </>
    )
}