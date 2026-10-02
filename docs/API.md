# 📡 API Documentation

Документация API endpoints проекта Велес Вояж.

## 🔐 Аутентификация

Большинство API endpoints не требуют аутентификации. Некоторые защищены через:
- Query параметр `key` с секретом из переменных окружения
- Rate limiting по IP адресу

## 📊 Rate Limiting

Все API endpoints имеют rate limiting:
- **Indexing API**: 10 запросов в час
- **Search API**: 30 запросов в минуту
- **Suggestions API**: 60 запросов в минуту
- **Web Vitals API**: 100 запросов в минуту
- **Photo APIs**: 100 запросов в минуту

При превышении лимита возвращается статус `429 Too Many Requests` с заголовками:
- `X-RateLimit-Limit`: Максимальное количество запросов
- `X-RateLimit-Remaining`: Оставшееся количество запросов
- `X-RateLimit-Reset`: Время сброса лимита (Unix timestamp)
- `Retry-After`: Время ожидания в секундах

## 📍 Endpoints

### 1. Indexing API

**URL:** `/api/indexing`  
**Method:** `GET`  
**Описание:** Триггер индексации сайта в поисковых системах (IndexNow, Google, Yandex, Bing)

**Query Parameters:**
- `key` (required): Секретный ключ из переменных окружения

**Rate Limit:** 10 запросов в час

**Response:**
```json
{
  "success": true,
  "message": "Indexing triggered successfully",
  "details": {
    "indexNow": { ... },
    "pings": { ... }
  }
}
```

**Error Response:**
```json
{
  "error": "Unauthorized"
}
```
Статус: `401`

---

### 2. Wiki Search API

**URL:** `/api/wiki/search`  
**Method:** `GET`  
**Описание:** Поиск по энциклопедии стран

**Query Parameters:**
- `q` (required): Поисковый запрос
- `limit` (optional): Максимальное количество результатов (по умолчанию 20)
- `type` (optional): Тип поиска (`country`, `city`, `all`)

**Rate Limit:** 30 запросов в минуту

**Response:**
```json
{
  "results": [
    {
      "id": "spain",
      "title": "Испания",
      "type": "country",
      "relevance": 0.95
    }
  ],
  "total": 1,
  "query": "испания"
}
```

---

### 3. Suggestions API

**URL:** `/api/suggestions`  
**Method:** `GET`  
**Описание:** Автодополнение для поиска (страны и города)

**Query Parameters:**
- `q` (required): Часть названия для поиска

**Rate Limit:** 60 запросов в минуту

**Response:**
```json
[
  "испания",
  ["Испания", "Испания-Сити", "Испанский"]
]
```

---

### 4. Web Vitals API

**URL:** `/api/web-vitals`  
**Method:** `POST`  
**Описание:** Отправка метрик Core Web Vitals с клиента

**Request Body:**
```json
{
  "name": "CLS",
  "value": 0.1,
  "id": "v3-1234567890",
  "page": "/wiki/spain",
  "timestamp": 1234567890
}
```

**Rate Limit:** 100 запросов в минуту

**Response:**
```json
{
  "success": true
}
```

---

### 5. Cruise Photo API

**URL:** `/api/cruise-photo`  
**Method:** `GET`  
**Описание:** Получение случайной фотографии круиза

**Query Parameters:**
- `type` (optional): Тип круиза (`mediterranean`, `caribbean`, `scandinavian`, `asian`, `alaska`, `world`)

**Rate Limit:** 100 запросов в минуту

**Response:**
```json
{
  "success": true,
  "source": "unsplash",
  "photo": {
    "url": "https://...",
    "description": "Роскошный круизный лайнер",
    "photographer": "John Doe",
    "location": "Средиземное море"
  }
}
```

---

### 6. Tour Photos API

**URL:** `/api/tour-photos`  
**Method:** `GET`  
**Описание:** Получение фотографий туров (обновляется раз в 2 недели)

**Query Parameters:**
- `type` (optional): Тип тура (`europe`, `asia`, `africa`, `america`, `cruise`, `extreme`)

**Rate Limit:** 100 запросов в минуту

**Response:**
```json
{
  "success": true,
  "source": "unsplash",
  "tourType": "europe",
  "photo": {
    "url": "https://...",
    "description": "Европейские туры",
    "photographer": "Jane Doe",
    "location": "Париж",
    "week": 5,
    "year": 2026
  }
}
```

---

### 7. Weekly Photo API

**URL:** `/api/weekly-photo`  
**Method:** `GET`  
**Описание:** Получение еженедельной фотографии (обновляется каждую неделю)

**Rate Limit:** 100 запросов в минуту

**Response:**
```json
{
  "success": true,
  "source": "unsplash",
  "photo": {
    "url": "https://...",
    "description": "Путешествие",
    "photographer": "John Doe",
    "location": "Неизвестное место",
    "week": 5,
    "year": 2026
  }
}
```

---

### 8. Site Info API

**URL:** `/api/site-info`  
**Method:** `GET`  
**Описание:** Получение информации о сайте

**Response:**
```json
{
  "name": "Велес Вояж",
  "version": "1.0.0",
  "description": "Энциклопедия путешествий",
  "stats": {
    "countries": 195,
    "articles": 150
  }
}
```

---

### 9. Wiki Page API

**URL:** `/api/wiki/page`  
**Method:** `GET` | `POST`  
**Описание:** Получение данных страницы википедии

**GET Query Parameters:**
- `id` (required): ID страницы

**POST Request Body:**
```json
{
  "id": "spain"
}
```

**Response:**
```json
{
  "id": "spain",
  "title": "Испания",
  "content": "...",
  "metadata": { ... }
}
```

---

### 10. Wiki RSS API

**URL:** `/api/wiki/rss`  
**Method:** `GET`  
**Описание:** RSS лента обновлений википедии

**Response:** XML формат RSS 2.0

---

## 🔒 Безопасность

1. **Rate Limiting**: Все endpoints защищены rate limiting
2. **Input Validation**: Все входные данные валидируются
3. **Error Handling**: Ошибки не раскрывают внутреннюю структуру
4. **CORS**: Настроен для разрешенных доменов

## 📝 Примеры использования

### JavaScript/TypeScript

```typescript
// Поиск по википедии
const response = await fetch('/api/wiki/search?q=испания&limit=10');
const data = await response.json();

// Получение suggestions
const suggestions = await fetch('/api/suggestions?q=исп');
const [query, results] = await suggestions.json();

// Отправка Web Vitals
await fetch('/api/web-vitals', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'CLS',
    value: 0.1,
    id: 'v3-123',
    page: '/wiki/spain',
    timestamp: Date.now()
  })
});
```

### cURL

```bash
# Поиск
curl "https://veles-voyage.ru/api/wiki/search?q=испания"

# Suggestions
curl "https://veles-voyage.ru/api/suggestions?q=исп"

# Индексация (требует ключ)
curl "https://veles-voyage.ru/api/indexing?key=YOUR_SECRET_KEY"
```

## 🐛 Обработка ошибок

Все ошибки возвращаются в формате:
```json
{
  "error": "Error Type",
  "message": "Human-readable error message"
}
```

Коды статусов:
- `200`: Успешный запрос
- `400`: Неверный запрос
- `401`: Не авторизован
- `429`: Превышен rate limit
- `500`: Внутренняя ошибка сервера

## 📚 Дополнительные ресурсы

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Rate Limiting Best Practices](https://www.cloudflare.com/learning/bots/what-is-rate-limiting/)

