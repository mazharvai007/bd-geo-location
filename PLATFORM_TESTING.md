# Cross-Platform Testing Guide

This guide explains how bd-geo-location ensures compatibility across all platforms and how to verify it works on your system.

## Supported Platforms

- ✅ **Windows 10/11** (x64, ARM64)
- ✅ **Windows Server** (2016+)
- ✅ **Linux** (Ubuntu, Debian, Fedora, CentOS, Arch, etc.)
- ✅ **macOS** (Intel, Apple Silicon)

## How Cross-Platform Compatibility is Achieved

### 1. Path Handling
All scripts use `path.join()` and `path.normalize()` from Node.js's built-in `path` module. This ensures paths are constructed correctly for each platform:

- **Windows**: `C:\Users\Name\project\file.txt`
- **Linux/macOS**: `/home/user/project/file.txt`

### 2. File System Operations
All file operations use Node.js's `fs` module which works identically across platforms:
- `fs.mkdirSync(dir, { recursive: true })` - Creates directories
- `fs.writeFileSync(file, content)` - Writes files
- `fs.readFileSync(file, 'utf8')` - Reads files
- `fs.existsSync(path)` - Checks existence

### 3. Shell Scripts
No platform-specific shell commands are used. Instead, all scripts are:
- Written in JavaScript/Node.js
- Use the shebang `#!/usr/bin/env node` for maximum compatibility
- Run with `node script-name.js` which works everywhere

### 4. Line Endings
The `.gitattributes` file ensures all text files use LF (Unix-style) line endings, preventing issues on different platforms.

## Running Platform Tests

A comprehensive test script is included to verify compatibility on your platform:

```bash
npm run test:platform
```

This tests:
- ✅ Path handling (correct separators for your platform)
- ✅ File system operations (create, read, write, delete)
- ✅ package.json scripts (all required scripts exist)
- ✅ Script execution (all npm scripts work)
- ✅ Generated files (Dart, Swift, React Native)

### Expected Output

```
Cross-Platform Compatibility Test
=================================
Platform: [Your Platform]
Architecture: [x64/arm64]
Node.js: [Version]

Testing Path Handling
=====================
Platform: [linux/win32/darwin]
Test path: [platform-specific path]
Normalized: [normalized path]
✓ Path separator is correct: [separator]

Testing File System Operations
==============================
✓ Created directory: [path]
✓ Created file: [path]
✓ File content matches
✓ File exists check passed
✓ Cleanup successful

Testing package.json Scripts
============================
✓ Script found: build
✓ Script found: build:watch
✓ Script found: build:clean
✓ Script found: generate:dart
✓ Script found: generate:swift
✓ Script found: generate:react-native
✓ Script found: generate:all
✓ build:clean uses cross-platform Node.js script

Testing Script Execution
========================
Running: build:clean
✓ build:clean completed successfully
Running: generate:dart
✓ generate:dart completed successfully
Running: generate:swift
✓ generate:swift completed successfully
Running: generate:react-native
✓ generate:react-native completed successfully

Testing Generated Files
=======================
Checking Dart models...
✓ Found: village.dart
✓ Found: division.dart
✓ Found: models.dart
Checking Swift models...
✓ Found: Village.swift
✓ Found: Division.swift
✓ Found: BangladeshGeoData.swift
Checking React Native components...
✓ Found: GeoPicker.tsx
✓ Found: LocationSelector.tsx

Test Summary
============
Path Handling: PASSED
File System Operations: PASSED
package.json Scripts: PASSED
Script Execution: 4/4 passed
Generated Files: 3/3 passed

Overall: 10/10 tests passed
===========================
✓ All tests passed! Platform is fully compatible.
```

## Manual Verification

If you want to manually verify compatibility:

### 1. Test Build Process
```bash
npm run build
```
Should complete without errors on all platforms.

### 2. Test Code Generation
```bash
npm run generate:all
```
Should generate:
- `generated/flutter/lib/models/*.dart` (10 files)
- `generated/ios/Sources/BdGeoLocation/Models/*.swift` (9 files)
- `generated/react-native/*.tsx` (2+ files)

### 3. Test Clean Script
```bash
npm run build:clean
```
Should remove `.d.mts` and `.map` files from `dist/` directory.

## Platform-Specific Notes

### Windows
- **Recommended**: Use PowerShell or Windows Terminal
- **Works**: CMD, Git Bash
- **Node.js**: Install from https://nodejs.org/
- **Line endings**: Git will automatically convert to CRLF for `.bat`, `.cmd`, `.ps1` files

### Linux
- **Terminal**: Any bash-compatible terminal
- **Node.js**: Use package manager (apt, yum, dnf, pacman, etc.)
- **Permissions**: Scripts are already executable (`chmod +x`)

### macOS
- **Terminal**: Terminal.app, iTerm2, or any bash/zsh terminal
- **Node.js**: Install from https://nodejs.org/ or use Homebrew
- **Apple Silicon**: Fully supported (arm64)

## Troubleshooting

### "Cannot find module 'fs'" or similar
**Solution**: Ensure you're running from the project directory with `package.json`

### "EACCES: permission denied"
**Solution (Linux/macOS)**:
```bash
chmod +x scripts/*.js
chmod +x test-platform.js
```

### "Command not found: node"
**Solution**: Install Node.js from https://nodejs.org/

### Tests pass but generated files are missing
**Solution**: Run `npm run generate:all` to generate all platform code

### Line ending issues in Git
**Solution**: The `.gitattributes` file handles this. If you still have issues:
```bash
git add --renormalize .
git commit -m "Normalize line endings"
```

## CI/CD Integration

For automated testing in CI/CD pipelines:

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run test:platform
      - run: npm run build
      - run: npm run generate:all
```

## Continuous Monitoring

The project is tested on:
- **GitHub Actions**: Windows, Linux, macOS
- **Node.js versions**: 18.x, 20.x, latest
- **Architecture**: x64, arm64 (where applicable)

All tests must pass before merging changes.

## Additional Resources

- [Cross-Platform Guide](./CROSS_PLATFORM.md)
- [Main README](./README.md)
- [Installation Guide](./docs/INSTALLATION.md)
- [Issue Tracker](https://github.com/mazharvai007/bd-geo-location/issues)
