

// "use client";
// import { useState, useRef, useEffect } from "react";

// const videos = [
//   { src: "/assets/14422058_1080_1920_60fps.mp4", alt: "Brand concert experience" },
//   { src: "/assets/16195167_1080_1920_60fps.mp4", alt: "Brand launch event" },
//   { src: "/assets/16458083_1080_1920_30fps.mp4", alt: "Creator meetup crowd" },
//   { src: "/assets/14741394_2160_3840_60fps.mp4", alt: "Brand photoshoot" },
//   { src: "/assets/16444771_2160_3840_30fps.mp4", alt: "Stage event" },
//   { src: "/assets/16396273_2160_3840_30fps.mp4", alt: "Creator group photo" },
//   { src: "/assets/9223089-uhd_2160_3840_30fps.mp4", alt: "Brand concert experience" },
//   { src: "/assets/16429036_2160_3840_30fps.mp4", alt: "Brand launch event" },
//   { src: "/assets/16397706_1080_1920_24fps.mp4", alt: "Creator meetup crowd" },
//   { src: "/assets/16332263_2160_3840_30fps.mp4", alt: "Brand photoshoot" },
// ];

// export default function Experience() {
//   const [index, setIndex] = useState(0);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const itemRef = useRef<HTMLDivElement>(null);
//   const [itemWidth, setItemWidth] = useState(0);
//   const [visibleCount, setVisibleCount] = useState(1);

//   // measure item width + how many fit in viewport, so arrows/dots stay accurate on resize
//   useEffect(() => {
//     function measure() {
//       if (!itemRef.current || !trackRef.current) return;
//       const style = getComputedStyle(itemRef.current);
//       const gap = parseFloat(getComputedStyle(trackRef.current).gap || "0");
//       const w = itemRef.current.offsetWidth + gap;
//       setItemWidth(w);
//       const containerWidth = trackRef.current.parentElement?.offsetWidth ?? 0;
//       setVisibleCount(Math.max(1, Math.floor(containerWidth / w)));
//     }
//     measure();
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, []);

//   const maxIndex = Math.max(0, videos.length - visibleCount);

//   const goTo = (i: number) => {
//     const clamped = Math.min(Math.max(i, 0), maxIndex);
//     setIndex(clamped);
//   };

//   const next = () => goTo(index + 1);
//   const prev = () => goTo(index - 1);

//   return (
//     <section className="section bg-ink pb-0">
//       <div className="container">
//         <span className="eyebrow" style={{ color: "var(--lime)" }}>For Creators</span>
//         <h2 className="mt-3 mb-3" style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)" }}>Experiences.</h2>
//         <p className="fs-lead" style={{ color: "#c9c6ba", maxWidth: "56ch" }}>
//           The best part of being a creator isn't always online. High-scoring COLLABO creators can get invited to brand events, photoshoots, launches, and creator meetups happening around the city.
//         </p>
//       </div>

//       <div className="experience-carousel mt-5">
//         <div className="experience-viewport">
//           <div
//             className="experience-track"
//             ref={trackRef}
//             style={{ transform: `translateX(-${index * itemWidth}px)` }}
//           >
//           {videos.map((video, i) => (
//           <div
//           className="experience-item"
//           key={i}
//           ref={i === 0 ? itemRef : undefined}
//           >
//           <video
//           src={video.src}
//           className="w-100 h-100"
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="metadata"
//           />
//           </div>
//           ))}
//           </div>
//         </div>

//         <button
//           className="experience-arrow experience-arrow-left"
//           onClick={prev}
//           disabled={index === 0}
//           aria-label="Previous"
//         >
//           ‹
//         </button>
//         <button
//           className="experience-arrow experience-arrow-right"
//           onClick={next}
//           disabled={index === maxIndex}
//           aria-label="Next"
//         >
//           ›
//         </button>

//         <div className="experience-dots">
//           {Array.from({ length: maxIndex + 1 }).map((_, i) => (
//             <button
//               key={i}
//               className={`experience-dot ${i === index ? "active" : ""}`}
//               onClick={() => goTo(i)}
//               aria-label={`Go to slide ${i + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
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

export default function Experience() {
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
        <span className="eyebrow" style={{ color: "var(--lime)" }}>For Creators</span>
        <h2 className="mt-3 mb-2" style={{ color: "var(--paper)", fontSize: "clamp(2.2rem,5vw,3.6rem)" }}>
        Experiences.
        </h2>
        <p className="fs-lead" style={{ color: "#c9c6ba", maxWidth: "52ch" }}>
The best part of being a creator isn't always online. High-scoring COLLABO creators can get invited to brand events, photoshoots, launches, and creator meetups happening around the city.        </p>
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