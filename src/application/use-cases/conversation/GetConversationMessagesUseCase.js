// src/application/use-cases/conversation/GetConversationMessagesUseCase.js

class GetConversationMessagesUseCase {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute({ conversationId }) {
    return await this.messageRepository.findByConversation(
      conversationId
    );
  }
}

module.exports = GetConversationMessagesUseCase;