// src/application/services/CreateConversationService.js
const Conversation = require('../../domain/entities/Conversation');
const ConversationId = require('../../domain/value-objects/ConversationId');

class CreateConversationService {
  constructor(conversationRepository) {
    this.conversationRepository = conversationRepository;
  }

  async execute({ title }) {
    const conversation = new Conversation({ id: new ConversationId(), title, createdAt: new Date() });
    return this.conversationRepository.create(conversation);
  }
}

module.exports = CreateConversationService;