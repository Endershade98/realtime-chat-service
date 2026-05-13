// src/application/use-cases/conversation/CreateConversationUseCase.js

const Conversation = require('../../../domain/entities/Conversation');

class CreateConversationUseCase {
  constructor(conversationRepository, eventBus) {
    this.conversationRepository = conversationRepository;
    this.eventBus = eventBus;
  }

  async execute({ title, creatorUserId }) {

    const conversation = Conversation.create({
      title,
      creatorUserId
    });

    await this.conversationRepository.save(conversation);

    const events = conversation.pullEvents();

    for (const event of events) {
      await this.eventBus.publish(event);
    }

    return conversation;
  }
}

module.exports = CreateConversationUseCase;