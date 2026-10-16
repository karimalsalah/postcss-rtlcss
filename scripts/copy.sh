#! /bin/sh

mkdir -p esm

cp -a dist/. ./

## esm package
printf '{\n    "type": "module"\n}\n' > esm/package.json
