// tests/unit/domain/aggregates/aggregate-root.test.js

const AggregateRoot =
  require('../../../../src/domain/aggregates/AggregateRoot');

describe('AggregateRoot', () => {

  test('starts with empty domain events', () => {
    const root = new AggregateRoot();

    expect(root.pullEvents()).toEqual([]);
  });

  test('stores domain events', () => {
    const root = new AggregateRoot();

    const event = {
      type: 'TEST_EVENT'
    };

    root.addEvent(event);

    expect(root.pullEvents()).toEqual([event]);
  });

  test('pullEvents clears pending events', () => {
    const root = new AggregateRoot();

    root.addEvent({
      type: 'TEST_EVENT'
    });

    root.pullEvents();

    expect(root.pullEvents()).toEqual([]);
  });

  test('rejects missing domain event', () => {
    const root = new AggregateRoot();

    expect(() => {
      root.addEvent(null);
    }).toThrow('Domain event is required');
  });

  test('starts with version zero', () => {
    const root = new AggregateRoot();

    expect(root.version).toBe(0);
  });

  test('increments version', () => {
    const root = new AggregateRoot();

    root.incrementVersion();
    root.incrementVersion();

    expect(root.version).toBe(2);
  });

});