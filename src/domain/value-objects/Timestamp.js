// src/domain/value-objects/Timestamp.js

class Timestamp {
  constructor(value) {
    const date = value ? new Date(value) : new Date();

    if (isNaN(date.getTime())) {
      throw new Error("Invalid Timestamp");
    }

    const _value = date;

    Object.defineProperty(this, "_value", {
      value: _value,
      writable: false,
      enumerable: false,
    });

    Object.freeze(this);
  }

  get value() {
    return this._value;
  }

  toDate() {
    return this._value;
  }

  toISOString() {
    return this._value.toISOString();
  }

  toString() {
    return this._value.toISOString();
  }

  equals(other) {
    return (
      other instanceof Timestamp &&
      this._value.getTime() === other._value.getTime()
    );
  }
}

module.exports = Timestamp;