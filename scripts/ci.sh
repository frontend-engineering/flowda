#!/bin/bash

RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR
cd ../source

echo -e "${YELLOW}lint all...${RESET}\n"
NX_DAEMON=false ./node_modules/.bin/nx run-many --target lint
echo -e "${GREEN}lint done.${RESET}\n"

echo -e "${YELLOW}build all...${RESET}\n"
NX_DAEMON=false ./node_modules/.bin/nx run-many --target build
echo -e "${GREEN}build done.${RESET}\n"

echo -e "${YELLOW}test all...${RESET}\n"
NX_DAEMON=false ./node_modules/.bin/nx run-many --target test
echo -e "${GREEN}test done.${RESET}\n"
