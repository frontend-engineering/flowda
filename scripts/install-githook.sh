#!/bin/sh

cat << EOF
================================
The scripts does:
1. eslint error autofix
2. not allow working directory uncommited changes (git add -A)
--------------------------------
EOF

RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR
cd ..

git config core.hooksPath .githooks
find .git/hooks -type l -exec rm {} \;
find .githooks -type f -exec ln -sf ../../{} .git/hooks/ \;
echo "${YELLOW}githook installed${RESET}\n"
