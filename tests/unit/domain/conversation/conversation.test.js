// tests/unit/domain/conversation/conversation.test.js

const Conversation =
  require('../../../../src/domain/entities/Conversation');

const ConversationId =
  require('../../../../src/domain/value-objects/ConversationId');

const UserId =
  require('../../../../src/domain/value-objects/UserId');

const Participant =
  require('../../../../src/domain/entities/Participant');

describe('Conversation', () => {

  test('creates conversation', () => {
    const conversation = new Conversation({
      title: 'General'
    });

    expect(conversation.id).toBeInstanceOf(ConversationId);
    expect(conversation.title).toBe('General');
    expect(conversation.participants).toEqual([]);
  });

  test('creates conversation through factory', () => {
    const creatorId = new UserId();

    const conversation = Conversation.create({
      title: 'General',
      creatorUserId: creatorId
    });

    expect(conversation.title).toBe('General');
    expect(conversation.hasParticipant(creatorId)).toBe(true);
  });

  test('trims title when created through factory', () => {
    const conversation = Conversation.create({
      title: '  General  '
    });

    expect(conversation.title).toBe('General');
  });

  test('rejects empty title', () => {
    expect(() => {
      Conversation.create({
        title: '   '
      });
    }).toThrow('Conversation title is required');
  });

  test('adds participant', () => {
    const conversation = new Conversation({
      title: 'General'
    });

    const userId = new UserId();

    conversation.addParticipant(userId);

    expect(conversation.participants).toHaveLength(1);
    expect(conversation.hasParticipant(userId)).toBe(true);
    expect(conversation.participants[0]).toBeInstanceOf(Participant);
  });

  test('rejects duplicate participant', () => {
    const conversation = new Conversation({
      title: 'General'
    });

    const userId = new UserId();

    conversation.addParticipant(userId);

    expect(() => {
      conversation.addParticipant(userId);
    }).toThrow('Participant already exists');
  });

  test('removes participant', () => {
    const firstUser = new UserId();
    const secondUser = new UserId();

    const conversation = new Conversation({
      title: 'General',
      participants: [
        { userId: firstUser },
        { userId: secondUser }
      ]
    });

    conversation.removeParticipant(firstUser);

    expect(conversation.hasParticipant(firstUser)).toBe(false);
    expect(conversation.participants).toHaveLength(1);
  });

  test('rejects removing unknown participant', () => {
    const conversation = new Conversation({
      title: 'General'
    });

    const userId = new UserId();

    expect(() => {
      conversation.removeParticipant(userId);
    }).toThrow('Participant not found');
  });

  test('rejects removing last participant', () => {
    const userId = new UserId();

    const conversation = new Conversation({
      title: 'General',
      participants: [
        { userId }
      ]
    });

    expect(() => {
      conversation.removeParticipant(userId);
    }).toThrow('Conversation cannot be empty');
  });

  test('requires at least two participants when validated', () => {
    const conversation = new Conversation({
      title: 'General'
    });

    expect(() => {
      conversation.validateParticipants();
    }).toThrow(
      'Conversation must contain at least 2 participants'
    );
  });

  test('accepts two participants when validated', () => {
    const conversation = new Conversation({
      title: 'General',
      participants: [
        { userId: new UserId() },
        { userId: new UserId() }
      ]
    });

    expect(() => {
      conversation.validateParticipants();
    }).not.toThrow();
  });

  test('creates ConversationCreated event through factory', () => {
    const conversation = Conversation.create({
      title: 'General'
    });

    const events = conversation.pullEvents();

    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('CONVERSATION_CREATED');
    expect(events[0].data.title).toBe('General');
    expect(events[0].data.conversationId)
      .toBe(conversation.id.toString());
  });

  test('adding participant does not emit UserConnected', () => {
    const conversation = new Conversation({
      title: 'General'
    });

    conversation.addParticipant(new UserId());

    expect(conversation.pullEvents()).toEqual([]);
  });

});