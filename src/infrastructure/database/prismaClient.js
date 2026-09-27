// src/infrastructure/database/prismaClient.js

const { PrismaClient } =
  require('@prisma/client');

let prisma;

function getPrismaClient() {

  if (!prisma) {

    prisma = new PrismaClient({
      log: ['query', 'error', 'warn']
    });
  }

  return prisma;
}

module.exports = {
  getPrismaClient
};