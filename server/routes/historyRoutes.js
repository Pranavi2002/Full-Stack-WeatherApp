const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistory');
const authenticateToken = require('../middleware/authMiddleware');

// POST - save city search (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { city } = req.body;
    const userId = req.user.userId;
    const entry = new SearchHistory({ city, userId });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Could not save search' });
  }
});

// GET - get latest 5 searches (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // // get the recent history
    // const history = await SearchHistory.find({ userId }).sort({ timestamp: -1 }).limit(5);

    // Get full search history, sorted by timestamp descending
    const history = await SearchHistory.find({ userId }).sort({ timestamp: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

// DELETE - clear user's history
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    await SearchHistory.deleteMany({ userId });
    res.json({ message: 'Search history cleared.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

module.exports = router;
