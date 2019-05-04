FROM node:9.4.0-alpine

WORKDIR /node-simple-app

RUN yarn global add pm2@2.9.2

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3337

ENV NODE_ENV production
ENV PORT 3337

USER node
ENTRYPOINT ["sh", "manage.sh"]
CMD ["run-server"]
