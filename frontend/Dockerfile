FROM node:23.3.0

WORKDIR /usr/src/app/frontend/

COPY package*.json ./

RUN rm -rf node_modules

RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
