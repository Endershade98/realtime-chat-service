const { v4: uuidv4 } = require('uuid');

class Conversation {
  constructor({ id, title, participants }) {
    this.id = id || uuidv4();
    this.title = title || null;
    this.participants = participants || []; // array di Participant
    this.createdAt = new Date();
  }

  addParticipant(participant) {
    this.participants.push(participant);
  }

  removeParticipant(userId) {
    this.participants = this.participants.filter(p => p.userId !== userId);
  }
}

module.exports = Conversation;