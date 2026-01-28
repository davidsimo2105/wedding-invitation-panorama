#!/bin/bash

# Script to merge a version branch to develop
# Usage: ./merge-version-to-develop.sh 1.0

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "Usage: ./merge-version-to-develop.sh <version-number>"
    echo "Example: ./merge-version-to-develop.sh 1.0"
    exit 1
fi

echo "Merging version-${VERSION} to develop..."

# Switch to develop
git checkout develop
git pull origin develop

# Merge the version branch
git merge version-${VERSION}

# Push develop
git push origin develop

echo ""
echo "Version ${VERSION} successfully merged to develop!"
echo ""
echo "To merge develop to main (production release):"
echo "  git checkout main"
echo "  git merge develop"
echo "  git push origin main"
