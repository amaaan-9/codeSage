const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const app = express();

console.log('Loading .env from:', path.resolve(__dirname, '../.env'));
console.log('API Key status:', process.env.GOOGLE_GEMINI_KEY ? 'Set' : 'Not set');

if (!process.env.GOOGLE_GEMINI_KEY) {
    console.error('GOOGLE_GEMINI_KEY is not set in environment variables');
    process.exit(1);
}

// Add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const aiRoutes = require('./routes/ai.routes');

// Use routes
app.use('/ai', aiRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Code Reviewer API is running' });
});

module.exports = app;
