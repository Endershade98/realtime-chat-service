// src/presentation/http/routes/user.routes.js

const express = require('express');

const validation =
  require('../middleware/validation');

const validateCreateUser =
  require('../validators/user.validator');

module.exports = (controller) => {

  const router = express.Router();

  router.post(
    '/',
    validation(validateCreateUser),
    (req, res, next) =>
      controller.createUser(req, res, next)
  );

  return router;
};