// src/presentation/serializers/message.serializer.js


module.exports = function serializeMessage(message) {

  return {
    id: message.id.toString(),
    conversationId:
      message.conversationId.toString(),

    senderId:
      message.senderId.toString(),

    content: message.content,

    type: message.type,

    createdAt:
      message.createdAt.value,

    deliveredAt:
      message.deliveredAt?.value ?? null,

    readAt:
      message.readAt?.value ?? null
  };
};