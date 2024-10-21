const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB connection string (ensure this matches your MongoDB instance)
mongoose.connect('mongodb://localhost:27017/history')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const app = express();
app.use(cors()); // Allow CORS
app.use(express.json()); // Parse incoming JSON requests

// Import Routes for Machines
const machineRoutes = require('./routes/machineRoutes');
app.use('/api/machines', machineRoutes); // API route for machine data

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
