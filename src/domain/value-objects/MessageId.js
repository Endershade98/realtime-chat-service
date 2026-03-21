const { v4: uuidv4, validate: uuidValidate } = require('uuid');

class MessageId {
  constructor(value) {
    if (value && !uuidValidate(value)) {
      throw new Error('Invalid MessageId');
    }

    this.value = value || uuidv4();

    Object.freeze(this);
  }

  toString() {
    return this.value;
  }
}

module.exports = MessageId;