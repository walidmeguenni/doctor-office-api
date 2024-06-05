FROM node:20.12.2

WORKDIR /usr/src/app

COPY package*.json ./


COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]