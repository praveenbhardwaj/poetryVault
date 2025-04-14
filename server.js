const cds = require('@sap/cds');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

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

(async () => {
  try {
    console.log('Loading CDS model...');
    const model = await cds.load('*');
    console.log('Model loaded:', Object.keys(model.definitions));
    console.log('Connecting to database...');
    await cds.connect.to('db'); // Explicitly connect to the database
    console.log('Database connected successfully');
    console.log('Starting CDS services...');
    await cds.serve().in(app);
    console.log('CDS services started successfully');
  } catch (error) {
    console.error('Error in CDS setup:', error);
  }
  const port = process.env.PORT || 3000;
  console.log(`Listening on port ${port}`);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();