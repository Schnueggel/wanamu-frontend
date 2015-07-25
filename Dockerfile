#@IgnoreInspection BashAddShebang
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
RUN apt-get update
RUN mkdir /certs

COPY dist/app /usr/share/nginx/html

COPY bin/test.crt /
COPY bin/test.key /

COPY dockerstartup.sh /

RUN chmod +x /dockerstartup.sh

CMD /dockerstartup.sh && nginx
