FROM node AS build

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist/www/ /var/www
COPY --from=build /app/dist/nginx/mime.types /etc/nginx/mime.types
COPY --from=build /app/dist/nginx/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]