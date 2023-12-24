const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const quantumCryptography = require('./quantumCryptography');
const ledger = require('./ledger');
const blockchain = require('./blockchain');
const smartContract = require('./smartContract');
const dataCompression = require('./dataCompression');
const dataRetrieval = require('./dataRetrieval');
const auditTrail = require('./auditTrail');
const scalability = require('./scalability');

const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// use compression to enhance performance
app.use(compression());

// defining an endpoint to return all posts
app.get('/', (req, res) => {
  res.send('Welcome to Quantum-Secure Distributed Ledger');
});

app.use('/quantumCryptography', quantumCryptography);
app.use('/ledger', ledger);
app.use('/blockchain', blockchain);
app.use('/smartContract', smartContract);
app.use('/dataCompression', dataCompression);
app.use('/dataRetrieval', dataRetrieval);
app.use('/auditTrail', auditTrail);
app.use('/scalability', scalability);

// starting the server
app.listen(3000, () => {
  console.log('listening on port 3000');
});
