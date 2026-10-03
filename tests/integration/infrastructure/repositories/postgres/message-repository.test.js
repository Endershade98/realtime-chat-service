// tests/integration/infrastructure/repositories/postgres/message-repository.test.js

const PostgresMessageRepository =
  require('../../../../../src/infrastructure/repositories/postgres/PostgresMessageRepository');

const Message =
  require('../../../../../src/domain/entities/Message');

describe('PostgresMessageRepository (mocked)', () => {

  let repo;
  let prisma;

  beforeEach(() => {

    prisma = {
      message: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        delete: jest.fn()
      }
    };

    repo = new PostgresMessageRepository(prisma);
  });

  test('should save message', async () => {

    const message = new Message({
      conversationId: crypto.randomUUID(),
      senderId: crypto.randomUUID(),
      content: 'hello postgres',
      createdAt: new Date()
    });

    prisma.message.create.mockResolvedValue({
      id: message.id.value,
      conversationId: message.conversationId.value,
      senderId: message.senderId.value,
      content: message.content,
      createdAt: message.createdAt.value
    });

    const saved = await repo.save(message);

    expect(saved.content).toBe('hello postgres');

    expect(prisma.message.create)
      .toHaveBeenCalledTimes(1);
  });

});