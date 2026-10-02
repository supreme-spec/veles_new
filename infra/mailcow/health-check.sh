#!/bin/bash
set -e

echo "========================================="
echo "Mailcow Health Check"
echo "========================================="
echo ""

VPS_IP=$(curl -s ifconfig.me || hostname -I | awk '{print $1}')
DOMAIN="veles-voyage.ru"

echo "[1/5] Checking Docker..."
if command -v docker &> /dev/null; then
  echo "  Docker: OK"
else
  echo "  Docker: NOT FOUND"
fi

echo ""
echo "[2/5] Checking Mailcow containers..."
cd /opt/mailcow/mailcow-dockerized 2>/dev/null || cd /opt/mailcow 2>/dev/null || {
  echo "  Mailcow directory not found at /opt/mailcow"
  exit 1
}

if [ -f "docker-compose.yml" ]; then
  echo "  docker-compose.yml: found"
  docker-compose ps || true
else
  echo "  docker-compose.yml: NOT FOUND"
fi

echo ""
echo "[3/5] Checking ports..."
for port in 25 465 587 993 8080; do
  (echo > /dev/tcp/127.0.0.1/$port) >/dev/null 2>&1 && echo "  Port $port: OPEN" || echo "  Port $port: CLOSED"
done

echo ""
echo "[4/5] Checking DNS..."
echo "  MX: $(dig +short MX ${DOMAIN})"
echo "  A mail: $(dig +short A mail.${DOMAIN})"
echo "  A webmail: $(dig +short A webmail.${DOMAIN})"
echo "  SPF: $(dig +short TXT ${DOMAIN} | grep spf)"
echo "  DMARC: $(dig +short TXT _dmarc.${DOMAIN})"
echo "  DKIM: $(dig +short TXT mailcow._domainkey.${DOMAIN})"

echo ""
echo "[5/5] Checking firewall..."
if command -v ufw &> /dev/null; then
  ufw status | grep -E "25|465|587|993|8080" || echo "  No mail ports found in UFW"
elif command -v iptables &> /dev/null; then
  iptables -L -n | grep -E "25|465|587|993|8080" || echo "  No mail ports found in iptables"
else
  echo "  No firewall tool found"
fi

echo ""
echo "========================================="
echo "Health check complete"
echo "========================================="
