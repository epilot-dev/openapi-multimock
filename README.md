# OpenAPI  Multimock
A mock tool to mock multiple APIs with OAS definitions

## Usage 

```sh
openapi-multimock <path>:<definition> [<path>:<definition>]
```
## Docker Usage

```sh 
docker run -p 5000 openapi-multimock <path>:<definition> [<path>:<definition>] 
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
      - 5000
```
