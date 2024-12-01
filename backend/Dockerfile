FROM node:20-alpine

WORKDIR /usr/src/app/backend/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001