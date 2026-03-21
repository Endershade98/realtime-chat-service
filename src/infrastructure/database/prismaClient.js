// src/infrastructure/database/prismaClient.js
const { PrismaClient } = require('@prisma/client');

let prisma;

function getPrismaClient() {
  if (!prisma) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL non trovata. Assicurati di caricare le variabili d’ambiente prima di creare PrismaClient'
      );
    }
    prisma = new PrismaClient(); // Prisma legge DATABASE_URL dall'ambiente
  }
  return prisma;
}

module.exports = { getPrismaClient };