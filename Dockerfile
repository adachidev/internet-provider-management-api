FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

CMD node -v

RUN npm install

COPY . .

EXPOSE 3333

CMD npm run start:prod