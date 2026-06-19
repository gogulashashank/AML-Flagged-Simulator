<div align="center">

# 🚨 AML Transaction Flagging Simulator

**Step into the shoes of an AML Compliance Analyst.**
Review real-world-style financial transactions. Spot the red flags. File your report.

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20App-blue?style=for-the-badge)](https://aml-flagged-simulator.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![AML Domain](https://img.shields.io/badge/Domain-AML%20Compliance-red?style=for-the-badge)](#)
[![ICA](https://img.shields.io/badge/ICA-AML%20Certificate-darkgreen?style=for-the-badge)](#)

</div>

---

## 🗺️ How the Simulator Works — Visual Flow

```mermaid
flowchart TD
    A([👤 User opens simulator]) --> B[📋 Intro Screen\nRole briefing as AML Analyst]
    B --> C[🃏 Game Board\nReview transaction cases one by one]
    C --> D{🔍 Analyst Decision}
    D -->|🚩 Flag as Suspicious| E[AML Rule Matched]
    D -->|✅ Mark as Normal| F[Cleared Transaction]
    E --> G[Score Updated]
    F --> G
    G --> H{More cases?}
    H -->|Yes| C
    H -->|No| I[📊 Outcome Screen\nScore + explanations for every decision]
    I --> J([🎓 Learning outcome\nUnderstand each AML red flag])
```

---

## 🏗️ System Architecture

```mermaid
flowchart LR
    subgraph Frontend ["⚛️ React + TypeScript Frontend"]
        A[IntroScreen.tsx] --> B[GameBoard.tsx]
        B --> C[OutcomeScreen.tsx]
    end

    subgraph State ["🗃️ Zustand State"]
        D[(useGameStore)]
    end

    subgraph Data ["📦 Data Layer"]
        E[transactions.ts\nAML Scenarios]
        F[amlFlags.ts\nRed Flag Rules]
    end

    subgraph Utils ["🔧 Logic"]
        G[scoring.ts]
        H[flagDetection.ts]
    end

    subgraph Deploy ["☁️ Deployment"]
        I[Docker Container]
        J[Vercel CDN]
    end

    B <--> D
    D --> G
    E --> B
    F --> H
    H --> D
    Frontend --> I
    Frontend --> J
```

---

## 🚩 AML Red Flags Covered

| # | Red Flag | Description |
|---|----------|-------------|
| 1 | **Structuring / Smurfing** | Breaking large sums into smaller deposits to avoid reporting thresholds |
| 2 | **Rapid Movement of Funds** | Money transferred out immediately after deposit — layering pattern |
| 3 | **Unusual Transaction Patterns** | Activity inconsistent with a customer's profile or history |
| 4 | **High-Risk Jurisdiction Transfers** | Funds moving to/from FATF grey-listed or sanctioned countries |
| 5 | **Round-Dollar Transactions** | Suspiciously clean amounts (e.g. £10,000.00) with no business rationale |

---

## 🎮 User Journey — Three Screens

```mermaid
sequenceDiagram
    actor User as 👤 Compliance Analyst
    participant I as 📋 Intro Screen
    participant G as 🃏 Game Board
    participant O as 📊 Outcome Screen

    User->>I: Opens app
    I->>User: Explains role & AML context
    User->>G: Starts simulation
    loop For each transaction
        G->>User: Shows transaction details\n(amount, origin, frequency, counterparty)
        User->>G: Flags 🚩 or Clears ✅
    end
    G->>O: All transactions reviewed
    O->>User: Final score + per-decision explanations
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|----------|
| **Frontend** | React 18 + TypeScript | Component-based UI with full type safety |
| **Build** | Vite | Fast dev server & optimised production builds |
| **State** | Zustand | Lightweight global state management |
| **Styling** | CSS Modules | Scoped, maintainable component styles |
| **Container** | Docker + nginx | Portable deployment anywhere |
| **Hosting** | Vercel | Global CDN, instant deploys from GitHub |

---

## 📁 Project Structure

```
AML-Flagged-Simulator/
├── 📂 src/
│   ├── 📂 components/       # IntroScreen, GameBoard, OutcomeScreen
│   ├── 📂 data/             # Transaction datasets & AML scenarios
│   ├── 📂 store/            # Zustand state management
│   ├── 📂 styles/           # Global and component CSS Modules
│   ├── 📂 utils/            # Scoring logic & AML flag detection
│   ├── 📄 App.tsx           # Root component with stage routing
│   └── 📄 main.tsx          # App entry point
├── 📄 Dockerfile            # Container configuration
├── 📄 nginx.conf            # Production server config
├── 📄 package.json
└── 📄 vite.config.ts
```

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/gogulashashank/AML-Flagged-Simulator.git
cd AML-Flagged-Simulator

# 2. Install & run
npm install
npm run dev
# → Open http://localhost:5173
```

## 🐳 Run with Docker

```bash
docker build -t aml-simulator .
docker run -p 8080:80 aml-simulator
# → Open http://localhost:8080
```

---

## 🎯 Why I Built This

I am actively pursuing a career in **AML Compliance and Financial Crime Prevention**. This project bridges the gap between theory and practice — translating knowledge from my **ICA Certificate in Anti-Money Laundering** into a working, deployable product that demonstrates:

- ✅ Real understanding of AML typologies and red flags
- ✅ Ability to build production-ready tools with React + TypeScript
- ✅ End-to-end ownership: design → build → containerise → deploy

---

## 📬 Contact

**Shashank Gogula** — MSc Business Analytics | AML & Compliance

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/gogulashashank)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat&logo=github)](https://github.com/gogulashashank)

---

<div align="center">

*Built with React + TypeScript + Vite | Deployed on Vercel*

</div>
