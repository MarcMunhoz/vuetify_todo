FROM node:18-alpine

ARG APP_PATH=/app

ENV PORT=8080

COPY ["package.json", "yarn.lock", "./"]

RUN yarn global add @vue/cli-service \
  && yarn \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/man

WORKDIR $APP_PATH

VOLUME $APP_PATH

ENTRYPOINT [ "yarn", "serve" ]
