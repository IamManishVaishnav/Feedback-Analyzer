const Works = () => {
  const steps = [
    {
      title: "1. Upload Feedback",
      desc: "Upload or paste user feedbacks in CSV format, text, or any supported format.",
      icon: "📄"
    },
    {
      title: "2. AI Analysis",
      desc: "Our AI detects sentiment, finds keywords, and reveals hidden feedback trends.",
      icon: "🤖"
    },
    {
      title: "3. View Results",
      desc: "Instantly view graphs, word clouds, and key insights from your feedback data.",
      icon: "📊"
    },
  ];
  

  return (
    <section className="py-24 bg-[#181624] text-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-[#4922E5]">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform makes feedback analysis simple and insightful. 
            Get results in seconds, not hours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="relative group"
            >
              {/* Connection line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#4922E5] to-transparent transform -translate-y-1/2 z-0"></div>
              )}
              
              <div className="relative z-10 bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-2xl p-8 hover:border-[#4922E5]/40 hover:shadow-[0_0_30px_rgba(73,34,229,0.15)] transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-[#4922E5]/20 rounded-full mb-6 text-3xl group-hover:bg-[#4922E5]/30 transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#4922E5] mb-4 group-hover:text-[#4922E5]/90 transition-colors duration-300">{step.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{step.desc}</p>
                
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#4922E5] rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:shadow-[0_0_15px_rgba(73,34,229,0.5)] transition-all duration-300">
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-[#4922E5]/10 border border-[#4922E5]/20 rounded-full px-6 py-3 hover:bg-[#4922E5]/15 hover:border-[#4922E5]/30 hover:shadow-[0_0_20px_rgba(73,34,229,0.2)] transition-all duration-300">
            <div className="w-2 h-2 bg-[#4922E5] rounded-full animate-pulse"></div>
            <span className="text-[#4922E5] font-medium">Process completed in under 30 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
  
  