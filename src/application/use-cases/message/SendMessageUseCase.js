// src/application/use-cases/message/SendMessageUseCase.js

const MessageId = require('../../../domain/value-objects/MessageId');
const Timestamp = require('../../../domain/value-objects/Timestamp');

class SendMessageUseCase {
  constructor(
    conversationRepository,
    messageRepository,
    eventBus
  ) {
    this.conversationRepository = conversationRepository;
    this.messageRepository = messageRepository;
    this.eventBus = eventBus;
  }

  async execute({
    conversationId,
    senderId,
    content
  }) {

    const conversation =
      await this.conversationRepository.findById(
        conversationId
      );

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const message = conversation.addMessage({
      messageId: new MessageId(),
      senderId,
      content,
      createdAt: new Timestamp()
    });

    await this.messageRepository.save(message);
    await this.conversationRepository.save(conversation);

    const events = conversation.pullEvents();

    for (const event of events) {
      await this.eventBus.publish(event);
    }

    return message;
  }
}

module.exports = SendMessageUseCase;