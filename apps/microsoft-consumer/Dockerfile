FROM docker.io/node:lts-alpine

ARG SERVICE_NAME=microsoft-consumer

WORKDIR /apps/${SERVICE_NAME}

RUN addgroup --system ${SERVICE_NAME} && \
          adduser --system -G ${SERVICE_NAME} ${SERVICE_NAME}

COPY dist/apps/${SERVICE_NAME} .
RUN chown -R ${SERVICE_NAME}:${SERVICE_NAME} .

RUN yarn install --production --frozen-lockfile

CMD ["node", "main.js"]
