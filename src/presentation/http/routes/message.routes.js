// src/presentation/http/routes/message.routes.js

const express = require('express');

const validation =
  require('../middleware/validation');

const validateSendMessage =
  require('../validators/message.validator');

module.exports = (controller) => {

  const router = express.Router();

  router.post(
    '/',
    validation(validateSendMessage),
    (req, res, next) =>
      controller.sendMessage(req, res, next)
  );

  return router;
};