#!/bin/bash

BACKUP_DIR="/backup/jobsprint"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

docker cp jobsprint-server-1:/app/data/prod.db $BACKUP_DIR/db_backup_$DATE.db

gzip $BACKUP_DIR/db_backup_$DATE.db

echo "Backup completed: $BACKUP_DIR/db_backup_$DATE.db.gz"

find $BACKUP_DIR -name "*.db.gz" -mtime +7 -delete

echo "Old backups cleaned up"