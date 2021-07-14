#!/usr/bin/env node
import minimist from 'minimist';
import express from 'express';
import morgan from 'morgan';
import { OpenAPIBackend } from 'openapi-backend';

const argv = minimist(process.argv.slice(2), { alias: { p: 'port' } });
console.log(argv);

const args = argv._;
const port = argv.port || 5000;

const app = express();
app.use(express.json());
// logging
app.use(morgan('combined'));

for (const arg of args) {
  const [path, ...definitionParts] = arg.split(':');
  const definition = definitionParts.join(':');
  // define api
  const api = new OpenAPIBackend({
    definition,
    handlers: {
      validationFail: async (c, req, res) => res.status(400).json({ err: c.validation.errors }),
      notFound: async (c, req, res) => {
        console.log('NOT FOUND', c, req);
        res.status(404).json({ err: 'not found' });
      },
      notImplemented: async (c, req, res) => {
        const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId);
        return res.status(status).json(mock);
      },
    },
  });

  api.init();
  // use as express middleware
  app.use(path, (req, res) => api.handleRequest(req, req, res));
}

// start server
app.listen(port, () => console.info(`api listening at http://localhost:${port}`));
