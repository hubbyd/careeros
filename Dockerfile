FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY server/package*.json server/

RUN npm ci

COPY . .

RUN npm run build

RUN cd server && npm ci --only=production && npm run build
RUN npx prisma generate --schema server/prisma/schema.prisma

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/prisma ./server/prisma
COPY --from=builder /app/server/node_modules ./server/node_modules

ENV NODE_ENV=production

EXPOSE 10000

CMD ["node", "server/dist/index.js"]