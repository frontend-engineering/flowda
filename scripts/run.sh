#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR
cd ../source

proj="$1"
exe="$2"
opts="$3"

./node_modules/.bin/nx run $proj:$exe $opts
