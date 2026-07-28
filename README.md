# AD TECH Enterprises Workspace

Welcome to the unified workspace for **AD TECH Enterprises**. This repository is structured as a multi-app repository, organizing both frontends and the backend into clear, standardized directories, run concurrently from the root.

---

## 📁 Directory Structure

```
Our-Website/
├── backend/                         # Unified Express & Mongoose API
│   ├── config/                      # Cloudinary & MongoDB configurations
│   ├── controllers/                 # Callback, Career, and Intern management controllers
│   ├── middleware/                  # Multer file upload middleware
│   ├── models/                      # Database schemas (Attendance, Callback, Career, Intern, Task, Requirement)
│   ├── routes/                      # Route bindings for API endpoints
│   ├── uploads/                     # Temp storage directory for resume uploads
│   ├── server.js                    # Unified Express application
│   └── package.json                 # Backend dependencies & dev scripts
│
├── frontend/                        # Frontend applications
│   ├── main/                        # Main AD TECH Next.js website (Port 3000)
│   │   ├── src/                     # App Router pages and styled section components
│   │   │   ├── app/                 # about, contact, requirement, services, careers, faq
│   │   │   └── components/          # navbar, footer, sections, ui controls
│   │   ├── public/                  # Main site static assets
│   │   └── package.json             # Next.js configurations
│   │
│   └── intern-portal/               # Intern Management Portal Next.js app (Port 3001)
│       ├── src/                     # Login, Dashboard, Attendance tracking pages
│       ├── public/                  # Intern portal assets
│       └── package.json             # Next.js configurations
│
├── package.json                     # Root npm commands and workspace runners
├── README.md                        # Project documentation
└── .gitignore                       # Git ignore rules for node_modules, builds, and envs
```

---

## 🔌 Port Mapping

| Service | Technology | Port | Access URL |
| :--- | :--- | :--- | :--- |
| **Backend API** | Node.js / Express | `5000` | [http://localhost:5000](http://localhost:5000) |
| **Main Website** | Next.js / Tailwind | `3000` | [http://localhost:3000](http://localhost:3000) |
| **Intern Portal** | Next.js / Tailwind | `3001` | [http://localhost:3001](http://localhost:3001) |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Installation
Install all dependencies across the backend and frontends using the custom workspace command:
```bash
npm run install:all
```

### 2. Environment Configuration

#### Backend Config:
Create a `.env` file inside the `backend/` folder and populate the following variables:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/adtech
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend Chatbot Config:
Create a `.env.local` file inside BOTH the `frontend/main/` and `frontend/intern-portal/` directories:
```env
GEMINI_API_KEY=your_google_gemini_api_key
```
> [!NOTE]
> If `GEMINI_API_KEY` is not provided or is invalid, the chatbot will automatically fall back to an offline mode using local vector database keyword matching.


### 3. Running in Development
Start all frontends and the backend concurrently with a single command from the root folder:
```bash
npm run dev
```

This will spin up:
- Backend nodemon dev server on `http://localhost:5000`
- Main website Next.js server on `http://localhost:3000`
- Intern portal Next.js server on `http://localhost:3001`

---

## 🛠️ Build & Production commands

You can build the production-ready bundles for the frontend applications individually or all at once:

- **Build Main Website:**
  ```bash
  npm run build:main
  ```
- **Build Intern Portal:**
  ```bash
  npm run build:intern
  ```
- **Build Both Apps:**
  ```bash
  npm run build:all
  ```

---

## ✨ UI & Animation Components

The repository includes a modern, high-performance UI library using GSAP and Framer Motion located under `frontend/main/src/components/ui/`:

- **`SplitText`**: Smooth, scroll-triggered text-reveal animations.
- **`LogoLoop`**: Endlessly looping, GPU-accelerated typed carousel.
- **`BorderGlow`**: Interactive card wrappers with colorful hover glow borders.
- **`SpotlightCard`**: Interactive cards featuring custom cursor-following spotlights.
- **`AnimatedHeading`**: Component combining `SplitText` and custom scroll triggers.

---

## ⚡ Backend REST APIs

The unified API server connects to MongoDB and binds the following endpoints:

| Domain | Route | HTTP Method | Action |
| :--- | :--- | :--- | :--- |
| **Requirements** | `/api/requirements` | `POST` | Submit software requirements |
| **Callbacks** | `/api/callback` | `POST` / `GET` | Request / retrieve callback schedules |
| **Careers** | `/api/careers` | `POST` | Submit job/intern application (with resume upload) |
| **Contacts** | `/api/contact` | `POST` / `GET` | Submit / retrieve contact inquiries |
| **Newsletters** | `/api/newsletter` | `POST` / `GET` | Subscribe / retrieve newsletter emails |
| **Attendance** | `/api/attendance` | `POST` / `PUT` / `GET` | Mark intern online, offline, or view history |
| **Tasks** | `/api/tasks` | `POST` / `PUT` / `GET` | Create, update, or assign task lists |
| **Dashboard** | `/api/dashboard` | `GET` | Fetch monorepo system performance summaries |

