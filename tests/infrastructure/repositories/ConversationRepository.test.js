// tests/infrastructure/repositories/ConversationRepository.test.js
const ConversationRepository = require('../../../src/infrastructure/repositories/ConversationRepository');
const Conversation = require('../../../src/domain/entities/Conversation');

describe('ConversationRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new ConversationRepository();
  });

  test('should save and retrieve a conversation', () => {
    const conv = new Conversation({ title: 'Test' });
    repo.save(conv);

    const found = repo.findById(conv.id);
    expect(found).toBe(conv);
  });

  test('should return all conversations', () => {
    const conv1 = new Conversation({ title: 'C1' });
    const conv2 = new Conversation({ title: 'C2' });
    repo.save(conv1);
    repo.save(conv2);

    const all = repo.findAll();
    expect(all.length).toBe(2);
  });
});