# React + TypeScript Boilerplate

A clean and scalable React + TypeScript boilerplate setup using Vite.

---

# Features

- React + TypeScript
- Vite for fast development
- ESLint configuration
- Reusable folder structure
- API service layer
- Environment variable support
- Responsive design setup
- Easy scalability

---

# Tech Stack

- React
- TypeScript
- Vite
- Axios
- Tailwind CSS
- React Router DOM

---

# Project Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/react-ts-boilerplate.git
```

---

## 2. Navigate to Project

```bash
cd react-ts-boilerplate
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Development Server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:5173
```

---

# Build Project

```bash
npm run build
```

---

# Preview Production Build

```bash
npm run preview
```

---

# Folder Structure

```bash
src/
│
├── assets/         # Images, icons, static files
├── components/     # Reusable UI components
├── pages/          # Application pages
├── layouts/        # Layout components
├── routes/         # Route configurations
├── services/       # API services
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
├── types/          # TypeScript types/interfaces
├── context/        # Context API
├── styles/         # Global styles
├── App.tsx
└── main.tsx
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Build production app |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

---

# Live Demo

🔗 Live Demo:
https://your-live-demo-link.com

---

# Git Workflow

## Create Branch

```bash
git checkout -b feature/login-page
```

---

## Commit Changes

```bash
git add .
git commit -m "FRONT-101 Add login page"
```

---

## Push Branch

```bash
git push origin feature/login-page
```

---

# Best Practices

- Use reusable components
- Keep types inside `types/`
- Store APIs inside `services/`
- Avoid using `any`
- Use environment variables for secrets
- Follow clean code principles

---

# Deployment

You can deploy this project using:

- Vercel
- Netlify
- Render
- Firebase Hosting

---

# Author

Shobhit Damwala

---

# License

This project is licensed under the MIT License.