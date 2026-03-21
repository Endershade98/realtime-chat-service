// tests/infrastructure/repositories/PostgresUserRepository.test.js
const { mockDeep } = require('jest-mock-extended');
const PostgresUserRepository = require('../../../src/infrastructure/repositories/PostgresUserRepository');
const UserId = require('../../../src/domain/value-objects/UserId');

describe('PostgresUserRepository - unit', () => {
  let mockPrisma;
  let repo;

  beforeEach(() => {
    mockPrisma = mockDeep();
    repo = new PostgresUserRepository(mockPrisma);
  });

  test('should create a user', async () => {
    const userId = new UserId();
    mockPrisma.user.create.mockResolvedValue({
      id: userId.value,
      username: 'Alice',
      email: 'alice@test.com',
    });

    const user = await repo.create({
      id: userId,
      username: 'Alice',
      email: 'alice@test.com',
    });

    expect(user.id.value).toBe(userId.value);
    expect(user.username).toBe('Alice');
  });
});