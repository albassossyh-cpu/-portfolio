const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/employees', employeeRoutes);

// Serve HTML files for specific routes (optional, but static folder handles it generally)
// We rely on static serving: /index.html, /about.html, etc.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
