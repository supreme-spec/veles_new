#!/bin/bash
set -e

echo "========================================="
echo "SMTP Connection Test"
echo "========================================="
echo ""

SMTP_HOST="${1:-mail.veles-voyage.ru}"
SMTP_PORT="${2:-587}"
SMTP_USER="${3:-hello@veles-voyage.ru}"

echo "Testing connection to ${SMTP_HOST}:${SMTP_PORT}..."

# Test TCP connection
if (echo > /dev/tcp/${SMTP_HOST}/${SMTP_PORT}) >/dev/null 2>&1; then
  echo "  TCP connection: OK"
else
  echo "  TCP connection: FAILED"
  echo "  Check firewall and if Mailcow is running"
  exit 1
fi

# Test SMTP handshake
echo ""
echo "Testing SMTP handshake..."
response=$(echo "QUIT" | timeout 5 openssl s_client -connect ${SMTP_HOST}:${SMTP_PORT} -starttls smtp 2>&1 | grep -E "220|250|421" | head -1)

if [ -n "$response" ]; then
  echo "  SMTP response: ${response}"
  echo "  SMTP connection: OK"
else
  echo "  SMTP connection: FAILED"
  echo "  Server may not support STARTTLS on port ${SMTP_PORT}"
fi

echo ""
echo "========================================="
echo "Test complete"
echo "========================================="
