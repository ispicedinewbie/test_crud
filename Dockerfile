FROM node:12-alpine
WORKDIR /home/node/app
COPY package*.json .
RUN npm install
RUN npm install pm2 -g
COPY . .
CMD ["pm2-runtime", "pm2.json", "--env", "production"]