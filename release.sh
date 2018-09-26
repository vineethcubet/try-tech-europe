#!/usr/bin/env bash
set -e

git pull -r origin master

npm install
npm run lint
node test/e2e/stubServer.js &
npm run test
npm run build

git push origin master

cp Staticfile dist/
mkdir -p dist/nginx/conf
cp location.conf dist/nginx/conf

cf login -a api.sys.cl-east-dev02.cf.ford.com -u $CI_USERNAME -p $CI_PASSWORD -o Ford_Labs_Sandbox -s TeamEdison
cf push -f manifest.yml

