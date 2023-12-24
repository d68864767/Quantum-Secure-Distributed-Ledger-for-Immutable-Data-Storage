const express = require('express');
const router = express.Router();

// Importing quantum-resistant cryptography library
const qrl = require('qrl');

// Implementing quantum-resistant cryptography
router.post('/encrypt', (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Data is required for encryption' });
  }

  try {
    const encryptedData = qrl.encrypt(data);
    return res.status(200).json({ encryptedData });
  } catch (error) {
    return res.status(500).json({ error: 'Error encrypting data' });
  }
});

router.post('/decrypt', (req, res) => {
  const { encryptedData } = req.body;
  if (!encryptedData) {
    return res.status(400).json({ error: 'Encrypted data is required for decryption' });
  }

  try {
    const decryptedData = qrl.decrypt(encryptedData);
    return res.status(200).json({ decryptedData });
  } catch (error) {
    return res.status(500).json({ error: 'Error decrypting data' });
  }
});

module.exports = router;
