FROM node:14

WORKDIR /usr/app

COPY package*.json ./

RUN npm i -g npm@7.5.2
RUN npm i -g pm2@4.5.4
RUN npm ci

COPY . .

EXPOSE 5000

CMD ["./run.sh"]