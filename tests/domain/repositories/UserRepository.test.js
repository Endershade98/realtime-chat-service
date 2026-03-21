const UserRepository = require('../../../src/domain/repositories/UserRepository');

describe('UserRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new UserRepository();
  });

  test('should save and retrieve a user', () => {
    const user = { id: 'user-1', username: 'Alice' };
    repo.save(user);

    const found = repo.findById('user-1');
    expect(found).toEqual(user);
  });

  test('should remove a user', () => {
    const user = { id: 'user-1', username: 'Alice' };
    repo.save(user);

    repo.remove('user-1');
    expect(repo.findById('user-1')).toBeNull();
  });
});