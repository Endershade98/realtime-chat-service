// src/presentation/http/server.js

require('dotenv').config();

const express = require('express');

// routes
const routes = require('./routes');

// middleware
const errorHandler = require('./middleware/error-handler');
const validationMiddleware = require('./middleware/validation');

const app = express();

// =========================
// CORE MIDDLEWARE
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// HEALTH CHECK (useful for k8s / docker)
// =========================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'realtime-chat-service',
    timestamp: new Date().toISOString()
  });
});

// =========================
// API ROUTES
// =========================
app.use('/api', routes);

// =========================
// 404 HANDLER
// =========================
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// =========================
// GLOBAL ERROR HANDLER
// =========================
app.use(errorHandler);

// =========================
// BOOTSTRAP SERVER
// =========================
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});

module.exports = { app, server };