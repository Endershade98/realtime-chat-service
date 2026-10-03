// src/domain/value-objects/UserId.js

const { v4: uuidv4, validate: uuidValidate } = require('uuid');

class UserId {
  constructor(value) {
    if (value !== undefined && value !== null && !uuidValidate(value)) {
      throw new Error("Invalid UserId");
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
    return other instanceof UserId && this.value === other.value;
  }
}

module.exports = UserId;