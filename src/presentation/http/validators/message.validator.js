// src/presentation/http/validators/message.validator.js

function validateSendMessage(req, res, next) {
  const {
    conversationId,
    senderId,
    content
  } = req.body;

  if (!conversationId) {
    return res.status(400).json({
      error: 'conversationId is required'
    });
  }

  if (!senderId) {
    return res.status(400).json({
      error: 'senderId is required'
    });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({
      error: 'content is required'
    });
  }

  next();
}

module.exports = {
  validateSendMessage
};