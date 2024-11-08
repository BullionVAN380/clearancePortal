const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Import Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

const clearanceRoutes = require('./routes/clearanceRoutes');
app.use('/api/clearances', clearanceRoutes);

const personnelRoutes = require('./routes/personnelRoutes');
app.use('/api/personnel', personnelRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});