const cds = require('@sap/cds');
const express = require('express');
const path = require('path');

const app = express();

cds.on('bootstrap', (app) => {
  cds.env.auth = { kind: 'mock' };
});



// Serve static UI from /static
app.use(express.static(path.join(__dirname, 'static')));

(async () => {
  try {
    console.log('Loading CDS model...');
    const model = await cds.load('*');
    cds.model = model;

    console.log('Model loaded:', Object.keys(model.definitions));
    console.log('Connecting to database...');
    await cds.connect.to('db');
    console.log('Database connected successfully');

    console.log('Auth strategy:', cds.env.auth); // ✅ log current auth config
    console.log('Starting CDS services...');
    await cds.serve('all').from(model).in(app);
    console.log('CDS services started successfully');
  } catch (error) {
    console.error('Error in CDS setup:', error);
  }

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
module.exports = cds.server;