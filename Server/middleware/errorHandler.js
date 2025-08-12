const multer = require('multer');

function errorHandler(err, req, res, next) {
  console.error('Error:', err && err.message ? err.message : err);

  // Multer file size / unexpected file type
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Max 2MB allowed.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Invalid file type. Only CSV files are allowed.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Only one file allowed.' });
    }
    return res.status(400).json({ error: err.message });
  }

  // OpenAI API errors
  if (err.code === 'insufficient_quota') {
    return res.status(500).json({ error: 'OpenAI API quota exceeded. Please try again later.' });
  }
  if (err.code === 'invalid_api_key') {
    return res.status(500).json({ error: 'OpenAI API key is invalid. Please check your configuration.' });
  }

  // File system errors
  if (err.code === 'ENOENT') {
    return res.status(500).json({ error: 'File not found or access denied.' });
  }
  if (err.code === 'EACCES') {
    return res.status(500).json({ error: 'Permission denied accessing file.' });
  }

  // Generic errors
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({ 
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;