// src/infrastructure/repositories/postgres/PostgresConversationRepository.js

const Conversation = require('../../../domain/entities/Conversation');
const ConversationId = require('../../../domain/value-objects/ConversationId');

class PostgresConversationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async save(conversation) {
    const created = await this.prisma.conversation.create({
      data: {
        id: conversation.id.value,
        title: conversation.title,
        createdAt: conversation.createdAt,
      },
    });

    return new Conversation({
      id: new ConversationId(created.id),
      title: created.title,
      createdAt: created.createdAt,
    });
  }

  async findById(conversationId) {
    const id = conversationId.value ?? conversationId;

    const found = await this.prisma.conversation.findUnique({
      where: { id },
    });

    if (!found) return null;

    return new Conversation({
      id: new ConversationId(found.id),
      title: found.title,
      createdAt: found.createdAt,
    });
  }

  async findAll() {
    const rows = await this.prisma.conversation.findMany();

    return rows.map(
      (c) =>
        new Conversation({
          id: new ConversationId(c.id),
          title: c.title,
          createdAt: c.createdAt,
        })
    );
  }
}

module.exports = PostgresConversationRepository;