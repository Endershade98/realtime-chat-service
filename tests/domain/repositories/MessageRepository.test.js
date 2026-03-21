const MessageRepository = require('../../../src/domain/repositories/MessageRepository');

describe('MessageRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new MessageRepository();
  });

  test('should save and retrieve a message', () => {
    const msg = { id: 'msg-1', conversationId: 'conv-1', senderId: 'user-1', content: 'Hello' };
    repo.save(msg);

    const found = repo.findById('msg-1');
    expect(found).toEqual(msg);
  });

  test('should find messages by conversation', () => {
    const msg1 = { id: 'msg-1', conversationId: 'conv-1', senderId: 'user-1', content: 'Hello' };
    const msg2 = { id: 'msg-2', conversationId: 'conv-1', senderId: 'user-2', content: 'Hi' };
    const msg3 = { id: 'msg-3', conversationId: 'conv-2', senderId: 'user-1', content: 'Hey' };

    repo.save(msg1);
    repo.save(msg2);
    repo.save(msg3);

    const messages = repo.findByConversation('conv-1');
    expect(messages.length).toBe(2);
    expect(messages).toContain(msg1);
    expect(messages).toContain(msg2);
  });
});