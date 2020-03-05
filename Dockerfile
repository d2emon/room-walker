FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ts*.json ./

COPY public ./public

COPY src ./src

RUN mkdir ./backend

RUN mkdir ./backend/data

RUN mkdir ./backend/data/files

COPY backend/data/files ./backend/data/files

EXPOSE 3000

CMD ["npm", "start"]
