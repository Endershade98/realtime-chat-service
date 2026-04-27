// src/domain/entities/Message.js

const MessageId = require('../value-objects/MessageId');
const ConversationId = require('../value-objects/ConversationId');
const UserId = require('../value-objects/UserId');
const Timestamp = require('../value-objects/Timestamp');

class Message {
  constructor({
    id,
    conversationId,
    senderId,
    content,
    type = 'text',
    createdAt,
    deliveredAt = null,
    readAt = null
  }) {

    if (!content || content.trim() === "") {
      throw new Error("Message content cannot be empty");
    }

    this.id = id instanceof MessageId ? id : new MessageId(id);
    this.conversationId = conversationId instanceof ConversationId
      ? conversationId
      : new ConversationId(conversationId);

    this.senderId = senderId instanceof UserId
      ? senderId
      : new UserId(senderId);

    this.content = content;
    this.type = type;

    this.createdAt = createdAt instanceof Timestamp
      ? createdAt
      : new Timestamp(createdAt);

    this.deliveredAt = deliveredAt ? new Timestamp(deliveredAt) : null;
    this.readAt = readAt ? new Timestamp(readAt) : null;
  }

  markDelivered() {
    this.deliveredAt = new Timestamp();
  }

  markRead() {
    this.readAt = new Timestamp();
  }

  isRead() {
    return this.readAt !== null;
  }

  equals(other) {
    return other instanceof Message && this.id.equals(other.id);
  }
}

module.exports = Message;