-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resume" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "parsedData" TEXT NOT NULL,
    "analysisResult" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Resume" ("createdAt", "fileName", "fileUrl", "id", "parsedData", "status", "updatedAt", "userId") SELECT "createdAt", "fileName", "fileUrl", "id", "parsedData", "status", "updatedAt", "userId" FROM "Resume";
DROP TABLE "Resume";
ALTER TABLE "new_Resume" RENAME TO "Resume";
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");
CREATE INDEX "Resume_status_idx" ON "Resume"("status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
