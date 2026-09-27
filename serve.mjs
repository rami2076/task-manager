#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./', import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/vnd.microsoft.icon'
};

function safeResolve(requestPath) {
  let pathname = decodeURIComponent((requestPath || '/').split('?')[0]);
  if (pathname === '/' || pathname.endsWith('/')) pathname += 'index.html';

  pathname = pathname.replace(/^\/+/, '');

  const rootResolved = path.resolve(root);
  const resolved = path.resolve(rootResolved, pathname);

  if (resolved !== rootResolved && !resolved.startsWith(rootResolved + path.sep)) {
    throw new Error('Forbidden');
  }

  return resolved;
}

const server = http.createServer(async (req, res) => {
  try {
    const filePath = safeResolve(req.url);
    const body = await fs.readFile(filePath);
    const type = mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store'
    });
    res.end(body);
  } catch (error) {
    console.error('serve error', error);
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

server.listen(port, host, () => {
  console.log(`Task Board: http://${host}:${port}/`);
  console.log(`Files: ${root}`);
});
