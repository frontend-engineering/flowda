#!/bin/bash


cat << EOF

This script will run these scripts in parallel:
1. ./zod-openapi-dev.sh
2. ./zod-prisma-types-dev.sh
3. schema:dev
4. types:dev

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
    echo -e "${RED}Please install concurrently${RESET}"
    echo -e "npm install concurrently -g\n"
    exit 1
fi

cd $SCRIPT_DIR

concurrently --restart-tries -1 --restart-after 5000 -c "auto" -n openapi,prisma,schema,types "./zod-openapi-dev.sh" "./zod-prisma-types-dev.sh" "./schema-dev.sh" "./types-dev.sh"
