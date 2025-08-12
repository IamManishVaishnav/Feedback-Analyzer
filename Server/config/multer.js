const multer = require('multer');
const path = require('path');

// Disk storage with predictable filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ts = Date.now();
    const safeName = file.originalname.replace(/[^a-z0-9.\-\_]/gi, '_');
    cb(null, `${ts}-${safeName}`);
  },
});

// Accept common CSV MIME types and .csv extension
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = ['.csv'];
  const allowedMimes = ['text/csv', 'application/vnd.ms-excel', 'text/plain'];

  if (allowedExt.includes(ext) && allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only CSV files are allowed'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter,
});

module.exports = upload;