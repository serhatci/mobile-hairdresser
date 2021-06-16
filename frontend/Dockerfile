FROM node:alpine

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD /public ./public
ADD .eslintrc.js babel.config.js .browserslistrc ./

CMD [ "npm","run","serve" ]
