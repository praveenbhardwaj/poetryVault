const cds = require('@sap/cds');
const express = require('express');
const path = require('path');

const app = express();

cds.on('bootstrap', () => {
  app.use(express.static(path.join(__dirname, 'static')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
  });
});

(async () => {
  await cds.serve().in(app); // Auto-detects models from srv/, db/, gen/
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();