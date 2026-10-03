// src/application/use-cases/message/SendMessageUseCase.js

const Message = require('../../../domain/entities/Message');

const MessageId = require('../../../domain/value-objects/MessageId');
const Timestamp = require('../../../domain/value-objects/Timestamp');
const ConversationId = require('../../../domain/value-objects/ConversationId');
const UserId = require('../../../domain/value-objects/UserId');

const BusinessRuleError =
  require('../../../domain/errors/BusinessRuleError');

class SendMessageUseCase {
  constructor(
    messageRepository,
    conversationRepository,
    eventBus
  ) {
    this.messageRepository = messageRepository;
    this.conversationRepository = conversationRepository;
    this.eventBus = eventBus;
  }

  async execute({
    conversationId,
    senderId,
    content
  }) {

    const cid = new ConversationId(conversationId);
    const uid = new UserId(senderId);

    const conversation =
      await this.conversationRepository.findById(cid);

    if (!conversation) {
      throw new BusinessRuleError(
        'Conversation not found'
      );
    }

    if (!conversation.hasParticipant(uid)) {
      throw new BusinessRuleError(
        'Sender is not part of conversation'
      );
    }

    const message = new Message({
      id: new MessageId(),
      conversationId: cid,
      senderId: uid,
      content,
      sentAt: new Timestamp()
    });

    await this.messageRepository.save(message);

    const events = message.pullEvents();

    for (const event of events) {
      await this.eventBus.publish(event);
    }

    return message;
  }
}

module.exports = SendMessageUseCase;