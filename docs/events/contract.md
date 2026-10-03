# Frontend–Backend Contract (API + Realtime)

## Overview

This document defines the contract between the frontend (React dashboard) and the backend (Node.js + Prisma + WebSocket gateway).

The goal is to ensure:
- Clear separation of concerns
- Predictable data exchange
- Compatibility between REST and WebSocket layers
- Stability for future evolution

---

# Base Configuration

## REST API

Base URL:
```
[http://localhost:3000](http://localhost:3000)

```

## WebSocket

```
ws://localhost:3001

```

---

# Data Models

## User

```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "createdAt": "ISO date"
}
```

---

## Conversation

```json
{
  "id": "uuid",
  "title": "string",
  "createdAt": "ISO date"
}
```

---

## Message

```json
{
  "id": "uuid",
  "conversationId": "uuid",
  "senderId": "uuid",
  "content": "string",
  "createdAt": "ISO date"
}
```
---

## Message Status (Frontend Only)

```ts
type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';
```

Note: Status is managed on the frontend and partially inferred from WebSocket events.

---

# REST API Contract

## Create User

### Request

```
POST /users
```

```json
{
  "username": "string",
  "email": "string"
}
```

### Response

```json
{
  "id": "uuid",
  "username": "string",
  "email": "string"
}
```

---

## Create Conversation

### Request

```
POST /conversations
```

```json
{
  "title": "string"
}
```

### Response

```json
{
  "id": "uuid",
  "title": "string"
}
```

---

## Get Conversation Messages

### Request

```
GET /conversations/:conversationId/messages
```

### Response

```json
[
  {
    "id": "uuid",
    "conversationId": "uuid",
    "senderId": "uuid",
    "content": "string",
    "createdAt": "ISO date"
  }
]
```

---

## Send Message

### Request

```
POST /messages
```

```json
{
  "id": "uuid",
  "conversationId": "uuid",
  "senderId": "uuid",
  "content": "string"
}
```

### Response

```json
{
  "id": "uuid",
  "conversationId": "uuid",
  "senderId": "uuid",
  "content": "string",
  "createdAt": "ISO date"
}
```

---

# WebSocket Contract

## Connection

Client connects to:

```
ws://localhost:3001
```

No authentication layer is currently enforced.

---

## Event Structure

All WebSocket messages follow this envelope:

```json
{
  "type": "EVENT_NAME",
  "payload": {}
}
```

---

## Client → Server Events

### MESSAGE_SENT

Used to notify the server that a message has been sent.

```json
{
  "type": "MESSAGE_SENT",
  "payload": {
    "id": "uuid",
    "conversationId": "uuid",
    "senderId": "uuid",
    "content": "string",
    "createdAt": "ISO date"
  }
}
```

---

## Server → Client Events

### MESSAGE_RECEIVED

Broadcast when a new message is available.

```json
{
  "type": "MESSAGE_RECEIVED",
  "payload": {
    "id": "uuid",
    "conversationId": "uuid",
    "senderId": "uuid",
    "content": "string",
    "createdAt": "ISO date"
  }
}
```

---

### MESSAGE_DELIVERED (Optional future)

```json
{
  "type": "MESSAGE_DELIVERED",
  "payload": {
    "messageId": "uuid"
  }
}
```

---

### MESSAGE_READ (Optional future)

```json
{
  "type": "MESSAGE_READ",
  "payload": {
    "messageId": "uuid"
  }
}
```

---

# Error Handling

## REST Errors

Standard HTTP codes:

| Code | Meaning               |
| ---- | --------------------- |
| 400  | Validation error      |
| 404  | Resource not found    |
| 500  | Internal server error |

Error format:

```json
{
  "error": "string",
  "message": "string"
}
```

---

## WebSocket Errors

Errors should be emitted as:

```json
{
  "type": "ERROR",
  "payload": {
    "message": "string"
  }
}
```

---

# Consistency Rules

## Message Flow

1. Frontend sends message via REST
2. Backend persists message
3. Backend emits WebSocket event
4. All clients update UI

---

## Idempotency

* Message `id` must be generated client-side (UUID)
* Duplicate messages must be ignored by backend

---

## Ordering

* Messages are ordered by `createdAt`
* Frontend should handle minor inconsistencies due to network latency

---

# Retry Strategy

## REST

Frontend should retry failed requests:

* max retries: 3
* exponential backoff

---

## WebSocket

* auto reconnect on disconnect
* resend pending messages if needed

---

# Versioning

Future-proofing:

* Prefix routes if needed: `/v1/...`
* Add fields without breaking existing clients
* Avoid removing fields

---

# Security (Future)

Not implemented yet, but recommended:

* JWT Authentication
* WebSocket authentication handshake
* Rate limiting

---

# Summary

This contract ensures:

* Stable integration between frontend and backend
* Clear separation of responsibilities
* Support for realtime messaging
* Extensibility for future features

The frontend must rely strictly on this contract to avoid coupling with backend implementation details.
