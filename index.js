#!/usr/bin/env node

const { program } = require('commander');
const { startServer } = require('./server');

program
  .option('--port <number>', 'Port to run the caching proxy server on')
  .option('--origin <url>', 'Origin server to forward requests to')
  .option('--clear-cache', 'Clear the cache')
  .parse(process.argv);

const options = program.opts();

if (options.clearCache) {
  console.log('Cache cleared!');
  process.exit(0);
}

if (!options.port || !options.origin) {
  console.error('Please provide --port and --origin');
  process.exit(1);
}

startServer(options.port, options.origin);