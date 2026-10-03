// tests/unit/infrastructure/repositories/in-memory/message-repository.test.js

const MessageRepository =
  require('../../../../../src/infrastructure/repositories/in-memory/MessageRepository');

const Message =
  require('../../../../../src/domain/entities/Message');

describe('InMemory MessageRepository', () => {

  let repo;

  beforeEach(() => {
    repo = new MessageRepository();
  });

  test('should save and find message', () => {

    const message = new Message({
      conversationId: crypto.randomUUID(),
      senderId: crypto.randomUUID(),
      content: 'hello world',
      createdAt: new Date()
    });

    repo.save(message);

    const found = repo.findById(message.id);

    expect(found).not.toBeNull();

    expect(found.content).toBe('hello world');
  });

  test('should find messages by conversation', () => {

    const conversationId = crypto.randomUUID();

    const message1 = new Message({
      conversationId,
      senderId: crypto.randomUUID(),
      content: 'message 1',
      createdAt: new Date()
    });

    const message2 = new Message({
      conversationId,
      senderId: crypto.randomUUID(),
      content: 'message 2',
      createdAt: new Date()
    });

    repo.save(message1);
    repo.save(message2);

    const messages =
      repo.findAllByConversationId(message1.conversationId);

    expect(messages).toHaveLength(2);
  });

});