import Link from "next/link";
export default function Hero() {
  return (
    <>
<header className="hero hero-photowall-wrap">
  <div className="hero-photowall" aria-hidden="true">
    <img src="https://picsum.photos/seed/collab-cr1/400/600" alt="" />
    <img src="https://picsum.photos/seed/collab-cr2/400/600" alt="" />
    <img src="https://picsum.photos/seed/collab-cr3/400/600" alt=""/>
    <img src="https://picsum.photos/seed/collab-cr4/400/600" alt=""/>
    <img src="https://picsum.photos/seed/collab-cr5/400/600" alt=""/>
    <img src="https://picsum.photos/seed/collab-cr6/400/600" alt=""/>
    <img src="https://picsum.photos/seed/collab-cr7/400/600" alt=""/>
    <img src="https://picsum.photos/seed/collab-cr8/400/600" alt=""/>
    <img src="https://picsum.photos/seed/collab-cr9/400/600" alt=""/>
    <img src="https://picsum.photos/seed/collab-cr10/400/600" alt=""/>
    <img src="https://picsum.photos/seed/collab-cr11/400/600" alt="" />
    <img src="https://picsum.photos/seed/collab-cr12/400/600" alt="" />
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