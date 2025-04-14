const cds = require('@sap/cds');
const express = require('express');
const path = require('path');

// Initialize Express app
const app = express();

// Bootstrap CAP services
cds.on('bootstrap', () => {
  // Serve UI5 frontend from /static
  app.use(express.static(path.join(__dirname, 'static')));

  // Default route for root path
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
  });
});

// Serve CAP services from gen/srv
(async () => {
  await cds.serve('gen/srv').in(app);

  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();