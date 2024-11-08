import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

// Generate a random 64-character hexadecimal string
const generateSecret = (): string => crypto.randomBytes(32).toString('hex');

// Define the path to your .env file in the root directory
const envPath = path.join(process.cwd(), '.env'); // Accesses the root directly

// Read the .env file or create a new one if it doesn't exist
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Check if JWT_SECRET exists and has a value in the .env file
const jwtSecretMatch = envContent.match(/^JWT_SECRET=(.*)$/m);

if (jwtSecretMatch && jwtSecretMatch[1]) {
  console.log('JWT_SECRET already exists in .env file.');
} else {
  // Either JWT_SECRET is missing or has no value, so generate a new one
  const jwtSecret = generateSecret();

  // If JWT_SECRET exists but is empty, replace it; otherwise, append it
  const newEnvContent = jwtSecretMatch
    ? envContent.replace(/^JWT_SECRET=.*$/m, `JWT_SECRET=${jwtSecret}`)
    : `${envContent}\nJWT_SECRET=${jwtSecret}\n`;
  
  fs.writeFileSync(envPath, newEnvContent);

  console.log('JWT_SECRET has been generated and saved to .env file in the root directory.');
}
