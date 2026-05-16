// src/presentation/serializers/user.serializer.js

module.exports = function serializeUser(entity) {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email
  };
};