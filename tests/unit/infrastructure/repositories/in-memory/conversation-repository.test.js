// tests/unit/infrastructure/repositories/in-memory/conversation-repository.test.js

const ConversationRepository =
  require('../../../../../src/infrastructure/repositories/in-memory/ConversationRepository');

const Conversation =
  require('../../../../../src/domain/entities/Conversation');

describe('InMemory ConversationRepository', () => {

  let repo;

  beforeEach(() => {
    repo = new ConversationRepository();
  });

  test('should save and find conversation', () => {

    const conversation = new Conversation({
      title: 'General'
    });

    repo.save(conversation);

    const found =
      repo.findById(conversation.id);

    expect(found).not.toBeNull();

    expect(found.id.value)
      .toBe(conversation.id.value);
  });

});