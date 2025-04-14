const cds = require('@sap/cds');
const express = require('express');
const path = require('path');

cds.on('bootstrap', app => {
  // Serve UI5 frontend from /static
  app.use(express.static(path.join(__dirname, 'static')));

  // Default route for root path
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
  });
});

// Start CAP service with Express
cds.serve('all').in('express');
