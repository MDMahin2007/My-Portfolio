const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const messageRoutes = require('./routes/messages');
const testimonialRoutes = require('./routes/testimonials');

const app = express();
let databaseReady = false;
let databaseState = process.env.MONGODB_URI ? 'connecting' : 'not-configured';
let databaseError = '';
const frontendOrigin = new URL(process.env.FRONTEND_URL || 'http://localhost:5173').origin;

mongoose.set('bufferCommands', false);

app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: '50kb' }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Request body must be valid JSON.' });
  }
  return next(err);
});

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
    socketTimeoutMS: 10000,
    family: 4,
    maxPoolSize: 10,
  })
    .then(() => { databaseReady = true; databaseState = 'connected'; databaseError = ''; console.log('MongoDB connected successfully'); })
    .catch((err) => { databaseState = 'unavailable'; databaseError = err.message; console.error('MongoDB connection error:', err.message); });
} else {
  console.warn('MONGODB_URI is not configured. Contact delivery will use its direct-email fallback.');
}

mongoose.connection.on('error', (err) => {
  databaseReady = false;
  databaseState = 'unavailable';
  databaseError = err.message;
  console.error('MongoDB runtime error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  databaseReady = false;
  if (databaseState === 'connected') databaseState = 'unavailable';
});

app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/testimonials', testimonialRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: databaseReady ? 'connected' : databaseState,
    ...(databaseError ? { databaseError } : {}),
    message: 'Mahin.dev Portfolio API is running',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
