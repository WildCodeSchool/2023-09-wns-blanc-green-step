FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json tsconfig.json

RUN npm i
COPY src src

CMD npm run dev