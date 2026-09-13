#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

DEB="$(find dist -maxdepth 1 -type f -name '*.deb' | head -n 1 || true)"
if [[ -z "$DEB" ]]; then
  echo "No .deb found in dist/. Run ./scripts/build-linux.sh first." >&2
  exit 1
fi

sudo apt install "$DEB"
