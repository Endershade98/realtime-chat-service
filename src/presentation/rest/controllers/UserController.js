// src/presentation/rest/controllers/UserController.js
const CreateUserService = require('../../../application/services/CreateUserService');

class UserController {
  constructor(userRepository) {
    this.createUserService = new CreateUserService(userRepository);
  }

  async createUser(req, res) {
    try {
      const user = await this.createUserService.execute(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = UserController;