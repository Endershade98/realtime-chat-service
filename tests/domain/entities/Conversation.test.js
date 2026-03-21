const Conversation = require('../../../src/domain/entities/Conversation');
const Participant = require('../../../src/domain/entities/Participant');

describe('Conversation Entity', () => {

  test('should create a conversation', () => {
    const conversation = new Conversation({});

    expect(conversation.id.value).toBeDefined();
  });

  test('should add participant', () => {
    const conversation = new Conversation({});
    const participant = new Participant({ userId: undefined });

    conversation.addParticipant(participant);

    expect(conversation.participants.length).toBe(1);
  });

  test('should remove participant', () => {
    const conversation = new Conversation({});
    const participant = new Participant({ userId: undefined });

    conversation.addParticipant(participant);
    conversation.removeParticipant(participant.userId);

    expect(conversation.participants.length).toBe(0);
  });

});