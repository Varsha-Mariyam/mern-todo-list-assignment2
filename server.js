require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MERN To-Do List API is running' });
});

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
