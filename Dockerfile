FROM node:18 AS builder

WORKDIR /app

ARG BUILD_TIMESTAMP
ENV BUILD_TIMESTAMP=$BUILD_TIMESTAMP

COPY package*.json ./
COPY server/package*.json server/

RUN npm ci

COPY . .

RUN rm -rf dist && npm run build 2>&1

RUN cd server && rm -rf dist && npm ci
RUN cd server && npx prisma generate --schema prisma/schema.prisma
RUN cd server && npm run build 2>&1

FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/prisma ./server/prisma
COPY --from=builder /app/server/package.json ./server/package.json
COPY --from=builder /app/server/package-lock.json ./server/package-lock.json

RUN cd server && npm ci --only=production

COPY --from=builder /app/server/node_modules/.prisma ./server/node_modules/.prisma
COPY --from=builder /app/server/node_modules/@prisma/client ./server/node_modules/@prisma/client

RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV DATABASE_URL=file:///app/data/jobsprint.db

EXPOSE 10000

WORKDIR /app/server

CMD ["npm", "start"]