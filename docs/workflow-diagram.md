# Ostrovok API — Workflow Diagram

## Recommended booking flow

```mermaid
sequenceDiagram
    participant User as User
    participant Frontend as Frontend
    participant API as Ostrovok API
    participant Webhook as Webhook

    User->>Frontend: Search by geo/region/hotel IDs
    Frontend->>API: SERP request
    API-->>Frontend: hotels[] + searchHash
    Frontend->>Frontend: Save hotels to DB

    User->>Frontend: Open hotel page
    Frontend->>API: getHotelpage(hid, dates, guests)
    API-->>Frontend: rates[] + bookHash

    User->>Frontend: Click "Book" (prebook)
    Frontend->>API: prebook(bookHash)
    API-->>Frontend: prebookHash

    User->>Frontend: Fill form + submit
    Frontend->>API: createBookingProcess(form)
    API-->>Frontend: formUrl / 3DS URL

    User->>API: Complete form / 3DS
    API->>Webhook: Booking status webhook
    Webhook-->>Frontend: confirmed / failed

    Frontend->>API: Poll checkBookingProcess(partnerOrderId)
    API-->>Frontend: Final status
```

## Timeouts and retries

| Step | Timeout | Retries | Notes |
|------|---------|---------|-------|
| SERP | 30s | 2 | Fallback to local DB |
| Hotelpage | 30s | 2 | No cache (Ostrovok restriction) |
| Prebook | 60s | 2 | Required before form |
| Create booking | 60s | 10 | Retry on timeout/duplicate |
| Polling | 3s interval | 30 attempts | ~90s total |
| 3DS callback | 60s | 1 | Browser redirect |

## Retryable errors

- `timeout`
- `unknown`
- `duplicate_reservation`
- `double_booking_form`

## Non-retryable errors

- Validation errors
- Payment failures
- Missing required fields
