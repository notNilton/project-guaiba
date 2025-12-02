import { PrismaClient, UserStatus, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@valkyrie.com';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      status: UserStatus.ACTIVE,
      role: Role.ADMIN,
      password: hashedPassword,
    },
    create: {
      email,
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  console.log(`User ${user.email} created/updated with status ${user.status}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
