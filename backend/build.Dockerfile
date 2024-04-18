FROM node:lts-alpine AS builder

RUN apk --no-cache add curl

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY src src

RUN npm i
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/build /app

RUN npm i --production

CMD npx typeorm migration:run -d ./src/config/db.js ; npm start