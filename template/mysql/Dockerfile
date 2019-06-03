FROM mysql:5.7

ENV MYSQL_DATABASE wordpress
ENV MYSQL_ROOT_PASSWORD somewordpress
ENV MYSQL_USER wordpress
ENV MYSQL_PASSWORD wordpress

COPY ./scripts ./docker-entrypoint-initdb.d
