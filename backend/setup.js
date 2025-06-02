const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create necessary directories
const directories = [
  'logs',
  'exports',
  'src/config',
  'src/models',
  'src/routes',
  'src/middleware',
  'src/utils',
  'src/migrations',
  'src/seeders'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create .env file
const envContent = `# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=store_rating_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=info
`;

const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('Created .env file');
}

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('Dependencies installed successfully');
} catch (error) {
  console.error('Error installing dependencies:', error);
}

// Run migrations
console.log('Running migrations...');
try {
  execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
  console.log('Migrations completed successfully');
} catch (error) {
  console.error('Error running migrations:', error);
}

// Run seeders
console.log('Running seeders...');
try {
  execSync('npx sequelize-cli db:seed:all', { stdio: 'inherit' });
  console.log('Seeders completed successfully');
} catch (error) {
  console.error('Error running seeders:', error);
}

console.log('\nSetup completed! Please update the .env file with your specific configuration.');
console.log('To start the server, run: npm run dev'); 