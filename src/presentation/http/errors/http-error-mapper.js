// src/presentation/http/errors/http-error-mapper.js

const ValidationError =
  require('../../../domain/errors/ValidationError');

const BusinessRuleError =
  require('../../../domain/errors/BusinessRuleError');

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
      error: 'Internal server error'
    }
  };
}

module.exports = mapError;