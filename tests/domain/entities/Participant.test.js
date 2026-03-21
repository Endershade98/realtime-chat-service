const Participant = require('../../../src/domain/entities/Participant');

describe('Participant Entity', () => {

  test('should create a participant', () => {
    const participant = new Participant({
      userId: 'user1'
    });

    expect(participant.id).toBeDefined();
    expect(participant.userId).toBe('user1');
    expect(participant.role).toBe('member');
  });

});