import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
  <div className="container">
    <div className="row g-4">
      <div className="col-lg-4 col-md-6">
        <div className="brandmark footer-brandmark mb-3">
          <Image
              src="/assets/custom.png"
              alt="Collabo logo"
              width={100}
              height={70}
              style={{ width: "auto", height: "auto" }}
              priority
              />
        </div>
  <p className="small mb-3" style={{opacity:"0.9"}}>Turn your influence into real opportunities.</p> 
        <ul className="list-unstyled small footer-links mb-3 footer-contact">
          <li>Address <br />G3 The Business Center, 8/8 Regency Road, Faisalabad, Pakistan</li>
          <li><a href="tel:+923158053198">Contact Us <br />0315-8053198</a></li>
          <li><a href="mailto:hello@collabo.pk">Email <br />hello@collabo.pk</a></li>
        </ul>


        <div className="d-flex gap-2 footer-social">
          <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="3"/><line x1="7" y1="10" x2="7" y2="17"/><circle cx="7" cy="6.6" r="1" fill="currentColor" stroke="none"/><path d="M11 17v-4.5c0-1.4 1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V17"/></svg></a>
          <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg></a>
        </div>
      </div>
      <div className="col-6 col-lg-2">
        <h6>Creators</h6>
        <ul className="list-unstyled small footer-links">
          <li><a href="/eligibility">Eligibility</a></li>
          <li><a href="/collaboScore">COLLABO Score</a></li>
          <li><a href="/creatorStories">Creator Stories</a></li>
          <li><a href="/priveProgram">Prive Program</a></li>
        </ul>
      </div>
      <div className="col-6 col-lg-2">
        <h6>Brands</h6>
        <ul className="list-unstyled small footer-links">
          <li><a href="/brands">For Brands</a></li>
          <li><a href="#pick-your-model">Savings Model</a></li>
          <li><a href="#pick-your-model">Barter Program</a></li>
          <li><a href="#pick-your-model">Prime UGC</a></li>
          <li><a href="#pick-your-model">AI UGC</a></li>
        </ul>
      </div>
      <div className="col-6 col-lg-2">
        <h6>Company</h6>
        <ul className="list-unstyled small footer-links">
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/careers">Careers</a></li>
        </ul>
      </div>
      <div className="col-6 col-lg-2">
        <h6>Legal</h6>
        <ul className="list-unstyled small footer-links">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms &amp; Conditions</a></li>
        </ul>
      </div>
    </div>
    <hr style={{ borderColor: "rgba(246,241,231,.12)" }} className="my-4" />
    <div className="d-flex flex-wrap justify-content-between gap-2">
      <p className="small mb-0" style={{color:"white"}}>   © 2026 COLLABO. All rights reserved. Faisalabad, Pakistan.</p>
    </div>
  </div>
</footer>
  );
}