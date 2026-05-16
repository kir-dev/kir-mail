FROM docker.io/node:lts-alpine

ARG SERVICE_NAME=consumer

WORKDIR /apps/${SERVICE_NAME}

RUN addgroup --system ${SERVICE_NAME} && \
          adduser --system -G ${SERVICE_NAME} ${SERVICE_NAME}

COPY dist/apps/${SERVICE_NAME} .
COPY .yarnrc.yml .
RUN chown -R ${SERVICE_NAME}:${SERVICE_NAME} .

RUN corepack enable
RUN NODE_ENV=production yarn install --immutable

CMD ["node", "main.js"]
