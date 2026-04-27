// src/domain/value-objects/MessageId.js

const { v4: uuidv4, validate: uuidValidate } = require('uuid');

class MessageId {
  constructor(value) {
    if (value !== undefined && value !== null && !uuidValidate(value)) {
      throw new Error("Invalid MessageId");
    }

    const _value = value ?? uuidv4();

    Object.defineProperty(this, 'value', {
      get: () => _value,
      set: () => {
        throw new Error('Cannot modify immutable value');
      },
      enumerable: true
    });

    Object.freeze(this);
  }

  toString() {
    return this.value;
  }

  equals(other) {
    return other instanceof MessageId && this.value === other.value;
  }
}

module.exports = MessageId;