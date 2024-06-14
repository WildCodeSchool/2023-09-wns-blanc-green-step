FROM node:lts-alpine as builder

RUN apk --no-cache add curl

WORKDIR /app
COPY pack*.json ./
COPY tsconfig.json tsconfig.json
COPY next-env.d.ts next-env.d.ts
COPY tailwind.config.js tailwind.config.js
COPY postcss.config.js postcss.config.js
COPY next.config.js next.config.js
COPY src src
COPY public public

# Génère le dossier node_modules
RUN npm i

ARG NEXT_PUBLIC_API_LINK
ARG NEXT_PUBLIC_IMAGE_API

ENV NEXT_PUBLIC_API_LINK=${NEXT_PUBLIC_API_LINK}
ENV NEXT_PUBLIC_IMAGE_API=${NEXT_PUBLIC_IMAGE_API}

# Génère le dossier .next
RUN npm run build 

FROM node:lts-alpine

WORKDIR /app

# Copier les dossiers à partir de l'image précédente
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.next /app/.next

RUN npm i --production

CMD npm start