import { PrismaClient, UserStatus, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding ...');

  // 1. Create Company
  const company = await prisma.company.upsert({
    where: { cnpj: '12345678000199' },
    update: {},
    create: {
      name: 'Valkyrie Systems',
      cnpj: '12345678000199',
      companyKey: 'VALKYRIE-123',
      address: 'Tech Park, Porto Alegre, RS',
      phone: '51999999999',
    },
  });
  console.log(`Created company: ${company.name}`);

  const passwordHash = await bcrypt.hash('password123', 10);

  // 2. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@valkyrie.com' },
    update: {
      companyId: company.id,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      password: passwordHash,
    },
    create: {
      email: 'admin@valkyrie.com',
      name: 'Admin User',
      password: passwordHash,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      companyId: company.id,
    },
  });
  console.log(`Created admin: ${admin.email}`);

  // 3. Create Manager User
  const manager = await prisma.user.upsert({
    where: { email: 'manager@valkyrie.com' },
    update: {
      companyId: company.id,
      role: Role.MANAGER,
      status: UserStatus.ACTIVE,
      password: passwordHash,
    },
    create: {
      email: 'manager@valkyrie.com',
      name: 'Manager User',
      password: passwordHash,
      role: Role.MANAGER,
      status: UserStatus.ACTIVE,
      companyId: company.id,
    },
  });
  console.log(`Created manager: ${manager.email}`);

  // 4. Create Regular User
  const user = await prisma.user.upsert({
    where: { email: 'user@valkyrie.com' },
    update: {
      companyId: company.id,
      role: Role.USER,
      status: UserStatus.ACTIVE,
      password: passwordHash,
    },
    create: {
      email: 'user@valkyrie.com',
      name: 'Regular User',
      password: passwordHash,
      role: Role.USER,
      status: UserStatus.ACTIVE,
      companyId: company.id,
    },
  });
  console.log(`Created user: ${user.email}`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
