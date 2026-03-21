// src/domain/repositories/ConversationRepository.js
class ConversationRepository {
  constructor() {
    this.conversations = new Map(); // key = conversationId.value
  }

  save(conversation) {
    this.conversations.set(conversation.id.toString(), conversation);
    return conversation;
  }

  findById(conversationId) {
    return this.conversations.get(conversationId.toString()) || null;
  }

  remove(conversationId) {
    return this.conversations.delete(conversationId.toString());
  }

  findAll() {
    return Array.from(this.conversations.values());
  }
}

module.exports = ConversationRepository;