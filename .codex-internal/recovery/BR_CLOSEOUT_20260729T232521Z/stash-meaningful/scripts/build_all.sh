#!/bin/bash
set -e

echo "Starting strict sequential build phase..."

# 1. Root dependencies
npm install

# 2. Build local packages
for pkg in packages/*; do
  if [ -d "$pkg" ] && [ -f "$pkg/package.json" ]; then
    echo "Building $pkg..."
    cd "$pkg"
    npm install || true
    if grep -q '"build":' package.json; then
      npm run build
    elif grep -q '"tsc"' package.json; then
      npm run tsc || true
    fi
    cd - > /dev/null
  fi
done

# 3. Build Core
echo "Building core..."
cd core
npm install
npm run build
cd - > /dev/null

# 4. Build VS Code Extension
echo "Building extensions/vscode..."
cd extensions/vscode
npm install
npm run esbuild

echo "Build complete."
