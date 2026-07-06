-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "phone" TEXT,
    "major" TEXT,
    "education" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "status" TEXT NOT NULL DEFAULT 'active',
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CareerAssessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "assessmentType" TEXT NOT NULL,
    "inputData" TEXT NOT NULL,
    "resultData" TEXT NOT NULL,
    "score" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CareerAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "parsedData" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InterviewSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "evaluation" TEXT,
    "nextQuestion" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InterviewQuestion_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InterviewSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LearningPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "planData" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LearningPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrowthRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GrowthRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AiChatSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "chatType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AiChatSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AiChatMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AiChatMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AiChatSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" INTEGER NOT NULL DEFAULT 0,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "variables" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "isActive" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE INDEX "CareerAssessment_userId_idx" ON "CareerAssessment"("userId");

-- CreateIndex
CREATE INDEX "CareerAssessment_assessmentType_idx" ON "CareerAssessment"("assessmentType");

-- CreateIndex
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");

-- CreateIndex
CREATE INDEX "Resume_status_idx" ON "Resume"("status");

-- CreateIndex
CREATE INDEX "InterviewSession_userId_idx" ON "InterviewSession"("userId");

-- CreateIndex
CREATE INDEX "InterviewSession_status_idx" ON "InterviewSession"("status");

-- CreateIndex
CREATE INDEX "InterviewQuestion_sessionId_idx" ON "InterviewQuestion"("sessionId");

-- CreateIndex
CREATE INDEX "LearningPlan_userId_idx" ON "LearningPlan"("userId");

-- CreateIndex
CREATE INDEX "LearningPlan_status_idx" ON "LearningPlan"("status");

-- CreateIndex
CREATE INDEX "GrowthRecord_userId_idx" ON "GrowthRecord"("userId");

-- CreateIndex
CREATE INDEX "GrowthRecord_type_idx" ON "GrowthRecord"("type");

-- CreateIndex
CREATE INDEX "GrowthRecord_createdAt_idx" ON "GrowthRecord"("createdAt");

-- CreateIndex
CREATE INDEX "AiChatSession_userId_idx" ON "AiChatSession"("userId");

-- CreateIndex
CREATE INDEX "AiChatSession_chatType_idx" ON "AiChatSession"("chatType");

-- CreateIndex
CREATE INDEX "AiChatMessage_sessionId_idx" ON "AiChatMessage"("sessionId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE UNIQUE INDEX "Prompt_key_key" ON "Prompt"("key");

-- CreateIndex
CREATE INDEX "Prompt_key_idx" ON "Prompt"("key");

-- CreateIndex
CREATE INDEX "Prompt_category_idx" ON "Prompt"("category");
