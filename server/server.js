const express = require('express');
// The web framework to build the API

const cors = require('cors');
// Enables cross-origin requests (needed for frontend-backend communication)

const dotenv = require('dotenv'); 
// Loads environment variables from a .env file

const mongoose = require('mongoose');
// Variable for database connection

const weatherRoutes = require('./routes/weatherRoutes'); 
// Custom route handler file for weather-related API requests

const historyRoutes = require('./routes/historyRoutes');
// Custom route handler file for search history (NEW)

const authRoutes = require('./routes/authRoutes');
// Custom route handler for user authentication

dotenv.config();
// Loads your .env file into process.env

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Route handlers
app.use('/api/weather', weatherRoutes); // Weather data routes
app.use('/api/history', historyRoutes); // Search history routes (NEW)
app.use('/api/auth', authRoutes);   // User authentication routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
