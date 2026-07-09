#!/bin/bash

set -e

echo "Starting JobSprint server..."
echo "Database path: $DATABASE_URL"

npx prisma migrate deploy || {
  echo "Migration failed, resetting database..."
  rm -f /app/data/jobsprint.db
  npx prisma migrate deploy
}

echo "Starting application..."
NODE_ENV=production node dist/index.js