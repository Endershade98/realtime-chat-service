// tests/domain/events/UserTyping.test.js
const UserTyping = require('@domain/events/UserTyping');
const { v4: uuidv4 } = require('uuid');

describe('UserTyping Event', () => {

  test('should create a UserTyping event with correct payload', () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    const payload = {
      userId: uuid1,
      conversationId: uuid2,
      isTyping: true
    };

    const event = new UserTyping(payload);

    expect(event.event).toBe('USER_TYPING');
    expect(typeof event.timestamp).toBe('string');
    expect(event.data).toEqual(payload);
  });

});