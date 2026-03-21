const { execSync } = require('child_process');

module.exports = async () => {
  console.log('Setup test DB (Docker)...');

  execSync('npx prisma migrate deploy', {
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
    },
    stdio: 'inherit',
  });

  console.log('Test DB pronto');
};