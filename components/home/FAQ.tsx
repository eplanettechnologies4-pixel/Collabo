"use client";

import { useEffect } from "react";

export default function FAQSearch() {
  useEffect(() => {
    const buttons = document.querySelectorAll(".faq-question");

    const handlers: Array<() => void> = [];

    buttons.forEach((btn) => {
      const handler = () => {
        const answer = btn.nextElementSibling as HTMLElement;
        const isOpen = btn.getAttribute("aria-expanded") === "true";

        btn.setAttribute("aria-expanded", String(!isOpen));

        if (isOpen) {
          answer.style.maxHeight = "0px";
        } else {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      };

      btn.addEventListener("click", handler);
      handlers.push(() => btn.removeEventListener("click", handler));
    });

    return () => {
      handlers.forEach((remove) => remove());
    };
  }, []);

  return (
    <>
    <section className="section">
    <div className="container" style={{maxWidth:"800px"}}>
    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
    <h2 style={{fontSize:"clamp(2rem,4.5vw,3rem)"}}>Frequently Asked Questions</h2>
    </div>
    <p className="muted mb-5">Here are some of the questions creators ask us most often.
    </p>

    <div className="faq-list-item">
    <button className="faq-question" type="button" aria-expanded="false">
    <span>What is COLLABO?</span>
    <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div className="faq-answer"><div className="faq-answer-inner">COLLABO is a platform that connects creators with brands in Pakistan. Creators can find paid campaigns, earn rewards from partner brands, and get access to selected events and experiences.
    </div></div>
    </div>
    <div className="faq-list-item">
    <button className="faq-question" type="button" aria-expanded="false">
    <span>How do I earn money on COLLABO?</span>
    <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div className="faq-answer"><div className="faq-answer-inner">You can apply to paid campaigns through your creator dashboard. If a brand selects you, you create the content they have requested, such as a Reel, Story, or YouTube Short. Once the content is approved, your payment is processed according to the campaign terms.
    </div></div>
    </div>
    <div className="faq-list-item">
    <button className="faq-question" type="button" aria-expanded="false">
    <span>How many Instagram followers do I need?</span>
    <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div className="faq-answer"><div className="faq-answer-inner">You need at least 1,000 genuine Instagram followers to apply. Your account should be public and personal, with at least 10 posts. Brand pages and meme pages are not eligible, and you must be 18 or older.</div></div>
    </div>
    <div className="faq-list-item">
    <button className="faq-question" type="button" aria-expanded="false">
    <span>What is a nano influencer?</span>
    <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div className="faq-answer"><div className="faq-answer-inner">A nano influencer usually has between 1,000 and 10,000 followers. Because they have a smaller and often more personal audience, their followers may interact with their content more closely than audiences of much larger creators.
    </div></div>
    </div>
    <div className="faq-list-item">
    <button className="faq-question" type="button" aria-expanded="false">
    <span>What is UGC marketing?</span>
    <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div className="faq-answer"><div className="faq-answer-inner">UGC, or User-Generated Content, is content made by real customers or creators for a brand. Instead of relying only on traditional advertisements, brands can use real people to show how their products look and feel in everyday situations.
    </div></div>
    </div>
    <div className="faq-list-item">
    <button className="faq-question" type="button" aria-expanded="false">
    <span>Which brands are on COLLABO?</span>
    <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div className="faq-answer"><div className="faq-answer-inner">COLLABO works with brands from different categories, including beauty, fashion, food, and lifestyle. Our growing network includes brands such as Studio Noor, Glowlab, Home Edit, CoffeeCraft, and others joining the platform regularly.
    </div></div>
    </div>
{/* 
    <p className="mt-5 mb-0"><Link href="faq.html" className="fw-semibold" style={{color:"var(--cobalt)"}}>More questions? Visit our full FAQ page →</Link></p> */}
    </div>
    </section>


    </>
    );
    }



