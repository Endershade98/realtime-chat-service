const Participant = require('../../../src/domain/entities/Participant');

describe('Participant Entity', () => {

  test('should create a participant', () => {
    const participant = new Participant({
      userId: undefined
    });

    expect(participant.userId.value).toBeDefined();
  });

});