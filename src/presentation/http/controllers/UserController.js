// src/presentation/http/controllers/UserController.js

const CreateUserUseCase =
  require('../../../application/use-cases/user/CreateUserUseCase');

const serializeUser =
  require('../../serializers/user.serializer');

class UserController {

  constructor(userRepository) {

    this.createUserUseCase =
      new CreateUserUseCase(userRepository);
  }

  async createUser(req, res, next) {

    try {

      const user =
        await this.createUserUseCase.execute(req.body);

      return res.status(201).json(
        serializeUser(user)
      );

    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;