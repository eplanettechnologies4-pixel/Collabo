import Link from "next/link";
export default function Hero() {
  return (
    <>
<header className="hero hero-photowall-wrap">
  <div className="hero-photowall" aria-hidden="true">
    <img src="/assets/hero/hero-1.jpg" alt="COLLABO creator" loading="eager" />
    <img src="/assets/hero/hero-2.jpg" alt="COLLABO creator" loading="eager" />
    <img src="/assets/hero/hero-3.jpg" alt="COLLABO creator" loading="eager" />
    <img src="/assets/hero/hero-4.jpg" alt="COLLABO creator" />
    <img src="/assets/hero/hero-5.jpg" alt="COLLABO creator" />
    <img src="/assets/hero/hero-6.jpg" alt="COLLABO creator" />
    <img src="/assets/hero/hero-7.jpg" alt="COLLABO creator" />
    <img src="/assets/hero/hero-8.jpg" alt="COLLABO creator" />
    <img src="/assets/hero/hero-9.jpg" alt="COLLABO creator" />
    <img src="/assets/hero/hero-10.jpg" alt="COLLABO creator" />
    <img src="/assets/hero/hero-11.jpg" alt="COLLABO creator" />
    <img src="/assets/hero/hero-12.jpg" alt="COLLABO creator" />
  </div>

  <div className="container hero-content text-center">
    <span className="eyebrow justify-content-center">For Creators</span>
    <h1 className="hero-title mt-3">EARN. CREATE.<br/>BELONG.</h1>
    <p className="hero-sub mt-3 mx-auto">Get paid for the content you already create. COLLABO helps you find brand campaigns, build your creator profile, and earn from your influence. You can also discover exclusive experiences and know that your payment is secured before you publish your content.
</p>


<div className="d-flex flex-wrap justify-content-center gap-3 mt-4 cta-button">
  <Link href="/apply" className="btn">
    join Now
  </Link>
</div>
    </div>
</header>
   </>
  );
}