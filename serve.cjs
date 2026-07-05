const http = require('http');
const fs = require('fs');
const path = require('path');

const distPath = 'C:/Users/张和浩/WorkBuddy/2026-07-05-16-55-17/jobsprint/dist';
const port = 3003;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.map': 'application/json'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  
  // Remove leading slash
  let relativePath = urlPath === '/' ? 'index.html' : urlPath.substring(1);
  let filePath = path.join(distPath, relativePath);
  
  console.log('Request:', urlPath, '->', filePath);
  
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      console.log('Error:', error.code, filePath);
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found: ' + urlPath);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
      res.end(content);
    }
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Server running at http://localhost:${port}/`);
});
