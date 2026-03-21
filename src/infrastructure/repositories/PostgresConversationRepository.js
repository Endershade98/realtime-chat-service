// src/infrastructure/repositories/PostgresConversationRepository.js
const prisma = require('../database/prismaClient');
const Conversation = require('../../domain/entities/Conversation');
const ConversationId = require('../../domain/value-objects/ConversationId');

// src/infrastructure/repositories/PostgresConversationRepository.js
class PostgresConversationRepository {
  constructor(prisma) {
    if (!prisma) throw new Error('PostgresConversationRepository requires a PrismaClient instance');
    this.prisma = prisma;
  }

  async create(conversation) {
    const created = await this.prisma.conversation.create({
      data: {
        id: conversation.id.value,
        title: conversation.title,
        createdAt: conversation.createdAt,
      },
    });
    return new (require('../../domain/entities/Conversation'))({ 
      id: new (require('../../domain/value-objects/ConversationId'))(created.id), 
      title: created.title 
    });
  }

  async findById(conversationId) {
    const found = await this.prisma.conversation.findUnique({
      where: { id: conversationId.value },
      include: { participants: true, messages: true },
    });
    if (!found) return null;
    return new (require('../../domain/entities/Conversation'))({
      id: new (require('../../domain/value-objects/ConversationId'))(found.id),
      title: found.title
    });
  }

  async findAll() {
    const conversations = await this.prisma.conversation.findMany();
    return conversations.map(c => new (require('../../domain/entities/Conversation'))({
      id: new (require('../../domain/value-objects/ConversationId'))(c.id),
      title: c.title
    }));
  }

  async update(conversation) {
    const updated = await this.prisma.conversation.update({
      where: { id: conversation.id.value },
      data: { title: conversation.title },
    });
    return new (require('../../domain/entities/Conversation'))({
      id: new (require('../../domain/value-objects/ConversationId'))(updated.id),
      title: updated.title
    });
  }

  async delete(conversationId) {
    await this.prisma.conversation.delete({ where: { id: conversationId.value } });
  }
}

module.exports = PostgresConversationRepository;