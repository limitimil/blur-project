#!/usr/bin/env sh

set -e

npm run build

cd dist

git push -f origin master:gh-pages

cd -
