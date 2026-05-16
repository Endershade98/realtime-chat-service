// src/presentation/http/middleware/error-handler.js

const mapError =
  require('../errors/http-error-mapper');

function errorHandler(err, req, res, next) {

  const mapped = mapError(err);

  return res
    .status(mapped.status)
    .json(mapped.body);
}

module.exports = errorHandler;