const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
    try {
        // Enhanced request validation
        if (!req.body) {
            return res.status(400).json({ 
                error: 'Request body is missing'
            });
        }

        if (!req.body.code || typeof req.body.code !== 'string') {
            return res.status(400).json({ 
                error: 'Code must be provided as a string in the request body'
            });
        }

        const code = req.body.code;
        const response = await aiService(code);
        
        res.setHeader('Content-Type', 'text/plain');
        res.send(response);
    } catch (error) {
        console.error('Controller Error:', error);
        res.status(500).json({ 
            error: 'Failed to process code review',
            details: error.message 
        });
    }
};