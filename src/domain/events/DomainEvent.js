// src/domain/events/DomainEvent.js

class DomainEvent {
  constructor(event, data = {}) {
    this.event = event;              // 👈 nome evento
    this.data = data;                // 👈 payload
    this.timestamp = new Date().toISOString(); // 👈 stringa
  }

  toJSON() {
    return {
      event: this.event,
      data: this.data,
      timestamp: this.timestamp
    };
  }
}

module.exports = DomainEvent;