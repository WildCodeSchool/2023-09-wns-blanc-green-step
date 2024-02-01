FROM node:lts-alpine

WORKDIR /app
COPY pack*.json ./
COPY tsconfig.json tsconfig.json
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js

RUN npm i
COPY src src
COPY public public


CMD npm start
