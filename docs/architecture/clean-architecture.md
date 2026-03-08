# Realtime Chat Service – Clean Architecture

The backend architecture follows Clean Architecture principles.

The system is organized into four main layers:

- Presentation Layer
- Application Layer
- Domain Layer
- Infrastructure Layer

Each layer has a specific responsibility and dependency direction.

## Dependency Rule

Dependencies must always point inward.

Outer layers depend on inner layers, but inner layers never depend on outer layers.

## Domain Layer

The Domain Layer contains the core business logic of the system.

It is completely independent of frameworks, databases, or external services.

Esempio:
```
domain
 ├─ entities
 │   ├─ User.ts
 │   ├─ Conversation.ts
 │   └─ Message.ts
 │
 ├─ value-objects
 │   ├─ UserId.ts
 │   ├─ MessageId.ts
 │
 ├─ events
 │   ├─ MessageSent.ts
 │
 └─ repositories
     ├─ MessageRepository.ts
     ├─ ConversationRepository.ts
```

## Application Layer

The Application Layer orchestrates domain logic and implements system use cases.
Esempio:
```
application
 ├─ use-cases
 │   ├─ SendMessageUseCase.ts
 │   ├─ CreateConversationUseCase.ts
 │
 ├─ dtos
 │   ├─ SendMessageDTO.ts

```

## Presentation Layer

The Presentation Layer exposes the system to external clients.
```
presentation
 ├─ controllers
 │   ├─ MessageController.ts
 │
 ├─ websocket
 │   ├─ WebSocketGateway.ts
 │   ├─ MessageHandler.ts
 │
 └─ routes
```

## Infrastructure Layer

The Infrastructure Layer contains implementations for external systems.
Esempio:
```
infrastructure
 ├─ database
 │   ├─ postgres.ts
 │
 ├─ redis
 │   ├─ RedisClient.ts
 │
 ├─ repositories
 │   ├─ PostgresMessageRepository.ts
 │
 └─ websocket
     ├─ WSConnectionManager.ts
```
## Layer Interaction

```
Presentation Layer receives requests from clients.

↓

Application Layer executes use cases.

↓

Domain Layer applies business rules.

↓

Infrastructure Layer provides technical implementations.
```

Diagramma:
```
Client
   │
   ▼
Presentation Layer
   │
   ▼
Application Layer
   │
   ▼
Domain Layer
   ▲
   │
Infrastructure Layer
```
## Example Flow – Sending a Message

1. Client sends websocket event `send_message`

2. WebSocketGateway receives the event

3. SendMessageUseCase is executed

4. Conversation aggregate validates message

5. Message entity is created

6. MessageSent domain event emitted

7. Infrastructure publishes event via Redis

## Backend Structure

```
src

domain
 ├─ entities
 ├─ value-objects
 ├─ events
 └─ repositories

application
 ├─ use-cases
 └─ dtos

presentation
 ├─ controllers
 ├─ websocket
 └─ routes

infrastructure
 ├─ database
 ├─ redis
 └─ repositories
```