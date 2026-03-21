const { v4: uuidv4, validate: uuidValidate } = require('uuid');

class UserId {
  constructor(value) {
    if (value && !uuidValidate(value)) {
      throw new Error('Invalid UserId');
    }

    this.value = value || uuidv4();

    Object.freeze(this);
  }

  toString() {
    return this.value;
  }
}

module.exports = UserId;