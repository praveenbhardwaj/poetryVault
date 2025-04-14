const cds = require('@sap/cds');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files first
app.use(express.static(path.join(__dirname, 'static')));

// Explicit route for root
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'static', 'index.html');
  console.log('Checking index.html at:', indexPath);
  if (fs.existsSync(indexPath)) {
    console.log('Serving index.html');
    res.sendFile(indexPath);
  } else {
    console.log('index.html not found');
    res.status(404).send('Index file not found');
  }
});

// Add CAP services after custom routes
(async () => {
  await cds.serve().in(app);
  const port = process.env.PORT || 3000;
  console.log(`Listening on port ${port}`);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();