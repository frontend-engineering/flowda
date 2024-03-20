#!/bin/bash

RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'

echo -e "${YELLOW}${BOLD}Check pnpm...${RESET}"

if command -v "pnpm" >/dev/null 2>&1; then
  pnpm --version
  echo -e "${GREEN}found pnpm.${RESET}\n"
else
    echo -e "${RED}Please install pnpm@7.33.7${RESET}"
    echo -e "npm install pnpm@7.33.7 -g\n"
fi

echo -e "${YELLOW}${BOLD}zod-prisma-types init...${RESET}"

cd "$(dirname "$(readlink -f "$0")")"
cd ../zod-prisma-types
pnpm i
echo -e "${GREEN}${BOLD}zod-prisma-types init done${RESET}"
echo -e "for development, run ./scripts/dev-zod-prisma-types.sh"

echo -e "${YELLOW}${BOLD}zod-plugins init...${RESET}"

cd "$(dirname "$(readlink -f "$0")")"
cd ../zod-plugins
npm i
echo -e "${GREEN}${BOLD}zod-plugins init done${RESET}"
echo -e "for development, run ./scripts/dev-zod-openapi.sh"
