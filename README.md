# OpenAPI Multimock
[![CI](https://github.com/epilot-dev/openapi-multimock/workflows/CI/badge.svg)](https://github.com/epilot-dev/openapi-multimock/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/openapi-multimock.svg)](https://www.npmjs.com/package/openapi-multimock)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/openapi-multimock/blob/main/LICENSE)

A mock tool to mock multiple APIs with OAS definitions

## Usage

```sh
npx openapi-multimock [-p <PORT>] <path>:<definition> [<path>:<definition>]
```

Example:

```sh
$ npx openapi-multimock /petstore:https://petstore3.swagger.io/api/v3/openapi.json /user:https://docs.api.epilot.io/user.yaml
api mock listening at http://localhost:5050/petstore
api mock listening at http://localhost:5050/user
```

## Docker Usage

```sh
docker run -p 5050 -e APIS=<path>:<definition>,[<path>:<definition>] openapi-multimock
```

## Docker-Compose Usage

```yaml
version: "3.5"
services:
  openapi-multimock:
    image: openapi-multimock:latest
    environment:
      APIS: /entity:https://docs.api.epilot.io/entity.yaml,/internal-auth:https://docs.api.epilot.io/internal-auth.yaml
    ports:
      - 5050
```
