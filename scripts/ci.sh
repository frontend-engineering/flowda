#!/bin/bash

RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR
cd ../source

echo -e "${YELLOW}pnpm i...${RESET}\n"
pnpm dlx pnpm@7.33.7 i --frozen-lockfile
echo -e "${GREEN}pnpm i done.${RESET}\n"

echo -e "${YELLOW}yalc update...${RESET}\n"
yalc update
echo -e "${GREEN}yalc update done.${RESET}\n"

echo -e "${YELLOW}nx reset...${RESET}\n"
./node_modules/.bin/nx reset
echo -e "${GREEN}nx reset done.${RESET}\n"

echo -e "${YELLOW}lint all...${RESET}\n"
NX_DAEMON=false ./node_modules/.bin/nx run-many --target lint
echo -e "${GREEN}lint done.${RESET}\n"

echo -e "${YELLOW}build all...${RESET}\n"
NX_DAEMON=false ./node_modules/.bin/nx run-many --target build
echo -e "${GREEN}build done.${RESET}\n"

echo -e "${YELLOW}test all...${RESET}\n"
NX_DAEMON=false ./node_modules/.bin/nx run-many --target test
echo -e "${GREEN}test done.${RESET}\n"
