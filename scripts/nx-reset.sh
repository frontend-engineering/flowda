#!/bin/bash

cat << EOF

This script will do:
1. nx reset
2. nx daemon --start

EOF

RESET='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR
cd ../source

./node_modules/.bin/nx reset
./node_modules/.bin/nx daemon --start
./node_modules/.bin/nx daemon