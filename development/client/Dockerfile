FROM node:16.17.1-alpine3.16 as build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci

RUN npm run build


FROM nginx:1.21.0-alpine as production

ENV NODE_ENV production

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]