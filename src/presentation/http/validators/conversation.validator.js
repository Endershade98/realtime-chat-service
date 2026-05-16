// src/presentation/http/validators/conversation.validator.js

function validateCreateConversation(req, res, next) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: 'title is required'
    });
  }

  next();
}

module.exports = {
  validateCreateConversation
};