#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR
cd ../source

NX_DAEMON=false ./node_modules/.bin/nx run types:dev
