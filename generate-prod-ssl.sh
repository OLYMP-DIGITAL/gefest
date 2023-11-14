#!/bin/bash

# Проверка наличия Certbot
if ! command -v certbot &> /dev/null; then
    echo "Certbot не установлен. Устанавливаю..."
    sudo apt-get update
    sudo apt-get install certbot -y
fi

# Ввод доменного имени
read -p "Введите доменное имя для SSL-сертификата: " domain_name

# Генерация SSL-сертификата
sudo certbot certonly --standalone -d $domain_name

# Печать сообщения об успешной установке
echo "SSL-сертификат для домена $domain_name успешно сгенерирован!"
