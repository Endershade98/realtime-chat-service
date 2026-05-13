// src/domain/aggregates/AggregateRoot.js

class AggregateRoot {
  constructor() {
    this._events = [];
    this._version = 0;
  }

  addEvent(event) {
    this._events.push(event);
  }

  pullEvents() {
    const events = [...this._events];
    this._events = [];
    return events;
  }

  get version() {
    return this._version;
  }

  incrementVersion() {
    this._version++;
  }
}

module.exports = AggregateRoot;