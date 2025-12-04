const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@hris.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@hris.com',
      password: hashPassword,
      role: 'ADMIN',
      position: 'Head of IT',
    },
  });

  console.log('✅ Admin Success Created: ', admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    procces.exit(1);
  });
