FROM node:alpine

RUN npm install -g nodemon

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install
RUN npm install jest
RUN npm install supertest

ADD bin ./bin
ADD src ./src
ADD test ./test

CMD [  "npm", "start"  ]
