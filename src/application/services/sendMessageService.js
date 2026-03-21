// src/application/services/sendMessageService.js
const MessageSent = require('../../domain/events/MessageSent');

class SendMessageService {
  constructor(messageRepository, eventDispatcher) {
    this.messageRepository = messageRepository;
    this.eventDispatcher = eventDispatcher; // in-memory, Redis, o WebSocket
  }

  async execute({ conversationId, senderId, content }) {
    const message = await this.messageRepository.create({ conversationId, senderId, content });

    // emetti evento
    const event = new MessageSent({
      messageId: message.id,
      conversationId,
      senderId,
      content,
    });

    this.eventDispatcher.dispatch(event); // astratto, può essere EventEmitter, Redis, ecc.

    return message;
  }
}

module.exports = SendMessageService;