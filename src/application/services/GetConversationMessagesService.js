// src/application/services/GetConversationMessagesService.js
class GetConversationMessagesService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(conversationId) {
    return this.messageRepository.findByConversationId(conversationId);
  }
}

module.exports = GetConversationMessagesService;