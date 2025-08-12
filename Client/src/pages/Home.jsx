import HeroSection from "../components/HeroSection";
import Works from "../components/Works";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#181624] text-white overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#181624] via-[#1a1a2e] to-[#181624]"></div>
      
      {/* Floating orbs for visual appeal */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4922E5]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4922E5]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4922E5]/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      {/* Page Content */}
      <div className="relative z-10">
        <HeroSection />
        <Works />
        <Features />
        <Footer />
      </div>
    </div>
  );
};

export default Home;

