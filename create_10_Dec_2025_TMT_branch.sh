#!/bin/bash

# Script to create and push the 10_Dec_2025_TMT branch
# This script should be run by someone with push access to the repository

set -e

echo "=========================================="
echo "Creating branch 10_Dec_2025_TMT"
echo "=========================================="

# Ensure we're in the git repository
if [ ! -d ".git" ]; then
    echo "Error: Not in a git repository"
    exit 1
fi

# Fetch latest changes
echo "Fetching latest changes from remote..."
git fetch origin

# Check out main branch
echo "Checking out main branch..."
git checkout main
git pull origin main

# Verify we're at the revert commit
CURRENT_COMMIT=$(git rev-parse HEAD)
REVERT_COMMIT="ba3cc63ac4fe26323a43a40e93fbcffd0dd1bda3"

echo "Current commit: $CURRENT_COMMIT"
echo "Expected revert commit: $REVERT_COMMIT"

# Create the new branch from main
echo "Creating branch 10_Dec_2025_TMT from main..."
git checkout -b 10_Dec_2025_TMT

# Revert the revert commit to restore PR #1 changes
echo "Reverting the revert commit to restore PR #1 changes..."
git revert $REVERT_COMMIT --no-edit

# Verify the changes
echo "Verifying repository content..."
NEW_COMMIT=$(git rev-parse HEAD)
PR1_MERGE="11046f5"

echo "New commit: $NEW_COMMIT"
echo "Comparing with PR #1 merge commit: $PR1_MERGE"

# Show diff stats (should be empty)
git diff --stat $PR1_MERGE HEAD

# Push the branch
echo "Pushing branch 10_Dec_2025_TMT to remote..."
git push -u origin 10_Dec_2025_TMT

echo "=========================================="
echo "Branch 10_Dec_2025_TMT created and pushed successfully!"
echo "=========================================="
echo ""
echo "Branch details:"
git log --oneline -5
