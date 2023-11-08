#!/bin/bash

docker compose up -d
cd "$(dirname "$0")"/forge/app
echo $PWD
npx expo start --clear
# npx expo start