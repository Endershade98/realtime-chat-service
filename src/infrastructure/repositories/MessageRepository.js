// src/infrastructure/repositories/MessageRepository.js
const Message = require('../../domain/entities/Message');
const MessageId = require('../../domain/value-objects/MessageId');

class MessageRepository {
  constructor() {
    this.store = new Map(); // id → Message
  }

  save(message) {
    if (!(message instanceof Message)) {
      throw new Error('Invalid Message');
    }
    this.store.set(message.id.toString(), message);
    return message;
  }

  findById(messageId) {
    const id = messageId instanceof MessageId ? messageId.toString() : messageId;
    return this.store.get(id) || null;
  }

  findAllByConversationId(conversationId) {
    const cid = conversationId.toString();
    return Array.from(this.store.values())
      .filter(msg => msg.conversationId.toString() === cid);
  }
}

module.exports = MessageRepository;