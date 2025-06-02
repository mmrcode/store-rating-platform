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

For Windows PowerShell:
```powershell
# Navigate to backend directory
cd "C:\Users\moham\Desktop\Coding Challenge\backend"

# Create .env file (Simplest Method)
$envContent = "PORT=5000`nNODE_ENV=development`nDB_HOST=localhost`nDB_PORT=5432`nDB_NAME=store_rating_db`nDB_USER=postgres`nDB_PASSWORD=postgres`nJWT_SECRET=your_jwt_secret_key_here`nFRONTEND_URL=http://localhost:3000`nLOG_LEVEL=info"
$envContent | Out-File -FilePath .env -Encoding UTF8

# Verify the file was created
Get-Content .env
```

For Windows Command Prompt (cmd):
```cmd
# Navigate to backend directory
cd "C:\Users\moham\Desktop\Coding Challenge\backend"

# Create .env file (Simplest Method)
echo PORT=5000 > .env
echo NODE_ENV=development >> .env
echo DB_HOST=localhost >> .env
echo DB_PORT=5432 >> .env
echo DB_NAME=store_rating_db >> .env
echo DB_USER=postgres >> .env
echo DB_PASSWORD=postgres >> .env
echo JWT_SECRET=your_jwt_secret_key_here >> .env
echo FRONTEND_URL=http://localhost:3000 >> .env
echo LOG_LEVEL=info >> .env

# Verify the file was created
type .env
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

### Directory Navigation Guide

#### Git Bash Navigation
If you get the error `bash: cd: ../frontend: No such file or directory`, follow these steps:

1. First, check your current directory:
```bash
pwd
```

2. If you're in the wrong directory, navigate to the project root:
```bash
cd "/c/Users/moham/Desktop/Coding Challenge"
```

3. Verify you're in the correct directory:
```bash
ls
```
You should see `frontend` and `backend` directories

4. Then navigate to frontend:
```bash
cd frontend
```

#### Common Git Bash Navigation Commands
- `pwd` - Shows current directory
- `ls` - Lists files and directories
- `cd` - Change directory
- `cd ..` - Go up one directory
- `cd ~` - Go to home directory

#### Directory Structure Verification
Before running npm commands, verify you're in the correct directory:

1. Check current directory:
```bash
pwd
```
Should show: `/c/Users/moham/Desktop/Coding Challenge/frontend`

2. List contents:
```bash
ls
```
Should show: `package.json`, `src`, `public`, etc.

#### Troubleshooting Directory Issues

1. If `cd ../frontend` fails:
   - Make sure you're in the backend directory
   - Use absolute path instead:
   ```bash
   cd "/c/Users/moham/Desktop/Coding Challenge/frontend"
   ```

2. If directory not found:
   - Verify the project structure:
   ```bash
   cd "/c/Users/moham/Desktop/Coding Challenge"
   ls
   ```
   - You should see both `frontend` and `backend` directories

3. If path has spaces:
   - Always use quotes:
   ```bash
   cd "/c/Users/moham/Desktop/Coding Challenge"
   ```

### Common Directory Navigation Errors

If you see errors like:
```
npm error path C:\Users\moham\store-rating-platform\frontend\package.json
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

This means you're in the wrong directory. Follow these steps:

1. Check your current directory:
```bash
pwd
```

2. Navigate to the correct project directory:
```bash
# For Git Bash
cd "/c/Users/moham/Desktop/Coding Challenge/frontend"

# For Windows PowerShell
cd "C:\Users\moham\Desktop\Coding Challenge\frontend"

# For Windows Command Prompt
cd "C:\Users\moham\Desktop\Coding Challenge\frontend"
```

3. Verify you're in the correct directory:
```bash
# List files to verify
ls  # or dir for Windows
```

You should see:
- package.json
- src/
- public/
- node_modules/

4. Then run npm commands:
```bash
npm install
npm start
```

Remember:
- Your project is in `C:\Users\moham\Desktop\Coding Challenge`
- NOT in `C:\Users\moham\store-rating-platform`
- Always verify your directory before running npm commands

### PowerShell-Specific Instructions

If you're using PowerShell, follow these steps:

1. Check your current directory:
```powershell
Get-Location
# or
pwd
```

2. Navigate to the correct project directory:
```powershell
# Navigate to project root
cd "C:\Users\moham\Desktop\Coding Challenge"

# Navigate to frontend
cd frontend
```

3. Verify you're in the correct directory:
```powershell
# List files to verify
Get-ChildItem
# or
dir
```

You should see:
- package.json
- src/
- public/
- node_modules/

4. Run npm commands:
```powershell
# Install dependencies
npm install

# Start the frontend
npm start
```

Common PowerShell Errors and Solutions:

1. If you see "Cannot find path":
```powershell
# Make sure you're using the correct path with quotes
cd "C:\Users\moham\Desktop\Coding Challenge\frontend"
```

2. If npm commands fail:
```powershell
# Check if you're in the right directory
pwd

# Should show: C:\Users\moham\Desktop\Coding Challenge\frontend
```

3. If you get "Missing script" errors:
```powershell
# Make sure you're in the frontend directory
cd "C:\Users\moham\Desktop\Coding Challenge\frontend"

# Then run npm commands
npm install
npm start
```

Remember:
- Use backslashes (\) in PowerShell paths
- Always use quotes around paths with spaces
- Verify your directory before running npm commands

### Creating .env File

#### For Git Bash:
```bash
# Navigate to backend directory
cd "/c/Users/moham/Desktop/Coding Challenge/backend"

# Create .env file
cat > .env << EOL
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
EOL

# Verify the file was created
cat .env
```

### Port Already in Use

If you see the message "Something is already running on port 3000":

1. You can either:
   - Press 'Y' to run on a different port (recommended)
   - Or stop the existing process:
     ```powershell
     # Find the process using port 3000
     netstat -ano | findstr :3000
     
     # Stop the process (replace PID with the number from above)
     taskkill /F /PID <PID>
     ```

2. Then try running the frontend again:
   ```powershell
   cd "C:\Users\moham\Desktop\Coding Challenge\frontend"
   npm start
   ```

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

## GitHub Setup Guide

### For New Users

1. Clone the repository:
```bash
git clone https://github.com/mmrcode/store-rating-platform.git
cd store-rating-platform
```

### For Existing Users

1. If you already have the repository:
```bash
# Check current directory
pwd

# If you need to go to the project directory
cd "/c/Users/moham/Desktop/Coding Challenge"

# Verify you're in the correct directory
ls
# Should show: frontend, backend, README.md, etc.
```

2. If you need to update your repository:
```bash
# Pull latest changes
git pull origin main

# If you have local changes, you might need to:
git stash
git pull origin main
git stash pop
```

### GitHub Directory Structure
After cloning, your directory should look like this:
```
store-rating-platform/
├── frontend/          # Frontend React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Backend Node.js server
│   ├── src/
│   └── package.json
└── README.md
```

### Common GitHub Commands
```bash
# Check repository status
git status

# Check current branch
git branch

# Switch branches
git checkout <branch-name>

# Create and switch to new branch
git checkout -b <new-branch-name>

# Update repository
git pull origin main
```

### Troubleshooting GitHub Issues

1. If repository not found:
```bash
# Verify the repository URL
git remote -v

# If needed, update the remote URL
git remote set-url origin https://github.com/mmrcode/store-rating-platform.git
```

2. If you get permission errors:
- Make sure you're logged into GitHub
- Check your SSH keys if using SSH
- Use HTTPS if SSH is not set up

3. If you need to start fresh:
```bash
# Remove existing repository
rm -rf store-rating-platform

# Clone again
git clone https://github.com/mmrcode/store-rating-platform.git
cd store-rating-platform
```

### Running Frontend and Backend

You should run the frontend and backend in separate terminal windows:

#### Terminal Window 1 (Backend)

For PowerShell:
```powershell
# Navigate to backend
cd "C:\Users\moham\Desktop\Coding Challenge\backend"

# Start backend server
npm run dev
```

For Git Bash:
```bash
# Navigate to backend
cd "/c/Users/moham/Desktop/Coding Challenge/backend"

# Start backend server
npm run dev
```

#### Terminal Window 2 (Frontend)

For PowerShell:
```powershell
# Navigate to frontend
cd "C:\Users\moham\Desktop\Coding Challenge\frontend"

# Start frontend
npm start
```

For Git Bash:
```bash
# Navigate to frontend
cd "/c/Users/moham/Desktop/Coding Challenge/frontend"

# Start frontend
npm start
```

Important Notes:
- Keep both terminal windows open
- Backend will run on http://localhost:5000
- Frontend will run on http://localhost:3000
- You can use either PowerShell or Git Bash for either window
- Make sure you're in the correct directory before running npm commands
