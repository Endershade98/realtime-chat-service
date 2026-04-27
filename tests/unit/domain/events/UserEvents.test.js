// tests/unit/domain/events/UserEvents.test.js
const UserTyping = require('@domain/events/UserTyping');
const { v4: uuidv4 } = require('uuid');

describe('User Events', () => {

  test('UserTyping should create event with correct payload', () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    const payload = {
      userId: uuid1,
      conversationId: uuid2,
      isTyping: true
    };

    const event = new UserTyping(payload);

    expect(event.event).toBe('USER_TYPING');
    expect(event.data.userId).toBe(payload.userId);
    expect(event.data.conversationId).toBe(payload.conversationId);
    expect(event.data.isTyping).toBe(true);
  });

  test('should preserve typing state', () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();
    const payload = {
      userId: uuid1,
      conversationId: uuid2,
      isTyping: false
    };
    const event = new UserTyping(payload);

    expect(event.data.isTyping).toBe(false);
  });

});