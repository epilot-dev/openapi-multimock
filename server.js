#!/usr/bin/env node
import minimist from 'minimist';
import express from 'express';
import morgan from 'morgan';
import { OpenAPIBackend } from 'openapi-backend';

const argv = minimist(process.argv.slice(2), { alias: { p: 'port' } });

const args = argv._;
const port = argv.port || process.env.PORT || 5050;

const main = async () => {
  const app = express();
  app.use(express.json());
  // logging
  app.use(morgan('combined'));

  const msgs = [];
  for (const arg of args) {
    const [path, ...definitionParts] = arg.split(':');
    const definition = definitionParts.join(':');
    const api = new OpenAPIBackend({
      definition,
      handlers: {
        validationFail: async (c, req, res) => res.status(400).json({ err: c.validation.errors }),
        notFound: async (c, req, res) => res.status(404).json({ err: 'not found' }),
        notImplemented: async (c, req, res) => {
          const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId);
          return res.status(status).json(mock);
        },
      },
    });

    await api.init();
    app.use(path, (req, res) => api.handleRequest(req, req, res));
    msgs.push(`api mock listening at http://localhost:${port}${path}`);
  }

  // start server
  msgs.map((msg) => console.info(msg));
  app.listen(port, () => console.info('ready'));
};

main();
