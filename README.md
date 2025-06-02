# Store Rating Platform

A full-stack web application for rating and reviewing stores, built with React and Node.js.

## Features

- User authentication and authorization
- Store listings and details
- Rating and review system
- User dashboard
- Responsive design with Material-UI

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- Axios
- Formik & Yup

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn
- Git

### Installation

1. Clone the repository:

For Git Bash:
```bash
git clone https://github.com/mmrcode/store-rating-platform.git
cd store-rating-platform
```

For Windows PowerShell:
```powershell
git clone https://github.com/mmrcode/store-rating-platform.git
cd store-rating-platform
```

For Linux/Mac Terminal:
```bash
git clone https://github.com/mmrcode/store-rating-platform.git
cd store-rating-platform
```

2. Set up the backend:

For Git Bash:
```bash
cd backend
npm install
```

For Windows PowerShell:
```powershell
cd backend
npm install
```

For Linux/Mac Terminal:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following content:
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=store_rating_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=info
```

4. Set up the frontend:

For Git Bash:
```bash
cd ../frontend
npm install
```

For Windows PowerShell:
```powershell
cd ../frontend
npm install
```

For Linux/Mac Terminal:
```bash
cd ../frontend
npm install
```

5. Start the development servers:

For the backend (in one terminal):

Git Bash:
```bash
cd "/c/Users/moham/Desktop/Coding Challenge/backend"
npm run dev
```

Windows PowerShell:
```powershell
cd "C:\Users\moham\Desktop\Coding Challenge\backend"
npm run dev
```

Linux/Mac Terminal:
```bash
cd ~/Desktop/Coding\ Challenge/backend
npm run dev
```

For the frontend (in another terminal):

Git Bash:
```bash
cd "/c/Users/moham/Desktop/Coding Challenge/frontend"
npm start
```

Windows PowerShell:
```powershell
cd "C:\Users\moham\Desktop\Coding Challenge\frontend"
npm start
```

Linux/Mac Terminal:
```bash
cd ~/Desktop/Coding\ Challenge/frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Terminal-Specific Notes

#### Git Bash
- Use forward slashes (/) in paths
- Use `/c/` instead of `C:\` for Windows drives
- Use quotes around paths with spaces
- Example: `cd "/c/Users/moham/Desktop/Coding Challenge"`

#### Windows PowerShell
- Use backslashes (\) in paths
- Use quotes around paths with spaces
- Use semicolons (;) to separate commands
- Example: `cd "C:\Users\moham\Desktop\Coding Challenge"`

#### Linux/Mac Terminal
- Use forward slashes (/) in paths
- Escape spaces with backslash (\)
- Use `~` for home directory
- Example: `cd ~/Desktop/Coding\ Challenge`

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Stores
- GET /api/stores - Get all stores
- GET /api/stores/:id - Get store details
- POST /api/stores - Create new store
- PUT /api/stores/:id - Update store
- DELETE /api/stores/:id - Delete store

### Ratings
- GET /api/ratings - Get all ratings
- POST /api/ratings - Create new rating
- PUT /api/ratings/:id - Update rating
- DELETE /api/ratings/:id - Delete rating

## Project Structure
```
store-rating-platform/
├── backend/           # Backend server code
│   ├── src/          # Source files
│   ├── .env          # Environment variables
│   └── package.json  # Backend dependencies
├── frontend/         # Frontend React application
│   ├── src/         # Source files
│   └── package.json # Frontend dependencies
└── README.md        # Project documentation
```

## Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
```sql
CREATE DATABASE store_rating_db;
```
3. Make sure your PostgreSQL credentials match the ones in your `.env` file

## Troubleshooting

### Common Issues

1. **Invalid package config error**
   - Make sure you're in the correct directory
   - Delete node_modules folder and package-lock.json
   - Run `npm install` again

2. **Port already in use**
   - Change the PORT in .env file
   - Kill the process using the port
   - Restart your computer

3. **Database connection issues**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists

4. **PowerShell path issues**
   - Use semicolons (;) to separate commands
   - Use correct path separators (/ or \)
   - Make sure you're in the right directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Mohammad Muqsit Raja - [@mmrcode](https://github.com/mmrcode)

Project Link: [https://github.com/mmrcode/store-rating-platform](https://github.com/mmrcode/store-rating-platform)
