const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller'); // Import the AI controller   

router.post('/get-review', aiController.getReview); // Define a route for getting AI responses


module.exports = router; // Export the router instance for use in other files