const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./routes');

// Middleware to parse JSON body
app.use(express.json());

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
