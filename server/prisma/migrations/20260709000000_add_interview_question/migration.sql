-- Create InterviewQuestion table
CREATE TABLE "InterviewQuestion" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "sessionId" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT,
  "evaluation" TEXT,
  "score" INTEGER,
  "nextQuestion" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("sessionId") REFERENCES "InterviewSession"("id") ON DELETE CASCADE
);

-- Add index on sessionId
CREATE INDEX "InterviewQuestion_sessionId_idx" ON "InterviewQuestion"("sessionId");

-- Add level field to InterviewSession if not exists
ALTER TABLE "InterviewSession" ADD COLUMN IF NOT EXISTS "level" TEXT NOT NULL DEFAULT 'entry';

-- Remove old fields if they exist
ALTER TABLE "InterviewSession" DROP COLUMN IF EXISTS "questions";
ALTER TABLE "InterviewSession" DROP COLUMN IF EXISTS "answers";