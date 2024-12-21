FROM node:18

WORKDIR /app

COPY package*.json ./
COPY app.js ./

RUN npm install -f

EXPOSE 3001

CMD ["node", "app.js"]