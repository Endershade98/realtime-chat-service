# Realtime Events Specification

## Overview

Questo documento definisce il **contratto degli eventi realtime** utilizzati nel sistema di chat.

Gli eventi vengono trasmessi tramite **WebSocket** tra:

* Client (React)
* WebSocket Gateway (Node.js)
* Backend Services
* Redis Pub/Sub

Gli eventi rappresentano **azioni di dominio** che avvengono nella chat (invio messaggi, lettura messaggi, presenza utente, ecc.).

Questo documento funge da **event contract** tra frontend e backend.

---

# Event Envelope

Tutti gli eventi devono rispettare una struttura standard.

```json
{
  "event": "EVENT_NAME",
  "version": 1,
  "timestamp": "ISO_8601_DATE",
  "data": {}
}
```

## Campi

| Campo     | Tipo   | Descrizione                   |
| --------- | ------ | ----------------------------- |
| event     | string | Nome dell'evento              |
| version   | number | Versione dello schema         |
| timestamp | string | Timestamp ISO 8601            |
| data      | object | Payload specifico dell'evento |

---

# Event List

Il sistema supporta attualmente i seguenti eventi realtime:

| Event             | Descrizione                          |
| ----------------- | ------------------------------------ |
| MESSAGE_SENT      | Un utente invia un messaggio         |
| MESSAGE_DELIVERED | Messaggio consegnato al destinatario |
| MESSAGE_READ      | Messaggio letto                      |
| USER_TYPING       | Utente sta scrivendo                 |
| USER_CONNECTED    | Utente connesso/disconnesso          |

---

# MESSAGE_SENT

Evento emesso quando un utente invia un messaggio.

## JSON Schema

```json
{
  "event": "MESSAGE_SENT",
  "version": 1,
  "timestamp": "2026-03-08T15:12:00Z",
  "data": {
    "messageId": "uuid",
    "chatId": "uuid",
    "senderId": "uuid",
    "content": "Hello world",
    "type": "text",
    "createdAt": "2026-03-08T15:12:00Z"
  }
}
```

## Data Fields

| Campo     | Tipo   | Descrizione         |
| --------- | ------ | ------------------- |
| messageId | string | ID del messaggio    |
| chatId    | string | ID della chat       |
| senderId  | string | ID utente mittente  |
| content   | string | Contenuto messaggio |
| type      | string | Tipo messaggio      |
| createdAt | string | Data creazione      |

## Message Types

```
text
image
file
system
```

---

# MESSAGE_DELIVERED

Evento emesso quando il messaggio è stato consegnato al destinatario.

## JSON Schema

```json
{
  "event": "MESSAGE_DELIVERED",
  "version": 1,
  "timestamp": "2026-03-08T15:12:05Z",
  "data": {
    "messageId": "uuid",
    "chatId": "uuid",
    "deliveredTo": "uuid",
    "deliveredAt": "2026-03-08T15:12:05Z"
  }
}
```

## Data Fields

| Campo       | Tipo   | Descrizione         |
| ----------- | ------ | ------------------- |
| messageId   | string | ID messaggio        |
| chatId      | string | ID chat             |
| deliveredTo | string | Utente destinatario |
| deliveredAt | string | Timestamp consegna  |

---

# MESSAGE_READ

Evento emesso quando un utente legge un messaggio.

## JSON Schema

```json
{
  "event": "MESSAGE_READ",
  "version": 1,
  "timestamp": "2026-03-08T15:12:10Z",
  "data": {
    "messageId": "uuid",
    "chatId": "uuid",
    "readBy": "uuid",
    "readAt": "2026-03-08T15:12:10Z"
  }
}
```

## Data Fields

| Campo     | Tipo   | Descrizione         |
| --------- | ------ | ------------------- |
| messageId | string | ID messaggio        |
| chatId    | string | ID chat             |
| readBy    | string | Utente che ha letto |
| readAt    | string | Timestamp lettura   |

---

# USER_TYPING

Evento effimero che indica che un utente sta scrivendo.

⚠️ Questo evento **non deve essere persistito nel database**.

## JSON Schema

```json
{
  "event": "USER_TYPING",
  "version": 1,
  "timestamp": "2026-03-08T15:12:20Z",
  "data": {
    "chatId": "uuid",
    "userId": "uuid",
    "isTyping": true
  }
}
```

## Data Fields

| Campo    | Tipo    | Descrizione       |
| -------- | ------- | ----------------- |
| chatId   | string  | Chat attiva       |
| userId   | string  | Utente che scrive |
| isTyping | boolean | Stato typing      |

---

# USER_CONNECTED

Evento di presenza utente.

## JSON Schema

```json
{
  "event": "USER_CONNECTED",
  "version": 1,
  "timestamp": "2026-03-08T15:10:00Z",
  "data": {
    "userId": "uuid",
    "status": "online"
  }
}
```

## Status disponibili

```
online
offline
away
```

---

# Naming Convention

Gli eventi devono essere nominati usando:

```
UPPER_SNAKE_CASE
```

Esempio:

```
MESSAGE_SENT
MESSAGE_DELIVERED
MESSAGE_READ
USER_TYPING
USER_CONNECTED
```

---

# Event Versioning

Gli eventi supportano il versioning tramite il campo:

```
version
```

Questo consente:

* backward compatibility
* evoluzione degli eventi
* supporto client legacy

---

# Testing Strategy

Gli eventi devono essere validati tramite:

## Unit Testing

Verificare:

* validità schema JSON
* campi obbligatori
* tipi corretti

Strumenti consigliati:

* Jest
* Zod / JSON Schema Validator

## Integration Testing

Verificare:

* emissione eventi via WebSocket
* ricezione eventi client
* compatibilità payload

---

# Future Events (Roadmap)

Eventi che potranno essere aggiunti successivamente:

```
MESSAGE_EDITED
MESSAGE_DELETED
USER_DISCONNECTED
CHAT_CREATED
CHAT_JOINED
```

---

# Notes

Questa specifica rappresenta il **contratto ufficiale degli eventi realtime** del sistema di chat.

Qualsiasi modifica agli eventi deve essere:

1. Versionata
2. Documentata
3. Retrocompatibile ove possibile.
