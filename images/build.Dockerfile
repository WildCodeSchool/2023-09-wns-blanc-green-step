FROM node:lts-alpine AS builder

RUN apk --no-cache add curl

WORKDIR /app

COPY package*.json ./
COPY src src
COPY tsconfig.json tsconfig.json
COPY uploads uploads

RUN npm i
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/src/index.js /index.js
COPY --from=builder /app/uploads /app/uploads

RUN npm i --production

CMD npm start