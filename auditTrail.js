const express = require('express');
const router = express.Router();

// Importing distributed database system
const db = require('cassandra-driver');

// Connect to your Cassandra cluster
const client = new db.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1' });

// Implementing audit trail
router.post('/log', async (req, res) => {
  const { action, userId, timestamp } = req.body;
  if (!action || !userId || !timestamp) {
    return res.status(400).json({ error: 'Action, User ID and Timestamp are required for logging' });
  }

  try {
    // Log action to the audit trail
    const query = 'INSERT INTO auditTrail (id, action, userId, timestamp) VALUES (uuid(), ?, ?, ?)';
    await client.execute(query, [action, userId, timestamp], { prepare: true });

    return res.status(200).json({ message: 'Action logged to the audit trail successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error logging action to the audit trail' });
  }
});

router.get('/retrieveLogs', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required for log retrieval' });
  }

  try {
    // Retrieve logs from the audit trail
    const query = 'SELECT * FROM auditTrail WHERE userId = ?';
    const result = await client.execute(query, [userId], { prepare: true });

    if (result.rowLength > 0) {
      return res.status(200).json({ logs: result.rows });
    } else {
      return res.status(404).json({ error: 'No logs found for the given user ID' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving logs from the audit trail' });
  }
});

module.exports = router;
