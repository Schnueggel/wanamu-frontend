#!/usr/bin/env bash

if  [ ! -f /etc/nginx/nginx.conf ]; then
echo "Creating nginx.conf"
: ${WU_ENV?"Needed"}
: ${WU_FRONTEND_NAME?"Needed"}
: ${WU_FRONTEND_KEY?"Needed"}
: ${WU_FRONTEND_CERT?"Needed"}

if [ "$WU_ENV" = "staging" ];
then
read -r -d '' HTTPAUTH  <<- AUTH
    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;
AUTH
else
HTTPAUTH=""
fi

cat <<EOF > /etc/nginx/nginx.conf
worker_processes 1;
daemon off;
events { worker_connections 1024; }

http {

    sendfile on;
    gzip              on;
    gzip_http_version 1.0;
    gzip_proxied      any;
    gzip_min_length   500;
    gzip_types        text/plain text/xml text/css
                      application/javascript
                      image/svg+xml
                      application/json
                      application/x-javascript;
    # Http
    server {
        listen 80;
        return 301 https://\$host\$request_uri;
    }

    # Https
    server {

        index index.html;
        root /usr/share/nginx/html;
	    server_name $WU_FRONTEND_NAME;

        # Running port
        listen 443;
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

