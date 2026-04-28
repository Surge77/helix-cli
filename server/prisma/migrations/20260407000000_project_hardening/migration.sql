-- CreateEnum
CREATE TYPE "ConversationMode" AS ENUM ('chat', 'tool', 'agent');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('user', 'assistant', 'system', 'tool');

-- DropTable
DROP TABLE IF EXISTS "Test";

-- AlterTable
ALTER TABLE "Conversation"
  ALTER COLUMN "mode" DROP DEFAULT,
  ALTER COLUMN "mode" TYPE "ConversationMode" USING ("mode"::"ConversationMode"),
  ALTER COLUMN "mode" SET DEFAULT 'chat';

-- AlterTable
ALTER TABLE "Message"
  ALTER COLUMN "role" TYPE "MessageRole" USING ("role"::"MessageRole");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "deviceCode_deviceCode_key" ON "deviceCode"("deviceCode");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "deviceCode_userCode_key" ON "deviceCode"("userCode");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "deviceCode_status_idx" ON "deviceCode"("status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Conversation_userId_idx" ON "Conversation"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Conversation_userId_mode_idx" ON "Conversation"("userId", "mode");

-- CreateIndex
DROP INDEX IF EXISTS "Message_conversationId_idx";

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Message_conversationId_createdAt_idx" ON "Message"("conversationId", "createdAt");
