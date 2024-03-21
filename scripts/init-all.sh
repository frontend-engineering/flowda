#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

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
echo -e "${YELLOW}${BOLD}Check yalc...${RESET}"
if command -v "yalc" >/dev/null 2>&1; then
  yalc --version
  echo -e "${GREEN}found yalc.${RESET}\n"
else
    echo -e "${RED}Please install yalc${RESET}"
    echo -e "npm install yalc -g\n"
fi

echo -e "${YELLOW}${BOLD}zod-prisma-types init...${RESET}"
cd $SCRIPT_DIR
cd ../zod-prisma-types
echo -e "${YELLOW}install deps...${RESET}"
pnpm i
echo -e "${GREEN}done${RESET}"
echo -e "${YELLOW}build zod-prisma-types and yalc publish...${RESET}"
cd $SCRIPT_DIR
cd ../zod-prisma-types/packages/generator
npm run build
yalc publish

cd $SCRIPT_DIR
cd ../source
yalc add zod-prisma-types
echo -e "${GREEN}done${RESET}"
echo -e "for development, run ./scripts/dev-zod-prisma-types.sh"
echo -e "${GREEN}${BOLD}zod-prisma-types init done${RESET}"

echo -e "${YELLOW}${BOLD}zod-plugins init...${RESET}"
echo -e "${YELLOW}install deps...${RESET}"
cd $SCRIPT_DIR
cd ../zod-plugins
npm i
echo -e "${GREEN}done${RESET}"
echo -e "${YELLOW}build zod-openapi and yalc publish...${RESET}"
./node_modules/.bin/nx run zod-openapi:dev
cd $SCRIPT_DIR
cd ../source
yalc add @anatine/zod-openapi
echo -e "${GREEN}done${RESET}"
echo -e "for development, run ./scripts/dev-zod-openapi.sh"
echo -e "${GREEN}${BOLD}zod-plugins init done${RESET}"
