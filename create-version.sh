#!/bin/bash

# Script to create a new version branch
# Usage: ./create-version.sh 1.0

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "Usage: ./create-version.sh <version-number>"
    echo "Example: ./create-version.sh 1.0"
    exit 1
fi

echo "Creating version branch: version-${VERSION}"

# Ensure we're on develop and up to date
git checkout develop
git pull origin develop

# Create and checkout new version branch
git checkout -b version-${VERSION}

echo ""
echo "Version branch 'version-${VERSION}' created!"
echo ""
echo "Next steps:"
echo "1. Make your changes"
echo "2. Commit: git add . && git commit -m 'Release version ${VERSION}: [description]'"
echo "3. Push: git push -u origin version-${VERSION}"
echo ""
echo "After testing, merge to develop:"
echo "  git checkout develop"
echo "  git merge version-${VERSION}"
echo "  git push origin develop"
