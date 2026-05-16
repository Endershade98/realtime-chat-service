// tests/integration/infrastructure/repositories/postgres/user-repository.test.js

const PostgresUserRepository =
  require('../../../../../src/infrastructure/repositories/postgres/PostgresUserRepository');

const User =
  require('../../../../../src/domain/entities/User');

const UserId =
  require('../../../../../src/domain/value-objects/UserId');

const Timestamp =
  require('../../../../../src/domain/value-objects/Timestamp');

describe('PostgresUserRepository (mocked)', () => {

  let repo;
  let prisma;

  beforeEach(() => {

    prisma = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn()
      }
    };

    repo = new PostgresUserRepository(prisma);
  });

  test('should save user', async () => {

    const user = new User({
      id: new UserId(),
      username: 'endershade',
      email: 'endershade@test.com',
      createdAt: new Timestamp()
    });

    prisma.user.create.mockResolvedValue({
      id: user.id.value,
      username: user.username,
      email: user.email,
      createdAt: new Date()
    });

    const saved = await repo.save(user);

    expect(prisma.user.create).toHaveBeenCalled();

    expect(saved.username).toBe('endershade');
  });

});