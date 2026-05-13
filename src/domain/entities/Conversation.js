// src/domain/entities/Conversation.js

const ConversationId = require('../value-objects/ConversationId');
const UserId = require('../value-objects/UserId');
const Participant = require('./Participant');
const AggregateRoot = require('../aggregates/AggregateRoot');
const UserConnected = require('../events/UserConnected');
const ConversationCreated = require('../events/ConversationCreated');

class Conversation extends AggregateRoot {
  constructor({ id, participants = [], title, createdAt } = {}) {
    super();

    this._id = id instanceof ConversationId ? id : new ConversationId();
    this._title = title;
    this._createdAt = createdAt ?? new Date();

    this._participants = participants.map(p =>
      p instanceof Participant ? p : new Participant(p)
    );

    Object.freeze(this._id);
  }

  // ------------------------
  // FACTORY METHOD (DDD PURE)
  // ------------------------
  static create({ title, creatorUserId }) {
    const conversation = new Conversation({ title });

    if (creatorUserId) {
      conversation.addParticipant(creatorUserId);
    }

    conversation.addEvent(
      new ConversationCreated({
        conversationId: conversation.id.toString(),
        title
      })
    );

    return conversation;
  }

  // ------------------------
  // BEHAVIOR
  // ------------------------
  addParticipant(userId) {
    const uid = userId instanceof UserId ? userId : new UserId(userId);

    if (this.hasParticipant(uid)) {
      throw new Error('Participant already exists');
    }

    this._participants.push(new Participant({ userId: uid }));

    this.addEvent(
      new UserConnected({
        userId: uid.toString(),
        conversationId: this._id.toString()
      })
    );
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

    if (this._participants.length === 0) {
      throw new Error('Conversation cannot be empty');
    }
  }

  // ------------------------
  // GETTERS
  // ------------------------
  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get participants() {
    return [...this._participants];
  }

  // ------------------------
  // RULES
  // ------------------------
  hasParticipant(userId) {
    const uid = userId instanceof UserId ? userId : new UserId(userId);

    return this._participants.some(p =>
      p.userId.equals(uid)
    );
  }
}

module.exports = Conversation;