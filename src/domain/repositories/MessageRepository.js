// src/domain/repositories/MessageRepository.js
class MessageRepository {
  constructor() {
    this.messages = new Map(); // key = messageId.value
  }

  save(message) {
    this.messages.set(message.id.toString(), message);
    return message;
  }

  findById(messageId) {
    return this.messages.get(messageId.toString()) || null;
  }

  remove(messageId) {
    return this.messages.delete(messageId.toString());
  }

  findByConversation(conversationId) {
    return Array.from(this.messages.values()).filter(
      msg => msg.conversationId.toString() === conversationId.toString()
    );
  }

  findAll() {
    return Array.from(this.messages.values());
  }
}

module.exports = MessageRepository;