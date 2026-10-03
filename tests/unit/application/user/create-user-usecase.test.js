// tests/unit/application/user/create-user-usecase.test.js

const CreateUserUseCase =
require('../../../../src/application/use-cases/user/CreateUserUseCase');

describe('CreateUserUseCase', () => {

  it('should create and save user', async () => {

    const repo = {
      save: jest.fn(async user => user)
    };

    const useCase =
      new CreateUserUseCase(repo);

    const result =
      await useCase.execute({
        username: 'mario',
        email: 'mario@test.com'
      });

    expect(repo.save).toHaveBeenCalledTimes(1);
    expect(result.username).toBe('mario');
    expect(result.email).toBe('mario@test.com');
  });

});