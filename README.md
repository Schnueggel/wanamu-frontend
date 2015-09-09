# Wanamu

This is my todo app for testing different technology. The purpose for this version was to test docker, and TypeScript.

At the moment I am porting this app to Aurelia, Typescript, React and PostCss also working on native mobile apps

## Design Guide

[./misc/guides/design guide.pdf]
##Prequesite 

### Install tsd for typescript defenitions

[http://definitelytyped.org/tsd/]

npm install tsd -g

 
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
Also the correct WU_* environment variable should be set before building.

## Environment variables

WU_ENV production | development | test

### For Nginx

WU_FRONTEND_CERT= path to cert inside container (see mapped volume /certs)
WU_FRONTEND_KEY=" path to ssl key inside container (see mapped volume /certs)
WU_FRONTEND_NAME= localhost | www.wanamu.com

