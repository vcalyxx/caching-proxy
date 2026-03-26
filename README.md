# Caching Proxy Server

A CLI tool that starts a caching proxy server. It forwards requests to an origin server and caches the responses. If the same request is made again, it returns the cached response instead of hitting the server again.

## Installation

```bash
npm install
npm link
```

## Usage

Start the proxy server:

```bash
caching-proxy --port <number> --origin <url>
```

**Example:**

```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```

This will start the proxy on port 3000 and forward requests to `http://dummyjson.com`.

So if you hit `http://localhost:3000/products`, it will forward to `http://dummyjson.com/products`.

## Cache Headers

Every response includes an `X-Cache` header:

- `X-Cache: HIT` — response was served from cache
- `X-Cache: MISS` — response was fetched from the origin server

## Clear Cache

```bash
caching-proxy --clear-cache
```
