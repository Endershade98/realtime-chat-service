// src/presentation/http/errors/http-error-mapper.js

const BusinessRuleError =
  require('../../../domain/errors/BusinessRuleError');

const ValidationError =
  require('../../../domain/errors/ValidationError');

function mapError(err) {

  if (err instanceof ValidationError) {

    return {
      status: 400,
      body: {
        error: err.message
      }
    };
  }

  if (err instanceof BusinessRuleError) {

    return {
      status: 422,
      body: {
        error: err.message
      }
    };
  }

  return {
    status: 500,
    body: {
      error: 'Internal Server Error'
    }
  };
}

module.exports = mapError;