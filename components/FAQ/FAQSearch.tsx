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
<section className="section pt-5 pb-2">
  <div className="m-auto" style={{maxWidth:"820px",display:"flex",flexDirection:"column",rowGap:"40px"}}>


    <div className="faq-category" data-faq-category>
      <h3 className="faq-cat-title">Getting Started</h3>
      <hr className="faq-cat-divider" />
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>What does COLLABO do?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">COLLABO brings creators and brands together for paid campaigns, UGC, and other types of collaborations. Creators can find opportunities and earn from their content, while brands can work with creators who fit their campaigns.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>Do I have to pay to join COLLABO?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">No. Creating an account and applying for campaigns is free for creators. A platform fee may apply to completed campaign payments, and any applicable charges are shown before you accept a campaign.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>Where is COLLABO available?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">COLLABO is available to creators and brands across Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and other cities.</div></div>
      </div>
    </div>

    <div className="faq-category" data-faq-category>
      <h3 className="faq-cat-title">Eligibility</h3>
      <hr className="faq-cat-divider" />
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>How many followers do I need to join?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">Creators need at least 1,000 real followers on a public personal account and should have at least 10 posts. Brand pages and meme pages are not eligible for creator campaigns.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>Can I connect more than one Instagram account?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">One primary Instagram account can be connected to each COLLABO profile. If you create content for different niches, you may need separate creator profiles.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>Can YouTube creators join COLLABO?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">Yes. YouTube can be used alongside Instagram. You can connect your channel through your creator dashboard and use it for campaign opportunities where YouTube content is required.</div></div>
      </div>
    </div>

    <div className="faq-category" data-faq-category>
      <h3 className="faq-cat-title">Earning &amp; Payments</h3>
      <hr className="faq-cat-divider" />
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>How can I earn through COLLABO?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">You can apply for brand campaigns, complete the required content, and receive payment after the campaign is approved. Some campaigns may also offer other rewards depending on their terms.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>How much do creators earn?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">There is no fixed amount. Earnings depend on the campaign, the type of content required, your audience, and your creator profile. The payment for each campaign is shown before you accept it.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>How long does payment take?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">Payment is processed after the brand reviews and approves your content. The expected payment timeline and payment method are provided as part of the campaign details.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>Are there any fees?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">Any applicable platform fee is shown before you accept a campaign. There are no unexpected charges.</div></div>
      </div>
    </div>

    <div className="faq-category" data-faq-category>
      <h3 className="faq-cat-title">COLLABO Score</h3>
      <hr className="faq-cat-divider" />
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>How does the COLLABO Score work?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">The COLLABO Score is a profile score used to help evaluate creator activity and performance. It may consider factors such as engagement, audience quality, content consistency, and other account data.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>How can I improve my score?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">Focus on creating content consistently, building genuine engagement, and completing campaigns on time. Buying followers or fake engagement can negatively affect your account performance.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>Why can my score change?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">Your score can change as your account activity and performance change. Engagement, consistency, and campaign activity may affect your score over time.</div></div>
      </div>
    </div>

    <div className="faq-category" data-faq-category>
      <h3 className="faq-cat-title">For Brands</h3>
      <hr className="faq-cat-divider" />
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>How can my brand work with creators?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">Brands can create a campaign by sharing their goals, requirements, budget, and content needs. Creators can then apply, and the brand can choose the creators that best fit the campaign.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>What type of content can creators make?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">Depending on the campaign, creators may produce reels, unboxings, product reviews, tutorials, testimonials, and other types of short-form content.</div></div>
      </div>
      <div className="faq-list-item">
        <button className="faq-question" type="button" aria-expanded="false">
          <span data-faq-q>How much budget does a campaign need?</span>
          <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div className="faq-answer"><div className="faq-answer-inner">The required budget depends on the type of campaign, the number of creators, and the content requirements. Contact the COLLABO team to discuss the right option for your campaign.</div></div>
      </div>
    </div>

    <p id="faqNoResults" className="muted text-center py-4 d-none">No questions match your search.</p>

  </div>
</section>

</>

)
}