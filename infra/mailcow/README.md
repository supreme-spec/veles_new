# Mailcow Setup for veles-voyage.ru

## Quick Start (Под ключ)

На VPS выполните одну команду:

```bash
scp -r /root/www/veles-voyage/infra/mailcow root@YOUR_VPS_IP:/opt/
ssh root@YOUR_VPS_IP "cd /opt/mailcow && bash setup.sh"
```

Скрипт сам установит:
- Docker и Docker Compose
- Mailcow (Postfix + Dovecot + Rspamd + Roundcube)
- SSL сертификат Let's Encrypt
- Ящик `hello@veles-voyage.ru`
- Автообновление SSL

## DNS Configuration (Hostkey)

После установки добавьте в панели Hostkey:

| Тип | Имя | Значение | Приоритет |
|-----|-----|----------|-----------|
| MX | @ | mail.veles-voyage.ru | 10 |
| A | mail | [IP_VPS] | - |
| A | webmail | [IP_VPS] | - |
| TXT | @ | v=spf1 ip4:[IP_VPS] ~all | - |
| TXT | _dmarc | v=DMARC1; p=quarantine; rua=mailto:hello@veles-voyage.ru; ruf=mailto:hello@veles-voyage.ru; pct=100 | - |
| TXT | mailcow._domainkey | v=DKIM1; k=rsa; p=[ключ из админки] | - |

Также установите обратный DNS (PTR):
```
[IP_VPS] -> mail.veles-voyage.ru
```

## After DNS Setup

1. Получите DKIM ключ:
```bash
# Откройте админку Mailcow
https://mail.veles-voyage.ru/admin
# Configuration → Domains → Edit veles-voyage.ru → DKIM
```

2. Обновите `.env.local` на VPS:
```env
SMTP_HOST=mail.veles-voyage.ru
SMTP_PORT=587
SMTP_USER=hello@veles-voyage.ru
SMTP_PASS=[пароль из credentials.txt]
CONTACT_EMAIL=hello@veles-voyage.ru
```

3. Перезапустите Next.js

## Verification

```bash
# Check DNS
dig MX veles-voyage.ru
dig TXT veles-voyage.ru
dig TXT _dmarc.veles-voyage.ru
dig TXT mailcow._domainkey.veles-voyage.ru

# Check Mailcow
bash /opt/mailcow/health-check.sh

# Test SMTP
bash /opt/mailcow/test-smtp.sh
```

## Access

- Webmail: https://webmail.veles-voyage.ru
- Admin: https://mail.veles-voyage.ru/admin
- Email: hello@veles-voyage.ru
- Password: в файле `/opt/mailcow/credentials.txt`

## Maintenance

```bash
# Update Mailcow
cd /opt/mailcow/mailcow-dockerized
git pull
docker-compose pull
docker-compose up -d

# View logs
docker-compose logs -f

# Backup
tar -czf /opt/mailcow-backup.tar.gz /opt/mailcow/mailcow-dockerized/data
```
