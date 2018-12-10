FROM nginx

RUN mkdir -p /etc/nginx/conf.d
COPY ./nginx-angular.conf /etc/nginx/conf.d/nginx-angular.conf
COPY ./dist /usr/share/nginx/html

EXPOSE 80

