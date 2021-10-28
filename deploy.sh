#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m "Deploy to github page"
git remote add deploy git@github.com:limitimil/blur-project.git
git push -f deploy master:gh-pages

cd -
