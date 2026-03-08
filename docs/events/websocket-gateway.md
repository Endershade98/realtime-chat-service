# WebSocket Gateway Architecture

## Overview

Il **WebSocket Gateway** è il componente responsabile della gestione delle connessioni realtime tra i client e il backend della chat.

Gestisce:

* connessioni WebSocket
* autenticazione delle connessioni
* routing degli eventi realtime
* gestione delle chat rooms
* comunicazione con Redis Pub/Sub
* dispatch degli eventi verso i client

Questo layer appartiene al **Presentation Layer** della Clean Architecture.

---

# High Level Architecture

```
Client (React)
    │
    │ WebSocket
    ▼
WebSocket Gateway
    │
    │ Application Services
    ▼
Domain Layer
    │
    │
    ▼
Infrastructure
    │
    ├── Redis Pub/Sub
    └── Database
```

---

# Realtime Event Flow

## Send Message Flow

```
Client A
   │
   │ MESSAGE_SENT
   ▼
WebSocket Gateway
   │
   ▼
Application Service
   │
   ▼
Message Repository
   │
   ▼
Database

   │
   ▼
Redis Pub/Sub
   │
   ▼
WebSocket Gateway
   │
   ▼
Client B
```

---

# WebSocket Responsibilities

Il WebSocket Gateway ha le seguenti responsabilità:

| Responsibility        | Description                      |
| --------------------- | -------------------------------- |
| Connection Management | gestione connessioni utenti      |
| Authentication        | autenticazione token             |
| Room Management       | gestione chat rooms              |
| Event Routing         | routing eventi realtime          |
| Redis Integration     | distribuzione eventi tra istanze |
| Presence              | gestione utenti online           |

---

# Connection Lifecycle

## 1 Connection

```
Client → WebSocket connect
```

Steps:

1. Client apre connessione
2. Invio token JWT
3. Validazione token
4. Associazione userId alla socket
5. Registrazione utente online

---

## 2 Join Chat Room

Quando un utente apre una chat:

```
JOIN_CHAT
```

Payload:

```json
{
  "event": "JOIN_CHAT",
  "data": {
    "chatId": "uuid"
  }
}
```

Il gateway associa la socket alla room.

---

## 3 Send Message

Client invia:

```
MESSAGE_SENT
```

Il gateway:

1. valida evento
2. invia al service applicativo
3. salva nel database
4. pubblica evento su Redis
5. invia ai client della room

---

## 4 Disconnect

Quando un utente si disconnette:

1. rimozione socket
2. aggiornamento presenza
3. broadcast USER_DISCONNECTED

---

# Redis Pub/Sub Integration

Per supportare **scaling orizzontale**, il gateway utilizza Redis Pub/Sub.

```
Gateway Instance 1
      │
      │ publish
      ▼
     Redis
      ▲
      │ subscribe
      │
Gateway Instance 2
```

Questo consente di distribuire eventi tra più server.

---

# Chat Rooms

Ogni chat corrisponde a una **room WebSocket**.

```
room:chat:{chatId}
```

Esempio:

```
room:chat:12345
```

Quando un utente entra nella chat:

```
socket.join(room:chat:12345)
```

---

# Presence System

Il gateway gestisce anche la presenza degli utenti.

Redis viene utilizzato per memorizzare:

```
online_users
```

Schema:

```
userId → socketId
```

---

# Recommended Folder Structure

```
src
 ├─ presentation
 │   └─ websocket
 │       ├─ websocket.gateway.ts
 │       ├─ websocket.server.ts
 │       ├─ connection.manager.ts
 │       └─ event.dispatcher.ts
 │
 ├─ application
 │   └─ services
 │       └─ send-message.service.ts
 │
 ├─ domain
 │   ├─ entities
 │   ├─ repositories
 │   └─ events
 │
 └─ infrastructure
     ├─ redis
     └─ database
```

---

# WebSocket Event Dispatcher

Il dispatcher è responsabile del routing degli eventi.

```
MESSAGE_SENT → SendMessageService
USER_TYPING → TypingService
MESSAGE_READ → ReadReceiptService
```

Pattern utilizzato:

```
Event → Handler
```

---

# Example Event Dispatch

Pseudo-code:

```
switch(event.type) {

  case MESSAGE_SENT:
      sendMessageHandler.execute()

  case USER_TYPING:
      typingHandler.execute()

}
```

---

# Security Considerations

Il gateway deve gestire:

* autenticazione JWT
* rate limiting
* validazione payload
* gestione reconnect

---

# Scalability Considerations

Per scalare il sistema:

| Component           | Strategy           |
| ------------------- | ------------------ |
| WebSocket Server    | Horizontal scaling |
| Event Distribution  | Redis Pub/Sub      |
| Presence            | Redis              |
| Message Persistence | Database           |

---

# Future Improvements

Possibili evoluzioni dell'architettura:

* message queue (Kafka / RabbitMQ)
* event sourcing
* push notifications
* message retry system
* offline message delivery

---

# Summary

Il WebSocket Gateway è responsabile di:

* gestione connessioni realtime
* routing eventi
* gestione chat rooms
* presenza utenti
* distribuzione eventi tramite Redis

Questo componente è il punto centrale dell'infrastruttura realtime del sistema di chat.
