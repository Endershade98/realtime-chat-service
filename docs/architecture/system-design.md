# Realtime Chat System – Architecture

## System Overview

The system provides realtime messaging between users using WebSocket communication and an event-driven architecture.

The architecture follows:

- Domain Driven Design
- Clean Architecture
- Event Driven Architecture

## Core Components

Client Application
Web interface implemented with React.

API Server
Handles REST endpoints for users, conversations and message history.

WebSocket Gateway
Handles realtime communication between clients.

Event Bus
Redis Pub/Sub system used for realtime event propagation.

Database
Stores users, conversations and messages.

```
Client (React)
     │
     │ HTTP / WebSocket
     ▼
API Server + WebSocket Gateway
     │
     │ Domain Events
     ▼
Redis Pub/Sub
     │
     ▼
Database
(PostgreSQL)
```
## Context Map

Identity Context
Manages users and authentication.

Conversation Context
Manages conversations and participants.

Messaging Context
Handles message creation and delivery.

Presence Context
Tracks user online status.

Realtime Context
Handles websocket connections and realtime event delivery.

### Identity Context

Responsibilities:

- user creation
- authentication
- user metadata

---

### Conversation Context

Responsibilities:

- create conversations
- manage participants

---

### Messaging Context

Responsibilities:

- create messages
- persist messages
- emit MessageSent events

---

### Presence Context

Responsibilities:

- track user online status
- broadcast presence events

---

### Realtime Context

Responsibilities:

- manage websocket connections
- route realtime events

## Event Driven Architecture

The system uses an event-driven architecture to propagate realtime events across components.

Domain events are emitted by application use cases and propagated through Redis Pub/Sub.

```
User sends message
        │
        ▼
WebSocket Gateway
        │
        ▼
SendMessage Use Case
        │
        ▼
Message entity created
        │
        ▼
MessageSent Event
        │
        ▼
Redis Pub/Sub
        │
        ▼
WebSocket Gateway broadcasts message
        │
        ▼
Clients receive message
```

## WebSocket Protocol

Clients communicate with the server using event messages.

Example message:

{
  "type": "send_message",
  "conversationId": "123",
  "content": "Hello"
}

Server events:

message_received
user_typing
user_online
user_offline
message_read

## Data Storage

Primary database: PostgreSQL

Tables:

users
conversations
participants
messages

## Redis Usage

Redis is used for:

- Pub/Sub event propagation
- User presence tracking
- WebSocket session coordination

Channels:

message_events
presence_events

## Scalability

The system can scale horizontally.

Multiple WebSocket servers can run simultaneously behind a load balancer.

Redis Pub/Sub ensures that events are propagated across all servers.

```
Client
  │
  ▼
Load Balancer
  │
 ├── WebSocket Server 1
 ├── WebSocket Server 2
 └── WebSocket Server 3
        │
        ▼
      Redis
        │
        ▼
     PostgreSQL
```
## Reliability

The system includes:

- message persistence
- event broadcasting
- websocket reconnection
- message acknowledgments

## Security

Authentication handled via JWT.

WebSocket connections require a valid access token.

Users can only access conversations they belong to.