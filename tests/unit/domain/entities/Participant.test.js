// tests/domain/entities/Participant.test.js
const Participant = require('@domain/entities/Participant');
const UserId = require('@domain/value-objects/UserId');

describe('Participant Entity', () => {

  test('should create participant with default role member', () => {
    const participant = new Participant({
      userId: new UserId()
    });

    expect(participant.role).toBe('member');
    expect(participant.userId).toBeDefined();
  });

  test('should accept custom role', () => {
    const participant = new Participant({
      userId: new UserId(),
      role: 'admin'
    });

    expect(participant.role).toBe('admin');
  });

  test('should generate id if not provided', () => {
    const participant = new Participant({
      userId: new UserId()
    });

    expect(participant.id).toBeDefined();
  });

});