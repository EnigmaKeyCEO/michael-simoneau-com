#!/usr/bin/env bash
set -euo pipefail

TARGET="src/features/blog/components/BlogContentRenderer.tsx"

if [[ ! -f "$TARGET" ]]; then
  echo "Missing blog content renderer at $TARGET" >&2
  exit 1
fi

if ! grep -q "StyleSheet" "$TARGET"; then
  echo "BlogContentRenderer must style blocks with StyleSheet primitives" >&2
  exit 1
fi

echo "Blog content renderer verified."
