import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "Sentiment Analysis",
      desc: "Instantly detect positive, negative, and neutral sentiment from customer feedback with high accuracy.",
      icon: "😊",
      gradient: "from-[#4922E5] to-[#7c3aed]"
    },
    {
      title: "Keyword Extraction",
      desc: "Automatically identify and highlight the most frequently mentioned words and phrases in your feedback.",
      icon: "🔍",
      gradient: "from-[#7c3aed] to-[#a855f7]"
    },
    {
      title: "Smart Summaries",
      desc: "Get AI-generated summaries that capture the essence of all feedback, saving you hours of reading.",
      icon: "📝",
      gradient: "from-[#a855f7] to-[#c084fc]"
    },
    {
      title: "Trend Detection",
      desc: "Identify patterns and trends in customer feedback over time to make data-driven decisions.",
      icon: "📈",
      gradient: "from-[#c084fc] to-[#4922E5]"
    },
    {
      title: "CSV Support",
      desc: "Upload feedback in CSV format and let our AI process thousands of responses automatically.",
      icon: "📊",
      gradient: "from-[#4922E5] to-[#7c3aed]"
    },
    {
      title: "Real-time Processing",
      desc: "Get instant results with our optimized AI models that process feedback in real-time.",
      icon: "⚡",
      gradient: "from-[#7c3aed] to-[#a855f7]"
    }
  ];

  return (
    <section className="py-24 bg-[#181624] text-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful <span className="text-[#4922E5]">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advanced AI technology provides comprehensive feedback analysis with 
            features designed to give you actionable insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group relative bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-2xl p-8 hover:border-[#4922E5]/40 hover:shadow-[0_0_30px_rgba(73,34,229,0.15)] transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-[#4922E5]/20 rounded-full mb-6 text-3xl group-hover:scale-110 group-hover:bg-[#4922E5]/30 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#4922E5] mb-4 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
              
              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#4922E5]/30 transition-all duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-[#4922E5]/10 border border-[#4922E5]/20 rounded-full px-8 py-4 hover:bg-[#4922E5]/15 hover:border-[#4922E5]/30 hover:shadow-[0_0_25px_rgba(73,34,229,0.2)] transition-all duration-300">
            <div className="w-2 h-2 bg-[#4922E5] rounded-full animate-pulse"></div>
            <span className="text-[#4922E5] font-medium">All features included in every analysis</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
