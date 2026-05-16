// src/presentation/http/validators/message.validator.js

function validateSendMessage(body) {

  if (!body.conversationId) {

    return {
      error: new Error(
        'conversationId is required'
      )
    };
  }

  if (!body.senderId) {

    return {
      error: new Error(
        'senderId is required'
      )
    };
  }

  if (!body.content) {

    return {
      error: new Error(
        'content is required'
      )
    };
  }

  return { error: null };
}

module.exports = validateSendMessage;