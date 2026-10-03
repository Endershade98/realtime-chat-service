# Realtime Chat Backend – Roadmap

## Overview

Questa roadmap segue:

* Domain Driven Design
* Clean Architecture
* Event Driven Architecture
* Test Driven Development (TDD)

Ogni Epic rappresenta uno **slice verticale completo**, testabile end-to-end.

---

# EPIC 1 — Core Domain + Persistence

## Goal

Costruire un dominio solido e persistente senza realtime.

## Tasks

### Domain

* [ ] Implementare Entities:

  * User
  * Conversation
  * Message
  * Participant

* [ ] Implementare Value Objects:

  * UserId
  * ConversationId
  * MessageId
  * Timestamp

* [ ] Implementare Domain Rules:

  * User deve appartenere alla conversation
  * Message non vuoto
  * Conversation >= 2 participants

---

### Repository Contracts

* [ ] UserRepository
* [ ] ConversationRepository
* [ ] MessageRepository

---

### Infrastructure (Prisma)

* [ ] Implementare:

  * PostgresUserRepository
  * PostgresConversationRepository
  * PostgresMessageRepository

* [ ] Inject PrismaClient correttamente

---

### Application Layer

* [ ] CreateUserService
* [ ] CreateConversationService
* [ ] GetConversationMessagesService

---

### Presentation (REST)

* [ ] POST /users
* [ ] POST /conversations
* [ ] GET /conversations/:id/messages

---

## Testing

### Unit

* [ ] Entities
* [ ] Value Objects
* [ ] Use Cases (mock repository)

### Integration

* [ ] Repository con Prisma (test DB)

### E2E

* [ ] Creazione utente
* [ ] Creazione conversation
* [ ] Recupero messaggi

---

## Done Criteria

* Sistema CRUD funzionante
* DB consistente
* 100% test pass

---

# EPIC 2 — Send Message (Core Business Logic)

## Goal

Implementare il flusso completo di invio messaggi (senza realtime).

## Tasks

### Domain

* [ ] Implementare MessageSent event
* [ ] Aggiungere domainEvents alla Entity Message

---

### Application

* [ ] Refactor SendMessageService:

  * crea Message
  * valida domain rules
  * salva su repository
  * aggiunge domain event

---

### REST

* [ ] POST /messages

---

### Validation

* [ ] Validazione DTO lato controller
* [ ] Error handling coerente

---

## Testing

### Unit

* [ ] SendMessageService
* [ ] Validazioni dominio

### Integration

* [ ] Persistenza messaggio

### E2E

* [ ] Creazione messaggio via API
* [ ] Verifica salvataggio DB

---

## Done Criteria

* Messaggi persistiti correttamente
* Domain logic isolata
* Nessun coupling con WebSocket

---

# EPIC 3 — Event Bus (Architettura Event-Driven)

## Goal

Introdurre EventBus come backbone del sistema.

## Tasks

### Application

* [ ] Creare EventBus interface

---

### Infrastructure

* [ ] Implementare InMemoryEventBus

---

### Refactor

* [ ] SendMessageService.publish(domainEvents)

---

### Composition Root

* [ ] Wiring:

  * EventBus
  * UseCases

---

## Testing

### Unit

* [ ] Event emission test
* [ ] Mock EventBus nei use case

### Integration

* [ ] Verificare dispatch eventi

---

## Done Criteria

* Eventi propagati correttamente
* Nessuna logica realtime ancora

---

# EPIC 4 — WebSocket Gateway (Realtime Base)

## Goal

Integrare WebSocket senza rompere Clean Architecture.

## Tasks

### Presentation

* [ ] websocket.gateway.js
* [ ] connection.manager.js

---

### Features

* [ ] Connessione client
* [ ] Gestione utenti connessi
* [ ] Mapping userId → socket

---

### Event Routing

* [ ] MESSAGE_SENT → SendMessageService

---

## Testing

### Unit

* [ ] Parsing eventi WS

### Integration

* [ ] Simulazione connessioni WS

### E2E

* [ ] Client A invia messaggio
* [ ] Server riceve evento

---

## Done Criteria

* WebSocket funzionante
* Nessuna logica business nel gateway

---

# EPIC 5 — Event → WebSocket Bridge

## Goal

Collegare EventBus al WebSocket (broadcast realtime).

## Tasks

### Presentation

* [ ] WebSocketEventSubscriber

---

### Logic

* [ ] MessageSent → broadcast MESSAGE_RECEIVED

---

### Connection Manager

* [ ] broadcastToConversation()

---

## Testing

### Unit

* [ ] Subscriber mapping eventi

### Integration

* [ ] EventBus → WS dispatch

### E2E

* [ ] Client A invia messaggio
* [ ] Client B riceve realtime

---

## Done Criteria

* Realtime funzionante end-to-end
* Architettura pulita

---

# EPIC 6 — Chat Rooms + Presence

## Goal

Gestire rooms e presenza utenti.

## Tasks

### WebSocket

* [ ] JOIN_CHAT event
* [ ] Leave chat

---

### Connection Manager

* [ ] Gestione rooms:

  * room:chat:{id}

---

### Presence

* [ ] USER_CONNECTED event
* [ ] USER_DISCONNECTED event

---

## Testing

### Unit

* [ ] Room logic

### Integration

* [ ] Join/leave chat

### E2E

* [ ] Multi-client chat scenario

---

## Done Criteria

* Chat isolate per conversation
* Presence funzionante

---

# EPIC 7 — Redis Pub/Sub (Scalabilità)

## Goal

Supportare multi-instance server.

## Tasks

### Infrastructure

* [ ] Redis client
* [ ] RedisEventBus

---

### Refactor

* [ ] Sostituire InMemoryEventBus

---

### Channels

* [ ] message_events
* [ ] presence_events

---

## Testing

### Integration

* [ ] Pub/Sub Redis

### E2E

* [ ] Multi-instance simulation

---

## Done Criteria

* Sistema scalabile
* Eventi distribuiti

---

# EPIC 8 — Advanced Messaging

## Goal

Implementare stati messaggio avanzati.

## Tasks

* [ ] MESSAGE_DELIVERED
* [ ] MESSAGE_READ
* [ ] USER_TYPING (effimero)

---

### Domain Events

* [ ] MessageDelivered
* [ ] MessageRead
* [ ] UserTyping

---

## Testing

### Unit

* [ ] Event creation

### Integration

* [ ] Event propagation

### E2E

* [ ] Read receipts flow

---

## Done Criteria

* UX realtime avanzata
* Event contract rispettato

---

# EPIC 9 — Reliability & Production Readiness

## Goal

Rendere il sistema robusto.

## Tasks

* [ ] Retry strategy
* [ ] WebSocket reconnection
* [ ] Idempotency messages
* [ ] Rate limiting

---

## Testing

### E2E

* [ ] Network failure simulation
* [ ] Duplicate messages

---

## Done Criteria

* Sistema resiliente
* Error handling robusto

---

# EPIC 10 — Authentication (Future)

## Goal

Sicurezza sistema.

## Tasks

* [ ] JWT auth REST
* [ ] WS authentication handshake

---

## Done Criteria

* Accesso sicuro
* Protezione chat

---