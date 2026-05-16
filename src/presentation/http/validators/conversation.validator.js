// src/presentation/http/validators/conversation.validator.js

function validateCreateConversation(body) {

  if (
    !body.participants ||
    !Array.isArray(body.participants)
  ) {

    return {
      error: new Error(
        'participants must be an array'
      )
    };
  }

  return { error: null };
}

module.exports = validateCreateConversation;