// src/presentation/http/validators/user.validator.js

function validateCreateUser(body) {

  if (!body.username) {
    return {
      error: new Error('username is required')
    };
  }

  if (!body.email) {
    return {
      error: new Error('email is required')
    };
  }

  return { error: null };
}

module.exports = validateCreateUser;