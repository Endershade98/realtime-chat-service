// src/infrastructure/repositories/in-memory/MessageRepository.js

class MessageRepository {
  constructor() {
    this.store = new Map();
  }

  save(message) {
    if (!message) throw new Error('Message is required');
    if (!message.id) throw new Error('Message must have id');

    const id = message.id.toString ? message.id.toString() : String(message.id);

    this.store.set(id, message);
    return message;
  }

  findById(messageId) {
    const id = messageId?.toString?.() ?? String(messageId);
    return this.store.get(id) || null;
  }

  findAllByConversationId(conversationId) {
    const cid = conversationId?.toString?.() ?? String(conversationId);

    return Array.from(this.store.values()).filter(
      msg => msg.conversationId?.toString?.() === cid
    );
  }
}

module.exports = MessageRepository;