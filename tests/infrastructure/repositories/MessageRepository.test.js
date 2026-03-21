const MessageRepository = require('../../../src/infrastructure/repositories/MessageRepository');
const Message = require('../../../src/domain/entities/Message');
const ConversationId = require('../../../src/domain/value-objects/ConversationId');
const UserId = require('../../../src/domain/value-objects/UserId');

describe('MessageRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new MessageRepository();
  });

  test('should save and retrieve a message', () => {
    const msg = new Message({
      conversationId: new ConversationId(),
      senderId: new UserId(),
      content: 'Hello'
    });
    repo.save(msg);

    const found = repo.findById(msg.id);
    expect(found).toBe(msg);
  });

  test('should find messages by conversation ID', () => {
    const convId = new ConversationId();
    const msg1 = new Message({ conversationId: convId, senderId: new UserId(), content: 'Hi' });
    const msg2 = new Message({ conversationId: convId, senderId: new UserId(), content: 'Hello' });
    const msg3 = new Message({ conversationId: new ConversationId(), senderId: new UserId(), content: 'Hey' });

    repo.save(msg1);
    repo.save(msg2);
    repo.save(msg3);

    const msgs = repo.findAllByConversationId(convId);
    expect(msgs.length).toBe(2);
    expect(msgs).toContain(msg1);
    expect(msgs).toContain(msg2);
  });
});