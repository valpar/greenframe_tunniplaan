FROM node:16 as base

WORKDIR /api

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

#RUN apk add --no-cache make gcc g++ python && \
#  npm install && \
#  npm rebuild bcrypt --build-from-source && \
#  apk del make gcc g++ python

#RUN npm uninstall bcrypt
#RUN npm install bcrypt