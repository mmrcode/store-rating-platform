🏬 Store Rating Platform

A full-stack web application that enables users to browse, rate, and review local stores. Built with modern web technologies, it ensures a seamless and responsive user experience.


---

🚀 Features

🔐 User Authentication (JWT-based)

🏪 Store Listing & Detailed Views

⭐ Rating and Review System

👤 User Dashboard

📱 Fully Responsive (Material-UI)



---

🛠 Tech Stack

Frontend

React.js

Material-UI

React Router DOM

Axios

Formik + Yup


Backend

Node.js + Express.js

PostgreSQL + Sequelize ORM

JWT Authentication



---

⚙️ Getting Started

📋 Prerequisites

Node.js (v14+)

PostgreSQL

npm or yarn

Git



---

📥 Installation Steps

1. Clone the Repository

git clone https://github.com/mmrcode/store-rating-platform.git
cd store-rating-platform

2. Backend Setup

cd backend
npm install

Create a .env file inside the backend folder:

PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=store_rating_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=info

3. Frontend Setup

cd ../frontend
npm install


---

▶️ Running the App

Open two terminal windows:

Terminal 1: Backend

cd backend
npm run dev

Terminal 2: Frontend

cd frontend
npm start

App will be available at:

Frontend: http://localhost:3000

Backend: http://localhost:5000



---

🧪 API Endpoints

Auth

POST   /api/auth/register   → Register
POST   /api/auth/login      → Login
GET    /api/auth/me         → Get current user

Stores

GET    /api/stores          → Get all stores
GET    /api/stores/:id      → Get store details
POST   /api/stores          → Create store
PUT    /api/stores/:id      → Update store
DELETE /api/stores/:id      → Delete store

Ratings

GET    /api/ratings         → Get all ratings
POST   /api/ratings         → Create rating
PUT    /api/ratings/:id     → Update rating
DELETE /api/ratings/:id     → Delete rating


---

🗂 Project Structure

store-rating-platform/
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md


---

🛢 Database Setup

1. Ensure PostgreSQL is installed and running


2. Create the database:



CREATE DATABASE store_rating_db;

3. Verify .env file matches your DB credentials




---

🧩 Troubleshooting

Port 3000/5000 already in use
→ Kill process or change ports in .env

Database connection error
→ Check credentials and that DB is running

Missing node_modules
→ Run npm install again in the correct directory

Wrong directory errors
→ Use pwd or dir to check location



---

🧑‍💻 Contributing

1. Fork the repo


2. Create branch:



git checkout -b

---

✅ Final Notes

This project was built with scalability and maintainability in mind, and follows modern best practices across both frontend and backend stacks.

If you're reviewing this as part of a coding challenge or technical assessment, I welcome any feedback. I'm continuously learning and eager to grow as a full-stack developer.

Thank you for your time and consideration!


---

👋 Contact

Mohammad Muqsit Raja
🔗 GitHub: @mmrcode
📨 Email: mohammadmuqsitraja@gmail.com


