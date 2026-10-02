# DNS Records for veles-voyage.ru

# Required for Mailcow mail server

## MX Records

# Priority: 10

# Value: mail.veles-voyage.ru

# Add at domain registrar (where you bought veles-voyage.ru)

## SPF Record (TXT)

# Host: @

# Value: v=spf1 ip4:YOUR_VPS_IP include:_spf.google.com ~all

# Note: Replace YOUR_VPS_IP with your actual VPS IP address

## DKIM Record (TXT)

# Host: mailcow._domainkey

# Value: Will be generated after Mailcow setup

# Run: docker-compose exec rspamd opendkim-genkey -b 2048 -d veles-voyage.ru -s mailcow -D /tmp

# Then add the TXT record to DNS

## DMARC Record (TXT)

# Host: _dmarc

# Value: v=DMARC1; p=quarantine; rua=mailto:hello@veles-voyage.ru; ruf=mailto:hello@veles-voyage.ru; pct=100

## Additional Records

# Host: mail

# Type: A

# Value: YOUR_VPS_IP

# Host: webmail

# Type: A

# Value: YOUR_VPS_IP

## Reverse DNS (PTR)

# Set reverse DNS for YOUR_VPS_IP to mail.veles-voyage.ru

# This is set at your VPS provider/hosting control panel

## Notes

# After adding DNS records, verify with:

# dig MX veles-voyage.ru

# dig TXT veles-voyage.ru

# dig TXT _dmarc.veles-voyage.ru
