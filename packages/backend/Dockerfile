FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/backend/package*.json packages/backend/
COPY packages/shared/package*.json packages/shared/

RUN npm install

COPY . .

RUN npm run build -w packages/backend
RUN npx prisma generate --schema packages/backend/prisma/schema.prisma

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/packages/backend/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/main.js"]