// src/infrastructure/repositories/PostgresMessageRepository.js

const Message = require('../../domain/entities/Message');
const MessageId = require('../../domain/value-objects/MessageId');
const ConversationId = require('../../domain/value-objects/ConversationId');
const UserId = require('../../domain/value-objects/UserId');
const Timestamp = require('../../domain/value-objects/Timestamp');

class PostgresMessageRepository {
  constructor(prisma) {
    if (!prisma) {
      throw new Error('Prisma client is required');
    }
    this.prisma = prisma;
  }

  async create(message) {
    const created = await this.prisma.message.create({
      data: {
        id: message.id.value,
        conversationId: message.conversationId.value,
        senderId: message.senderId.value,
        content: message.content,
        sentAt: message.sentAt.value,
      },
    });

    return new Message({
      id: new MessageId(created.id),
      conversationId: new ConversationId(created.conversationId),
      senderId: new UserId(created.senderId),
      content: created.content,
      sentAt: new Timestamp(created.sentAt),
    });
  }

  async findById(messageId) {
    const found = await this.prisma.message.findUnique({
      where: { id: messageId.value },
    });

    if (!found) return null;

    return new Message({
      id: new MessageId(found.id),
      conversationId: new ConversationId(found.conversationId),
      senderId: new UserId(found.senderId),
      content: found.content,
      sentAt: new Timestamp(found.sentAt),
    });
  }

  async findByConversationId(conversationId) {
    const messages = await this.prisma.message.findMany({
      where: { conversationId: conversationId.value },
      orderBy: { sentAt: 'asc' },
    });

    return messages.map(
      (m) =>
        new Message({
          id: new MessageId(m.id),
          conversationId: new ConversationId(m.conversationId),
          senderId: new UserId(m.senderId),
          content: m.content,
          sentAt: new Timestamp(m.sentAt),
        })
    );
  }

  async delete(messageId) {
    await this.prisma.message.delete({
      where: { id: messageId.value },
    });
  }
}

module.exports = PostgresMessageRepository;