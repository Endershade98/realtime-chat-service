// src/domain/aggregates/ConversationAggregate.js

const AggregateRoot = require('../aggregates/AggregateRoot');
const Message = require('../entities/Message');
const MessageSent = require('../events/MessageSent');

class ConversationAggregate extends AggregateRoot {
  constructor(conversation) {
    super();
    this.conversation = conversation;
    this.messages = [];
    this.participants = [];
  }

  addMessage({ messageId, senderId, content, createdAt }) {
    if (!this.isParticipant(senderId)) {
      throw new Error("User not in conversation");
    }

    const message = new Message({
      id: messageId,
      conversationId: this.conversation.id,
      senderId,
      content,
      createdAt
    });

    this.messages.push(message);

    this.addEvent(
      new MessageSent({
        messageId,
        conversationId: this.conversation.id,
        senderId,
        content
      })
    );

    return message;
  }

  isParticipant(userId) {
    return this.participants.some(p => p.userId.equals(userId));
  }
}

module.exports = ConversationAggregate;