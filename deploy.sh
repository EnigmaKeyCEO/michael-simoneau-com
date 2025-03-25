#!/bin/bash
# Deploy script for Michael Simoneau's portfolio

# Build the project
echo "Building the project..."
npm run build

# Deploy to Firebase
echo "Deploying to Firebase..."
firebase deploy --only hosting

echo "Deployment complete! Your site is now live at https://michaelsimoneau.com" 