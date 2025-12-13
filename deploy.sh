#!/bin/bash
# Deploy script for Michael Simoneau's portfolio

# Build the project
echo "Building the project..."
npm run build

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "Deployment complete! Your site is now live at https://michaelsimoneau.com"
