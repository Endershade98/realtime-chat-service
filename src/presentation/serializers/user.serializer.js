// src/presentation/serializers/user.serializer.js

module.exports = function serializeUser(user) {

  return {
    id: user.id.toString(),
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  };
};