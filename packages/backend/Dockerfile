FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/main.js"]
