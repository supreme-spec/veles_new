#!/bin/bash
set -e

echo "========================================="
echo "Setting up SSL auto-renewal cron job"
echo "========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or use sudo"
  exit 1
fi

MAILCOW_DIR="/opt/mailcow"

# Create log directory
mkdir -p /var/log

# Add cron job for SSL renewal (twice daily)
(crontab -l 2>/dev/null | grep -v "mailcow.*renew-ssl.sh"; echo "0 0,12 * * * ${MAILCOW_DIR}/renew-ssl.sh >> /var/log/mailcow-ssl-renewal.log 2>&1") | crontab -

echo "Cron job added:"
echo "  0 0,12 * * * /opt/mailcow/renew-ssl.sh"
echo ""
echo "Log file: /var/log/mailcow-ssl-renewal.log"
echo ""
echo "To verify:"
echo "  crontab -l"
echo ""
echo "To test renewal manually:"
echo "  bash /opt/mailcow/renew-ssl.sh"
echo ""
