# pull official base image
FROM node:alpine as builder
WORKDIR /app
RUN node -v
RUN npm -v
COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build


FROM nginx:stable-alpine
COPY --from=builder /app/build /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]