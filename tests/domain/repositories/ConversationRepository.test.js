// tests/ domain/repositories/ConversationRepository.test.js
const ConversationRepository = require('../../../src/domain/repositories/ConversationRepository');

describe('ConversationRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new ConversationRepository();
  });

  test('should save and retrieve a conversation', () => {
    const conv = { id: 'conv-1', title: 'Chat 1', participants: [] };
    repo.save(conv);

    const found = repo.findById('conv-1');
    expect(found).toEqual(conv);
  });

  test('should remove a conversation', () => {
    const conv = { id: 'conv-1', title: 'Chat 1', participants: [] };
    repo.save(conv);

    repo.remove('conv-1');
    expect(repo.findById('conv-1')).toBeNull();
  });
});