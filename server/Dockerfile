FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY server/package*.json ./server/

RUN npm ci

RUN npm ci --prefix server

COPY . .

RUN npm run build

RUN npm run build --prefix server

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/server/dist ./server/dist

COPY --from=builder /app/server/node_modules ./server/node_modules

COPY --from=builder /app/server/prisma ./server/prisma

RUN npm run prisma:generate --prefix server

RUN mkdir -p /app/data && chown -R node:node /app/data

USER node

EXPOSE 10000

CMD ["npm", "start", "--prefix", "server"]
