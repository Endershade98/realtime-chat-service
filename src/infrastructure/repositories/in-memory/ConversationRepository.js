// src/infrastructure/repositories/in-memory/ConversationRepository.js

class ConversationRepository {
  constructor() {
    this.store = new Map();
  }

  save(conversation) {
    if (!conversation) throw new Error('Conversation is required');

    const id = conversation.id.toString
      ? conversation.id.toString()
      : String(conversation.id);

    this.store.set(id, conversation);
    return conversation;
  }

  findById(conversationId) {
    const id = conversationId?.toString?.() ?? String(conversationId);
    return this.store.get(id) || null;
  }

  findAll() {
    return Array.from(this.store.values());
  }
}

module.exports = ConversationRepository;