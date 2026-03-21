const { v4: uuidv4 } = require('uuid');

class Message {
  constructor({ id, conversationId, senderId, content, type }) {
    this.id = id || uuidv4();
    this.conversationId = conversationId;
    this.senderId = senderId;
    this.content = content;
    this.type = type || 'text'; // text, image, file, system
    this.createdAt = new Date();
    this.deliveredAt = null;
    this.readAt = null;
  }

  markDelivered() {
    this.deliveredAt = new Date();
  }

  markRead() {
    this.readAt = new Date();
  }
}

module.exports = Message;