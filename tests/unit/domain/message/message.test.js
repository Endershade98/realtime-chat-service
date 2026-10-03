// tests/unit/domain/message/message.test.js

const Message =
  require('../../../../src/domain/entities/Message');

const MessageId =
  require('../../../../src/domain/value-objects/MessageId');

const ConversationId =
  require('../../../../src/domain/value-objects/ConversationId');

const UserId =
  require('../../../../src/domain/value-objects/UserId');

const Timestamp =
  require('../../../../src/domain/value-objects/Timestamp');

describe('Message', () => {

  const createIds = () => ({
    conversationId: new ConversationId(),
    senderId: new UserId()
  });

  test('creates message through factory', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const message = Message.create({
      conversationId,
      senderId,
      content: 'Hello'
    });

    expect(message).toBeInstanceOf(Message);
    expect(message.id).toBeInstanceOf(MessageId);
    expect(message.conversationId).toBeInstanceOf(ConversationId);
    expect(message.senderId).toBeInstanceOf(UserId);
    expect(message.createdAt).toBeInstanceOf(Timestamp);
    expect(message.content).toBe('Hello');
    expect(message.type).toBe('text');
  });

  test('trims message content', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const message = Message.create({
      conversationId,
      senderId,
      content: '  hello  '
    });

    expect(message.content).toBe('hello');
  });

  test('rejects empty content', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    expect(() => {
      Message.create({
        conversationId,
        senderId,
        content: ''
      });
    }).toThrow('Message content cannot be empty');
  });

  test('rejects whitespace-only content', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    expect(() => {
      Message.create({
        conversationId,
        senderId,
        content: '   '
      });
    }).toThrow('Message content cannot be empty');
  });

  test('creates MessageSent domain event', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const message = Message.create({
      conversationId,
      senderId,
      content: 'hello'
    });

    const events = message.pullEvents();

    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('MESSAGE_SENT');
    expect(events[0].data).toEqual({
      messageId: message.id.toString(),
      conversationId: message.conversationId.toString(),
      senderId: message.senderId.toString(),
      content: 'hello'
    });
  });

  test('does not create event when reconstituted', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const id = new MessageId();
    const createdAt = new Timestamp();

    const message = Message.reconstitute({
      id,
      conversationId,
      senderId,
      content: 'hello',
      createdAt
    });

    expect(message.pullEvents()).toEqual([]);
  });

  test('reconstitutes existing message', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const id = new MessageId();
    const createdAt = new Timestamp();

    const message = Message.reconstitute({
      id,
      conversationId,
      senderId,
      content: 'hello',
      createdAt
    });

    expect(message.id.equals(id)).toBe(true);
    expect(message.conversationId.equals(conversationId)).toBe(true);
    expect(message.senderId.equals(senderId)).toBe(true);
    expect(message.createdAt.value).toBe(createdAt.value);
    expect(message.content).toBe('hello');
  });

  test('mark delivered', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const message = Message.create({
      conversationId,
      senderId,
      content: 'ciao'
    });

    message.pullEvents();

    message.markDelivered();

    expect(message.deliveredAt).toBeInstanceOf(Timestamp);
  });

  test('mark read', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const message = Message.create({
      conversationId,
      senderId,
      content: 'ciao'
    });

    message.pullEvents();

    message.markRead();

    expect(message.readAt).toBeInstanceOf(Timestamp);
    expect(message.isRead()).toBe(true);
  });

  test('new message is not read', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const message = Message.create({
      conversationId,
      senderId,
      content: 'ciao'
    });

    expect(message.isRead()).toBe(false);
  });

  test('equals messages with the same id', () => {
    const {
      conversationId,
      senderId
    } = createIds();

    const id = new MessageId();

    const first = Message.reconstitute({
      id,
      conversationId,
      senderId,
      content: 'hello',
      createdAt: new Timestamp()
    });

    const second = Message.reconstitute({
      id: new MessageId(id.value),
      conversationId,
      senderId,
      content: 'different',
      createdAt: new Timestamp()
    });

    expect(first.equals(second)).toBe(true);
  });

});