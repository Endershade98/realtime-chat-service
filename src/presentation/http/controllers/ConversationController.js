// src/presentation/http/controllers/ConversationController.js

const CreateConversationUseCase =
  require('../../../application/use-cases/conversation/CreateConversationUseCase');

const GetConversationMessagesUseCase =
  require('../../../application/use-cases/conversation/GetConversationMessagesUseCase');

const serializeConversation =
  require('../../serializers/conversation.serializer');

const serializeMessage =
  require('../../serializers/message.serializer');

class ConversationController {

  constructor(
    conversationRepository,
    messageRepository
  ) {

    this.createConversationUseCase =
      new CreateConversationUseCase(
        conversationRepository
      );

    this.getConversationMessagesUseCase =
      new GetConversationMessagesUseCase(
        messageRepository
      );
  }

  async createConversation(req, res, next) {

    try {

      const conversation =
        await this.createConversationUseCase.execute(
          req.body
        );

      return res.status(201).json(
        serializeConversation(conversation)
      );

    } catch (err) {
      next(err);
    }
  }

  async getMessages(req, res, next) {

    try {

      const messages =
        await this.getConversationMessagesUseCase.execute(
          req.params.conversationId
        );

      return res.status(200).json(
        messages.map(serializeMessage)
      );

    } catch (err) {
      next(err);
    }
  }
}

module.exports = ConversationController;