const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { handleUpload } = require('../controllers/analyzeController');

// POST /api/upload
router.post('/upload', upload.single('file'), handleUpload);

module.exports = router;