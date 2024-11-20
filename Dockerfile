FROM node:12

WORKDIR /coursenet

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["cmd", "start"]