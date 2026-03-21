const prisma = require('../src/infrastructure/database/prismaClient');

beforeEach(async () => {
  // Pulisce tutte le tabelle
  await prisma.message.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});