# AD TECH Enterprises Workspace

Welcome to the consolidated workspace for **AD TECH Enterprises**. The repository is organized as a unified monorepo hosting a single Next.js frontend application and an Express backend API.

---

## 📁 Repository Directory Structure

```text
Our-Website/
│
├── backend/                         # Unified Express & Mongoose API (Port 5000)
│   ├── config/                      # Cloudinary & MongoDB database connections
│   ├── controllers/                 # Callback, Career, and Intern management controllers
│   ├── middleware/                  # Multer file upload and auth guard middlewares
│   ├── models/                      # Mongoose models (Attendance, Callback, Career, Intern, Task)
│   ├── routes/                      # Route bindings for API endpoints
│   ├── server.js                    # Express application entrypoint
│   └── package.json                 # Backend dependencies & dev scripts
│
├── frontend/                        # Consolidated Next.js App Router Project (Port 3000)
│   ├── public/                      # Static assets (including bot-avatar and company logo)
│   ├── src/
│   │   ├── app/                     # App Router pages and styled section components
│   │   │   ├── layout.tsx           # Base HTML shell and global font/theme configurations
│   │   │   ├── globals.css          # Global stylesheet containing core design tokens
│   │   │   │
│   │   │   ├── (marketing)/         # Route group for corporate marketing pages (with Navbar/Footer)
│   │   │   │   ├── page.tsx         # Corporate Homepage landing page
│   │   │   │   ├── about/           # About Us and responsive Core Values section
│   │   │   │   ├── careers/         # Job opportunities and validation hooks
│   │   │   │   ├── contact/         # Contact Info cards and responsive form elements
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── intern/              # Route group for the functional Intern Management Portal
│   │   │       ├── page.tsx         # Root redirect to the Portal login page
│   │   │       ├── login/           # Intern Portal Login page
│   │   │       ├── dashboard/       # Intern dashboard (fetches tasks & attendance from backend)
│   │   │       ├── tasks/           # Assigned tasks list with responsive inline updates
│   │   │       └── attendance/      # Attendance marking page
│   │   │
│   │   ├── components/              # Shared layouts, visual sections, and interactive UI components
│   │   └── lib/                     # Global client side tools (Axios client, validators, state hooks)
│   │
│   └── package.json                 # Unified Next.js dependencies & scripts
│
├── package.json                     # Workspace script aggregator
└── .gitignore                       # Global monorepo rules for node_modules, builds, and envs
```

---

## 🔌 Port Mapping

| Service | Port | Technology | URL |
| :--- | :--- | :--- | :--- |
| **Backend API** | `5000` | Node.js / Express / Mongoose | [http://localhost:5000](http://localhost:5000) |
| **Consolidated Frontend** | `3000` | Next.js / Tailwind CSS | [http://localhost:3000](http://localhost:3000) |

*All endpoints and pages are consolidated into these two services. The legacy `frontend/intern-portal` (previously on port `3001`) has been successfully merged under `/intern/*` routes in the main frontend.*

---

## 🚀 Getting Started

### 1. Installation
Install all dependencies across the workspace using the aggregated setup runner:
```bash
npm run install:all
```

### 2. Environment Configuration

#### Backend Config (`backend/.env`):
Create/verify the `.env` file in the `backend/` folder:
```env
PORT=5000
MONGODB_URI=mongodb://<username>:<password>@cluster.mongodb.net/adtech
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=adtech_secret_key_jwt_token_signing_123
```

#### Frontend Config (`frontend/.env.local`):
Create/verify the `.env.local` file in the `frontend/` folder:
```env
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Running in Development
Start both servers concurrently from the workspace root:
```bash
npm run dev:all
```

This command runs:
- Backend Express dev server on `http://localhost:5000`
- Combined Frontend Next.js server on `http://localhost:3000`

---

## 🛠️ Monorepo Workspace Command Reference

Run these commands from the root directory:
- `npm run dev`: Starts only the Next.js frontend development server.
- `npm run dev:all`: Starts the frontend development server AND Express backend concurrently.
- `npm run install:all`: Performs a clean installation of all dependencies for workspace root, backend, and frontend.
- `npm run build:all`: Compiles the Next.js production build under `frontend/`.
