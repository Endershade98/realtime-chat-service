// tests/teardownTestDB.js
const { getTestPrisma } = require('./helpers/prismaTestClient');

module.exports = async () => {
  const prisma = getTestPrisma();
  await prisma.$disconnect();
};