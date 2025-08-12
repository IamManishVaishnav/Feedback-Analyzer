import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#181624] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-[#4922E5]">Transform</span> Your Feedback?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses that are already using our AI-powered feedback analyzer 
            to make better decisions and improve customer satisfaction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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
              View Demo
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2 hover:text-[#4922E5] transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-[#4922E5] rounded-full"></div>
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#4922E5] transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-[#4922E5] rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#4922E5] transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-[#4922E5] rounded-full"></div>
              <span>Instant results</span>
            </div>
          </div>
        </div>
        
        {/* Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-[#4922E5]/20">
          <div>
            <h3 className="text-[#4922E5] font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/analyze" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Analyze Feedback</Link></li>
              <li><Link to="/features" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#4922E5] font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">About</Link></li>
              <li><Link to="/contact" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#4922E5] font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/help" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Help Center</Link></li>
              <li><Link to="/docs" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Documentation</Link></li>
              <li><Link to="/api" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#4922E5] font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/privacy" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Terms</Link></li>
              <li><Link to="/security" className="hover:text-[#4922E5] transition-colors duration-300 hover:scale-105 inline-block">Security</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-8 border-t border-[#4922E5]/20 text-gray-400">
          <p>&copy; 2024 Feedback Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
