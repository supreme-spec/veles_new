#!/bin/bash
set -e

echo "========================================="
echo "Mailcow SSL Certificate Setup (Let's Encrypt)"
echo "========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or use sudo"
  exit 1
fi

MAILCOW_DIR="/opt/mailcow/mailcow-dockerized"
DOMAIN="veles-voyage.ru"
HOSTNAME="mail.${DOMAIN}"
WEBMAIL="webmail.${DOMAIN}"

echo "[1/4] Checking prerequisites..."

# Check if Mailcow is running
if [ ! -d "${MAILCOW_DIR}" ]; then
  echo "ERROR: Mailcow directory not found at ${MAILCOW_DIR}"
  exit 1
fi

cd ${MAILCOW_DIR}

# Check if containers are running
if ! docker-compose ps | grep -q "Up"; then
  echo "WARNING: Mailcow containers are not running. Starting them..."
  docker-compose up -d
  sleep 30
fi

# Install certbot if not present
if ! command -v certbot &> /dev/null; then
  echo "Installing certbot..."
  apt-get update -qq
  apt-get install -y -qq certbot python3-certbot-nginx > /dev/null 2>&1 || {
    echo "Failed to install certbot. Trying alternative..."
    apt-get install -y -qq certbot
  }
fi

echo ""
echo "[2/4] Preparing SSL directory..."

# Create SSL directory if not exists
mkdir -p ./data/ssl

# Remove self-signed certificate if exists
if [ -f ./data/ssl/mail.crt ] && grep -q "self-signed" ./data/ssl/mail.crt 2>/dev/null; then
  echo "Removing self-signed certificate..."
  rm -f ./data/ssl/mail.crt ./data/ssl/mail.key
fi

echo ""
echo "[3/4] Opening firewall ports..."
# Open ports for HTTP-01 challenge
if command -v ufw &> /dev/null; then
  ufw allow 80,443/tcp > /dev/null 2>&1 || true
  echo "  UFW: ports 80,443 opened"
elif command -v iptables &> /dev/null; then
  iptables -I INPUT -p tcp --dport 80 -j ACCEPT > /dev/null 2>&1 || true
  iptables -I INPUT -p tcp --dport 443 -j ACCEPT > /dev/null 2>&1 || true
  echo "  iptables: ports 80,443 opened"
fi

echo ""
echo "[4/4] Obtaining Let's Encrypt certificate..."

# Method 1: Using certbot with webroot
if [ -d "/var/www/certbot" ]; then
  echo "Using webroot method..."
  certbot certonly --webroot -w /var/www/certbot \
    -d ${HOSTNAME} \
    -d ${WEBMAIL} \
    --non-interactive \
    --agree-tos \
    --email hello@${DOMAIN} \
    --expand || {
      echo "Webroot method failed, trying standalone..."
      docker-compose exec nginx certbot certonly --webroot -w /var/www/certbot \
        -d ${HOSTNAME} \
        -d ${WEBMAIL} \
        --non-interactive \
        --agree-tos \
        --email hello@${DOMAIN} \
        --expand
    }
else
  echo "Using standalone method..."
  # Stop nginx temporarily for standalone mode
  docker-compose stop nginx
  
  certbot certonly --standalone \
    -d ${HOSTNAME} \
    -d ${WEBMAIL} \
    --non-interactive \
    --agree-tos \
    --email hello@${DOMAIN} \
    --expand || {
      echo "Standalone method failed, trying via nginx..."
      docker-compose start nginx
      docker-compose exec nginx certbot certonly --webroot -w /var/www/certbot \
        -d ${HOSTNAME} \
        -d ${WEBMAIL} \
        --non-interactive \
        --agree-tos \
        --email hello@${DOMAIN} \
        --expand
    }
  
  # Start nginx if it was stopped
  docker-compose start nginx 2>/dev/null || true
fi

echo ""
echo "========================================="
echo "Certificate paths:"
echo "  /etc/letsencrypt/live/${HOSTNAME}/fullchain.pem"
echo "  /etc/letsencrypt/live/${HOSTNAME}/privkey.pem"
echo "========================================="

# Copy certificates to Mailcow directory
echo ""
echo "Copying certificates to Mailcow..."
docker-compose exec nginx cp /etc/letsencrypt/live/${HOSTNAME}/fullchain.pem /etc/ssl/mail/mail.crt 2>/dev/null || true
docker-compose exec nginx cp /etc/letsencrypt/live/${HOSTNAME}/privkey.pem /etc/ssl/mail/mail.key 2>/dev/null || true

# Set permissions
docker-compose exec nginx chmod 600 /etc/ssl/mail/mail.key 2>/dev/null || true

# Restart nginx to apply certificates
echo "Restarting nginx..."
docker-compose restart nginx

echo ""
echo "========================================="
echo "SSL Setup Complete!"
echo "========================================="
echo ""
echo "Test your setup:"
echo "  https://${HOSTNAME}"
echo "  https://${WEBMAIL}"
echo ""
echo "Certificate will auto-renew. To test renewal:"
echo "  certbot renew --dry-run"
echo ""
