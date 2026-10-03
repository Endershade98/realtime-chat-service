// tests/unit/domain/value-objects/timestamp.test.js

const Timestamp =
  require('../../../../src/domain/value-objects/Timestamp');

describe('Timestamp', () => {

  test('creates current timestamp automatically', () => {
    const timestamp = new Timestamp();

    expect(timestamp.value).toBeInstanceOf(Date);
  });

  test('accepts Date', () => {
    const date = new Date();
    const timestamp = new Timestamp(date);

    expect(timestamp.value.getTime()).toBe(date.getTime());
    });

  test('accepts valid date string', () => {
    const timestamp =
      new Timestamp('2026-01-01T00:00:00.000Z');

    expect(timestamp.value).toBeInstanceOf(Date);
  });

  test('rejects invalid date', () => {
    expect(() => {
      new Timestamp('invalid-date');
    }).toThrow();
  });

  test('toString returns ISO string', () => {
    const timestamp =
      new Timestamp('2026-01-01T00:00:00.000Z');

    expect(timestamp.toString())
      .toBe('2026-01-01T00:00:00.000Z');
  });

});