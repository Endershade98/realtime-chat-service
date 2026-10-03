# Realtime Chat Dashboard (Frontend)

Frontend web application ispirata a **WhatsApp Web**, costruita con **React + TypeScript** seguendo rigorosamente i principi di:

- Domain-Driven Design (DDD)
- Clean Architecture
- Realtime Communication (WebSocket)
- REST API Integration

---

# Overview

Questa applicazione rappresenta il **layer di presentazione e interazione utente** del sistema di chat realtime.

È completamente **decoupled dal backend**, comunicando tramite:

- REST API → per persistenza dati
- WebSocket → per realtime messaging

---

# Architettura

Il progetto segue la **Clean Architecture**, separando chiaramente responsabilità e dipendenze:

```
src/
├── domain/            # Core business logic (no framework)
├── application/       # Use cases
├── infrastructure/    # API + WebSocket
├── presentation/      # React UI
└── main.tsx           # Composition root

```

---

## Domain Layer

Contiene:

- Entità: `Chat`, `Message`, `User`
- Value Objects: `ChatId`, `MessageId`
- Interfacce Repository

Nessuna dipendenza da React o librerie esterne.

---

## Application Layer

Implementa i **Use Cases**:

- `SendMessage`
- `GetChatHistory`
- `ReceiveMessage`

Contiene la logica di business pura.

---

## Infrastructure Layer

Implementa l’integrazione con il backend:

### REST API
- `HttpMessageRepository`
- `HttpChatRepository`

### WebSocket
- `WebSocketService`
- gestione eventi realtime
- reconnect automatico

---

## Presentation Layer (React)

Organizzato con pattern:

- Context Provider (state management)
- Container/Presenter
- Componenti modulari

Componenti principali:

- `ChatList` → lista chat
- `ChatWindow` → messaggi
- `MessageInput` → invio messaggi
- `Dashboard` → layout principale

---

# Data Flow

## Invio Messaggio

```
UI → SendMessage (UseCase)
   → REST API (persistenza)
   → Update UI (optimistic)
   → WebSocket broadcast
```

---

## Ricezione Messaggio

```
WebSocket → ReceiveMessage (UseCase)
           → Update UI
```

---

# Integrazione Backend

## REST Endpoints

| Metodo | Endpoint | Descrizione |
|--------|----------|------------|
| POST   | `/users` | Crea utente |
| POST   | `/conversations` | Crea conversazione |
| GET    | `/conversations/:id/messages` | Recupera messaggi |
| POST   | `/messages` | Invia messaggio |

---

## WebSocket Events

### Client → Server

```json
{
  "type": "MESSAGE_SENT",
  "payload": { ... }
}
````

### Server → Client

```json
{
  "type": "MESSAGE_RECEIVED",
  "payload": { ... }
}
```

---

# Message Lifecycle

| Stato       | Descrizione               |
| ----------- | ------------------------- |
| `sending`   | Messaggio in invio        |
| `sent`      | Salvato su server         |
| `delivered` | Ricevuto dal destinatario |
| `read`      | Letto                     |

---

# Setup

## 1. Installazione

```bash
npm install
```

---

## 2. Configurazione

Crea `.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3001
```

---

## 3. Avvio

```bash
npm run dev
```

---

# Tecnologie

* React + TypeScript
* Tailwind CSS
* WebSocket API
* Fetch API
* Clean Architecture

---

# Design UI

Ispirato a WhatsApp Web:

* Sidebar con chat
* Chat window centrale
* Input bar
* Layout responsive

---

# Features

✔ Realtime messaging
✔ Clean Architecture
✔ Dependency Injection
✔ Optimistic UI
✔ WebSocket reconnect
✔ Modular components

---

# Limitazioni attuali

* Nessuna autenticazione
* Nessun caching avanzato
* Nessun offline mode

---

# Roadmap

## Short Term

* [ ] Typing indicator
* [ ] Read receipts
* [ ] Chat switching

## Mid Term

* [ ] Zustand / Redux
* [ ] Message pagination
* [ ] Virtualized list

## Advanced

* [ ] Offline support (IndexedDB)
* [ ] Retry queue
* [ ] Push notifications
* [ ] Encryption (E2E)

---

# Principi Architetturali

✔ Separazione dei layer
✔ Inversione delle dipendenze
✔ UI indipendente dal backend
✔ Testabilità elevata

---

# Contributi

Pull request e miglioramenti sono benvenuti.

---

# Licenza

MIT

---

# Autore

Progetto sviluppato come esercizio avanzato di:

* System Design
* Clean Architecture
* Realtime Systems

```