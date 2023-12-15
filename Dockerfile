# Set node version
FROM node:12.13.0-alpine

WORKDIR /app

# Packages
COPY package*.json ./
RUN npm install

# Typescript
COPY ts*.json ./

# Folders
COPY public ./public
COPY src ./src

# Data folders
# RUN mkdir ./backend
# RUN mkdir ./backend/data
# RUN mkdir ./backend/data/files

# COPY backend/data/files ./backend/data/files

# Port to expose
EXPOSE 3000

# Run script
CMD npm run start
