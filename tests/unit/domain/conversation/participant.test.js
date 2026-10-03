// tests/unit/domain/conversation/participant.test.js

const Participant =
  require('../../../../src/domain/entities/Participant');

const UserId =
  require('../../../../src/domain/value-objects/UserId');

describe('Participant', () => {

  test('creates participant with UserId', () => {
    const userId = new UserId();

    const participant = new Participant({
      userId
    });

    expect(participant.userId).toBeInstanceOf(UserId);
    expect(participant.userId.equals(userId)).toBe(true);
    expect(participant.role).toBe('member');
  });

  test('converts primitive id to UserId', () => {
    const userId = new UserId();

    const participant = new Participant({
      userId: userId.value
    });

    expect(participant.userId).toBeInstanceOf(UserId);
    expect(participant.userId.value).toBe(userId.value);
  });

  test('supports admin role', () => {
    const participant = new Participant({
      userId: new UserId(),
      role: 'admin'
    });

    expect(participant.role).toBe('admin');
    expect(participant.isAdmin()).toBe(true);
  });

  test('member is not admin', () => {
    const participant = new Participant({
      userId: new UserId()
    });

    expect(participant.isAdmin()).toBe(false);
  });

  test('rejects missing userId', () => {
    expect(() => {
      new Participant({});
    }).toThrow('userId is required');
  });

});