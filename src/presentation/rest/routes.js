// src/presentation/rest/routes.js
const express = require('express');
const { getPrismaClient } = require('../../infrastructure/database/prismaClient');

const PostgresUserRepository = require('../../infrastructure/repositories/PostgresUserRepository');
const PostgresConversationRepository = require('../../infrastructure/repositories/PostgresConversationRepository');
const PostgresMessageRepository = require('../../infrastructure/repositories/PostgresMessageRepository');

const UserController = require('./controllers/UserController');
const ConversationController = require('./controllers/ConversationController');

const prisma = getPrismaClient();

// Repositories
const userRepo = new PostgresUserRepository(prisma);
const conversationRepo = new PostgresConversationRepository(prisma);
const messageRepo = new PostgresMessageRepository(prisma);

// Controllers
const userController = new UserController(userRepo);
const conversationController = new ConversationController(conversationRepo, messageRepo);

// Router
const router = express.Router();

// Users
router.post('/users', (req, res) => userController.createUser(req, res));

// Conversations
router.post('/conversations', (req, res) => conversationController.createConversation(req, res));
router.get('/conversations/:conversationId/messages', (req, res) => conversationController.getMessages(req, res));

module.exports = router;