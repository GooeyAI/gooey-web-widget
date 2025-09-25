#!/usr/bin/env bash

# get version from package.json
VERSION=$(cat package.json | jq -r '.version')

set -ex

# Switch to a detached HEAD state.
# This allows you to make a commit that is not on any branch.
# Note: The `/dist` folder is normally excluded from commits, but after building, your local `/dist` will contain the files to be published
git checkout --detach

# Build the library
npm install
npm run build

# Add the `/dist` folder to the commit
git add ./dist -f

# Commit the changes
git commit -m "publish: $VERSION"

# Tag the commit with the new version number
git tag -a $VERSION -m ""

# Push the commit with tags
git push origin master --tags

# switch back to the original branch
git checkout -

# fetch version from jsdelivr on success
curl -I "https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@$VERSION/dist/lib.js"
curl -I "https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@2/dist/lib.js"

echo " ✅ Published $VERSION at https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@$VERSION/dist/lib.js"
