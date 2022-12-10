FROM node:18.12.1-alpine

WORKDIR /home

COPY package*.json ./

RUN node -v

RUN yarn install

COPY . .

EXPOSE 3333

CMD ["yarn", "start:prod"]