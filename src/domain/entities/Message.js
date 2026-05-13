// src/domain/entities/Message.js

class Message {
  constructor({
    id,
    conversationId,
    senderId,
    content,
    type = 'text',
    createdAt,
    status = 'sent'
  }) {

    if (!content || content.trim() === "") {
      throw new Error("Message content cannot be empty");
    }

    this.id = id;
    this.conversationId = conversationId;
    this.senderId = senderId;

    this.content = content;
    this.type = type;

    this.createdAt = createdAt;
    this.status = status;
  }

  markDelivered() {
    if (this.status === 'read') return;

    this.status = 'delivered';
  }

  markRead() {
    this.status = 'read';
  }

  equals(other) {
    return other instanceof Message && this.id.equals(other.id);
  }
}

module.exports = Message;