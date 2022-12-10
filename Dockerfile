FROM node:18.12.1-alpine

WORKDIR /home

COPY package*.json ./

RUN node -v

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3002

CMD ["yarn", "start:prod"]