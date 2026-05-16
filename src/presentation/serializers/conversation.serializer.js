// src/presentation/serializers/conversation.serializer.js

module.exports = function serializeConversation(
  conversation
) {

  return {
    id: conversation.id.toString(),
    title: conversation.title,
    participants:
      conversation.participants.map(
        p => p.userId.toString()
      )
  };
};