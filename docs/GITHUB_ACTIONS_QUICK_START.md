# 📦 NPM Release via GitHub Actions - Quick Reference

## One-Time Setup

### 1. Create npm Token
```bash
# Go to: https://www.npmjs.com/
# Profile → Access Tokens → Generate New Token
# Select: Automation
# Copy token
```

### 2. Add to GitHub Secrets
```bash
# Go to: https://github.com/mazharvai007/bd-geo-location/settings/secrets/actions
# New repository secret
# Name: NPM_TOKEN
# Paste token
```

### 3. Push Workflows
```bash
git add .github/workflows/
git commit -m "ci: add GitHub Actions"
git push origin main
```

---

## 🚀 How to Release

### Automatic Release (Recommended)

```bash
# Commit your changes
git add .
git commit -m "chore: preparing for v1.0.2"

# Create version tag
git tag v1.0.2

# Push tag (triggers automatic release)
git push origin main --tags
```

### Manual Release (From GitHub)

1. Go to **Actions** tab
2. Select **Release** workflow
3. Click **Run workflow**
4. Enter version: `v1.0.2`
5. Click **Run workflow**

---

## ✅ What Happens Automatically

1. ✅ Code checkout
2. ✅ Build package
3. ✅ Run tests
4. ✅ Validate package
5. ✅ **Publish to npm** 📦
6. ✅ **Create GitHub release** 🎉

---

## 🔍 Monitor Release

- **Actions**: https://github.com/mazharvai007/bd-geo-location/actions
- **npm**: https://www.npmjs.com/package/bd-geo-location
- **Releases**: https://github.com/mazharvai007/bd-geo-location/releases

---

## ⚡ Quick Commands

```bash
# Bump version and create tag
npm version patch  # v1.0.2 → v1.0.3
git push origin main --tags

# Bump minor version
npm version minor  # v1.0.2 → v1.1.0
git push origin main --tags

# Bump major version
npm version major  # v1.0.2 → v2.0.0
git push origin main --tags
```

---

## 🎯 You're Ready!

Your first automated release:

```bash
git tag v1.0.2
git push origin main --tags
```

That's it! 🚀
