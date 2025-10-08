#!/usr/bin/env bash
set -euo pipefail

if ! grep -q "parseInlineMarkdown" src/components/BlogPost.tsx; then
  echo "parseInlineMarkdown is not referenced in BlogPost.tsx" >&2
  exit 1
fi

echo "Markdown parsing hook verified."
