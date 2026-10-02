#!/bin/bash
set -e

echo "========================================="
echo "Mailcow Full Setup for veles-voyage.ru"
echo "Turnkey installation - just run this"
echo "========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "ERROR: Please run as root or use sudo"
  exit 1
fi

# Configuration
DOMAIN="veles-voyage.ru"
HOSTNAME="mail.${DOMAIN}"
WEBMAIL="webmail.${DOMAIN}"
MAILBOX="hello@${DOMAIN}"
MAILCOW_DIR="/opt/mailcow"
MAILCOW_REPO="https://github.com/mailcow/mailcow-dockerized.git"

# Get VPS IP
VPS_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip || hostname -I | awk '{print $1}')
echo "Detected VPS IP: ${VPS_IP}"
echo ""

# Step 1: Install prerequisites
echo "[1/8] Installing prerequisites..."
apt-get update -qq
apt-get install -y -qq git curl wget nano openssl ufw > /dev/null 2>&1 || apt-get install -y -qq git curl wget nano openssl

# Install Docker
if ! command -v docker &> /dev/null; then
  echo "  Installing Docker..."
  curl -fsSL https://get.docker.com | sh > /dev/null 2>&1
  systemctl enable --now docker
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
  echo "  Installing Docker Compose..."
  curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi

echo "  Prerequisites installed"

# Step 2: Clone Mailcow
echo "[2/8] Cloning Mailcow..."
if [ ! -d "${MAILCOW_DIR}/mailcow-dockerized" ]; then
  mkdir -p ${MAILCOW_DIR}
  cd ${MAILCOW_DIR}
  git clone --depth 1 ${MAILCOW_REPO} > /dev/null 2>&1
fi

cd ${MAILCOW_DIR}/mailcow-dockerized

# Step 3: Generate configuration
echo "[3/8] Generating configuration..."
if [ ! -f ./data/conf/mailcow.conf ]; then
  # Generate passwords
  DB_ROOT_PASS=$(openssl rand -base64 32)
  DB_PASS=$(openssl rand -base64 32)
  REDIS_PASS=$(openssl rand -base64 32)
  
  # Create mailcow.conf
  cat > ./data/conf/mailcow.conf << EOF
# Mailcow Configuration for ${DOMAIN}
# Generated on $(date)

# Database
DBHOST=mysql
DBUSER=mailcow
DBPASS=${DB_PASS}
DBNAME=mailcow
DBROOTPASS=${DB_ROOT_PASS}
REDISPASS=${REDIS_PASS}

# Domain settings
MAILCOW_HOSTNAME=${HOSTNAME}
MAILCOW_DOMAIN=${DOMAIN}

# Webmail
ROUNDCUBE_ALIAS=${WEBMAIL}

# TLS settings
TLS_CERT_PATH=/etc/ssl/mail
TLS_KEY_PATH=/etc/ssl/mail

# Spam settings
SKIP_LETS_ENCRYPT=1
ENABLE_OPENDKIM=1
ENABLE_OPENDMARC=1
ENABLE_POP3=1
ENABLE_IMAP=1
ENABLE_SIEVE=1

# HTTP auth
HTTP_AUTH_BIND=0.0.0.0:8080

# Admin interface
ADMIN_API=true
EOF

  # Save credentials
  cat > ${MAILCOW_DIR}/credentials.txt << EOF
Mailcow Credentials for ${DOMAIN}
=====================================
Database root password: ${DB_ROOT_PASS}
Database password: ${DB_PASS}
Redis password: ${REDIS_PASS}
Mailbox: ${MAILBOX}
=====================================
WARNING: Keep this file secure!
EOF
  chmod 600 ${MAILCOW_DIR}/credentials.txt

  echo "  Configuration created"
else
  echo "  Configuration already exists, skipping..."
fi

# Step 4: Open firewall
echo "[4/8] Configuring firewall..."
ufw --force enable > /dev/null 2>&1 || true
ufw allow 22/tcp > /dev/null 2>&1 || true
ufw allow 25,465,587,993,8080,80,443/tcp > /dev/null 2>&1 || true
echo "  Firewall configured"

# Step 5: Start Mailcow
echo "[5/8] Starting Mailcow..."
docker-compose pull > /dev/null 2>&1
docker-compose up -d

echo "  Waiting for services to start (2 minutes)..."
sleep 120

# Check if MySQL is ready
echo "  Waiting for database..."
for i in {1..60}; do
  if docker-compose exec -T mysql mysqladmin ping -h localhost --silent 2>/dev/null; then
    break
  fi
  sleep 2
done

echo "  Mailcow started"

# Step 6: Create mailbox
echo "[6/8] Creating mailbox..."
DB_PASS=$(grep "^DBPASS=" ./data/conf/mailcow.conf | cut -d= -f2)
DBROOT_PASS=$(grep "^DBROOTPASS=" ./data/conf/mailcow.conf | cut -d= -f2)

# Create domain
docker-compose exec -T mysql mysql -u root -p"${DBROOT_PASS}" mailcow -e "
INSERT IGNORE INTO domain (domain, description, aliases, mailboxes, maxquota, active, backupmx, relay_plain, relay_smtps, relay_smtp, relay_transport, default_quota, default_quota_limit)
VALUES ('${DOMAIN}', 'Veles Voyage', 0, 5, 0, 1, 0, '', '', '', '', 0, 0);
" 2>/dev/null || echo "  Domain may already exist"

# Create mailbox
MAILBOX_PASS=$(openssl rand -base64 12)
docker-compose exec -T mysql mysql -u root -p"${DBROOT_PASS}" mailcow -e "
INSERT INTO mailbox (username, password, name, active, domain)
VALUES ('${MAILBOX}', CONCAT('{SSHA512}', TO_BASE64(SHA2(CONCAT('${MAILBOX_PASS}', 'salt'), 512))), 'Veles Voyage', 1, '${DOMAIN}')
ON DUPLICATE KEY UPDATE active=1;
" 2>/dev/null || echo "  Mailbox may already exist"

# Save mailbox password
echo "  Mailbox password: ${MAILBOX_PASS}" >> ${MAILCOW_DIR}/credentials.txt

echo "  Mailbox created: ${MAILBOX}"

# Step 7: Setup SSL
echo "[7/8] Setting up SSL certificate..."

# Wait for nginx to be ready
sleep 10

# Get Let's Encrypt certificate
docker-compose exec nginx certbot certonly --webroot -w /var/www/certbot \
  -d ${HOSTNAME} \
  -d ${WEBMAIL} \
  --non-interactive \
  --agree-tos \
  --email ${MAILBOX} \
  --expand > /dev/null 2>&1 || {
    echo "  Let's Encrypt failed, using self-signed certificate..."
    mkdir -p ./data/ssl
    openssl req -x509 -newkey rsa:4096 -keyout ./data/ssl/mail.key -out ./data/ssl/mail.crt -days 365 -nodes \
      -subj "/C=RU/ST=Moscow/L=Moscow/O=Veles Voyage/CN=${HOSTNAME}"
  }

# Copy certificates
docker-compose exec nginx cp /etc/letsencrypt/live/${HOSTNAME}/fullchain.pem /etc/ssl/mail/mail.crt 2>/dev/null || true
docker-compose exec nginx cp /etc/letsencrypt/live/${HOSTNAME}/privkey.pem /etc/ssl/mail/mail.key 2>/dev/null || true
docker-compose exec nginx chmod 600 /etc/ssl/mail/mail.key 2>/dev/null || true

# Restart nginx
docker-compose restart nginx > /dev/null 2>&1

echo "  SSL configured"

# Step 8: Setup cron for SSL renewal
echo "[8/8] Setting up auto-renewal..."
(crontab -l 2>/dev/null | grep -v "mailcow.*renew-ssl.sh"; echo "0 0,12 * * * ${MAILCOW_DIR}/renew-ssl.sh >> /var/log/mailcow-ssl-renewal.log 2>&1") | crontab -

echo "  Auto-renewal configured"

echo ""
echo "========================================="
echo "INSTALLATION COMPLETE!"
echo "========================================="
echo ""
echo "Access URLs:"
echo "  Webmail: https://${WEBMAIL}"
echo "  Admin:   https://${HOSTNAME}/admin"
echo "  IMAP:    ${HOSTNAME}:993 (SSL)"
echo "  SMTP:    ${HOSTNAME}:587 (STARTTLS)"
echo ""
echo "Mailbox credentials:"
echo "  Email:   ${MAILBOX}"
echo "  Password: ${MAILBOX_PASS}"
echo ""
echo "Credentials saved to: ${MAILCOW_DIR}/credentials.txt"
echo ""
echo "========================================="
echo "NEXT STEPS:"
echo "========================================="
echo ""
echo "1. DNS Configuration (add in Hostkey panel):"
echo "   MX  @       mail.veles-voyage.ru  Priority: 10"
echo "   A   mail    ${VPS_IP}"
echo "   A   webmail ${VPS_IP}"
echo "   TXT @       v=spf1 ip4:${VPS_IP} ~all"
echo "   TXT _dmarc  v=DMARC1; p=quarantine; rua=mailto:hello@veles-voyage.ru; ruf=mailto:hello@veles-voyage.ru; pct=100"
echo ""
echo "2. Reverse DNS (PTR):"
echo "   Set at Hostkey: ${VPS_IP} -> mail.veles-voyage.ru"
echo ""
echo "3. DKIM Record (get from Mailcow admin):"
echo "   Visit: https://${HOSTNAME}/admin"
echo "   Go to: Configuration → Domains → Edit veles-voyage.ru → DKIM"
echo "   Add TXT record: mailcow._domainkey"
echo ""
echo "4. Update Next.js .env.local:"
echo "   SMTP_HOST=mail.veles-voyage.ru"
echo "   SMTP_PORT=587"
echo "   SMTP_USER=hello@veles-voyage.ru"
echo "   SMTP_PASS=${MAILBOX_PASS}"
echo "   CONTACT_EMAIL=hello@veles-voyage.ru"
echo ""
echo "5. Restart Next.js application"
echo ""
echo "========================================="
echo "Verification commands:"
echo "  dig MX veles-voyage.ru"
echo "  dig TXT veles-voyage.ru"
echo "  dig TXT _dmarc.veles-voyage.ru"
echo "  dig TXT mailcow._domainkey.veles-voyage.ru"
echo "  bash ${MAILCOW_DIR}/health-check.sh"
echo "========================================="
echo ""
