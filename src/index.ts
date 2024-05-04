import * as http from 'node:http';
import pino from 'pino';

import pinoHttp from 'pino-http';

import config from './config/index';

const PORT: number = config.MAIN.PORT;
const logger = pino();
const loggerHttp = pinoHttp({ logger });

async function run() {
  const server = http.createServer();

  server.listen(PORT, () => {
    logger.info(`  > Running socket on port: ${PORT}`);
  });

  server.on('request', (_req, _res) => {
    loggerHttp(_req, _res);
    _res.log.info('log is available on both req and res');
    _res.writeHead(200, { 'Content-Type': 'application/json' });
    _res.end(JSON.stringify({
      data: 'Hello World!',
    }));
  });

  server.on('error', (error) => {
    if (error instanceof TypeError && 'code' in error) {
      if (error.code === 'EADDRINUSE') {
          logger.error(`Port ${PORT} is already in use.`);
      }
    }
    process.exit(1);
  });
}

run();