// tests/setupTestDB.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  // pulizia DB tra test
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

module.exports = prisma;