// src/domain/events/DomainEvent.js

class DomainEvent {
  constructor(data = {}) {
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  getName() {
    return this.constructor.name;
  }

  toJSON() {
    return {
      event: this.getName(),
      data: this.data,
      timestamp: this.timestamp
    };
  }
}

module.exports = DomainEvent;