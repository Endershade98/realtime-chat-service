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

const ValidationError =
  require('../errors/ValidationError');

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

    if (
      !content ||
      typeof content !== 'string' ||
      !content.trim()
    ) {
      throw new ValidationError(
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

    this._content = content.trim();

    this._type = type;

    this._createdAt =
      createdAt instanceof Timestamp
        ? createdAt
        : new Timestamp(createdAt);

    this._deliveredAt =
      deliveredAt
        ? new Timestamp(deliveredAt)
        : null;

    this._readAt =
      readAt
        ? new Timestamp(readAt)
        : null;
  }

  // =========================================================
  // FACTORY - NEW MESSAGE
  // =========================================================

  static create({
    conversationId,
    senderId,
    content,
    type = 'text'
  }) {

    const message =
      new Message({
        id: new MessageId(),
        conversationId,
        senderId,
        content,
        type,
        createdAt: new Timestamp()
      });

    message.addEvent(
      new MessageSent({
        messageId:
          message.id.toString(),

        conversationId:
          message.conversationId.toString(),

        senderId:
          message.senderId.toString(),

        content:
          message.content
      })
    );

    return message;
  }

  // =========================================================
  // FACTORY - REHYDRATION FROM PERSISTENCE
  // =========================================================

  static reconstitute({
    id,
    conversationId,
    senderId,
    content,
    type = 'text',
    createdAt,
    deliveredAt = null,
    readAt = null
  }) {

    return new Message({
      id,
      conversationId,
      senderId,
      content,
      type,
      createdAt,
      deliveredAt,
      readAt
    });
  }

  // =========================================================
  // GETTERS
  // =========================================================

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

  // =========================================================
  // BEHAVIOR
  // =========================================================

  markDelivered() {
    this._deliveredAt =
      new Timestamp();
  }

  markRead() {
    this._readAt =
      new Timestamp();
  }

  isRead() {
    return this._readAt !== null;
  }

  equals(other) {

    return (
      other instanceof Message &&
      this.id.equals(other.id)
    );
  }
}

module.exports = Message;