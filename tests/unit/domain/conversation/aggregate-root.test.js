// tests/unit/domain/conversation/aggregate-root.test.js

const AggregateRoot = require('../../../../src/domain/aggregates/AggregateRoot');

describe('AggregateRoot', () => {

  test('stores and pulls events', () => {
    const root = new AggregateRoot();

    root.addEvent({ name: 'TEST' });

    const events = root.pullEvents();

    expect(events.length).toBe(1);
    expect(root.pullEvents().length).toBe(0);
  });

});