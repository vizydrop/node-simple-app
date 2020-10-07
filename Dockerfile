FROM node:14.13.0-alpine

WORKDIR /node-simple-app

COPY package.json yarn.lock ./

ENV NODE_ENV production
RUN yarn install --production

COPY . .

EXPOSE 3337

ENV PORT 3337

USER node
ENTRYPOINT ["sh", "manage.sh"]
CMD ["run-server"]
