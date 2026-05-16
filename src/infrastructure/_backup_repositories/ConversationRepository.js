// src/infrastructure/repositories/ConversationRepository.js
const Conversation = require('../../domain/entities/Conversation');
const ConversationId = require('../../domain/value-objects/ConversationId');

class ConversationRepository {
  constructor() {
    this.store = new Map(); // id → Conversation
  }

  save(conversation) {
    if (!(conversation instanceof Conversation)) {
      throw new Error('Invalid Conversation');
    }
    this.store.set(conversation.id.toString(), conversation);
    return conversation;
  }

  findById(conversationId) {
    const id = conversationId instanceof ConversationId
      ? conversationId.toString()
      : conversationId;
    return this.store.get(id) || null;
  }

  findAll() {
    return Array.from(this.store.values());
  }
}

module.exports = ConversationRepository;