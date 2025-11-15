const express = require('express');
const aiController = require('../controllers/ai.controller');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

router.post('/recommendations', authMiddleware, aiController.getRecommendations);

module.exports = router;