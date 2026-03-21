// src/domain/events/DomainEvent.js
class DomainEvent {
  constructor(eventName, payload) {
    this.eventName = eventName;
    this.occurredAt = new Date();
    this.payload = payload;
  }
}

module.exports = DomainEvent;