const mongoose = require('mongoose');

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string
mongoose.connect('your_mongodb_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
