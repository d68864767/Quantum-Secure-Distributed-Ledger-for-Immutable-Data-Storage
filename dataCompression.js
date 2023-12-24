const express = require('express');
const router = express.Router();
const zlib = require('zlib');

// Implementing data compression
router.post('/compress', (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Data is required for compression' });
  }

  try {
    // Compress data using zlib
    const compressedData = zlib.gzipSync(data);
    return res.status(200).json({ data: compressedData.toString('base64') });
  } catch (error) {
    return res.status(500).json({ error: 'Error compressing data' });
  }
});

router.post('/decompress', (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Data is required for decompression' });
  }

  try {
    // Decompress data using zlib
    const decompressedData = zlib.gunzipSync(Buffer.from(data, 'base64')).toString();
    return res.status(200).json({ data: decompressedData });
  } catch (error) {
    return res.status(500).json({ error: 'Error decompressing data' });
  }
});

module.exports = router;
