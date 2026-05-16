// src/presentation/http/routes/message.routes.js

const express = require('express');

const { getPrismaClient } =
  require('../../../infrastructure/database/prismaClient');

const PostgresMessageRepository =
  require('../../../infrastructure/repositories/postgres/PostgresMessageRepository');

const PostgresConversationRepository =
  require('../../../infrastructure/repositories/postgres/PostgresConversationRepository');

const MessageController =
  require('../controllers/MessageController');

const {
  validateSendMessage
} = require('../validators/message.validator');

const router = express.Router();

const prisma = getPrismaClient();

const messageRepository =
  new PostgresMessageRepository(prisma);

const conversationRepository =
  new PostgresConversationRepository(prisma);

const eventBus = {
  publish: async () => {}
};

const controller =
  new MessageController(
    messageRepository,
    conversationRepository,
    eventBus
  );

router.post(
  '/',
  validateSendMessage,
  (req, res, next) =>
    controller.sendMessage(req, res, next)
);

module.exports = router;