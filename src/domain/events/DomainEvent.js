// src/domain/events/DomainEvent.js

class DomainEvent {
  constructor(type, data = {}) {
    this.type = type;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      type: this.type,
      data: this.data,
      timestamp: this.timestamp
    };
  }
}

module.exports = DomainEvent;