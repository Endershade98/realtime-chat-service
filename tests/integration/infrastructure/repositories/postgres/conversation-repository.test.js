// tests/integration/infrastructure/repositories/postgres/conversation-repository.test.js

const PostgresConversationRepository =
  require('../../../../../src/infrastructure/repositories/postgres/PostgresConversationRepository');

const Conversation =
  require('../../../../../src/domain/entities/Conversation');

describe('PostgresConversationRepository (mocked)', () => {

  let repo;
  let prisma;

  beforeEach(() => {

    prisma = {
      conversation: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    };

    repo = new PostgresConversationRepository(prisma);
  });

  test('should save conversation', async () => {

    const conversation = new Conversation({
      title: 'General Chat'
    });

    prisma.conversation.create.mockResolvedValue({
      id: conversation.id.value,
      title: 'General Chat',
      createdAt: new Date()
    });

    const saved = await repo.save(conversation);

    expect(saved).not.toBeNull();

    expect(saved.id.value)
      .toBe(conversation.id.value);

    expect(prisma.conversation.create)
      .toHaveBeenCalledTimes(1);
  });

});