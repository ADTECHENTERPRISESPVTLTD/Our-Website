# AD TECH AI Chatbot Integration & Knowledge Assistant

This repository contains the official AI Chatbot Integration and Knowledge Assistant for **AD Tech Enterprises Pvt. Ltd.**

The project is built as a production-ready MVP using **Next.js (App Router)**, **React**, and **Tailwind CSS v4**, and is integrated directly with the **Gemini API** for generative responses, with an intelligent local rule-based system that activates if no API key is present.

---

## 🛠️ Technology Stack
- **Frontend**: React 19, Next.js 15 (App Router), Tailwind CSS v4, Lucide React (for premium icons).
- **Backend/API Routing**: Next.js Serverless Route Handlers (Node.js/TypeScript environment).
- **AI Engine**: `@google/generative-ai` SDK (`gemini-1.5-flash` model).

---

## 🏗️ Project Architecture & Components

The application is modularized as follows:

```
Our-Website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts       # Backend chat handler & Gemini execution
│   │   ├── globals.css            # Global CSS, theme mapping, custom animations
│   │   ├── layout.tsx             # Root template & font definitions
│   │   └── page.tsx               # Mock Landing Page hosting the floating widget
│   ├── components/
│   │   └── ChatWidget.tsx         # Floating chatbot widget, forms, theme toggles
│   └── data/
│       └── knowledgeBase.ts       # Structured company knowledge & facts
├── package.json                   # Node modules & build tasks configuration
└── tsconfig.json                  # TypeScript compiler settings
```

---

## 🤖 AI Flow and System Design

### 1. Conversation & Context Flow
```mermaid
graph TD
    A[User Message] --> B[ChatWidget Component]
    B -->|Check Session Storage| C[Append to History]
    C --> D[POST /api/chat]
    D -->|Check environment| E{GEMINI_API_KEY set?}
    E -->|Yes| F[Initialize GoogleGenerativeAI]
    F --> G[Load local KNOWLEDGE_BASE context]
    G --> H[Query gemini-1.5-flash]
    H --> I[Return AI Response]
    E -->|No| J[Keyword Match in local KB]
    J -->|Match Found| K[Return matched answer]
    J -->|No Match| L[Return helpful contact fallback]
    I --> M[Render Message & update sessionStorage]
    K --> M
    L --> M
```

### 2. Prompt Structure (System Instructions)
When `GEMINI_API_KEY` is provided, the API handler builds a system instruction that forces the LLM to restrict its answers to the AD TECH knowledge base:
- **Scope Restriction**: The assistant is strictly ordered to only answer questions based on the local knowledge base structure.
- **Tone & Conciseness**: The assistant is guided to output clear, professional, and brief answers (typically 1 to 3 sentences).
- **Graceful Fallbacks**: If the question is outside the knowledge base context, it returns a friendly fallback suggesting that the user email `hradtechenterpriseschepvtltd@gmail.com` or call `+91 83193 58568`.

---

## 💼 Core Features & Quick Actions

1. **Floating Holographic Widget**: Borderless floating holographic robot drone positioned at the bottom right that expands/collapses smoothly.
2. **Speech Recognition (Voice Input)**: Micro-interaction voice capability allowing users to dictate queries directly into the chatbox using speech recognition.
3. **Persistent Local History**: Messages are saved in browser `localStorage` ensuring chat continuity across browser sessions and page reloads.
4. **Interactive Quick Actions & Navigation Assistance**:
   - **Our Services**: Auto-scrolls user to the services section of the page and returns details on web dev, backend databases, and AI.
   - **Apply for Internship**: Auto-scrolls to Careers, provides the HR application email and list of open developer slots.
   - **Book a Callback**: Opens a dynamic form directly inside the chat window for capturing user names, phone numbers, and emails.
   - **Submit Requirements**: Opens a business scoping form inside the chat window.
5. **Backend Lead Intake (Resend Integration)**: Interactive forms trigger serverless `/api/leads` handler to log incoming leads to the server console and dispatch live email alerts to administrative staff (`hradtechenterpriseschepvtltd@gmail.com`) using Resend API.
6. **Bouncing Typing Indicators**: Real-time visual feedback while waiting for API/Generative responses.
7. **Theme Switching**: Seamless dark/light mode toggle inside the widget header.

---

## 🚀 How to Run and Set Up

### 1. Clone & Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### 2. Environment Variables Setup
Create a `.env.local` file in the root of the project and add your Gemini API Key:
```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```
*Note: If no `.env.local` is present, the key is missing, or the key remains the placeholder, the system will automatically degrade gracefully to the local rule-based matching engine without crashing.*

### 3. Connection Status Indicator
We've added a premium visual feedback dot in the widget header:
* **Emerald Pulse (AI Online)**: The chatbot is actively communicating with the live Gemini API.
* **Amber Dot (Offline Fallback)**: The Gemini API is either disabled, blocked by quota, or experiencing networks errors. The chatbot uses local rule-based matches in [knowledgeBase.ts](file:///c:/Users/soham/OneDrive/Desktop/New%20folder/Our-Website/src/data/knowledgeBase.ts) to guarantee zero downtime.

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to test.

---

## 🔌 Integration Guide
To integrate this chatbot widget into any other page or layout in your Next.js application, simply import and render it:

```tsx
import ChatWidget from '@/components/ChatWidget';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        {/* Render widget at the root level */}
        <ChatWidget />
      </body>
    </html>
  );
}
```

---

## 🔮 Future Improvements
- **Vector Search Database (RAG)**: Connect the backend to a vector database (e.g., Pinecone or ChromaDB) to support massive documents and FAQs dynamically.
- **Callback DB Integration**: Save submitted callback details directly into a SQL or MongoDB database.
- **Email/Slack Alerts**: Automatically send email notifications to HR or developers when a user submits requirements or requests a callback.
- **Authentication**: Keep chat history saved across user logins rather than just browser sessions.
