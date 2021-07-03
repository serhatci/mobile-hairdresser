FROM node:alpine AS BUILDER

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD /src ./src
ADD /public ./public
ADD .prettierrc .eslintrc.js babel.config.js .browserslistrc vue.config.js .env.production ./

RUN npm run build

FROM node:alpine

WORKDIR /app

RUN npm i -g serve

COPY --from=BUILDER /app/dist ./

CMD serve -s -l $PORT
