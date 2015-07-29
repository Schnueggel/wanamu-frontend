#@IgnoreInspection BashAddShebang
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf && apt-get update && mkdir /certs

COPY dist/app /usr/share/nginx/html
COPY bin/test.crt /
COPY bin/test.key /
COPY bin/.htpasswd /etc/nginx/

COPY dockerstartup.sh /

RUN chmod +x /dockerstartup.sh && chmod -R o+r /usr/share/nginx/html

CMD /dockerstartup.sh && nginx
