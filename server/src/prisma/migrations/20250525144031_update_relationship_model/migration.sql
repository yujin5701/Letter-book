-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_user2Id_fkey";

-- AlterTable
ALTER TABLE "Relationship" ALTER COLUMN "user2Id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
