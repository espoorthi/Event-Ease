
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Required to serve static files
const paymentRoutes = require('./routes/paymentRoutes');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
app.use('/api/booking', paymentRoutes);

// Default Route to Serve the Main HTML File
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'proj.html'));
});

// Start the server
const port = config.port || 3000; // Default to 3000 if no port is provided
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
