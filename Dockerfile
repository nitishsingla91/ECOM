FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
EXPOSE 4200
COPY dist/am-cart-frontend .