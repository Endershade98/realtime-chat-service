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

  async send(req, res, next) {

    try {

      const message =
        await this.sendMessageUseCase.execute({
          conversationId: req.body.conversationId,
          senderId: req.body.senderId,
          content: req.body.content
        });

      return res.status(201).json(
        serializeMessage(message)
      );

    } catch (err) {
      next(err);
    }
  }
}

module.exports = MessageController;