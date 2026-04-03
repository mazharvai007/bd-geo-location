# Release Guide

This guide explains how to create releases for bd-geo-location using GitHub Actions.

## 🎯 Overview

The release process is fully automated through GitHub Actions. When you push a version tag, GitHub Actions will:
1. ✅ Run tests on Windows, Linux, and macOS
2. ✅ Validate iOS/macOS Swift code
3. ✅ Run cross-platform compatibility tests
4. ✅ Build the package
5. ✅ Verify README is included
6. ✅ Publish to npm
7. ✅ Create GitHub Release with release notes

## 📋 Prerequisites

Before creating a release, ensure:

1. **All tests pass** locally:
   ```bash
   npm run test:platform
   npm run build
   npm run generate:all
   ```

2. **README is up to date**:
   - Verify README.md exists in the root
   - Check that all documentation is current
   - Ensure cross-platform section is updated

3. **Version is updated** in package.json:
   ```json
   {
     "version": "1.1.5"  // Update this
   }
   ```

4. **CHANGELOG is updated**:
   - Document all changes since last release
   - Follow semantic versioning (MAJOR.MINOR.PATCH)

## 🚀 Creating a Release

### Method 1: Git Tag (Recommended)

This is the recommended method for creating releases:

```bash
# 1. Update version in package.json
# 2. Commit your changes
git add .
git commit -m "chore: bump version to 1.1.5"

# 3. Create and push tag
git tag v1.1.5
git push origin v1.1.5

# 4. GitHub Actions will automatically:
#    - Run all tests
#    - Publish to npm
#    - Create GitHub release
```

### Method 2: GitHub UI Manual Trigger

1. Go to: https://github.com/mazharvai007/bd-geo-location/actions/workflows/release.yml
2. Click "Run workflow"
3. Enter version (e.g., `v1.1.5`)
4. Click "Run workflow"

### Method 3: GitHub CLI

```bash
# Install GitHub CLI first: https://cli.github.com/

# Create release
gh release create v1.1.5 \
  --title "Release v1.1.5" \
  --notes "See CHANGELOG.md for details"
```

## 🧪 What Gets Tested

### Cross-Platform Tests
- ✅ Windows (Ubuntu, Windows, macOS)
- ✅ Node.js versions (18.x, 20.x, 22.x)
- ✅ Path handling (platform-specific separators)
- ✅ File system operations
- ✅ Script execution

### Platform Code Generators
- ✅ Flutter/Dart code generation
- ✅ iOS/macOS Swift code generation
- ✅ React Native component generation

### iOS/macOS Specific Tests
- ✅ Swift file generation
- ✅ Required Swift files verification
- ✅ Swift syntax validation (when Swift compiler is available)
- ✅ Package.swift validation

### Package Validation
- ✅ README.md is included
- ✅ LICENSE is included
- ✅ All exports work correctly
- ✅ Data integrity verified
- ✅ Package size is reasonable

## 📦 What Gets Published

### npm Package
The published package includes:
- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Full documentation
- `LICENSE` - MIT License

### GitHub Release
The GitHub release includes:
- `README.md` - Documentation
- `LICENSE` - License file
- `CHANGELOG.md` - Version history
- Auto-generated release notes with:
  - Installation instructions
  - Quick start guides for all frameworks
  - Platform code generator commands
  - Documentation links
  - Data coverage information
  - Testing verification

## 🔐 Required Secrets

Ensure these secrets are configured in your GitHub repository:

1. **NPM_TOKEN** - npm authentication token
   - Go to: https://github.com/mazharvai007/bd-geo-location/settings/secrets/actions
   - Add new secret: `NPM_TOKEN`
   - Value: Your npm token (create at https://www.npmjs.com/settings/tokens)

2. **GITHUB_TOKEN** - Automatically provided by GitHub Actions
   - No configuration needed

## 📝 Version Numbering

Follow semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR** (e.g., 2.0.0): Breaking changes
- **MINOR** (e.g., 1.2.0): New features, backward compatible
- **PATCH** (e.g., 1.1.5): Bug fixes, backward compatible

Examples:
- `v1.1.5` - Patch release (bug fixes)
- `v1.2.0` - Minor release (new features)
- `v2.0.0` - Major release (breaking changes)

## 🔍 Monitoring Release Progress

After triggering a release:

1. **Go to Actions tab**:
   https://github.com/mazharvai007/bd-geo-location/actions

2. **Find the "Release" workflow**:
   - Click on the latest run
   - Monitor progress in real-time

3. **Check each job**:
   - Test on ubuntu-latest
   - Test on windows-latest
   - Test on macos-latest
   - Validate iOS/macOS Swift Code
   - Create Release and Publish

## ✅ Success Indicators

When release is successful, you'll see:

```
✅ Package v1.1.5 published successfully!
📦 Available at: https://www.npmjs.com/package/bd-geo-location
🎉 Release created: https://github.com/mazharvai007/bd-geo-location/releases/tag/v1.1.5
```

## ❌ Troubleshooting

### Release Failed: Tests Not Passing

**Solution**: Run tests locally first:
```bash
npm run test:platform
npm run build
```

### Release Failed: NPM Token Invalid

**Solution**:
1. Go to https://www.npmjs.com/settings/tokens
2. Create new automation token
3. Update `NPM_TOKEN` secret in GitHub

### Release Failed: README Not Found

**Solution**: Ensure README.md exists and is committed:
```bash
ls -la README.md
git add README.md
git commit -m "docs: add README"
```

### Release Failed: Swift Validation Error

**Solution**:
```bash
# Test Swift generation locally
npm run generate:swift

# Check generated files
ls -la generated/ios/Sources/BdGeoLocation/Models/
```

### Release Failed: Package Size Too Large

**Solution**:
```bash
# Check package size
npm run build
du -sh dist/

# Should be ~1.7M - 1.8M
```

## 📊 After Release

### Verify npm Package
```bash
# Check if package is published
npm view bd-geo-location

# Install and test
npm install bd-geo-location@latest
```

### Verify GitHub Release
Visit: https://github.com/mazharvai007/bd-geo-location/releases

### Announce Release
- Update website/documentation
- Post on social media
- Notify users

## 🔄 Rollback Procedure

If you need to rollback a release:

### From npm
```bash
# Unpublish specific version (only within 72 hours)
npm unpublish bd-geo-location@1.1.5

# Or deprecate
npm deprecate bd-geo-location@1.1.5 "Critical bug, use 1.1.6 instead"
```

### From GitHub
1. Go to Releases page
2. Edit the release
3. Mark as "Draft" or delete

### Hotfix Release
```bash
# Fix the issue
git checkout main
git pull
# Make fixes
git add .
git commit -m "fix: critical bug"

# Create hotfix version
git tag v1.1.6
git push origin v1.1.6
```

## 📅 Release Checklist

Before triggering a release:

- [ ] All tests pass locally (`npm run test:platform`)
- [ ] Build succeeds (`npm run build`)
- [ ] Code generators work (`npm run generate:all`)
- [ ] README.md is updated
- [ ] CHANGELOG.md is updated
- [ ] Version in package.json is updated
- [ ] NPM_TOKEN secret is configured
- [ ] No critical security vulnerabilities
- [ ] Documentation is complete
- [ ] Cross-platform compatibility verified

## 🎉 Best Practices

1. **Test thoroughly** before releasing
2. **Use semantic versioning** consistently
3. **Document all changes** in CHANGELOG
4. **Tag releases** in git
5. **Monitor npm** for issues after release
6. **Keep README** updated with latest features
7. **Test on all platforms** (Windows, Linux, macOS)
8. **Verify iOS/macOS** Swift code generation

## 📚 Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [Release Workflow](./.github/workflows/release.yml)
- [CI Workflow](./.github/workflows/ci.yml)

## 🆘 Support

If you encounter issues:

1. Check [GitHub Issues](https://github.com/mazharvai007/bd-geo-location/issues)
2. Review [CI/CD logs](https://github.com/mazharvai007/bd-geo-location/actions)
3. Create new issue with details

---

**Happy Releasing! 🚀**
