<div align="center">

# ✦ MiniChat

### A minimal, modern messaging experience.

<a href="https://github.com/Shishir-Dey-coder/minimal-chatapp-react-native">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=22&duration=3000&pause=900&color=6750E8&center=true&vCenter=true&width=600&lines=Simple+conversations%2C+beautifully+designed.;Real-time+messaging%2C+made+simple.;Built+with+React+Native+%26+TypeScript." alt="Animated MiniChat tagline" />
</a>

<br />

<a href="https://github.com/Shishir-Dey-coder/minimal-chatapp-react-native">
  <img src="https://img.shields.io/badge/Project-MiniChat-6750E8?style=for-the-badge&logo=chatbot&logoColor=white" alt="MiniChat project" />
</a>
<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</a>
<a href="https://expo.dev/">
  <img src="https://img.shields.io/badge/Expo-SDK%2055-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 55" />
</a>

<br />
<br />

**A GitHub showcase project exploring clean UI, maintainable architecture, and real-time messaging with React Native.**

[Overview](#-overview) ·
[Features](#-features) ·
[Roadmap](#-development-roadmap) ·
[Installation](#-getting-started) ·
[Architecture](#-project-architecture)

</div>

---

## ✨ Overview

MiniChat is a minimal messaging app being developed with React Native, Expo, and TypeScript.

The goal is to build a polished, responsive, and maintainable messaging experience while learning and applying practical mobile development concepts.

Rather than building everything in a single file, MiniChat will evolve through small, well-structured development steps.

### 🎯 Project Goals

- Create a modern, intuitive messaging interface.
- Build reusable and type-safe React Native components.
- Implement authentication and user profiles.
- Support real-time one-to-one messaging.
- Add message states, unread counts, and conversation search.
- Follow sensible security and error-handling practices.
- Maintain a professional Git history and developer-friendly documentation.

> **Development status:** MiniChat is a work in progress. The initial project uses mock conversation data. Authentication, backend integration, and real-time messaging are planned features, not completed functionality.

---

## 🚀 Features

Features are tracked according to their actual implementation status.

### 🎨 User Interface

- [x] Initial Expo SDK 55 project setup
- [x] TypeScript foundation
- [x] Initial chat list prototype
- [x] Mock conversation data
- [x] Search and conversation filters in the prototype
- [x] Online contact indicators in the prototype
- [x] Unread message badges in the prototype
- [ ] Dedicated conversation screen
- [ ] Responsive layouts and polished navigation
- [ ] Dark mode
- [ ] Empty, loading, and error states
- [ ] Accessibility improvements

### 💬 Messaging

- [ ] One-to-one conversations
- [ ] Send and receive text messages
- [ ] Real-time message updates
- [ ] Message timestamps
- [ ] Unread message tracking
- [ ] Read receipts
- [ ] Typing indicators
- [ ] Message pagination

### 🔐 Authentication & Profiles

- [ ] User registration
- [ ] Login and logout
- [ ] Authentication state persistence
- [ ] Unique usernames
- [ ] User search
- [ ] Profile editing
- [ ] Account and session handling

### 🛡️ Quality & Security

- [ ] Firestore security rules
- [ ] Input validation
- [ ] Error handling
- [ ] Reliable loading states
- [ ] Component and utility tests
- [ ] Manual testing on Android
- [ ] Production configuration review

---

## 🧰 Tech Stack

| Technology              | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| React Native            | Cross-platform mobile UI                     |
| Expo SDK 55             | Development environment and app tooling      |
| TypeScript              | Type safety and maintainable code            |
| Expo Router             | File-based navigation                        |
| React Native Reanimated | UI and interaction animations                |
| React Native StyleSheet | Component styling                            |
| Firebase Authentication | Planned user authentication                  |
| Cloud Firestore         | Planned real-time messaging and data storage |
| Git & GitHub            | Version control and project showcase         |

Dependencies will be introduced when needed rather than added without a clear purpose.

---

## 🗺️ Development Roadmap

MiniChat will be developed incrementally.

### Phase 01 — Foundation & UI

- [x] Create the Expo project
- [x] Configure the initial GitHub repository
- [x] Create the first chat list prototype
- [ ] Refine the design system
- [ ] Extract reusable UI components
- [ ] Implement proper tab navigation
- [ ] Add polished transitions and animations

### Phase 02 — Conversation Experience

- [ ] Create the conversation screen
- [ ] Build reusable message bubbles
- [ ] Implement the message composer
- [ ] Add keyboard-aware layouts
- [ ] Create empty and loading states
- [ ] Improve accessibility

### Phase 03 — Authentication

- [ ] Configure Firebase
- [ ] Implement registration and login
- [ ] Handle authentication state
- [ ] Create user profiles
- [ ] Add unique username validation
- [ ] Implement user discovery

### Phase 04 — Real-Time Messaging

- [ ] Design the conversation data model
- [ ] Send and receive messages
- [ ] Subscribe to real-time updates
- [ ] Track unread messages
- [ ] Implement read receipts
- [ ] Add typing indicators
- [ ] Handle offline and network-error states

### Phase 05 — Security & Reliability

- [ ] Define Firestore security rules
- [ ] Verify conversation membership on the backend
- [ ] Validate message data
- [ ] Test unauthorized access scenarios
- [ ] Add automated tests
- [ ] Review performance and accessibility

### Phase 06 — Showcase & Release

- [ ] Finalize the visual design
- [ ] Capture actual app screenshots
- [ ] Record a demonstration GIF or video
- [ ] Complete setup documentation
- [ ] Document Firebase configuration
- [ ] Prepare a release build
- [ ] Publish a project demonstration

**Roadmap policy:** A task is marked complete only after its implementation has been verified.

---

## 🏁 Getting Started

### Prerequisites

Install the following before starting:

- Node.js compatible with the selected Expo SDK
- npm
- Git
- Expo Go on a compatible Android device, or an appropriate development environment

Check your installation:

```bash
node --version
npm --version
git --version
```

### 1. Clone the repository

```bash
git clone https://github.com/Shishir-Dey-coder/minimal-chatapp-react-native.git
```

### 2. Enter the project directory

```bash
cd minimal-chatapp-react-native
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start Expo

```bash
npx expo start
```

Scan the QR code using a compatible Expo Go installation.

> Expo Go compatibility depends on the SDK and native modules used by the app. A development build may be required for certain native features.

---

## 📁 Project Architecture

The application uses Expo Router and TypeScript.

The planned architecture separates screens, reusable components, data models, and backend services.

```text
MiniChat/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── explore.tsx
│   │   └── chat/
│   │       └── [conversationId].tsx
│   │
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ConversationRow.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── MessageComposer.tsx
│   │   │   └── ChatHeader.tsx
│   │   │
│   │   └── ui/
│   │       ├── Avatar.tsx
│   │       ├── Button.tsx
│   │       └── EmptyState.tsx
│   │
│   ├── constants/
│   │   └── theme.ts
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── conversations/
│   │   └── messages/
│   │
│   ├── hooks/
│   ├── services/
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   └── messages.ts
│   │
│   ├── types/
│   │   ├── user.ts
│   │   ├── message.ts
│   │   └── conversation.ts
│   │
│   └── global.css
│
├── assets/
├── scripts/
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

> **Architecture note:** This tree is the intended direction, not the current file inventory. Files will be introduced as their features are implemented. Existing Expo Router files will be preserved or refactored deliberately.

### Architecture Principles

- **Separation of concerns:** UI, data models, and backend operations should have clear responsibilities.
- **Reusable components:** Common UI elements should have a single implementation.
- **Type safety:** Define interfaces and types for users, messages, and conversations.
- **Small modules:** Prefer focused files over oversized screens.
- **Predictable state:** Keep state ownership clear and avoid unnecessary complexity.
- **Secure data access:** Enforce access control through backend security rules rather than relying on the UI.

---

## 🗃️ Planned Data Model

The following describes the intended data model. It is not yet an implemented database schema.

### Users

```ts
type User = {
  uid: string;
  username: string;
  displayName: string;
  photoURL: string | null;
  createdAt: number;
};
```

### Messages

```ts
type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: number;
};
```

### Conversations

```ts
type Conversation = {
  id: string;
  participantIds: string[];
  lastMessage: string | null;
  updatedAt: number;
};
```

These are initial conceptual types. We will refine them before integrating Firestore, particularly for server-generated timestamps, message status, and conversation membership.

---

## 🎞️ Animation & Interaction Principles

MiniChat aims to use animation to improve usability, not distract from conversations.

Planned interactions include:

- Subtle screen transitions
- Smooth tab selection
- Press feedback on interactive elements
- Animated message appearance
- Typing indicators
- Lightweight loading placeholders
- Respect for reduced-motion preferences where supported

Animations will be introduced alongside the features they support.

---

## 🧪 Testing & Quality

The project will prioritize practical reliability.

Before considering a feature complete, we will:

1. Verify the expected behavior.
2. Test empty and invalid inputs.
3. Check loading and error states.
4. Confirm that TypeScript checks pass.
5. Test on an Android device when applicable.
6. Review changes before committing them.

Useful commands:

```bash
npx tsc --noEmit
npx expo lint
```

The available lint scripts and checks may evolve as the project grows.

---

## 🔒 Security Considerations

Security will be addressed before the messaging backend is considered production-ready.

- Never commit private credentials or service-account keys.
- Use appropriate environment configuration for public client-side settings.
- Remember that client-side Firebase configuration is not a substitute for access control.
- Restrict message reads and writes using Firestore Security Rules.
- Validate conversation membership before allowing access to messages.
- Validate usernames and message inputs.
- Avoid exposing private user information.
- Test security rules against unauthorized requests.

A production deployment will require a separate review of authentication, authorization, abuse prevention, and data-handling practices.

---

## 🤝 Development Workflow

Changes should be small and easy to review.

Example commit messages:

```bash
git add .
git commit -m "feat: build chat conversation screen"
```

```bash
git commit -m "feat: implement Firebase authentication"
```

```bash
git commit -m "fix: handle empty conversation search"
```

We will use meaningful commit messages and update this README as the actual implementation changes.

---

## 👨‍💻 Author

**Shishir Ronjon Dey**

React Native · TypeScript · Python · Django

GitHub: [@Shishir-Dey-coder](https://github.com/Shishir-Dey-coder)

---

<div align="center">

### Built one feature at a time. 💜

_MiniChat — a learning-driven mobile development showcase._

<a href="https://github.com/Shishir-Dey-coder/minimal-chatapp-react-native">
  <img src="https://img.shields.io/badge/Explore%20the%20Repository-6750E8?style=for-the-badge&logo=github&logoColor=white" alt="Explore the repository" />
</a>

</div>
