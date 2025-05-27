FROM node:18-alpine

LABEL author="Marcelo Munhoz <me@marcelomunhoz.com>" \
  modified="2025-05-27"

ARG APP_PATH=/app

ENV PORT=8080

COPY ["./app/package.json", "./app/yarn.lock", "./"]

RUN yarn global add @vue/cli-service \
  && yarn \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/man

WORKDIR $APP_PATH

VOLUME $APP_PATH

ENTRYPOINT [ "yarn", "serve" ]
