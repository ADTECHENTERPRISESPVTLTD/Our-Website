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
Create a `.env` file inside the `backend/` folder and populate the variables:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/adtech
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

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
