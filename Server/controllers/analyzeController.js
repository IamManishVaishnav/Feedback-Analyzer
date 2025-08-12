// server/controllers/analyzeController.js
const fs = require("fs");
const path = require("path");
const openai = require("../config/openai.js");
const { parseCsv, extractFeedbackTexts } = require("../utils/csvUtils.js");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Parse CSV with row limit for safety
    const feedbackData = await parseCsv(req.file.path, { rowLimit: 1000 });
    
    // Clean up the uploaded file immediately
    fs.unlinkSync(req.file.path);
    
    if (feedbackData.length === 0) {
      return res.status(400).json({ error: "No data found in CSV file" });
    }

    // Extract feedback texts using utility function
    const feedbackTexts = extractFeedbackTexts(feedbackData);
    
    if (feedbackTexts.length === 0) {
      return res.status(400).json({ error: "No valid feedback text found in CSV file" });
    }

    const feedbackText = feedbackTexts.join("\n");

    const prompt = `
    Analyze the following feedback and provide a structured response with:
    
    1. **Positive Feedback**: List all positive comments and compliments
    2. **Negative Feedback**: List all complaints, issues, and negative comments  
    3. **Suggestions**: List all improvement suggestions and recommendations
    4. **Overall Sentiment**: Provide an overall sentiment score (0-1, where 0 is very negative and 1 is very positive)
    5. **Key Themes**: Identify 3-5 recurring themes or topics
    6. **Action Items**: Suggest 3-5 actionable improvements based on the feedback
    
    Format your response as JSON with these exact keys: positiveFeedback, negativeFeedback, suggestions, sentimentScore, keyThemes, actionItems
    
    Feedback to analyze:
    ${feedbackText}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2000
    });

    let analysis;
    try {
      // Try to parse as JSON first
      analysis = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      // If JSON parsing fails, return the raw text
      analysis = {
        rawAnalysis: completion.choices[0].message.content,
        parseError: "Could not parse structured response"
      };
    }

    res.json({ 
      analysis,
      dataPoints: feedbackData.length,
      feedbackCount: feedbackTexts.length
    });

  } catch (error) {
    // Clean up file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Legacy function for backward compatibility
const analyzeFeedback = async (req, res) => {
  return handleUpload(req, res);
};

module.exports = {
  handleUpload,
  analyzeFeedback
};
