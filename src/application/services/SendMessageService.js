// src/application/services/SendMessageService.js
const Message = require('../../domain/entities/Message');
const MessageId = require('../../domain/value-objects/MessageId');
const Timestamp = require('../../domain/value-objects/Timestamp');

class SendMessageService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute({ conversationId, senderId, content }) {
    const message = new Message({
      id: new MessageId(),
      conversationId,
      senderId,
      content,
      sentAt: new Timestamp()
    });

    return this.messageRepository.create(message);
  }
}

module.exports = SendMessageService;