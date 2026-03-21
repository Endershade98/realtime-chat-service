// src/application/services/sendMessageService.js
class SendMessageService {
  constructor(messageRepo, conversationRepo) {
    this.messageRepo = messageRepo;
    this.conversationRepo = conversationRepo;
  }

  execute({ conversationId, senderId, content }) {
    const conversation = this.conversationRepo.findById(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    const Message = require('../../domain/entities/Message');
    const message = new Message({ conversationId, senderId, content });

    this.messageRepo.save(message);

    return message;
  }
}

module.exports = SendMessageService;