import Hero from "../components/home/Hero";
import AwardsRegistration from "../components/home/AwardsRegistration";
import StatsBand from "../components/home/StatsBand";
import Earn from "../components/home/Earn";
import Brands from "../components/home/Brands";
import Expierence from "../components/home/Expierence";
import AppShowCase from "../components/home/AppShowCase";
import FAQ from "../components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <AwardsRegistration />
      <Earn />
      <Brands />
      <Expierence />
      <AppShowCase />
      <FAQ />
    </>
  );
}