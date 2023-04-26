#!/bin/bash
date=$(date '+%Y-%m-%d')

typedoc

rm docs/index.html
mv docs/modules.html docs/index.html

rm -rf ../Docs/lullo-utils/*
mv docs/* ../Docs/lullo-utils

cd ../Docs/lullo-utils
git add .
git commit -m"$date"

git push origin master