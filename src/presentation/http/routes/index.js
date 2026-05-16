// src/presentation/http/routes/index.js

const express = require('express');

const userRoutes =
  require('./user.routes');

const conversationRoutes =
  require('./conversation.routes');

const messageRoutes =
  require('./message.routes');

const router = express.Router();

router.use('/users', userRoutes);

router.use('/conversations', conversationRoutes);

router.use('/messages', messageRoutes);

module.exports = router;