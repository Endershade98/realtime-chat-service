// tests/unit/infrastructure/repositories/in-memory/user-repository.test.js

const UserRepository =
  require('../../../../../src/infrastructure/repositories/in-memory/UserRepository');

const User =
  require('../../../../../src/domain/entities/User');

const UserId =
  require('../../../../../src/domain/value-objects/UserId');

const Timestamp =
  require('../../../../../src/domain/value-objects/Timestamp');

describe('InMemory UserRepository', () => {

  let repo;

  beforeEach(() => {
    repo = new UserRepository();
  });

  test('should save and find user', () => {

    const user = new User({
      id: new UserId(),
      username: 'endershade',
      email: 'endershade@test.com',
      createdAt: new Timestamp()
    });

    repo.save(user);

    const found = repo.findById(user.id);

    expect(found).not.toBeNull();
    expect(found.username).toBe('endershade');
  });

});