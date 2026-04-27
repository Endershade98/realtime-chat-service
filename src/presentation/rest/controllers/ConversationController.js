// src/presentation/rest/controllers/ConversationController.js
const CreateConversationService = require('../../../application/services/CreateConversationService');
const GetConversationMessagesService = require('../../../application/services/GetConversationMessagesService');

class ConversationController {
  constructor(conversationRepo, messageRepo, eventDispatcher) {
    this.createConversationService = new CreateConversationService(
      conversationRepo,
      eventDispatcher
    );

    this.getMessagesService = new GetConversationMessagesService(messageRepo);
  }

  async createConversation(req, res) {
    try {
      const conversation = await this.createConversationService.execute(req.body);
      res.status(201).json(conversation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getMessages(req, res) {
    try {
      const messages = await this.getMessagesService.execute(req.params.conversationId);
      res.status(200).json(messages);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = ConversationController;