const express = require('express');
const router = express.Router();

// Importing distributed database system
const db = require('cassandra-driver');

// Connect to your Cassandra cluster
const client = new db.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1' });

// Implementing scalability
router.get('/scale', async (req, res) => {
  try {
    // Retrieve the total number of blocks in the blockchain
    const query = 'SELECT COUNT(*) FROM blockchain';
    const result = await client.execute(query);

    // Calculate the scalability factor based on the total number of blocks
    const scalabilityFactor = Math.log(result.rows[0].count.low) / Math.log(2);

    return res.status(200).json({ scalabilityFactor });
  } catch (error) {
    return res.status(500).json({ error: 'Error calculating scalability factor' });
  }
});

module.exports = router;
