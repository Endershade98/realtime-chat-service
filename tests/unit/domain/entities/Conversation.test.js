// tests/domain/entities/Conversation.test.js
const Conversation = require('@domain/entities/Conversation');
const UserId = require('@domain/value-objects/UserId');
const { v4: uuidv4 } = require('uuid');

describe('Conversation Entity', () => {

  test('should create conversation', () => {
    const user1 = new UserId();
    const user2 = new UserId();

    const conversation = new Conversation({
      participants: [user1, user2]
    });

    expect(conversation.id).toBeDefined();
    expect(conversation.participants.length).toBe(2);
  });

  test('should allow empty conversation initially', () => {
    const conversation = new Conversation();

    expect(conversation.participants).toEqual([]);
  });

  test('should add participant', () => {
    const uuid1 = uuidv4();
    const conversation = new Conversation();

    conversation.addParticipant(uuid1);

    expect(conversation.participants.length).toBe(1);
  });

  test('should remove participant', () => {
    const conversation = new Conversation();

    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    conversation.addParticipant(uuid1);
    conversation.addParticipant(uuid2);

    conversation.removeParticipant(uuid1);

    expect(conversation.participants.length).toBe(1);
  });

  test('should check participant existence', () => {
    const conversation = new Conversation();

    const uuid1 = uuidv4();
    conversation.addParticipant(uuid1);

    expect(conversation.hasParticipant(uuid1)).toBe(true);
  });

});