"use client";

import { useEffect, useRef, useState } from "react";

const brands = [
  "Studio Noor", "Glowlab", "Home Edit", "CoffeeCraft", "Urban Sole",
  "Waverly", "Fernweh", "Northlane", "Suta",
];

const chipClass = (i: number) =>
  `brand-chip brand-chip-${["a", "b", "c"][i % 3]}`;

export default function Brands() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    function measure() {
      if (!containerRef.current || !setRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const singleSetWidth = setRef.current.scrollWidth;
      if (singleSetWidth === 0) return;

      setSetWidth(singleSetWidth);
      const needed = Math.ceil(containerWidth / singleSetWidth) + 1;
      setCopies(Math.max(2, needed));
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const speed = 60;
  const duration = setWidth ? setWidth / speed : 20;

  return (
    <>
<section className="mt-5 mb-5" style={{margin:"100px 0px 100px"}} >
    <div className="container">
  <p className="eyebrow mb-8" style={{opacity:.65}}>Brand Partners</p>
  </div>
<div className="brand-marquee container-fluid" ref={containerRef}>
    <div
      className="brand-marquee-track"
      style={
        {
          "--set-width": `${setWidth}px`,
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: copies }).map((_, copyIndex) => (
        <div
          className="brand-set"
          key={copyIndex}
          ref={copyIndex === 0 ? setRef : undefined}
          aria-hidden={copyIndex !== 0}
        >
          {brands.map((brand, i) => (
            <span className={chipClass(i)} key={brand}>
              {brand}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
</section>


<section className="section pb-5" style={{background:"#F5F5F7"}}>
      <div className="container">
    <span className="eyebrow-pill">For Creators</span>
    <h2 className="mt-3" style={{fontSize:"clamp(2.4rem,5.5vw,4.2rem)"}}>Save.</h2>
    <p className="fs-lead muted mt-3" style={{maxWidth:"56ch"}}>Shop from your favourite brands, share your experience, and get cashback along the way. COLLABO lets you earn rewards from everyday purchases across more than 200 partner brands, including food, fashion, and lifestyle.
</p>
</div>
  <div className="container-fluid p-0">

<div className="marquee-row mt-1 first-row-right">
  <div className="marquee-track marquee-right">
    <div className="brand-grid">
      <span className="brand-tag">Studio Noor</span>
      <span className="brand-tag">Glowlab</span>
      <span className="brand-tag">Home Edit</span>
      <span className="brand-tag">CoffeeCraft</span>
      <span className="brand-tag">Urban Sole</span>
      <span className="brand-tag">Waverly</span>
      <span className="brand-tag">Fernweh</span>
      <span className="brand-tag">Northlane</span>
      <span className="brand-tag">Suta</span>
      <span className="brand-tag">The Bake Shop</span>
      <span className="brand-tag">Savana</span>
      <span className="brand-tag">Enrich</span>
    </div>
    <div className="brand-grid" aria-hidden="true">
      <span className="brand-tag">Studio Noor</span>
      <span className="brand-tag">Glowlab</span>
      <span className="brand-tag">Home Edit</span>
      <span className="brand-tag">CoffeeCraft</span>
      <span className="brand-tag">Urban Sole</span>
      <span className="brand-tag">Waverly</span>
      <span className="brand-tag">Fernweh</span>
      <span className="brand-tag">Northlane</span>
      <span className="brand-tag">Suta</span>
      <span className="brand-tag">The Bake Shop</span>
      <span className="brand-tag">Savana</span>
      <span className="brand-tag">Enrich</span>
    </div>
  </div>
</div>

<div className="marquee-row mt-1 second-row-left">
  <div className="marquee-track marquee-left">
    <div className="brand-grid">
      <span className="brand-tag">Studio Noor</span>
      <span className="brand-tag">Glowlab</span>
      <span className="brand-tag">Home Edit</span>
      <span className="brand-tag">CoffeeCraft</span>
      <span className="brand-tag">Urban Sole</span>
      <span className="brand-tag">Waverly</span>
      <span className="brand-tag">Fernweh</span>
      <span className="brand-tag">Northlane</span>
      <span className="brand-tag">Suta</span>
      <span className="brand-tag">The Bake Shop</span>
      <span className="brand-tag">Savana</span>
      <span className="brand-tag">Enrich</span>
    </div>
    <div className="brand-grid" aria-hidden="true">
      <span className="brand-tag">Studio Noor</span>
      <span className="brand-tag">Glowlab</span>
      <span className="brand-tag">Home Edit</span>
      <span className="brand-tag">CoffeeCraft</span>
      <span className="brand-tag">Urban Sole</span>
      <span className="brand-tag">Waverly</span>
      <span className="brand-tag">Fernweh</span>
      <span className="brand-tag">Northlane</span>
      <span className="brand-tag">Suta</span>
      <span className="brand-tag">The Bake Shop</span>
      <span className="brand-tag">Savana</span>
      <span className="brand-tag">Enrich</span>
    </div>
  </div>
</div>
  </div>
    <div className="container">
    <p className="muted small mt-3 mb-0"><strong style={{color:"var(--ink)"}}>200+ brands</strong> across food, fashion &amp; lifestyle — and growing.</p>
</div>
</section>
 </>
  );
}