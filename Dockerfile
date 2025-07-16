# build environment
FROM node:20 as vite-build
WORKDIR /app
COPY . ./
RUN npm install --force
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=vite-build /app/dist /usr/share/nginx/html

ENV PORT 8080
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

