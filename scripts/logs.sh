#!/bin/bash

echo "=== Frontend Logs ==="
docker logs --tail=50 jobsprint-frontend-1

echo -e "\n=== Server Logs ==="
docker logs --tail=50 jobsprint-server-1

echo -e "\n=== Nginx Logs ==="
docker logs --tail=50 jobsprint-nginx-1

echo -e "\n=== Redis Logs ==="
docker logs --tail=50 jobsprint-redis-1