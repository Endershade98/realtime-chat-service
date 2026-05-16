// src/presentation/http/routes/index.js

const express = require('express');

const { getPrismaClient } =
  require('../../../infrastructure/database/prismaClient');

const PostgresUserRepository =
  require('../../../infrastructure/repositories/postgres/PostgresUserRepository');

const PostgresConversationRepository =
  require('../../../infrastructure/repositories/postgres/PostgresConversationRepository');

const PostgresMessageRepository =
  require('../../../infrastructure/repositories/postgres/PostgresMessageRepository');

const UserController =
  require('../controllers/UserController');

const ConversationController =
  require('../controllers/ConversationController');

const MessageController =
  require('../controllers/MessageController');

const userRoutes =
  require('./user.routes');

const conversationRoutes =
  require('./conversation.routes');

const messageRoutes =
  require('./message.routes');

const prisma = getPrismaClient();

const userRepository =
  new PostgresUserRepository(prisma);

const conversationRepository =
  new PostgresConversationRepository(prisma);

const messageRepository =
  new PostgresMessageRepository(prisma);

const fakeEventBus = {
  publish: async () => {}
};

const userController =
  new UserController(userRepository);

const conversationController =
  new ConversationController(
    conversationRepository,
    messageRepository
  );

const messageController =
  new MessageController(
    messageRepository,
    conversationRepository,
    fakeEventBus
  );

const router = express.Router();

router.use(
  '/users',
  userRoutes(userController)
);

router.use(
  '/conversations',
  conversationRoutes(conversationController)
);

router.use(
  '/messages',
  messageRoutes(messageController)
);

module.exports = router;