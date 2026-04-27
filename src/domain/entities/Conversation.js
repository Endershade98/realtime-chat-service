// src/domain/entities/Conversation.js

const ConversationId = require('../value-objects/ConversationId');
const Participant = require('./Participant');
const UserId = require('../value-objects/UserId'); // 👈 QUESTO MANCAVA

class Conversation {
  constructor({ id, participants = [] } = {}) {
    this._id = id instanceof ConversationId ? id : new ConversationId();

    this._participants = participants.map(p =>
      p instanceof Participant ? p : new Participant(p)
    );
  }

  get id() {
    return this._id;
  }

  get participants() {
    return this._participants;
  }

  addParticipant(userId) {
    const uid = userId instanceof UserId ? userId : new UserId(userId);

    const exists = this._participants.some(p =>
      p.userId.equals(uid)
    );

    if (!exists) {
      this._participants.push(
        new Participant({ userId: uid })
      );
    }
  }

  removeParticipant(userId) {
    const uid = userId instanceof UserId ? userId : new UserId(userId);

    this._participants = this._participants.filter(p =>
      !p.userId.equals(uid)
    );
  }

  hasParticipant(userId) {
    const uid = userId instanceof UserId ? userId : new UserId(userId);

    return this._participants.some(p =>
      p.userId.equals(uid)
    );
  }
}

module.exports = Conversation;