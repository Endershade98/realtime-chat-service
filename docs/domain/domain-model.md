# Realtime Chat System – Domain Model

## Ubiquitous Language

User  
Registered participant in the chat system.

Conversation  
A communication channel between two or more users.

Participant  
User belonging to a conversation.

Message  
A text message sent by a user in a conversation.

Presence  
Represents whether a user is online or offline.

Typing Indicator  
Event notifying that a user is currently typing.

Delivery Status  
Represents the delivery state of a message.

Read Receipt  
Indicates that a message has been read.

## Bounded Contexts

### Identity Context
Manages users and authentication.

### Conversation Context
Manages chat conversations and participants.

### Messaging Context
Handles message creation, delivery and storage.

### Presence Context
Tracks online/offline status of users.

### Realtime Context
Handles websocket communication and realtime events.

## Entities

### User

Represents a system user.

Attributes:

- id
- username
- createdAt

---

### Conversation

Represents a chat between two or more users.

Attributes:

- id
- type (private | group)
- createdAt

---

### Participant

Represents a user belonging to a conversation.

Attributes:

- userId
- conversationId
- joinedAt

---

### Message

Represents a chat message.

Attributes:

- id
- conversationId
- senderId
- content
- createdAt
- status

## Value Objects

MessageId  
Unique identifier of a message.

ConversationId  
Unique identifier of a conversation.

UserId  
Unique identifier of a user.

Timestamp  
Represents a point in time.

MessageContent  
Encapsulates message text validation rules.

## Aggregates

### Conversation Aggregate

Aggregate Root: Conversation

Contains:
- Participants
- Messages

Responsibilities:

- manage participants
- allow message creation
- maintain conversation state

## Domain Events

MessageSent

Triggered when a user sends a message.

Payload:

- messageId
- conversationId
- senderId
- timestamp

---

UserConnected

Triggered when a user connects to the websocket server.

---

UserDisconnected

Triggered when a user disconnects.

---

UserTyping

Triggered when a user starts typing.

---

MessageRead

Triggered when a message is marked as read.

## Domain Rules

1. A user must belong to a conversation to send a message.

2. A message must belong to a conversation.

3. A conversation must have at least two participants.

4. A message cannot be empty.

5. A user cannot read messages of conversations they do not belong to.

## Message Flow

```User sends message

↓

WebSocket Gateway receives event

↓

SendMessage Use Case

↓

Conversation Aggregate validates

↓

Message entity created

↓

MessageSent event published

↓

EventBus (Redis)

↓

Other participants receive message
```