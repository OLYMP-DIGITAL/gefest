#!/bin/ash

echo "Executing script..."
crontab /app/cronjobs

crond -f

tail -f /dev/null
# sleep infinity