/*
  Warnings:

  - A unique constraint covering the columns `[companyKey]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - The required column `companyKey` was added to the `companies` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "companyKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "companies_companyKey_key" ON "companies"("companyKey");
