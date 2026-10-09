# Zero App — Frontend

React 19 + Vite + TypeScript. Real-time chat UI with TanStack Router, Socket.io, and a custom design-token theme.

---

## Dev

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview
```

---

## Architecture

### Entry & Router

| File | Role |
|------|------|
| `src/main.tsx` | Mounts `<App />` |
| `src/App.tsx` | Wraps router with `AuthContextProvider` |
| `src/router.tsx` | All routes. Root route (`RootLayout`) renders `NavSidebar` around every page |

**Route tree**
```
/                        → pages/Home.tsx
/login                   → pages/Login.tsx
/register                → pages/Register.tsx
/settings                → pages/Settings.tsx
/forgot-password/...     → pages/ForgotPasswordFlow.tsx
/chathub                 → pages/Chathub.tsx  (ChatSidebar + Outlet)
/chathub/:chatRoomId     → components/Chatroom/Chatplace.tsx
```

---

### Auth

| File | Role |
|------|------|
| `src/contexts/Auth/AuthContextProvider.tsx` | Fetches `/api/v1/auth/me` on mount, stores `{ userId, email, avatar }` |
| `src/contexts/Auth/useAuthContext.ts` | `useAuthContext()` hook — use this everywhere |
| `src/api/axios.ts` | Axios instance. Reads `accessToken` from `localStorage`, auto-refreshes on 401 |
| `src/helpers/build-image.ts` | Converts MongoDB buffer → base64 `data:image/...` URL |

---

### Pages

Plain page components. No raw styles — all via CSS vars or `ui/` primitives.

| File | Purpose |
|------|---------|
| `pages/Home.tsx` | Landing page with connection check |
| `pages/Login.tsx` | Email + password form, stores token in localStorage |
| `pages/Register.tsx` | Signup form |
| `pages/Chathub.tsx` | Shell: renders `ChatSidebar` + `<Outlet />` |
| `pages/Settings.tsx` | Avatar upload via FormData |
| `pages/ForgotPasswordFlow.tsx` | `CheckEmail` + `ChangePassword` components |

---

### Feature Components

| File | Purpose |
|------|---------|
| `components/NavSidebar.tsx` | Icon rail (64px). Messages nav + profile avatar popover → Settings |
| `components/Chatroom/ChatSidebar.tsx` | Conversation list (280px). Fetches `/api/v1/chatrooms/me` |
| `components/Chatroom/Chatplace.tsx` | Live chat pane. Socket.io + REST. Sends on Enter, Shift+Enter = newline |
| `components/Chatroom/CreateRoomModal.tsx` | Modal to create a new chatroom by email lookup |
| `components/Chatroom/EmailInput.tsx` | `react-select` CreatableSelect, themed to match CSS vars |
| `components/Notifications.tsx` | Web-push subscription via service worker |

**Socket flow in Chatplace**
1. On mount: `socket.emit("join-room", { chatroomId })`
2. Send: POST `/api/v1/chats/add-message` → `socket.emit("chat-message", ...)`
3. Receive: `socket.on("message-sent", msg => setMessages(prev => [...prev, msg]))`
4. Scroll: `messagesEndRef.current.scrollIntoView()` runs on every `messages` change

---

### UI Primitives (`src/ui/`)

Pure presentational components — **no business logic, no API calls**. All styling uses CSS custom properties.

| File | Exports |
|------|---------|
| `nav.tsx` | `NavContainer`, `NavLogo`, `NavIconButton`, `NavSpacer`, `NavAvatar`, `NavProfilePopover` |
| `sidebar.tsx` | `SidebarPanel`, `SidebarHeader`, `SidebarTitle`, `SidebarIconBtn`, `SidebarList`, `SidebarItem`, `SidebarAvatar`, `SidebarEmptyText` |
| `chat.tsx` | `ChatPane`, `ChatScrollArea`, `ChatEmptyState`, `ChatInputSection`, `ChatFormatBar`, `ChatTextArea`, `ChatActionRow`, `ChatFileButton`, `ChatSendBtn`, `ChatFontBtn`, `ChatEmojiBtn`, `ChatMentionBtn`, `ChatMoreBtn` |
| `messages.tsx` | `Messages`, `MessageBubble` (sent, right), `OtherMessageBubble` (received, left) |
| `modal.tsx` | `ModalBackdrop`, `ModalPanel`, `ModalHeader`, `ModalTitle`, `ModalCloseBtn`, `PrimaryButton` |
| `button.tsx` | `Button` |
| `input.tsx` | `Input` |
| `label.tsx` | `Label` |
| `field.tsx` | `Field`, `FormLayout` |
| `styledLink.tsx` | `StyledLink` (TanStack Router `<Link>` with theme hover) |
| `text.tsx` | `H1` |
| `homePage.tsx` | `Background` |
| `errorText.tsx` | `ErrorText` |
| `index.ts` | Re-exports everything above |

**Rule:** Feature components import from `ui/` only. Never put raw style objects inside a feature component.

---

### Theme (`src/index.css`)

CSS custom properties defined on `:root` (dark-first). Change accent color here to retheme the entire app.

```css
--accent-h / --accent-s / --accent-l   /* HSL knobs for the accent color */
--background-primary / -secondary      /* page backgrounds */
--background-modifier-border           /* all borders */
--text-normal / --text-muted / --text-faint / --icon-color
--interactive-accent / --interactive-accent-hover
```

Scrollbars use `scrollbar-width: thin` + `scrollbar-color` (CSS Scrollbars Level 1, no webkit legacy).

---

### Config

| File | Content |
|------|---------|
| `src/config/config.ts` | `serverUrl` from `VITE_SERVER_URL` env var |
| `.env` | `VITE_SERVER_URL=http://localhost:8000` |
| `vite.config.ts` | Vite + React plugin |
| `tailwind.config.ts` | Tailwind v4 via `@import "tailwindcss"` |

> **Note on Tailwind:** spacing utilities (`px-*`, `py-*`) can be unreliable in Tailwind v4 — use inline `style` props for all padding/margin. Layout utilities (`flex`, `items-center`, etc.) work fine.
