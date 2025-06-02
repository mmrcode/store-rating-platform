const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create necessary directories
const directories = [
  'src/components',
  'src/pages',
  'src/services',
  'src/utils',
  'src/context'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Install dependencies
console.log('Installing frontend dependencies...');
try {
  execSync('npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-data-grid axios react-router-dom formik yup react-toastify recharts', { stdio: 'inherit' });
  console.log('Frontend dependencies installed successfully');
} catch (error) {
  console.error('Error installing frontend dependencies:', error);
}

console.log('\nFrontend setup completed!');
console.log('To start the frontend development server, run: npm start'); 