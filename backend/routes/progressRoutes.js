const express = require('express');
const { getProgress, updateProgress } = require('../controllers/progressController');
const router = express.Router();

router.get('/:projectId', getProgress);  // Get progress for a specific project
router.post('/:projectId', updateProgress);  // Update progress for a specific project

module.exports = router;
