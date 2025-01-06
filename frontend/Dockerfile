FROM node:22-alpine AS builder
ARG DATABASE_URL
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY svelte.config.js ./
COPY vite.config.ts ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

EXPOSE 6970
ENV NODE_ENV=production
ENV PORT=6970
ENV DATABASE_URL=${DATABASE_URL}
CMD [ "node", "build/index.js" ]
