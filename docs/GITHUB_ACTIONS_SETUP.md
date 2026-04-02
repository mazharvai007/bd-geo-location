# 🚀 GitHub Actions Setup Guide

Complete guide to set up automated npm publishing with GitHub Actions for **bd-geo-location**.

---

## 📋 Overview

You now have two GitHub Actions workflows:

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Runs on every push and PR
   - Tests on Node.js 18, 20, 22
   - Validates package
   - Tests platform generators

2. **Release Workflow** (`.github/workflows/release.yml`)
   - Triggers on version tags (e.g., `v1.0.2`)
   - Builds, tests, and publishes to npm
   - Creates GitHub release automatically

---

## 🔧 Step-by-Step Setup

### Step 1: Create npm Automation Token

1. Go to https://www.npmjs.com/
2. Log in to your account
3. Click on your profile picture → **Access Tokens**
4. Click **Generate New Token**
5. Select **Automation**
6. Give it a name: `GitHub Actions - bd-geo-location`
7. Click **Generate Token**
8. **IMPORTANT**: Copy the token immediately (you won't see it again!)

### Step 2: Add Token to GitHub Repository Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste the npm token you copied
6. Click **Add secret**

### Step 3: Commit and Push Workflows

```bash
# Add the workflows
git add .github/workflows/

# Commit the workflows
git commit -m "ci: add GitHub Actions workflows

- Add CI workflow for testing and validation
- Add Release workflow for automated npm publishing
- Test on Node.js 18, 20, 22
- Automated platform generator testing"

# Push to GitHub
git push origin main
```

### Step 4: Verify CI Workflow

1. Go to **Actions** tab in your GitHub repository
2. You should see the **CI** workflow running
3. Wait for it to complete (should be green ✅)

---

## 📦 How to Release

### Method 1: Create a Git Tag (Recommended)

This is the **easiest and recommended** way:

```bash
# 1. Ensure all changes are committed
git add .
git commit -m "chore: preparing for v1.0.2 release"

# 2. Create and push a version tag
git tag v1.0.2
git push origin main --tags

# 3. GitHub Actions will automatically:
#    - Build your package
#    - Run tests
#    - Publish to npm
#    - Create GitHub release
```

**That's it!** The release workflow handles everything automatically.

### Method 2: Manual Trigger from GitHub

1. Go to **Actions** tab in your repository
2. Select **Release** workflow
3. Click **Run workflow**
4. Enter version (e.g., `v1.0.2`)
5. Click **Run workflow** (green button)

---

## 🎯 Release Process Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. You create tag: git tag v1.0.2                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  2. GitHub detects tag and triggers Release workflow        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Workflow runs:                                          │
│     ✓ Checkout code                                         │
│     ✓ Setup Node.js 22                                      │
│     ✓ Install dependencies                                  │
│     ✓ Build package                                         │
│     ✓ Run tests                                             │
│     ✓ Validate package                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Publish to npm (using NPM_TOKEN secret)                 │
│     ✓ npm publish --provenance                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Create GitHub Release                                   │
│     ✓ Auto-generated release notes                          │
│     ✓ Tagged with version                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  6. ✅ Complete!                                             │
│     Package live on npm                                     │
│     GitHub release created                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Monitoring Your Release

### Check Workflow Status

1. Go to **Actions** tab
2. Click on the **Release** workflow run
3. Watch real-time logs

### Check npm Publication

1. Go to https://www.npmjs.com/package/bd-geo-location
2. Your new version should appear

### Check GitHub Release

1. Go to **Releases** section
2. Your release should be created with notes

---

## 🛡️ Security Features

Your workflows include:

- ✅ **npm provenance** - Verifies package origin
- ✅ **Node ID token** - Secure authentication
- ✅ **Secret token storage** - Never exposed in logs
- ✅ **Automated testing** - Catches issues before publishing
- ✅ **Multi-version testing** - Tests on Node.js 18, 20, 22

---

## 📝 Version Numbering

Use semantic versioning:

- **v1.0.0** - Initial stable release
- **v1.0.1** - Bug fixes
- **v1.1.0** - New features (backward compatible)
- **v2.0.0** - Breaking changes

**Current version**: v1.0.2

---

## ⚠️ Troubleshooting

### Issue: Workflow fails with "401 Unauthorized"

**Cause**: Invalid or missing NPM_TOKEN

**Solution**:
1. Regenerate npm token
2. Update GitHub secret
3. Re-run workflow

### Issue: Workflow fails on build

**Cause**: Build errors

**Solution**:
1. Check build logs in Actions tab
2. Run `npm run build` locally to reproduce
3. Fix errors and commit changes

### Issue: Package not published

**Cause**: npm publish failed

**Solution**:
1. Check if version already exists on npm
2. Increment version number in package.json
3. Create new tag with updated version

### Issue: Tests fail

**Cause**: Test errors

**Solution**:
1. Run tests locally: `npm test`
2. Fix failing tests
3. Commit and push fixes

---

## 🔄 Development Workflow

### Daily Development

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin main

# CI workflow runs automatically
# No release happens (no tag)
```

### Release Time

```bash
# 1. Update version in package.json
npm version patch  # or minor, or major
# This updates package.json and creates git tag

# 2. Push
git push origin main --tags

# 3. Release workflow runs automatically
```

---

## 📊 Workflow Files Reference

### CI Workflow (`.github/workflows/ci.yml`)

**Triggers**: Push to main/develop, PRs

**Jobs**:
- **test** - Test on multiple Node versions
- **lint** - Type checking and validation
- **security** - Security audit
- **platform-generators** - Test code generators

### Release Workflow (`.github/workflows/release.yml`)

**Triggers**: Git tags starting with `v`, manual dispatch

**Jobs**:
- **release** - Build, test, publish, create release

---

## ✅ Pre-Flight Checklist

Before your first automated release:

- [x] Workflows created and committed
- [x] npm token generated
- [x] NPM_TOKEN added to GitHub secrets
- [x] CI workflow tested and passing
- [x] package.json version correct
- [x] LICENSE file exists
- [x] README.md is comprehensive
- [x] All tests passing locally

---

## 🎉 Quick Start Your First Release

```bash
# 1. Commit everything (including workflows)
git add .
git commit -m "ci: add GitHub Actions for automated releases"

# 2. Push to GitHub
git push origin main

# 3. Create and push version tag
git tag v1.0.2
git push origin main --tags

# 4. Watch the release at:
#    https://github.com/mazharvai007/bd-geo-location/actions

# 5. Your package will be live at:
#    https://www.npmjs.com/package/bd-geo-location
```

---

## 📞 Need Help?

- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **npm Automation Tokens**: https://docs.npmjs.com/creating-and-viewing-access-tokens
- **npm publish**: https://docs.npmjs.com/cli/v10/commands/npm-publish

---

**You're all set!** 🚀

Your package will now be automatically published to npm whenever you push a version tag.

*Last updated: 2025-01-XX*
