const express = require('express');
const app = express();
const port = 3000;

// Serving static files from "public" directory
app.use(express.static('public'));

// Start the server on all network interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});
