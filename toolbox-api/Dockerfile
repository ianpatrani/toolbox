FROM node:14

WORKDIR /app

COPY package*.json ./
COPY server.js ./
COPY tests ./tests

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]
