const express = require('express');
const app = express();
const port = 3000;

// Serving static files from "public" directory
app.use(express.static('public'));

// Start the server on all network interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});
app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});
fetch('/get-snacks')
    .then(response => response.json())
    .then(snacks => {
        const snackList = document.getElementById('snackList');
        snacks.forEach(snack => {
            const li = document.createElement('li');
            li.textContent = `${snack.name} - ${snack.category} - ${snack.calories} calories`;
            snackList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
