FROM node:16-alpine

WORKDIR /var/www/app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD ["node", "./server.js"]
