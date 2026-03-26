const http = require('http');

const cache = {};

function startServer(port, origin) {

  const server = http.createServer((req, res) => {
    const key = req.url;
    console.log(`Request: ${key}`);

    if (cache[key]) {
      console.log('Cache HIT');
      res.setHeader('X-Cache', 'HIT');
      res.writeHead(cache[key].status, cache[key].headers);
      res.end(cache[key].body);
      return;
    }

    console.log('Cache MISS');
    const targetUrl = new URL(req.url, origin);

    http.get(targetUrl.toString(), (proxyRes) => {
      let body = '';

      proxyRes.on('data', (chunk) => {
        body += chunk;
      });

      proxyRes.on('end', () => {
        cache[key] = {
          status: proxyRes.statusCode,
          headers: proxyRes.headers,
          body: body
        };

        res.setHeader('X-Cache', 'MISS');
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(body);
      });
    });
  });

  server.listen(port, () => {
    console.log(`Caching proxy running on port ${port}`);
    console.log(`Forwarding requests to ${origin}`);
  });
}

function clearCache() {
  for (const key in cache) {
    delete cache[key];
  }
  console.log('Cache cleared successfully!');
}

module.exports = { startServer, clearCache };