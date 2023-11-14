#!/bin/bash
docker compose -f docker-compose.nginx.yml -f docker-compose.certbot.yml up -d --no-deps --build certbot-renewer