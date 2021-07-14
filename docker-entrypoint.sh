#!/bin/bash

echo "Starting openapi-multimock..."

# Read APIS env variable to an array
IFS=','
read -r -a apis <<< $APIS

# Pass APIS to npm start
IFS=' '
exec npm start ${apis[*]} "$@"