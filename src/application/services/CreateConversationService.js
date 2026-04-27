// src/application/services/CreateConversationService.js
const Conversation = require('../../domain/entities/Conversation');
const ConversationId = require('../../domain/value-objects/ConversationId');

class CreateConversationService {
  constructor(conversationRepository, eventDispatcher) {
    this.conversationRepository = conversationRepository;
    this.eventDispatcher = eventDispatcher;
  }

  async execute({ title, participants }) {
    const conversation = new Conversation({
      id: new ConversationId(),
      title,
      participants,
      createdAt: new Date()
    });

    await this.conversationRepository.save(conversation);

    // 🔥 DOMAIN EVENTS
    const events = conversation.pullEvents();

    events.forEach(event => {
      this.eventDispatcher?.dispatch(event);
    });

    return conversation;
  }
}

module.exports = CreateConversationService;