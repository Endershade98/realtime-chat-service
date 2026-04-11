// src/infrastructure/database/prismaClient.js
const { PrismaClient } = require('@prisma/client');

let prisma = null;

function getPrismaClient() {
  if (!prisma) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL non trovata. Controlla il tuo file .env');
    }
    // ✅ Prisma legge DATABASE_URL automaticamente
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'], // opzionale, utile in dev
    });
  }
  return prisma;
}

module.exports = { getPrismaClient };