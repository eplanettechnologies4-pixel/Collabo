// export default function CreatorGallery(){
//     return (
//         <>
//     <section className="section pb-0" style={{background:"var(--ink)"}}>
//   <div className="container">
//     <span className="eyebrow" style={{color:"var(--lime)"}}>Real Creators</span>
//     <h2 className="mt-3 mb-2" style={{color:"var(--paper)",fontSize:"clamp(2.2rem,5vw,3.6rem)"}}>Content made by real creators</h2>
//     <p className="fs-lead" style={{color:"#c9c6ba",maxWidth:"52ch"}}>See how creators help brands showcase their products through reviews, unboxings, tutorials, and everyday content.</p>
//   </div>
//   <div className="creator-gallery mt-5">
//     <div className="creator-card">
//       <img src="https://picsum.photos/seed/collab-cr1/400/700" alt="Creator content — unboxing haul" />
//       <div className="creator-card-cap">Unboxing Haul</div>
//     </div>
//     <div className="creator-card">
//       <img src="https://picsum.photos/seed/collab-cr2/400/700" alt="Creator content — GRWM" />
//       <div className="creator-card-cap">GRWM with Glowlab</div>
//     </div>
//     <div className="creator-card creator-card-tall">
//       <img src="https://picsum.photos/seed/collab-cr3/420/760" alt="Creator content — product review" />
//       <div className="creator-card-cap">Honest Serum Review</div>
//     </div>
//     <div className="creator-card">
//       <img src="https://picsum.photos/seed/collab-cr4/400/700" alt="Creator content — home makeover" />
//       <div className="creator-card-cap">Home Edit Makeover</div>
//     </div>
//     <div className="creator-card">
//       <img src="https://picsum.photos/seed/collab-cr5/400/700" alt="Creator content — launch reel" />
//       <div className="creator-card-cap">Studio Noor Launch Reel</div>
//     </div>
//     <div className="creator-card creator-card-tall">
//       <img src="https://picsum.photos/seed/collab-cr6/420/760" alt="Creator content — fit check" />
//       <div className="creator-card-cap">Fit Check ✨</div>
//     </div>
//     <div className="creator-card">
//       <img src="https://picsum.photos/seed/collab-cr7/400/700" alt="Creator content — skincare routine" />
//       <div className="creator-card-cap">Suta Skincare Routine</div>
//     </div>
//   </div>
// </section>
// </>
//     )
// }

"use client";
import { useState, useRef, useEffect } from "react";

const creators = [
  { src: "https://picsum.photos/seed/collab-cr1/400/700", alt: "Creator content — unboxing haul", caption: "Unboxing Haul", tall: false },
  { src: "https://picsum.photos/seed/collab-cr2/400/700", alt: "Creator content — GRWM", caption: "GRWM with Glowlab", tall: false },
  { src: "https://picsum.photos/seed/collab-cr3/420/760", alt: "Creator content — product review", caption: "Honest Serum Review", tall: true },
  { src: "https://picsum.photos/seed/collab-cr4/400/700", alt: "Creator content — home makeover", caption: "Home Edit Makeover", tall: false },
  { src: "https://picsum.photos/seed/collab-cr5/400/700", alt: "Creator content — launch reel", caption: "Studio Noor Launch Reel", tall: false },
  { src: "https://picsum.photos/seed/collab-cr6/420/760", alt: "Creator content — fit check", caption: "Fit Check ✨", tall: true },
  { src: "https://picsum.photos/seed/collab-cr7/400/700", alt: "Creator content — skincare routine", caption: "Suta Skincare Routine", tall: false },
];

export default function CreatorGallery() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    function measure() {
      if (!itemRef.current || !trackRef.current) return;
      const gap = parseFloat(getComputedStyle(trackRef.current).gap || "0");
      const w = itemRef.current.offsetWidth + gap;
      setItemWidth(w);
      const containerWidth = trackRef.current.parentElement?.offsetWidth ?? 0;
      setVisibleCount(Math.max(1, Math.floor(containerWidth / w)));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const maxIndex = Math.max(0, creators.length - visibleCount);

  const goTo = (i: number) => {
    const clamped = Math.min(Math.max(i, 0), maxIndex);
    setIndex(clamped);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <section className="section pb-0" style={{ background: "var(--ink)" }}>
      <div className="container">
        <span className="eyebrow" style={{ color: "var(--lime)" }}>Real Creators</span>
        <h2 className="mt-3 mb-2" style={{ color: "var(--paper)", fontSize: "clamp(2.2rem,5vw,3.6rem)" }}>
          Content made by real creators
        </h2>
        <p className="fs-lead" style={{ color: "#c9c6ba", maxWidth: "52ch" }}>
          See how creators help brands showcase their products through reviews, unboxings, tutorials, and everyday content.
        </p>
      </div>

      <div className="creator-carousel mt-5">
        <div className="creator-viewport">
          <div
            className="creator-track"
            ref={trackRef}
            style={{ transform: `translateX(-${index * itemWidth}px)` }}
          >
            {creators.map((c, i) => (
              <div
                className={`creator-card ${c.tall ? "creator-card-tall" : ""}`}
                key={i}
                ref={i === 0 ? itemRef : undefined}
              >
                <img src={c.src} alt={c.alt} />
                <div className="creator-card-cap">{c.caption}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="creator-arrow creator-arrow-left"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="creator-arrow creator-arrow-right"
          onClick={next}
          disabled={index === maxIndex}
          aria-label="Next"
        >
          ›
        </button>

        <div className="creator-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`creator-dot ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}