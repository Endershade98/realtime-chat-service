// src/presentation/http/validators/user.validator.js

function validateCreateUser(req, res, next) {
  const { username, email } = req.body;

  if (!username) {
    return res.status(400).json({
      error: 'username is required'
    });
  }

  if (!email) {
    return res.status(400).json({
      error: 'email is required'
    });
  }

  next();
}

module.exports = {
  validateCreateUser
};