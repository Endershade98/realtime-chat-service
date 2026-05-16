// src/presentation/serializers/conversation.serializer.js

module.exports = function serializeConversation(entity) {
  return {
    id: entity.id,
    title: entity.title,
    participants: entity.participants,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  };
};