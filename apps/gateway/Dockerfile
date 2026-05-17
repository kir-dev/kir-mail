FROM docker.io/node:lts-alpine

RUN apk add --no-cache openssl

ARG SERVICE_NAME=gateway

WORKDIR /apps/${SERVICE_NAME}

RUN addgroup --system ${SERVICE_NAME} && \
          adduser --system -G ${SERVICE_NAME} ${SERVICE_NAME}

COPY dist/apps/${SERVICE_NAME} .
COPY prisma ./prisma
COPY prisma.config.ts .
COPY .yarnrc.yml .
RUN chown -R ${SERVICE_NAME}:${SERVICE_NAME} .

RUN corepack enable
RUN NODE_ENV=production yarn install --immutable

CMD yarn prisma migrate deploy && node main.js
