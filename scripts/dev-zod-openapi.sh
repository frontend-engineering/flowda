#!/bin/bash

RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'


if command -v "yalc" >/dev/null 2>&1; then
  yalc --version
  echo -e "${GREEN}found yalc.${RESET}\n"
else
    echo -e "${RED}Please install yalc${RESET}"
    echo -e "npm install yalc -g\n"
fi

cd "$(dirname "$(readlink -f "$0")")"
cd ../zod-plugins
./node_modules/.bin/nx run zod-openapi:dev
