# Task Management System

A full-stack Task Management application with user authentication and a Kanban-style board to manage tasks efficiently.

Live Demo: https://taskmanagement-frontend-iwo6.onrender.com/


Project Overview

This application allows authenticated users to manage tasks using a Kanban workflow:

- User registration, login, logout
- Update and delete user profile
- Create, update, delete tasks
- Tasks organized into Pending, In Progress, and Completed
- Drag & drop tasks between columns (status persisted via backend)
- Tasks are user-specific and filterable by status
- Responsive UI for desktop and mobile


 Tech Stack

  Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- express-validator

  Frontend
- React 18
- React Router v6
- Axios
- @dnd-kit (Drag & Drop)
- Custom CSS (Responsive)

  Deployment
- Backend: Render
- Database: MongoDB Atlas
- Frontend: Vercel



Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
Server runs at:
http://localhost:5000
```

Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
App runs at:
http://localhost:3000
```

🔐 Environment Variables
Backend (backend/.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development

Frontend (frontend/.env)
REACT_APP_API_URL=http://localhost:5000/api

📷 Screenshots

<img width="1140" height="934" alt="Screenshot 2026-01-13 215236" src="https://github.com/user-attachments/assets/cfe0342d-d82f-4abf-b319-b5b5a9d66ea3" />

<img width="932" height="843" alt="Screenshot 2026-01-13 215247" src="https://github.com/user-attachments/assets/bbfb80ea-ad20-43a3-86a5-3ad2c313ecf8" />

<img width="1919" height="940" alt="Screenshot 2026-01-13 215214" src="https://github.com/user-attachments/assets/8220877f-c25b-4508-935f-c3ba4fb6de13" />

<img width="1919" height="939" alt="Screenshot 2026-01-13 214427" src="https://github.com/user-attachments/assets/241a021b-993b-4284-86ae-a206eb403e1c" />

<img width="1919" height="941" alt="Screenshot 2026-01-13 214352" src="https://github.com/user-attachments/assets/2d68f096-ea05-4657-80d4-615e5521a064" />

