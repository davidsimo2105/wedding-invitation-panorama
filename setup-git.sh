#!/bin/bash

# Git Workflow Setup Script
# This script sets up the initial Git branches and remote

echo "Setting up Git workflow..."

# Add remote if it doesn't exist
if ! git remote | grep -q "^origin$"; then
    echo "Adding remote origin..."
    git remote add origin https://github.com/davidsimo2105/wedding-invitation-panorama.git
else
    echo "Remote 'origin' already exists"
fi

# Ensure we're on main branch
git checkout main

# Push main branch
echo "Pushing main branch..."
git push -u origin main

# Push develop branch
echo "Pushing develop branch..."
git checkout develop
git push -u origin develop

echo "Setup complete!"
echo ""
echo "Current branches:"
git branch -a
echo ""
echo "To create a version branch, run:"
echo "  git checkout develop"
echo "  git checkout -b version-1.0"
echo ""
echo "After making changes and testing, merge to develop:"
echo "  git checkout develop"
echo "  git merge version-1.0"
echo "  git push origin develop"
