FROM node:22-alpine

LABEL author="Marcelo Munhoz <me@marcelomunhoz.com>" \
  modified="2025-05-27"

ARG APP_PATH=/app

ENV PORT=8080

WORKDIR $APP_PATH

COPY ["./app/package.json", "./app/yarn.lock", "./"]

RUN yarn \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/man

VOLUME $APP_PATH

ENTRYPOINT [ "yarn", "serve" ]
