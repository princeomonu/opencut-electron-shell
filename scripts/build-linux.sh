#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Installing dependencies"
npm install

echo "==> Building AppImage and Debian package"
npm run dist

echo
echo "Build complete. Artifacts:"
find dist -maxdepth 1 -type f \( -name '*.AppImage' -o -name '*.deb' \) -print
