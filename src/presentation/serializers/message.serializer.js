// src/presentation/serializers/message.serializer.js


module.exports = function serializeMessage(entity) {
  return {
    id: entity.id,
    content: entity.content,
    senderId: entity.senderId,
    conversationId: entity.conversationId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  };
};