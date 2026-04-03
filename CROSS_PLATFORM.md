# Cross-Platform Compatibility Guide

This package now supports all major operating systems with consistent behavior.

## Supported Operating Systems

- ✅ **Windows** (10, 11) - PowerShell, CMD, Git Bash
- ✅ **Linux** (All distributions: Ubuntu, Debian, Fedora, etc.)
- ✅ **macOS** (Intel & Apple Silicon)

## What Was Fixed

### 1. Build Script (package.json)

**Before:**
```json
"build:clean": "find dist -name '*.d.mts' -delete && find dist -name '*.map' -delete"
```
This Unix command only worked on Linux/macOS.

**After:**
```json
"build:clean": "node scripts/clean-dist.js"
```
Now uses a cross-platform Node.js script.

### 2. New Cross-Platform Script

Created `scripts/clean-dist.js` that works on all platforms using Node.js built-in modules.

## Usage on Different Platforms

### Windows (PowerShell or CMD)

```powershell
# Navigate to project directory
cd C:\path\to\bd-geo-location

# Run any script
npm run generate:dart
npm run generate:swift
npm run generate:react-native
npm run generate:all
```

### Linux / macOS (Terminal)

```bash
# Navigate to project directory
cd /path/to/bd-geo-location

# Run any script
npm run generate:dart
npm run generate:swift
npm run generate:react-native
npm run generate:all
```

## Troubleshooting

### "Missing script" error

**Cause:** You're in the wrong directory or the package.json is corrupted.

**Solution:**
1. Make sure you're in the `bd-geo-location` directory
2. Verify package.json exists: `ls package.json` (Linux/macOS) or `dir package.json` (Windows)
3. Reinstall dependencies: `npm install`

### "Command not found" error

**Cause:** Node.js is not installed or not in PATH.

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Verify installation: `node --version` and `npm --version`

### Permission denied (Linux/macOS)

**Cause:** Scripts don't have execute permissions.

**Solution:**
```bash
chmod +x scripts/*.js
```

### Script runs but produces no output

**Cause:** The script ran successfully but output directory doesn't exist yet.

**Solution:**
- Scripts will create output directories automatically
- Check the `generated/` folder after script completes

## All Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build the package for distribution |
| `npm run build:watch` | Build in watch mode (for development) |
| `npm run build:clean` | Clean build artifacts from dist/ |
| `npm run data:validate` | Validate geo data integrity |
| `npm run data:test` | Test data functionality |
| `npm run generate:dart` | Generate Flutter/Dart models |
| `npm run generate:swift` | Generate iOS/macOS Swift models |
| `npm run generate:react-native` | Generate React Native components |
| `npm run generate:all` | Generate all platform code at once |

## Testing Your Setup

Run this command to verify everything works:

```bash
npm run generate:dart
```

Expected output:
```
🎯 Generating SECURE Dart models for Flutter...
  ✓ Generated village.dart
  ✓ Generated union.dart
  ✓ Generated pourosova.dart
  ✓ Generated upazila.dart
  ✓ Generated citycorporation.dart
  ✓ Generated district.dart
  ✓ Generated division.dart
  ✓ Generated bangladeshgeodata.dart
  ✓ Generated models.dart
  ✓ Generated SECURE bangladesh_geo_data.dart

✅ SECURE Dart models generated successfully in: /path/to/bd-geo-location/generated/flutter/lib/models
```

## Additional Resources

- [Main README](./README.md)
- [Installation Guide](./docs/INSTALLATION.md)
- [Production Readiness Report](./generated/FINAL_PRODUCTION_READINESS.md)
