import React from "react";
import Container from "../../Components/Container";
import Banner from "../../Components/Banner";
import Advertisement from "../../Components/Advertisement";
import Steps from "../../Components/Steps";
import StatsSection from "../../Components/StatsSection";
import TestimonialSection from "../../Components/TestimonialSection";
import NewsletterSection from "../../Components/NewsletterSection";
import BestBenefitSection from "../../Components/BestBenefitSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <Container />
      <Advertisement />
      <BestBenefitSection/>
      <Steps />
      <TestimonialSection />
      <StatsSection />
      <NewsletterSection/>

    </div>
  );
};

export default Home;
