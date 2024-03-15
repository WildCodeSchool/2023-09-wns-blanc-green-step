FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app
COPY pack*.json ./
COPY tsconfig.json tsconfig.json
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY jest.config.ts jest.config.ts
COPY jest.setup.ts jest.setup.ts

RUN npm i
COPY src src
COPY public public


CMD npm start
