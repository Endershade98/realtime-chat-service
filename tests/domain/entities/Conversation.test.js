const Conversation = require('../../../src/domain/entities/Conversation');
const Participant = require('../../../src/domain/entities/Participant');

describe('Conversation Entity', () => {

  test('should create a conversation', () => {
    const conversation = new Conversation({
      title: 'Test Chat'
    });

    expect(conversation.id).toBeDefined();
    expect(conversation.title).toBe('Test Chat');
  });

  test('should add participant', () => {
    const conversation = new Conversation({});
    const participant = new Participant({ userId: 'user1' });

    conversation.addParticipant(participant);

    expect(conversation.participants.length).toBe(1);
  });

  test('should remove participant', () => {
    const conversation = new Conversation({});
    const participant = new Participant({ userId: 'user1' });

    conversation.addParticipant(participant);
    conversation.removeParticipant('user1');

    expect(conversation.participants.length).toBe(0);
  });

});