const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Auth test route
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth routes working' });
});

// Users test route
app.get('/api/users/test', (req, res) => {
  res.json({ message: 'Users routes working' });
});

// Stores test route
app.get('/api/stores/test', (req, res) => {
  res.json({ message: 'Stores routes working' });
});

// Ratings test route
app.get('/api/ratings/test', (req, res) => {
  res.json({ message: 'Ratings routes working' });
});

// Dashboard test route
app.get('/api/dashboard/test', (req, res) => {
  res.json({ message: 'Dashboard routes working' });
});

const PORT = 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Test these URLs in your browser:');
  console.log(`http://localhost:${PORT}/`);
  console.log(`http://localhost:${PORT}/api/auth/test`);
  console.log(`http://localhost:${PORT}/api/users/test`);
  console.log(`http://localhost:${PORT}/api/stores/test`);
  console.log(`http://localhost:${PORT}/api/ratings/test`);
  console.log(`http://localhost:${PORT}/api/dashboard/test`);
}); 