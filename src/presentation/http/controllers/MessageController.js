// src/presentation/http/controllers/MessageController.js

const SendMessageUseCase =
  require('../../../application/use-cases/message/SendMessageUseCase');

const serializeMessage =
  require('../../serializers/message.serializer');

class MessageController {

  constructor(
    messageRepository,
    conversationRepository,
    eventBus
  ) {

    this.sendMessageUseCase =
      new SendMessageUseCase(
        messageRepository,
        conversationRepository,
        eventBus
      );
  }

  async sendMessage(req, res, next) {

    try {

      const message =
        await this.sendMessageUseCase.execute(req.body);

      return res.status(201).json(
        serializeMessage(message)
      );

    } catch (err) {
      next(err);
    }
  }
}

module.exports = MessageController;