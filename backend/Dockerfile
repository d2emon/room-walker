FROM node
ENV DEBUG rooms
RUN mkdir -p /usr/www
WORKDIR /usr/www
RUN git clone https://github.com/d2emon/rooms-graph-server.git ./
RUN npm install -g babel-cli
RUN npm install
COPY ./data /usr/www/data
RUN npm run load
RUN echo "Rooms loaded"
EXPOSE 3000
CMD [ "npm", "start" ]
