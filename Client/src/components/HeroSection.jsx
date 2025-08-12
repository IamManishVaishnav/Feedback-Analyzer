import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-[#181624] text-white min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#181624] via-[#12121f] to-[#0e0e1a]"></div>
      
      
      
      <div className="relative z-10 max-w-4xl">
        <div className="mb-8">
          <span className="inline-block mt-10 px-4 py-2 bg-[#4922E5]/20 border border-[#4922E5]/30 rounded-full text-[#4922E5] text-sm font-medium mb-1 hover:bg-[#4922E5]/30 hover:border-[#4922E5]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(73,34,229,0.3)]">
            AI-Powered Feedback Analysis
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Transform Your
          <span className="block text-transparent bg-gradient-to-r from-[#4922E5] to-[#7c3aed] bg-clip-text">
            Customer Feedback
          </span>
          Into Actionable Insights
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Uncover customer sentiment, pain points, and trends with our advanced AI-powered feedback analyzer. 
          Get instant insights that drive better decisions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/analyze">
            <Button 
              size="lg" 
              className="bg-[#4922E5] hover:bg-[#4922E5]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#4922E5]/25 transition-all duration-300 transform hover:scale-105"
            >
              Start Analyzing Now
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg"
            className="border-[#4922E5] text-[#4922E5] hover:bg-[#4922E5] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(73,34,229,0.2)]"
          >
            Watch Demo
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400">
          <div className="flex items-center gap-2 hover:text-[#4922E5] transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-[#4922E5] rounded-full"></div>
            <span>Real-time Analysis</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#4922E5] transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-[#4922E5] rounded-full"></div>
            <span>99.9% Accuracy</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#4922E5] transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-[#4922E5] rounded-full"></div>
            <span>Secure & Private</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
