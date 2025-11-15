const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback - Add new feedback
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation
    if (!name || !message) {
      return res.status(400).json({ 
        error: 'Name and message are required' 
      });
    }

    const feedback = new Feedback({
      name,
      email,
      message,
      rating
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/feedback - Get all feedback
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/stats - Get statistics
router.get('/stats', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    
    const totalCount = feedbacks.length;
    const avgRating = totalCount > 0
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalCount
      : 0;
    
    const positiveCount = feedbacks.filter(f => f.rating >= 4).length;
    const negativeCount = feedbacks.filter(f => f.rating <= 3).length;

    res.json({
      totalCount,
      avgRating: avgRating.toFixed(2),
      positiveCount,
      negativeCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/feedback/search - Search/filter by rating
router.get('/feedback/search', async (req, res) => {
  try {
    const { rating } = req.query;
    const query = rating ? { rating: parseInt(rating) } : {};
    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/feedback/export - Export to CSV
router.get('/feedback/export', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    
    let csv = 'Name,Email,Rating,Message,Date\n';
    feedbacks.forEach(f => {
      csv += `"${f.name}","${f.email}",${f.rating},"${f.message}","${new Date(f.createdAt).toLocaleString()}"\n`;
    });
    
    res.header('Content-Type', 'text/csv');
    res.attachment('feedbacks.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
