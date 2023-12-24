FROM node:20-alpine3.18 as builder

COPY . .
RUN yarn install --pure-lockfile --non-interactive
RUN yarn build

FROM nginx:1.25-alpine3.18 as releaser
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /dist-prod /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
