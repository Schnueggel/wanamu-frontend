# Wanamu

## Design Guide

[./misc/guides/design guide.pdf]
##Prequesite 

### Install tsd for typescript defenitions

[http://definitelytyped.org/tsd/]

npm install tsd -g

### Install gulp

npm install gulp -g

### Install npm check updates

https://github.com/tjunnone/npm-check-updates

npm install -g npm-check-updates
 
## Install

Use `npm start` to start the server.

Use `gulp build-serve` to start development server.

Use `gulp build` to build only.

Use `gulp test` to start tests.

## Tools

npm-check-updates

gulp

typescript

tsd

docker

webpack

docker

docker-compose

dockerpush

Rx

## Notice 

### Angular Material
After Update angular-material copy template css in angular-material.js (At the bottom stored in a constant "angular.module("material.core").constant("$MD_THEME_CSS",..."
to app/modules/datetimepicker/WU_THEME_CSS.txt.

## Docker

Run docker-compose to create a docker container running this app behind a nginx server.
Before run gulp build should run. Also the correct WU_ENV environment variable should be set before building.


## Environment variables

WU_ENV production | development | test

### For Nginx

WU_FRONTEND_CERT= path to cert inside container (see mapped volume /certs)
WU_FRONTEND_KEY=" path to ssl key inside container (see mapped volume /certs)
WU_FRONTEND_NAME= localhost | www.wanamu.com

