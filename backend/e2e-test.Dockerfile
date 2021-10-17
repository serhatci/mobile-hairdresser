FROM node:16.3.0-alpine3.11

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD bin ./bin
ADD src ./src
ADD test ./test

CMD [  "npm", "start"  ]
