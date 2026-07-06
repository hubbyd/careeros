FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY server/package*.json server/

RUN npm ci

COPY . .

RUN npm run build

RUN cd server && npm ci
RUN cd server && npx prisma generate --schema prisma/schema.prisma
RUN cd server && npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/prisma ./server/prisma

RUN cd server && npm ci --only=production

RUN mkdir -p /app/data

ENV NODE_ENV=production

EXPOSE 10000

CMD ["node", "server/dist/index.js"]