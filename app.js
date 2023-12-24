// Importing necessary libraries
const express = require('express');
const axios = require('axios');

// Creating an instance of express
const app = express();

// Setting up the port
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Quantum-Secure Distributed Ledger');
});

// Quantum Cryptography route
app.post('/quantumCryptography/encrypt', async (req, res) => {
  const response = await axios.post('http://localhost:3000/quantumCryptography/encrypt', req.body);
  res.json(response.data);
});

app.post('/quantumCryptography/decrypt', async (req, res) => {
  const response = await axios.post('http://localhost:3000/quantumCryptography/decrypt', req.body);
  res.json(response.data);
});

// Ledger route
app.post('/ledger/add', async (req, res) => {
  const response = await axios.post('http://localhost:3000/ledger/add', req.body);
  res.json(response.data);
});

// Blockchain route
app.post('/blockchain/createBlock', async (req, res) => {
  const response = await axios.post('http://localhost:3000/blockchain/createBlock', req.body);
  res.json(response.data);
});

// Smart Contract route
app.post('/smartContract/execute', async (req, res) => {
  const response = await axios.post('http://localhost:3000/smartContract/execute', req.body);
  res.json(response.data);
});

// Data Compression route
app.post('/dataCompression/compress', async (req, res) => {
  const response = await axios.post('http://localhost:3000/dataCompression/compress', req.body);
  res.json(response.data);
});

app.post('/dataCompression/decompress', async (req, res) => {
  const response = await axios.post('http://localhost:3000/dataCompression/decompress', req.body);
  res.json(response.data);
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
