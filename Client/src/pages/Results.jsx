import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAnalysis } from '../context/AnalysisContext';

function Results() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { analysisData, uploadedFile, clearAnalysis } = useAnalysis();

  // Redirect if no analysis data
  useEffect(() => {
    if (!analysisData) {
      navigate('/analyze');
    }
  }, [analysisData, navigate]);

  // If no data, show loading
  if (!analysisData) {
    return (
      <div className="min-h-screen bg-[#181624] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#4922E5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  // Extract data from analysis
  const { analysis, dataPoints, feedbackCount } = analysisData;
  
  // Handle both structured and raw analysis
  const isStructured = analysis && !analysis.parseError;
  
  // Calculate sentiment percentages
  const getSentimentPercentages = () => {
    if (!isStructured) return { positive: 0, neutral: 0, negative: 0 };
    
    const sentimentScore = analysis.sentimentScore || 0.5;
    const positive = Math.round(sentimentScore * 100);
    const negative = Math.round((1 - sentimentScore) * 100);
    const neutral = 100 - positive - negative;
    
    return {
      positive: Math.max(0, positive),
      neutral: Math.max(0, neutral),
      negative: Math.max(0, negative)
    };
  };

  const sentimentData = getSentimentPercentages();

  // Generate insights from analysis
  const getInsights = () => {
    if (!isStructured) return [];
    
    const insights = [];
    
    if (analysis.sentimentScore !== undefined) {
      insights.push({
        title: "Overall Sentiment Score",
        value: `${Math.round(analysis.sentimentScore * 100)}%`,
        category: "Sentiment"
      });
    }
    
    if (analysis.positiveFeedback && analysis.positiveFeedback.length > 0) {
      insights.push({
        title: "Positive Feedback Count",
        value: analysis.positiveFeedback.length,
        category: "Positive"
      });
    }
    
    if (analysis.negativeFeedback && analysis.negativeFeedback.length > 0) {
      insights.push({
        title: "Issues Identified",
        value: analysis.negativeFeedback.length,
        category: "Issues"
      });
    }
    
    if (analysis.suggestions && analysis.suggestions.length > 0) {
      insights.push({
        title: "Suggestions Provided",
        value: analysis.suggestions.length,
        category: "Suggestions"
      });
    }
    
    return insights;
  };

  const insights = getInsights();

  // Generate word cloud data from themes
  const getWordCloudData = () => {
    if (!isStructured || !analysis.keyThemes) return [];
    
    return analysis.keyThemes.map((theme, index) => ({
      word: theme,
      frequency: 20 - (index * 2), // Decreasing frequency for visual effect
      sentiment: analysis.sentimentScore > 0.5 ? 'positive' : 'negative'
    }));
  };

  const wordCloudData = getWordCloudData();

  const handleNewAnalysis = () => {
    clearAnalysis();
    navigate('/analyze');
  };

  return (
    <div className="min-h-screen overflow-hidden text-white">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#100e1a] via-[#12121f] to-[#0a0a14]"></div>
      
      {/* Floating orbs for visual appeal */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4922E5]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4922E5]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Analysis <span className="text-[#4922E5]">Complete</span>
          </h1>
          <p className="text-xl text-gray-300">
            Results for: {uploadedFile?.name || 'Uploaded file'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {dataPoints} data points analyzed • {feedbackCount} feedback items processed
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sentiment Analysis Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#4922E5] mb-4">Sentiment Analysis</h2>
            
            {/* Positive Sentiment */}
            <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-500/30 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Positive Sentiment</h3>
                  <div className="text-4xl font-bold text-green-400 mb-2">{sentimentData.positive}%</div>
                  <div className="text-sm text-green-400">
                    Based on overall sentiment analysis
                  </div>
                </div>
                <div className="text-3xl">😊</div>
              </div>
            </div>

            {/* Neutral Sentiment */}
            <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border border-yellow-500/30 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Neutral Sentiment</h3>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">{sentimentData.neutral}%</div>
                  <div className="text-sm text-yellow-400">
                    Balanced or mixed feedback
                  </div>
                </div>
                <div className="text-3xl">😐</div>
              </div>
            </div>

            {/* Negative Sentiment */}
            <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 border border-red-500/30 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Negative Sentiment</h3>
                  <div className="text-4xl font-bold text-red-400 mb-2">{sentimentData.negative}%</div>
                  <div className="text-sm text-red-400">
                    Areas needing improvement
                  </div>
                </div>
                <div className="text-3xl">😞</div>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#4922E5] mb-4">Key Insights</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {insights.map((insight, index) => (
                <div key={index} className="bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-xl p-6 hover:border-[#4922E5]/40 hover:shadow-[0_0_20px_rgba(73,34,229,0.15)] transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                      <p className="text-2xl font-bold text-[#4922E5]">{insight.value}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#4922E5]/20 text-[#4922E5] text-sm rounded-full">
                      {insight.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Themes Section */}
          {isStructured && analysis.keyThemes && (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#4922E5] mb-6">Key Themes</h2>
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-2xl p-8 hover:border-[#4922E5]/40 hover:shadow-[0_0_30px_rgba(73,34,229,0.15)] transition-all duration-300">
                <div className="flex flex-wrap justify-center gap-4">
                  {analysis.keyThemes.map((theme, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-110 bg-[#4922E5]/20 text-[#4922E5] border border-[#4922E5]/30"
                      style={{ fontSize: `${Math.max(14, 20 - index * 2)}px` }}
                    >
                      {theme}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Items Section */}
          {isStructured && analysis.actionItems && (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#4922E5] mb-6">Recommended Action Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.actionItems.map((action, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-xl p-6 hover:border-[#4922E5]/40 hover:shadow-[0_0_20px_rgba(73,34,229,0.15)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#4922E5] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-300">{action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Analysis (if structured parsing failed) */}
          {!isStructured && analysis.rawAnalysis && (
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#4922E5] mb-6">Analysis Results</h2>
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-2xl p-8 hover:border-[#4922E5]/40 hover:shadow-[0_0_30px_rgba(73,34,229,0.15)] transition-all duration-300">
                <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                  {analysis.rawAnalysis}
                </pre>
              </div>
            </div>
          )}

          {/* Overview Summary */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#4922E5] mb-6">Analysis Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-xl p-6 hover:border-[#4922E5]/40 hover:shadow-[0_0_20px_rgba(73,34,229,0.15)] transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4922E5] mb-2">{dataPoints}</div>
                  <p className="text-gray-300">Total Data Points</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-xl p-6 hover:border-[#4922E5]/40 hover:shadow-[0_0_20px_rgba(73,34,229,0.15)] transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4922E5] mb-2">{feedbackCount}</div>
                  <p className="text-gray-300">Feedback Items</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#181624] border border-[#4922E5]/20 rounded-xl p-6 hover:border-[#4922E5]/40 hover:shadow-[0_0_20px_rgba(73,34,229,0.15)] transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4922E5] mb-2">
                    {isStructured ? Math.round(analysis.sentimentScore * 100) : 'N/A'}%
                  </div>
                  <p className="text-gray-300">Sentiment Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleNewAnalysis}
              className="bg-[#4922E5] hover:bg-[#4922E5]/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#4922E5]/25 hover:scale-105"
            >
              Analyze Another File
            </Button>
            <Button variant="outline" className="border-[#4922E5] text-[#4922E5] hover:bg-[#4922E5] hover:text-white px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(73,34,229,0.2)]">
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
  