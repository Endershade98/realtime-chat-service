// tests/domain/events/UserTyping.test.js
const UserTyping = require('../../../src/domain/events/UserTyping');

describe('UserTyping Event', () => {
  test('should create a UserTyping event with correct payload', () => {
    const payload = {
      conversationId: 'conv-123',
      userId: 'user-123'
    };

    const event = new UserTyping(payload);

    expect(event.eventName).toBe('UserTyping');
    expect(event.occurredAt).toBeInstanceOf(Date);
    expect(event.payload).toEqual(payload);
  });
});