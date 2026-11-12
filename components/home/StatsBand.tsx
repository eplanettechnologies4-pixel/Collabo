"use client";

import useCounter from "../../hooks/useCounter";

export default function StatsBand() {
    const creators = useCounter(10000);
    const brands = useCounter(500);
    const earnings = useCounter(1);
    const score = useCounter(820);

  return (
    <>
<section className="stats-band bg-cobalt">
  <div className="container">
    <div className="row g-4 align-items-center">
      <div className="col-6 col-md-3 text-center text-md-start">
        <div className="stat-num" data-count="10000" data-suffix="+">{creators}+</div>
        <div className="stat-label">Active Creators</div>
      </div>

      <div className="col-6 col-md-3 text-center text-md-start">
        <div className="stat-num" data-count="500" data-suffix="+"> {brands}+</div>
        <div className="stat-label">Brands Partnered</div>
      </div>

      <div className="col-6 col-md-3 text-center text-md-start">
        <div className="stat-num" data-count="1" data-suffix="M+">{earnings}M+</div>
        <div className="stat-label">Creator Earnings</div>
      </div>

      <div className="col-6 col-md-3 text-center text-md-start">
        <div className="stat-num" data-count="820" data-suffix=""> {score}</div>
        <div className="stat-label">Avg. Creator Score</div>
      </div>
    </div>
  </div>
</section>
 </>
  );
}