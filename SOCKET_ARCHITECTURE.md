# Socket.IO Architecture & Flow Diagram

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                  SocketProvider                         │    │
│  │  ┌──────────────────────┐  ┌──────────────────────┐   │    │
│  │  │  useNotifications()  │  │   useMessaging()     │   │    │
│  │  │   /notifications     │  │    /messaging        │   │    │
│  │  └──────────┬───────────┘  └──────────┬──────────┘   │    │
│  └─────────────┼──────────────────────────┼──────────────┘    │
│                │                          │                     │
│                ▼                          ▼                     │
│  ┌─────────────────────────┐  ┌──────────────────────────┐    │
│  │ useNotificationStore    │  │  useMessagingStore        │    │
│  │ ┌─────────────────────┐ │  │ ┌──────────────────────┐ │    │
│  │ │ • notifications[]   │ │  │ │ • conversations[]    │ │    │
│  │ │ • unreadCount       │ │  │ │ • messages{}         │ │    │
│  │ │ • isConnected       │ │  │ │ • typingUsers{}      │ │    │
│  │ └─────────────────────┘ │  │ └──────────────────────┘ │    │
│  └─────────────────────────┘  └──────────────────────────┘    │
│                │                          │                     │
│                └──────────────┬───────────┘                     │
│                               ▼                                 │
│                    ┌────────────────────┐                       │
│                    │  UI Components     │                       │
│                    │  • NotificationBell│                       │
│                    │  • Chat (TBD)      │                       │
│                    └────────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Socket.IO
                               │ (HTTP-only cookies)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Backend (Node.js)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│              ┌────────────────────────────────┐                 │
│              │     Socket.IO Server           │                 │
│              │  ┌──────────┐  ┌───────────┐  │                 │
│              │  │  /notif  │  │ /messaging│  │                 │
│              │  └──────────┘  └───────────┘  │                 │
│              └────────────────────────────────┘                 │
│                       │             │                            │
│          ┌────────────┴─────────────┴────────────┐              │
│          │         REST API Controllers          │              │
│          │  • Send notifications to users        │              │
│          │  • Emit messages to conversations     │              │
│          └────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Connection Flow

```
┌─────────────┐
│ User Visits │
│    App      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ App Loads               │
│ SocketProvider Mounted  │
│ Sockets: DISCONNECTED   │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ User Clicks Login       │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ POST /auth/login        │
│ Backend sets cookies    │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ ProtectedRoute detects  │
│ authentication          │
│ Calls connectSockets()  │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Socket.IO connects to both:         │
│ • ws://localhost:8800/notifications │
│ • ws://localhost:8800/messaging     │
│ (with HTTP-only cookies)            │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Backend verifies JWT    │
│ from cookie             │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Connection SUCCESS      │
│ Stores set connected    │
│ Event listeners active  │
└─────────────────────────┘
```

## 📬 Notification Flow

```
Backend                          Frontend
   │                                │
   │ 1. Event occurs                │
   │ (project update, etc)          │
   │                                │
   ▼                                │
┌─────────────────┐                │
│ REST Controller │                │
└────────┬────────┘                │
         │                          │
         │ 2. Get SocketManager     │
         │                          │
         ▼                          │
┌────────────────────┐             │
│ NotificationHandler│             │
│ .sendToUser()      │             │
└────────┬───────────┘             │
         │                          │
         │ 3. Emit socket event     │
         │ "notification:new"       │
         │                          │
         └──────────────────────────┤
                                    │
                                    ▼
                          ┌──────────────────┐
                          │ useNotifications │
                          │ receives event   │
                          └────────┬─────────┘
                                   │
                                   │ 4. Add to store
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ Notification     │
                          │ Store Updated    │
                          └────────┬─────────┘
                                   │
                                   │ 5. React re-renders
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ NotificationBell │
                          │ • Badge updates  │
                          │ • Shows new notif│
                          └──────────────────┘
```

## 💬 Messaging Flow

```
User A (Frontend)          Backend          User B (Frontend)
      │                       │                     │
      │ 1. Type message       │                     │
      │                       │                     │
      ▼                       │                     │
┌─────────────┐              │                     │
│ Input field │              │                     │
│ onChange    │              │                     │
└──────┬──────┘              │                     │
       │                     │                     │
       │ 2. Emit typing      │                     │
       │ "message:typing"    │                     │
       │                     │                     │
       └─────────────────────┤                     │
                             │                     │
                             │ 3. Broadcast        │
                             │ to conversation     │
                             │                     │
                             └─────────────────────┤
                                                   │
                                                   ▼
                                         ┌─────────────────┐
                                         │ "User A typing" │
                                         │ indicator shown │
                                         └─────────────────┘
      │                       │                     │
      │ 4. Click Send         │                     │
      │                       │                     │
      ▼                       │                     │
┌─────────────┐              │                     │
│ Send button │              │                     │
└──────┬──────┘              │                     │
       │                     │                     │
       │ 5. Emit message     │                     │
       │ "message:send"      │                     │
       │                     │                     │
       └─────────────────────┤                     │
                             │                     │
                             │ 6. Save to DB       │
                             │                     │
                             │ 7. Broadcast        │
                             │ "message:new"       │
                             │                     │
                             └─────────────────────┤
                                                   │
                                                   ▼
                                         ┌─────────────────┐
                                         │ Message appears │
                                         │ in chat         │
                                         └─────────────────┘
```

## 🔐 Authentication Flow

```
┌──────────────┐
│ HTTP Request │
│ with Cookies │
└──────┬───────┘
       │
       ▼
┌────────────────────────────┐
│ Backend extracts token     │
│ from HTTP-only cookie      │
└──────┬─────────────────────┘
       │
       ▼
┌────────────────────────────┐
│ JwtUtil.verifyToken()      │
└──────┬─────────────────────┘
       │
       ├─────── Valid ────────┐
       │                      │
       ▼                      ▼
┌────────────────┐   ┌─────────────────┐
│ Attach user    │   │ socket.data =   │
│ to request     │   │ { userId, ... } │
└────────────────┘   └─────────────────┘
       │                      │
       ▼                      │
┌────────────────┐            │
│ Allow request  │◄───────────┘
└────────────────┘

       │
       └─── Invalid ────┐
                        │
                        ▼
              ┌──────────────────┐
              │ Reject connection│
              │ "Auth error"     │
              └──────────────────┘
```

## 🔄 Reconnection Flow

```
┌──────────────┐
│ Connection   │
│ Lost         │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Socket.IO Client │
│ Auto reconnects  │
└──────┬───────────┘
       │
       ├────── Attempt 1 ────┐
       │                     │
       ├────── Attempt 2 ────┤
       │                     │
       ├────── Attempt 3 ────┤
       │                     │
       └────── Attempt 4 ────┘
                │
                ├── Success ──┐
                │             │
                │             ▼
                │    ┌──────────────────┐
                │    │ Connection       │
                │    │ Restored         │
                │    │ State synced     │
                │    └──────────────────┘
                │
                └── Failed ───┐
                              │
                              ▼
                     ┌──────────────────┐
                     │ Show error       │
                     │ "Reconnect       │
                     │  failed"         │
                     └──────────────────┘
```

## 📊 State Management Flow

```
┌──────────────────────────────────────────────────┐
│              Socket Event Received               │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│           Event Handler in Hook                  │
│  • useNotifications()                            │
│  • useMessaging()                                │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│           Call Store Action                      │
│  • addNotification()                             │
│  • addMessage()                                  │
│  • updateMessage()                               │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│           Zustand Store Updates                  │
│  • Immutable state update                        │
│  • Subscribers notified                          │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│           React Re-renders                       │
│  • Only affected components                      │
│  • Optimal performance                           │
└──────────────────────────────────────────────────┘
```

## 🎯 Component Hierarchy

```
App
└── SocketProvider
    ├── NotificationSocket (/notifications)
    │   └── Event Listeners
    │       ├── notification:connected
    │       ├── notification:new
    │       ├── notification:unreadCount
    │       ├── notification:readSuccess
    │       └── notification:deleteSuccess
    │
    ├── MessagingSocket (/messaging)
    │   └── Event Listeners
    │       ├── message:connected
    │       ├── message:new
    │       ├── message:userTyping
    │       ├── message:read
    │       └── message:deleted
    │
    └── Your App Components
        ├── Navbar
        │   └── NotificationBell
        │       └── Sheet (Drawer)
        │           └── Notification List
        │
        ├── Dashboard
        │   └── Uses: useNotificationStore()
        │
        └── Chat (Future)
            └── Uses: useMessagingStore()
```

---

## 📝 Key Takeaways

1. **Single SocketProvider** wraps entire app
2. **Two namespaces** for separation of concerns
3. **Zustand stores** for state management
4. **Automatic connection** on authentication
5. **Type-safe** throughout with TypeScript
6. **Event-driven** architecture
7. **Reconnection** handled automatically
8. **HTTP-only cookies** for security

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Type safety
- ✅ Optimal performance
- ✅ Easy to test
- ✅ Easy to extend
- ✅ Production ready
