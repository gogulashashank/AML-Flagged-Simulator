# 🚨 AML Transaction Flagging Simulator

> An interactive, browser-based simulator that puts you in the role of an AML Compliance Analyst — reviewing real-world-style financial transactions and deciding which ones to flag as suspicious.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-blue?style=for-the-badge)](https://aml-flagged-simulator.vercel.app)
[![Built With](https://img.shields.io/badge/Built%20With-React%20%2B%20TypeScript-61DAFB?style=for-the-badge&logo=react)]
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)]

---

## 📌 About the Project

This simulator was built to demonstrate practical knowledge of **Anti-Money Laundering (AML)** concepts, transaction monitoring, and financial crime red flags — presented in an engaging, game-like format.

The app walks users through a series of financial transactions and challenges them to identify which ones exhibit suspicious behaviour based on real AML typologies such as:

- Structuring / Smurfing
- Rapid movement of funds
- Unusual transaction patterns
- High-risk jurisdiction transfers
- Round-dollar transactions

---

## 🎮 How It Works

1. **Intro Screen** — Brief overview of your role as a compliance analyst
2. **Game Board** — Review a series of transactions with key details (amount, origin, frequency, counterparty)
3. **Outcome Screen** — See your score, which transactions you correctly flagged, and explanations for each decision

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + TypeScript | Frontend framework & type safety |
| Vite | Fast build tool & dev server |
| Zustand (store) | Lightweight global state management |
| CSS Modules | Scoped component styling |
| Docker | Containerisation for consistent deployment |
| Vercel | Cloud deployment & CI/CD |

---

## 📁 Project Structure

```
src/
├── components/      # IntroScreen, GameBoard, OutcomeScreen
├── data/            # Transaction datasets & AML scenarios
├── store/           # Zustand state management
├── styles/          # Global and component styles
├── utils/           # Scoring logic and AML flag detection
├── App.tsx          # Root component with stage routing
└── main.tsx         # App entry point
```

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/gogulashashank/AML-Flagged-Simulator.git

# Navigate to the project directory
cd AML-Flagged-Simulator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🐳 Running with Docker

```bash
docker build -t aml-simulator .
docker run -p 8080:80 aml-simulator
```

---

## 🎯 Why I Built This

I am actively pursuing a career in **AML Compliance and Financial Crime Prevention**, and I wanted to go beyond just studying theory. This project demonstrates:

- Understanding of AML red flags and transaction monitoring
- Ability to translate compliance knowledge into a working technical product
- Hands-on experience with React, TypeScript, and modern deployment pipelines

It complements my studies towards the **ICA Certificate in Anti-Money Laundering**.

---

## 📬 Contact

**Shashank Gogula**  
[LinkedIn](https://www.linkedin.com/in/gogulashashank) • [GitHub](https://github.com/gogulashashank)

---

*Built with React + TypeScript + Vite | Deployed on Vercel*
