#!/bin/ash
echo "Backup script is started"

# /home/az/backups
FILENAME=$(date +%Y-%m-%d-%H-%M-%S).enc

# DB vars
DB=$BACKUP_DB
DB_USER=$BACKUP_DB_USER
DB_HOST=$BACKUP_DB_HOST
DB_PASSWORD=$BACKUP_DB_PASSWORD

# Remote vars
REMOTE_HOST=$BACKUP_HOST
REMOTE_USER=$BACKUP_USER
REMOTE_PATH=$BACKUP_PATH
REMOTE_PASSWORD=$BACKUP_PASSWORD

echo "Crating mysql dump" >> /app/logs

mysqldump --host=$DB_HOST --user=$DB_USER --password=$DB_PASSWORD $DB | openssl enc -aes-256-cbc -iter 10000 -out /app/$FILENAME -pass pass:$BACKUP_KEY

echo "Crated backup file: $FILENAME" >> /app/logs

sshpass -p $REMOTE_PASSWORD scp /app/$FILENAME $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo "File is transported to remote host: $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH" >> /app/logs

rm /app/$FILENAME
echo "Backup file $FILENAME removed" >> /app/logs

# ===================
# Decode
# openssl enc -d -aes-256-cbc -iter 10000 -in /app/$FILENAME -out /путь/к/расшифрованному/файлу -pass pass:$BACKUP_KEY
# Add to beginning of decrypted file to restore DB:
# CREATE DATABASE IF NOT EXISTS gefest ;
# USE gefest;
# mysql -uroot -ppassword gefest --force < backup.decrypted.bac
