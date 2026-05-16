// src/domain/entities/Conversation.js

const ConversationId = require('../value-objects/ConversationId');
const UserId = require('../value-objects/UserId');
const Participant = require('./Participant');
const AggregateRoot = require('../aggregates/AggregateRoot');

const ConversationCreated = require('../events/ConversationCreated');
const UserConnected = require('../events/UserConnected');

const ValidationError = require('../errors/ValidationError');
const BusinessRuleError = require('../errors/BusinessRuleError');

class Conversation extends AggregateRoot {
  constructor({ id, title, participants = [], createdAt } = {}) {
    super();

    this._id = id instanceof ConversationId ? id : new ConversationId();
    this._title = title;
    this._createdAt = createdAt ?? new Date();

    this._participants = participants.map(p =>
      p instanceof Participant ? p : new Participant(p)
    );

    Object.freeze(this._id);
  }

  // =========================================================
  // FACTORY (DDD entry point)
  // =========================================================
  static create({ title, creatorUserId }) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new ValidationError('Conversation title is required');
    }

    const conversation = new Conversation({ title: title.trim() });

    if (creatorUserId) {
      conversation.addParticipant(creatorUserId);
    }

    conversation.addEvent(
      new ConversationCreated({
        conversationId: conversation.id.toString(),
        title: conversation.title
      })
    );

    return conversation;
  }

  // =========================================================
  // BEHAVIOR
  // =========================================================
  addParticipant(userId) {
    const uid = this._normalizeUserId(userId);

    if (this.hasParticipant(uid)) {
      throw new BusinessRuleError('Participant already exists');
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
    const uid = this._normalizeUserId(userId);

    const index = this._participants.findIndex(p =>
      p.userId.equals(uid)
    );

    if (index === -1) {
      throw new BusinessRuleError('Participant not found');
    }

    if (this._participants.length <= 1) {
      throw new BusinessRuleError('Conversation cannot be empty');
    }

    this._participants.splice(index, 1);
  }

  // =========================================================
  // DOMAIN RULES
  // =========================================================
  validateParticipants() {
    if (this._participants.length > 0 && this._participants.length < 2) {
      throw new BusinessRuleError(
        'Conversation must contain at least 2 participants'
      );
    }
  }

  hasParticipant(userId) {
    const uid = this._normalizeUserId(userId);

    return this._participants.some(p =>
      p.userId.equals(uid)
    );
  }

  // =========================================================
  // GETTERS
  // =========================================================
  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get createdAt() {
    return this._createdAt;
  }

  get participants() {
    return [...this._participants];
  }

  // =========================================================
  // PRIVATE HELPERS
  // =========================================================
  _normalizeUserId(userId) {
    if (!userId) {
      throw new ValidationError('userId is required');
    }

    return userId instanceof UserId
      ? userId
      : new UserId(userId);
  }
}

module.exports = Conversation;