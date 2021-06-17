FROM node:alpine

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD /public ./public
ADD .prettierrc .eslintrc.js babel.config.js .browserslistrc vue.config.js ./

CMD [ "npm","run","serve" ]
