// tests/unit/domain/events/MessageEvents.test.js
const MessageDelivered = require('@domain/events/MessageDelivered');
const MessageRead = require('@domain/events/MessageRead');
const { v4: uuidv4 } = require('uuid');

describe('Message Events', () => {

  describe('MessageDelivered', () => {

    test('should create MessageDelivered event', () => {
      const messageId = uuidv4();
      const conversationId = uuidv4();
      const recipientId = uuidv4();
      const deliveredAt = new Date();

      const payload = {
        messageId: messageId,
        conversationId: conversationId,
        recipientId: recipientId,
        deliveredAt: deliveredAt
      };

      const event = new MessageDelivered(payload);

      expect(event.event).toBe('MESSAGE_DELIVERED');
      expect(event.data.messageId).toBe(payload.messageId);
      expect(event.data.recipientId).toBe(payload.recipientId);
    });

  });

  describe('MessageRead', () => {

    test('should create MessageRead event', () => {
      const messageId = uuidv4();
      const conversationId = uuidv4();
      const readerId = uuidv4();
      const readAt = new Date();

      const payload = {
        messageId: messageId,
        conversationId: conversationId,
        readerId: readerId,
        readAt: readAt
      };

      const event = new MessageRead(payload);

      expect(event.event).toBe('MESSAGE_READ');
      expect(event.data.readerId).toBe(payload.readerId);
      expect(event.data.readAt).toBe(payload.readAt);
    });

    test('should store read timestamp', () => {
      const messageId = uuidv4();
      const conversationId = uuidv4();
      const readerId = uuidv4();
      const now = new Date();

      const event = new MessageRead({
        messageId: messageId,
        conversationId: conversationId,
        readerId: readerId,
        readAt: now
      });

      expect(event.data.readAt).toBe(now);
    });

  });

});