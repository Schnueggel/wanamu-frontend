#!/usr/bin/env bash

if  [ ! -f /etc/nginx/nginx.conf ]; then
echo "Creating nginx.conf"
: ${WU_ENV?"Needed"}
: ${WU_FRONTEND_NAME?"Needed"}
: ${WU_FRONTEND_KEY?"Needed"}
: ${WU_FRONTEND_CERT?"Needed"}

if [ "$WU_ENV" = "production" ];
then
read -r -d '' HTTPAUTH  <<- AUTH
    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;
AUTH
else
HTTPAUTH=""
fi

# https://github.com/h5bp/server-configs-nginx/blob/master/nginx.conf

cat <<EOF > /etc/nginx/nginx.conf
worker_processes 2;
daemon off;
worker_rlimit_nofile 8192;
events { worker_connections 8000; }

http {
    include mime.types;
    server_tokens off;
    charset_types text/xml text/plain text/vnd.wap.wml application/x-javascript application/rss+xml text/css application/javascript application/json;
    sendfile on;
    default_type  application/octet-stream;
    tcp_nopush      on;
    keepalive_timeout 20;

    gzip              on;
    gzip_vary         on;
    gzip_comp_level   5;
    gzip_proxied      any;
    gzip_min_length   500;
    gzip_types
        application/atom+xml
        application/javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rdf+xml
        application/rss+xml
        application/schema+json
        application/vnd.geo+json
        application/vnd.ms-fontobject
        application/x-font-ttf
        application/x-javascript
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/eot
        font/opentype
        image/bmp
        image/svg+xml
        image/vnd.microsoft.icon
        image/x-icon
        text/cache-manifest
        text/css
        text/javascript
        text/plain
        text/vcard
        text/vnd.rim.location.xloc
        text/vtt
        text/x-component
        text/x-cross-domain-policy
        text/xml;
    # Http
    server {
        listen [::]:80;
        listen 80;
        return 301 https://\$host\$request_uri;
    }

    # Https
    server {

        index index.html;
        root /usr/share/nginx/html;
	    server_name $WU_FRONTEND_NAME;

        # Running port
        listen [::]:443 ssl;
        listen 443 ssl;

        ssl_certificate           $WU_FRONTEND_CERT;
        ssl_certificate_key       $WU_FRONTEND_KEY;
        ssl on;
        ssl_session_cache  builtin:1000  shared:SSL:10m;
        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
        ssl_prefer_server_ciphers on;

        # Proxying the connections connections
        location / {
            $HTTPAUTH
            try_files \$uri \$uri/ /index.html;
        }
    }
}
EOF

echo "Done"
fi

