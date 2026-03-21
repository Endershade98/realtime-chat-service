class Timestamp {
  constructor(value) {
    const date = value ? new Date(value) : new Date();

    if (isNaN(date.getTime())) {
      throw new Error('Invalid Timestamp');
    }

    this.value = date;

    Object.freeze(this);
  }

  toISOString() {
    return this.value.toISOString();
  }

  toDate() {
    return this.value;
  }
}

module.exports = Timestamp;