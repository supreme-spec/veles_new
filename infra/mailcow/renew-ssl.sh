#!/bin/bash
set -e

echo "========================================="
echo "Mailcow SSL Certificate Auto-Renewal"
echo "========================================="
echo ""

MAILCOW_DIR="/opt/mailcow/mailcow-dockerized"
HOSTNAME="mail.veles-voyage.ru"

cd ${MAILCOW_DIR}

# Renew certificates
echo "Renewing certificates..."
certbot renew --quiet --no-self-upgrade

# Copy renewed certificates to Mailcow
echo "Copying certificates to Mailcow..."
docker-compose exec nginx cp /etc/letsencrypt/live/${HOSTNAME}/fullchain.pem /etc/ssl/mail/mail.crt 2>/dev/null || true
docker-compose exec nginx cp /etc/letsencrypt/live/${HOSTNAME}/privkey.pem /etc/ssl/mail/mail.key 2>/dev/null || true

# Set permissions
docker-compose exec nginx chmod 600 /etc/ssl/mail/mail.key 2>/dev/null || true

# Restart nginx
echo "Restarting nginx..."
docker-compose restart nginx

echo ""
echo "Renewal complete!"
echo ""
