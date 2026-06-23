require('dotenv').config(); // unlock the .env contents

const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');

const app = express(); // created the server app

app.use(express.json()); 
app.use(cors()); // allow react frontend to communicate with the backend

// Connection to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ MongoDB connection error', err));

// Test route
app.get('/api/test', (req, res) => { 
    res.json({ message: "The backend is alive" });
});

// Start the server code
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    
    console.log(` Server is running on port ${PORT}`); 
});