const ConversationId = require('../value-objects/ConversationId');
const Timestamp = require('../value-objects/Timestamp');

class Conversation {
  constructor({ id, title, participants = [], createdAt } = {}) {
    this.id = id instanceof ConversationId
      ? id
      : new ConversationId(id);

    this.title = title || null;
    this.participants = participants;

    this.createdAt = createdAt instanceof Timestamp
      ? createdAt
      : new Timestamp(createdAt);
  }

  addParticipant(participant) {
    this.participants.push(participant);
  }

  removeParticipant(userId) {
    this.participants = this.participants.filter(
      p => p.userId.toString() !== userId.toString()
    );
  }
}

module.exports = Conversation;