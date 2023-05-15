FROM node:16 as base

WORKDIR /api

COPY package*.json ./

RUN npm i

RUN npm uninstall bcrypt

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm i bcrypt

RUN npm run build
