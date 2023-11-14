#!/bin/bash

# Подгружаем переменные окружения из файла .env
if [[ -f .env ]]; then
    cat .env                                                                    
    # export $(grep -v '^#' .env | xargs)                                       
    source .env || export $(cat .env | grep -v '^#' | xargs) 
else
    echo "Файл .env не найден."
    exit 1
fi

# Проверяем установлен ли Certbot
if ! command -v certbot &> /dev/null; then
    echo "Certbot не установлен. Установите Certbot и попробуйте снова."
    exit 1
fi

echo "Поиск сертификатов для $DOMAIN"

# Проверяем наличие сертификата для указанного домена
if sudo certbot certificates | grep -q $DOMAIN; then
    echo "Сертификат для домена $DOMAIN существует."
    docker compose -f docker-compose.yml -f docker-compose.web.yml -f docker-compose.nginx.yml up -d --no-deps --build
else
    echo "Сертификат для домена $DOMAIN не найден."
fi
