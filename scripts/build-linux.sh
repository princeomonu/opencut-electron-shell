#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Installing dependencies"
pnpm install --frozen-lockfile

echo "==> Building AppImage and Debian package"
pnpm dist

echo
echo "Build complete. Artifacts:"
find dist -maxdepth 1 -type f \( -name '*.AppImage' -o -name '*.deb' \) -print
