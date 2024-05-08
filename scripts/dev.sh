#!/bin/bash

source="$1"

cat << EOF

This script first \`nx reset\` then run these scripts in parallel:
1. ./zod-openapi-dev.sh (not s)
2. ./zod-prisma-types-dev.sh (not s)
3. types:dev
4. schema:dev
5. nx-plugin:dev
6. design:dev
7. theia:dev

EOF

RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo -e "${YELLOW}${BOLD}Check concurrently...${RESET}"
if command -v "concurrently" >/dev/null 2>&1; then
    concurrently --version
    echo -e "${GREEN}found pnpm.${RESET}\n"
else
    echo -e "${RED}not found concurrently${RESET}"
    echo -e "${YELLOW}install concurrently -g${RESET}"
    npm install concurrently -g
    echo -e "${GREEN}concurrently installed${RESET}"
fi

echo -e "${YELLOW}${BOLD}Check iterm2-tab-set...${RESET}"
if command -v "tabset" >/dev/null 2>&1; then
    tabset --badge '\(session.path)'
else
    echo -e "${RED}not found iterm2-tab-set${RESET}"
fi

cd $SCRIPT_DIR

sh ./nx-reset.sh

if [ "$source" = "s" ]
then
    concurrently --restart-tries -1 --restart-after 10000 -c "auto" \
    -n types,schema,nx-plugin,design \
    "./run.sh types dev --watch" \
    "./run.sh schema dev --watch" \
    "./run.sh nx-plugin dev --watch" \
    "./run.sh design dev --watch"
else
    concurrently --restart-tries -1 --restart-after 10000 -c "auto" \
    -n openapi,prisma,types,schema,nx-plugin,design,theia \
    "./zod-openapi-dev.sh" \
    "./zod-prisma-types-dev.sh" \
    "./run.sh types dev --watch" \
    "./run.sh schema dev --watch" \
    "./run.sh nx-plugin dev --watch" \
    "./run.sh design dev --watch" \
    "./run.sh theia dev --watch"
fi