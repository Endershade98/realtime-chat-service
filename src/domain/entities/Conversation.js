// src/domain/entities/Conversation.js

const ConversationId = require('../value-objects/ConversationId');
const UserId = require('../value-objects/UserId');
const Participant = require('./Participant');

// eventi
const UserConnected = require('../events/UserConnected');

class Conversation {
  constructor({ id, participants = [] } = {}) {
    this._id = id instanceof ConversationId ? id : new ConversationId();

    this._participants = participants.map(p =>
      p instanceof Participant ? p : new Participant(p)
    );

    this._events = [];

    Object.freeze(this._id);
  }

  // ------------------------
  // GETTERS
  // ------------------------
  get id() {
    return this._id;
  }

  get participants() {
    return [...this._participants];
  }

  // ------------------------
  // AGGREGATE BEHAVIOR
  // ------------------------

  addParticipant(userId) {
    const uid = userId instanceof UserId ? userId : new UserId(userId);

    const exists = this._participants.some(p =>
      p.userId.equals(uid)
    );

    if (exists) {
      throw new Error('Participant already exists');
    }

    const participant = new Participant({ userId: uid });

    this._participants.push(participant);

    // DOMAIN EVENT
    this._events.push(
      new UserConnected({
        userId: uid.toString(),
        conversationId: this._id.toString()
      })
    );

    return participant;
  }

  removeParticipant(userId) {
    const uid = userId instanceof UserId ? userId : new UserId(userId);

    const index = this._participants.findIndex(p =>
      p.userId.equals(uid)
    );

    if (index === -1) {
      throw new Error('Participant not found');
    }

    this._participants.splice(index, 1);

    // Invariante opzionale:
    if (this._participants.length === 0) {
      throw new Error('Conversation cannot be empty');
    }
  }

  hasParticipant(userId) {
    const uid = userId instanceof UserId ? userId : new UserId(userId);

    return this._participants.some(p =>
      p.userId.equals(uid)
    );
  }

  // ------------------------
  // DOMAIN EVENTS
  // ------------------------

  pullEvents() {
    const events = [...this._events];
    this._events = [];
    return events;
  }
}

module.exports = Conversation;