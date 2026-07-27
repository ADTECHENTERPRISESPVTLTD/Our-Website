# 🤖 AD TECH AI Chatbot - External Website Integration Guide

This guide details how to integrate the **AD TECH AI Chatbot** into your main company website or any external web platform (React, WordPress, HTML/JavaScript, Vue, PHP, Next.js).

---

## 🏗️ Architecture Overview

The chatbot consists of two layers:
1. **Backend API Service (RAG Engine):** Hosted at your server endpoint (e.g. `https://your-company-domain.com/api/chat` and `/api/leads`).
2. **Frontend UI Widget:** Embedded into any website frontend.

---

## 🔌 Method 1: React / Next.js Integration (Component Import)

If your main company website uses React or Next.js:

1. **Copy Component Files:**
   - Copy `src/components/ChatWidget.tsx` to your project's `components/` folder.
   - Copy `src/data/knowledgeBase.ts` (or connect to your API).

2. **Embed in your Root Layout or Page:**
   ```tsx
   import ChatWidget from '@/components/ChatWidget';

   export default function App() {
     return (
       <div>
         {/* Your Company Website Content */}
         
         {/* Floating AI Chatbot */}
         <ChatWidget />
       </div>
     );
   }
   ```

---

## 🌐 Method 2: Universal HTML / JavaScript Script Embed (WordPress, PHP, Static HTML)

For static HTML sites, WordPress, Webflow, or PHP sites:

1. Host the compiled Chatbot Widget or render it inside an `iframe` / Web Component.
2. Add the snippet before `</body>` on your site:
   ```html
   <!-- AD TECH AI Chatbot Widget -->
   <div id="adtech-chatbot-root"></div>
   <script src="https://your-bot-domain.com/widget.js" defer></script>
   ```

---

## 📱 Cross-Device Optimization Features Included

- **Mobile Phones (< 640px):** Automatically expands to full-screen dynamic viewport (`100dvh`) to prevent soft-keyboard clipping on iOS Safari and Android Chrome.
- **Tablets & iPads (640px – 1024px):** Renders as an optimized floating drawer (`420px × 85vh`).
- **PCs & Laptops (> 1024px):** Renders as a floating corner modal (`420px × 640px`).
- **Touch Accessibility:** Minimum 44×44px hit targets for finger taps.
- **Auto Theme Sync:** Automatically matches dark/light mode according to user OS preferences (`prefers-color-scheme`).

---

## ⚙️ Environment Variables Required on API Server

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
RESEND_API_KEY=your_resend_email_api_key_here (optional, for email lead alerts)
```
