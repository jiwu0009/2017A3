const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Body parser middleware to handle JSON data
app.use(bodyParser.json());

// Array to store snacks data
let snacks = [];

// Route to add a snack
app.post('/add-snack', (req, res) => {
    const snack = req.body;
    snacks.push(snack); // Add snack to array
    res.json(snack); // Send back the snack data
});

// Route to get all snacks
app.get('/snacks', (req, res) => {
    res.json(snacks); // Send back all snacks
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
