<h1 align="center">🚀 Helix CLI</h1>

<p align="center">
  <strong>A powerful AI-powered command-line interface with OAuth device flow authentication</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#api-reference">API</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini">
</p>

---

## ✨ Features

<img src="./assets/images/chat-modes.png" alt="Chat Modes" width="100%">

### 🎯 Three Powerful AI Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **💬 Chat Mode** | Simple conversational AI | General questions, brainstorming, explanations |
| **🛠️ Tool Mode** | AI with integrated tools | Real-time search, code execution, URL analysis |
| **🤖 Agent Mode** | Experimental app generator | Generate complete applications into a safe output directory |

### 🔐 Secure OAuth Device Flow Authentication

- **GitHub OAuth Integration** - Login securely with your GitHub account
- **Device Flow Authentication** - Perfect for CLI applications
- **Persistent Sessions** - Stay logged in across terminal sessions
- **Token Management** - Automatic token storage and refresh

### 🧠 Powered by Google Gemini AI

- **Streaming Responses** - Real-time AI response streaming
- **Markdown Rendering** - Beautiful terminal-formatted responses
- **Conversation History** - Persistent chat history stored in database
- **Tool Calling** - Access to Google Search, Code Execution, and URL Context

### 🏗️ Experimental Application Generation (Agent Mode)

- Generate **full-stack applications** from natural language descriptions
- Creates all necessary files and folder structures
- Includes setup instructions and configuration
- Production-ready code with best practices

---

## 🏛️ Architecture

<img src="./assets/images/architecture.png" alt="Architecture Diagram" width="100%">

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              HELIX CLI                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐   │
│  │   CLI Client    │     │  Express Server │     │  Next.js Client │   │
│  │   (Commander)   │◄───►│   (Port 3005)   │◄───►│   (Port 3000)   │   │
│  └────────┬────────┘     └────────┬────────┘     └────────┬────────┘   │
│           │                       │                       │             │
│           │              ┌────────┴────────┐              │             │
│           │              │   Better Auth   │              │             │
│           │              │  (OAuth/Device) │              │             │
│           │              └────────┬────────┘              │             │
│           │                       │                       │             │
│           ▼                       ▼                       ▼             │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐   │
│  │  Google Gemini  │     │   PostgreSQL    │     │   GitHub OAuth  │   │
│  │       AI        │     │    (Prisma)     │     │    Provider     │   │
│  └─────────────────┘     └─────────────────┘     └─────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **CLI Framework** | Commander.js | Command parsing and CLI structure |
| **Backend Server** | Express.js 5 | API server and authentication handler |
| **Frontend** | Next.js 16 + React 19 | Web-based authentication UI |
| **Database** | PostgreSQL + Prisma 6 | User data, sessions, conversations |
| **Authentication** | Better Auth | OAuth 2.0 Device Flow |
| **AI Provider** | Google Gemini (Vercel AI SDK) | Chat, tools, and structured output |
| **UI Components** | Radix UI + Tailwind CSS | Modern, accessible web components |
| **Terminal UI** | Chalk, Boxen, Clack Prompts | Beautiful CLI interface |

---

## 🔄 Authentication Flow

<img src="./assets/images/auth-flow.png" alt="Authentication Flow" width="100%">

### OAuth Device Flow Process

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Server
    participant Browser
    participant GitHub

    User->>CLI: helix login
    CLI->>Server: Request device code
    Server-->>CLI: Return device_code + user_code
    CLI->>User: Display verification URL & code
    CLI->>Browser: Open verification URL
    User->>Browser: Enter user_code
    Browser->>GitHub: Redirect to GitHub OAuth
    User->>GitHub: Authorize application
    GitHub-->>Server: Return auth tokens
    CLI->>Server: Poll for token (interval)
    Server-->>CLI: Return access_token
    CLI->>User: Login successful!
```

### Why Device Flow?

- ✅ **Secure** - No credentials stored in CLI
- ✅ **User-Friendly** - Browser-based authentication
- ✅ **Universal** - Works on any terminal/environment
- ✅ **Token Refresh** - Automatic session management

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** >= 14.0
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/helix-cli.git
cd helix-cli
```

### Step 2: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 3: Database Setup

```bash
cd server

# Create database (PostgreSQL)
createdb helix_db

# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### Step 4: Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

Edit the `.env` file with your credentials:

```env
# ========================================
# Database Configuration
# ========================================
DATABASE_URL="postgresql://user:password@localhost:5432/helix_db"

# ========================================
# GitHub OAuth Configuration
# ========================================
# Create OAuth App: https://github.com/settings/developers
# Callback URL: http://localhost:3005/api/auth/callback/github
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# ========================================
# Google Gemini AI Configuration
# ========================================
# Get API Key: https://aistudio.google.com/app/apikey
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

# Optional: AI Model Selection
HELIX_MODEL="gemini-1.5-flash"

# ========================================
# Environment
# ========================================
NODE_ENV="development"
```

### Step 5: Install CLI Globally (Optional)

```bash
cd server
npm link
```

Now you can use the `helix` command from anywhere.

---

## 🚀 Usage

### Starting the Services

Open **two terminal windows**:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
# Server running on http://localhost:3005
```

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
# Client running on http://localhost:3000
```

### CLI Commands

#### 🔐 Authentication

```bash
# Login with GitHub
helix login

# Check current user
helix whoami

# Logout
helix logout
```

#### 🤖 AI Modes

```bash
# Start AI interaction
helix wakeup
```

This presents a menu to choose your mode:

```
? Select an option:
❯ Chat        - Simple chat with AI
  Tool Calling - Chat with tools (Google Search, Code Execution)
  Agentic Mode - Advanced AI agent (Application Generator)
```

---

## 💬 Mode Details

### Chat Mode

Simple conversational AI for general queries.

```
💬 Your message: What is the capital of France?

🤖 Assistant:
─────────────────────────────────────────────────────
The capital of France is **Paris**. It's located in 
northern France along the Seine River and is one of 
the most visited cities in the world.
─────────────────────────────────────────────────────
```

**Features:**
- Markdown-rendered responses
- Conversation history
- Streaming output

### Tool Mode

AI with access to powerful tools:

| Tool | Description |
|------|-------------|
| 🔍 **Google Search** | Access real-time information from the web |
| 💻 **Code Execution** | Execute Python code for calculations |
| 🌐 **URL Context** | Analyze content from specific URLs |

```
? Select tools to enable (Space to select, Enter to confirm):
◉ Google Search    - Access the latest information using Google search
◉ Code Execution   - Generate and execute Python code
◯ URL Context      - Analyze specific URLs

💬 Your message: What's the current weather in Tokyo?

🛠️ Tool Calls:
┌────────────────────────────────────────┐
│ 🔧 Tool: google_search                 │
│ Args: { "query": "weather Tokyo now" } │
└────────────────────────────────────────┘
```

### Agent Mode

This mode is experimental. It now rejects unsafe output paths and refuses to overwrite existing project files.

Autonomous application generator that creates complete projects:

```
🤖 What would you like to build? 
Build a todo app with React and Tailwind

📂 Project Structure:
todo-app/
├── package.json
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   └── AddTodo.jsx
│   └── index.jsx
├── tailwind.config.js
└── README.md

✨ Application created successfully!

📋 Next Steps:
cd todo-app
npm install
npm run dev
```

---

## 📁 Project Structure

```
helix-cli/
├── 📁 server/                    # Backend & CLI
│   ├── 📁 src/
│   │   ├── 📁 cli/               # CLI application
│   │   │   ├── 📁 ai/            # AI service integration
│   │   │   │   └── google-service.js
│   │   │   ├── 📁 chat/          # Chat implementations
│   │   │   │   ├── chat-with-ai.js
│   │   │   │   ├── chat-with-ai-tool.js
│   │   │   │   └── chat-with-ai-agent.js
│   │   │   ├── 📁 commands/      # CLI commands
│   │   │   │   ├── 📁 auth/
│   │   │   │   │   └── login.js  # Auth commands
│   │   │   │   └── 📁 ai/
│   │   │   │       └── wakeUp.js # AI startup
│   │   │   └── main.js           # CLI entry point
│   │   ├── 📁 config/            # Configuration
│   │   │   ├── google.config.js
│   │   │   ├── tool.config.js
│   │   │   └── agent.config.js
│   │   ├── 📁 lib/               # Shared libraries
│   │   │   ├── auth.js           # Better Auth config
│   │   │   └── db.js             # Prisma client
│   │   ├── 📁 services/          # Business logic
│   │   │   └── chat.services.js
│   │   └── index.js              # Express server
│   ├── 📁 prisma/                # Database schema
│   │   ├── schema.prisma
│   │   └── 📁 migrations/
│   ├── .env.example
│   └── package.json
│
├── 📁 client/                    # Frontend (Next.js)
│   ├── 📁 app/
│   │   ├── 📁 (auth)/
│   │   │   └── 📁 sign-in/       # Login page
│   │   ├── 📁 device/            # Device verification
│   │   ├── 📁 approve/           # OAuth approval
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── 📁 components/
│   │   ├── 📁 ui/                # Radix UI components
│   │   ├── login-form.tsx
│   │   ├── approve-content.tsx
│   │   └── theme-provider.tsx
│   ├── 📁 lib/
│   │   ├── auth-client.ts
│   │   └── utils.ts
│   └── package.json
│
├── 📁 assets/
│   └── 📁 images/                # Documentation images
│
└── README.md
```

---

## 🗃️ Database Schema

### Entity Relationship

```sql
-- Users (authenticated via GitHub)
User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean
  image         String?
  sessions      Session[]
  accounts      Account[]
  conversations Conversation[]
}

-- Active sessions
Session {
  id        String    @id
  token     String    @unique
  expiresAt DateTime
  userId    String
}

-- OAuth accounts (GitHub)
Account {
  id           String    @id
  providerId   String    -- "github"
  accountId    String    -- GitHub user ID
  accessToken  String?
  userId       String
}

-- Device Flow codes
DeviceCode {
  id         String    @id
  deviceCode String
  userCode   String
  status     String    -- pending/approved/denied
  expiresAt  DateTime
}

-- AI Conversations
Conversation {
  id        String    @id
  userId    String
  title     String?
  mode      String    -- chat/tool/agent
  messages  Message[]
}

-- Chat messages
Message {
  id             String    @id
  conversationId String
  role           String    -- user/assistant/system/tool
  content        String
}
```

---

## ⚙️ Configuration

### AI Model Configuration

Available Gemini models:

| Model | Best For | Speed |
|-------|----------|-------|
| `gemini-1.5-flash` | Fast responses, general use | ⚡ Fastest |
| `gemini-1.5-pro` | Complex reasoning, coding | 🔥 Balanced |
| `gemini-2.0-flash-exp` | Latest features, experimental | 🧪 Cutting-edge |

Set in `.env`:
```env
HELIX_MODEL="gemini-1.5-flash"
```

### Tool Configuration

Tools are configured in `server/src/config/tool.config.js`:

```javascript
export const availableTools = [
  {
    id: 'google_search',
    name: 'Google Search',
    description: 'Access real-time information',
    getTool: () => google.tools.googleSearch({}),
  },
  {
    id: 'code_execution', 
    name: 'Code Execution',
    description: 'Execute Python code',
    getTool: () => google.tools.codeExecution({}),
  },
  {
    id: 'url_context',
    name: 'URL Context',
    description: 'Analyze URLs',
    getTool: () => google.tools.urlContext({}),
  },
];
```

---

## 🔌 API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `ALL` | `/api/auth/*` | Better Auth handlers |
| `GET` | `/api/me` | Get current session |
| `GET` | `/device` | Device verification redirect |

### Session Response

```json
{
  "session": {
    "id": "sess_xxx",
    "expiresAt": "2024-12-13T00:00:00.000Z",
    "token": "xxx",
    "userId": "user_xxx"
  },
  "user": {
    "id": "user_xxx",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://avatars.githubusercontent.com/u/xxx"
  }
}
```

---

## 🛡️ Security

### Token Storage

Tokens are stored securely in the user's home directory:

```
~/.helix-cli/token.json
```

**Contents:**
```json
{
  "access_token": "xxx",
  "refresh_token": "xxx",
  "token_type": "Bearer",
  "expires_at": "2024-12-13T00:00:00.000Z"
}
```

### Best Practices

- ✅ Tokens never leave your machine
- ✅ OAuth flow uses secure device authorization
- ✅ Session tokens are HTTP-only
- ✅ Database passwords are hashed
- ✅ Environment variables for secrets

---

## 🧪 Development

### Running in Development

```bash
# Server with hot reload
cd server
npm run dev

# Client with hot reload  
cd client
npm run dev
```

### Database Management

```bash
# View database in Prisma Studio
cd server
npx prisma studio

# Create migration
npx prisma migrate dev --name your_migration_name

# Reset database
npx prisma migrate reset
```

### Testing the CLI

```bash
# Link CLI locally
cd server
npm link

# Test commands
helix --help
helix login
helix wakeup
```

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>❌ "GITHUB_CLIENT_ID is not set"</b></summary>

Create a GitHub OAuth App:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set callback URL: `http://localhost:3005/api/auth/callback/github`
4. Copy Client ID and Secret to `.env`
</details>

<details>
<summary><b>❌ "Database connection failed"</b></summary>

1. Ensure PostgreSQL is running
2. Check `DATABASE_URL` in `.env`
3. Run `npx prisma migrate dev`
4. Verify database exists: `psql -l`
</details>

<details>
<summary><b>❌ "GOOGLE_GENERATIVE_AI_API_KEY is not set"</b></summary>

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an API key
3. Add to `.env` as `GOOGLE_GENERATIVE_AI_API_KEY`
</details>

<details>
<summary><b>❌ "Device code expired"</b></summary>

The device code expires after 30 minutes. Run `helix login` again.
</details>

---

## 📋 Scripts Reference

### Server Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm run dev` | Start with nodemon |
| Production | `npm start` | Start production server |

### Client Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm run dev` | Start Next.js dev server |
| Build | `npm run build` | Create production build |
| Start | `npm start` | Run production build |
| Lint | `npm run lint` | Run ESLint |

---

## 🗺️ Roadmap

- [x] OAuth Device Flow Authentication
- [x] Chat Mode with streaming
- [x] Tool Mode (Google Search, Code Execution)
- [x] Agent Mode (Experimental application generator with safe file output)
- [ ] Multi-turn tool conversations
- [ ] Image generation support
- [ ] Voice input/output
- [ ] Plugin system for custom tools
- [ ] Team collaboration features
- [ ] Cloud sync for conversations

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- ESLint for JavaScript/TypeScript
- Prettier for formatting
- Conventional Commits for commit messages

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2024

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 🙏 Acknowledgments

- [Better Auth](https://github.com/better-auth/better-auth) - OAuth implementation
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [Google Gemini](https://ai.google.dev/) - AI models
- [Prisma](https://prisma.io/) - Database ORM
- [Radix UI](https://radix-ui.com/) - UI components
- [Chalk](https://github.com/chalk/chalk) & [Boxen](https://github.com/sindresorhus/boxen) - Terminal styling

---

<p align="center">
  <strong>Made with ❤️ by the Helix CLI Team</strong>
</p>

<p align="center">
  <a href="https://github.com/yourusername/helix-cli/issues">Report Bug</a> •
  <a href="https://github.com/yourusername/helix-cli/issues">Request Feature</a>
</p>
