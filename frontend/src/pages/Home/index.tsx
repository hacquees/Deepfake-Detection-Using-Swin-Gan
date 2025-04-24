import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroSection from './HeroSection';
import StatisticsSection from './StatisticsSection';
import HowItWorksSection from './HowItWorksSection';
import FeaturesSection from './FeaturesSection';
import TeamSection from './TeamSection';
// import TestimonialSection from './TestimonialSection';
import CTASection from './CTASection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StatisticsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TeamSection />
        {/* <TestimonialSection /> */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;