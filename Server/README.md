# Feedback Analyzer - Backend Server

A Node.js/Express server that analyzes CSV feedback files using OpenAI's GPT-4 API.

## Features

- 📁 CSV file upload and parsing
- 🤖 AI-powered feedback analysis using OpenAI GPT-4
- 📊 Structured analysis results (positive/negative feedback, suggestions, sentiment)
- 🛡️ File validation and security
- 🧹 Automatic file cleanup
- 📈 Health check endpoint

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Create a `.env` file in the server directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

3. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status and uptime

### Upload and Analyze
- **POST** `/api/upload`
- **Content-Type:** `multipart/form-data`
- **Body:** `file` (CSV file)

**Response:**
```json
{
  "analysis": {
    "positiveFeedback": ["..."],
    "negativeFeedback": ["..."],
    "suggestions": ["..."],
    "sentimentScore": 0.75,
    "keyThemes": ["..."],
    "actionItems": ["..."]
  },
  "dataPoints": 50,
  "feedbackCount": 45
}
```

## File Requirements

- **Format:** CSV only
- **Size:** Maximum 2MB
- **Columns:** Any format, the system will automatically detect feedback columns
- **Row Limit:** Maximum 1000 rows for performance

## Error Handling

The server includes comprehensive error handling for:
- Invalid file types
- File size limits
- CSV parsing errors
- OpenAI API errors
- File system errors

## Project Structure

```
Server/
├── config/
│   ├── multer.js      # File upload configuration
│   └── openai.js      # OpenAI API configuration
├── controllers/
│   └── analyzeController.js  # Main analysis logic
├── middleware/
│   └── errorHandler.js       # Global error handling
├── routes/
│   └── analyze.js           # API routes
├── utils/
│   └── csvUtils.js          # CSV parsing utilities
├── uploads/                 # Temporary file storage
├── index.js                 # Server entry point
└── package.json
```

## Development

- **Port:** 5000 (default)
- **CORS:** Configured for localhost:5173 (Vite default)
- **Logging:** Console logging with error details
- **File Cleanup:** Automatic cleanup of uploaded files after processing
