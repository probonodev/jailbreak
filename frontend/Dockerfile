FROM node:20-alpine
 
WORKDIR /usr/src/app/frontend/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

EXPOSE 3000

# CMD ["npm", "start"]
