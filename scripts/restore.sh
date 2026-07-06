#!/bin/bash

BACKUP_FILE="$1"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup_file.db.gz>"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Backup file not found: $BACKUP_FILE"
  exit 1
fi

gunzip -c "$BACKUP_FILE" > /tmp/prod.db

docker cp /tmp/prod.db jobsprint-server-1:/app/data/prod.db

docker restart jobsprint-server-1

echo "Restore completed from: $BACKUP_FILE"