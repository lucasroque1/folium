const AiService = require('../services/ai.service');

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await AiService.recommendBooks(req.userId);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
