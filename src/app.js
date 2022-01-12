const express = require('express');
const http = require('http');
const path = require('path');

// Using port 5553 as part of student ID
const port = 5553;

// init app and server
var app = express();
var server = http.createServer(app);

// the app responds with index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Files stored statically in public folder
app.use(express.static(path.join(__dirname, '../public/')));

// server listens on port 5553 for connections
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});