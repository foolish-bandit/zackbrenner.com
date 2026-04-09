const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const buildDir = path.join(rootDir, 'build');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(buildDir)) {
    console.error('Build directory not found at ./build');
    process.exit(1);
}

if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}

fs.cpSync(buildDir, distDir, { recursive: true });
console.log('Synced ./build to ./dist for Cloudflare Pages output validation.');
