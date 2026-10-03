// src/presentation/http/routes/conversation.routes.js

const express = require('express');

const validation =
  require('../middleware/validation');

const validateCreateConversation =
  require('../validators/conversation.validator');

module.exports = (controller) => {

  const router = express.Router();

  router.post(
    '/',
    validation(validateCreateConversation),
    (req, res, next) =>
      controller.createConversation(req, res, next)
  );

  router.get(
    '/:conversationId/messages',
    (req, res, next) =>
      controller.getMessages(req, res, next)
  );

  return router;
};