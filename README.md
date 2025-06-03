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

npm / yarn

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

The application will be available at:

Frontend: http://localhost:3000

Backend API: http://localhost:5000



---

🧪 API Endpoints

Auth

POST /api/auth/register – Register

POST /api/auth/login – Login

GET /api/auth/me – Current user info


Stores

GET /api/stores – All stores

GET /api/stores/:id – Store details

POST /api/stores – Create store

PUT /api/stores/:id – Update store

DELETE /api/stores/:id – Delete store


Ratings

GET /api/ratings – All ratings

POST /api/ratings – New rating

PUT /api/ratings/:id – Update rating

DELETE /api/ratings/:id – Delete rating



---

🗂 Project Structure

store-rating-platform/
├── backend/
│   ├── src/
│   └── .env
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

3. Update your .env file to match your DB credentials




---

🧩 Troubleshooting Tips

Common Issues

Port Conflicts: Change ports in .env or stop the running process

DB Errors: Ensure DB is running and credentials match

Missing node_modules: Run npm install again

Wrong Directory: Always verify using pwd or dir



---

🧑‍💻 Contributing

1. Fork the repo


2. Create a new branch: git checkout -b feature/YourFeature


3. Commit: git commit -m 'Add feature'


4. Push: git push origin feature/YourFeature


5. Submit a Pull Request




---

📜 License

This project is licensed under the MIT License.


---

👤 Author

Mohammad Muqsit Raja
GitHub: @mmrcode
Project: Store Rating Platform
