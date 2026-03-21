// tests/domain/events/UserConnected.test.js
const UserConnected = require('../../../src/domain/events/UserConnected');

describe('UserConnected Event', () => {
  test('should create a UserConnected event with correct payload', () => {
    const payload = {
      userId: 'user-123',
      username: 'Alice'
    };

    const event = new UserConnected(payload);

    expect(event.eventName).toBe('UserConnected');
    expect(event.occurredAt).toBeInstanceOf(Date);
    expect(event.payload).toEqual(payload);
  });
});