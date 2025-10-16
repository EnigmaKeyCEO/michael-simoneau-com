#!/bin/bash
# Deploy script for Michael Simoneau's portfolio

set -euo pipefail

# Build the project
echo "Building the project..."
yarn build

# Deploy to Netlify production release
echo "Deploying to Netlify production release..."
NETLIFY_DEPLOY_CMD="yarn release"

if [[ -n "${NETLIFY_AUTH_TOKEN:-}" && -n "${NETLIFY_SITE_ID:-}" ]]; then
  echo "Detected Netlify CI credentials."
else
  echo "Warning: NETLIFY_AUTH_TOKEN or NETLIFY_SITE_ID is not set. Ensure you are authenticated with the Netlify CLI." >&2
fi

$NETLIFY_DEPLOY_CMD

echo "Deployment complete! Check the Netlify dashboard for the live URL."
