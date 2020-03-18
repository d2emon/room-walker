FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ts*.json ./

COPY src ./src

EXPOSE 8080

CMD ["npm", "start"]
