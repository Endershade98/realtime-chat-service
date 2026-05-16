// src/domain/entities/Message.js

const AggregateRoot =
  require('../aggregates/AggregateRoot');

const MessageId =
  require('../value-objects/MessageId');

const ConversationId =
  require('../value-objects/ConversationId');

const UserId =
  require('../value-objects/UserId');

const Timestamp =
  require('../value-objects/Timestamp');

const MessageSent =
  require('../events/MessageSent');

class Message extends AggregateRoot {

  constructor({
    id,
    conversationId,
    senderId,
    content,
    type = 'text',
    createdAt,
    deliveredAt = null,
    readAt = null
  }) {

    super();

    if (!content || content.trim() === '') {
      throw new Error(
        'Message content cannot be empty'
      );
    }

    this._id =
      id instanceof MessageId
        ? id
        : new MessageId(id);

    this._conversationId =
      conversationId instanceof ConversationId
        ? conversationId
        : new ConversationId(conversationId);

    this._senderId =
      senderId instanceof UserId
        ? senderId
        : new UserId(senderId);

    this._content = content;

    this._type = type;

    this._createdAt =
      createdAt instanceof Timestamp
        ? createdAt
        : new Timestamp(createdAt);

    this._deliveredAt =
      deliveredAt ? new Timestamp(deliveredAt) : null;

    this._readAt =
      readAt ? new Timestamp(readAt) : null;

    this.addEvent(
      new MessageSent({
        messageId: this._id.toString(),
        conversationId: this._conversationId.toString(),
        senderId: this._senderId.toString(),
        content: this._content
      })
    );
  }

  // ---------------- GETTERS ----------------

  get id() {
    return this._id;
  }

  get conversationId() {
    return this._conversationId;
  }

  get senderId() {
    return this._senderId;
  }

  get content() {
    return this._content;
  }

  get type() {
    return this._type;
  }

  get createdAt() {
    return this._createdAt;
  }

  get deliveredAt() {
    return this._deliveredAt;
  }

  get readAt() {
    return this._readAt;
  }

  // ---------------- BEHAVIOR ----------------

  markDelivered() {
    this._deliveredAt = new Timestamp();
  }

  markRead() {
    this._readAt = new Timestamp();
  }

  isRead() {
    return this._readAt !== null;
  }

  equals(other) {
    return other instanceof Message &&
      this.id.equals(other.id);
  }
}

module.exports = Message;