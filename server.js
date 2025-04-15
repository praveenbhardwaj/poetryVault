const cds = require('@sap/cds');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static UI from /static
app.use(express.static(path.join(__dirname, 'static')));

// CDS Service Setup
(async () => {
  try {
    console.log('Loading CDS model...');
    const model = await cds.load('*');
    cds.model = model; // ✅ this is key!
    
    console.log('Model loaded:', Object.keys(model.definitions));
    console.log('Connecting to database...');
    await cds.connect.to('db');
    console.log('Database connected successfully');

    console.log('Starting CDS services...');
    await cds.serve('all').from(model).in(app); // ✅ explicitly use model
    console.log('CDS services started successfully');
  } catch (error) {
    console.error('Error in CDS setup:', error);
  }

  const port = process.env.PORT || 4000;
  console.log(`Listening on port ${port}`);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();

