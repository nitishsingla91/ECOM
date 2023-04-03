FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
EXPOSE 8080
COPY dist/am-cart-frontend .