#!/bin/bash

# ########################################
#  Скрипт для запуска рабочего окружения #
# ########################################

docker compose up web api adpiDB -d
cd "$(dirname "$0")"/forge/app
echo $PWD
npx expo start --clear
# npx expo start