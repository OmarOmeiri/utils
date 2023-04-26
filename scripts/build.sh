#!/usr/bin/env bash

rm -rf ./build

for d in ./src/*/ ; do
    [ -L "${d%/}" ] && continue
    name=$(echo "$d" | awk '{gsub("./src",""); print}' | awk '{gsub("/",""); print}')

    echo "export * from './build/src/$name';" > ./$name.d.ts
done
tsc --p tsconfig.production.json