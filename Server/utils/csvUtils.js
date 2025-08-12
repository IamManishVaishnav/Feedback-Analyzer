const fs = require('fs');
const csvParser = require('csv-parser');

/**
 * Parse CSV at filePath into array of rows (objects). Enforces a row limit.
 */
function parseCsv(filePath, { rowLimit = 500 } = {}) {
  return new Promise((resolve, reject) => {
    const rows = [];
    const stream = fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        rows.push(row);
        if (rows.length >= rowLimit) {
          // Stop reading further rows
          stream.destroy();
          resolve(rows);
        }
      })
      .on('end', () => resolve(rows))
      .on('error', (err) => reject(err));
  });
}

/**
 * Try to find the best feedback column; fallback to joining all columns.
 */
function extractFeedbackTexts(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return [];

  const keys = Object.keys(rows[0]).map(k => k.toLowerCase());
  const priority = ['feedback', 'comment', 'comments', 'review', 'message', 'text'];
  const foundKey = priority.find(p => keys.includes(p));

  if (foundKey) {
    return rows.map(r => (r[foundKey] || '').toString().trim()).filter(Boolean);
  }

  // fallback: join all columns per row
  return rows.map(r => Object.values(r).join(' ').trim()).filter(Boolean);
}

function chunkArray(arr, size = 20) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

module.exports = { parseCsv, extractFeedbackTexts, chunkArray };