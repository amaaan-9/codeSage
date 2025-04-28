const app = require('./src/app.js');
require('dotenv').config(); // Load environment variables from .env file
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});