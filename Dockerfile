FROM alpine:edge


WORKDIR /node-simple-app

COPY . /node-simple-app


RUN apk add -U curl git nodejs && npm install pm2 -g && npm install

EXPOSE 8080

ENV NODE_ENV production

ENTRYPOINT ["sh", "manage.sh"]

CMD ["run-server"]