#!/usr/bin/env node

/**
 * Cross-Platform Testing Script
 * Tests that bd-geo-location works correctly on all platforms
 *
 * This script validates:
 * - File system operations (works on Windows, Linux, macOS)
 * - Path handling (uses path.join for cross-platform compatibility)
 * - Script execution (all npm scripts work)
 * - Build process (TypeScript compilation)
 * - Code generation (Dart, Swift, React Native)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}\n${'='.repeat(msg.length)}`),
};

// Get platform information
const getPlatformInfo = () => {
  const platform = process.platform;
  const arch = process.arch;
  const nodeVersion = process.version;
  const platformNames = {
    win32: 'Windows',
    darwin: 'macOS',
    linux: 'Linux',
  };
  return {
    platform,
    platformName: platformNames[platform] || platform,
    arch,
    nodeVersion,
  };
};

// Test path handling
const testPathHandling = () => {
  log.section('Testing Path Handling');

  const testPath = path.join(__dirname, 'test', 'nested', 'path.txt');
  const normalizedPath = path.normalize(testPath);
  const platform = process.platform;

  log.info(`Platform: ${platform}`);
  log.info(`Test path: ${testPath}`);
  log.info(`Normalized: ${normalizedPath}`);

  // Verify path separators are correct for platform
  const expectedSeparator = platform === 'win32' ? '\\' : '/';
  const actualSeparator = path.sep;

  if (actualSeparator === expectedSeparator) {
    log.success(`Path separator is correct: "${actualSeparator}"`);
    return true;
  } else {
    log.error(`Path separator mismatch. Expected: "${expectedSeparator}", Got: "${actualSeparator}"`);
    return false;
  }
};

// Test file system operations
const testFileSystem = () => {
  log.section('Testing File System Operations');

  const testDir = path.join(__dirname, '.test-platform');
  const testFile = path.join(testDir, 'test.txt');

  try {
    // Create directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
      log.success(`Created directory: ${testDir}`);
    }

    // Write file
    fs.writeFileSync(testFile, 'Test content');
    log.success(`Created file: ${testFile}`);

    // Read file
    const content = fs.readFileSync(testFile, 'utf8');
    if (content === 'Test content') {
      log.success('File content matches');
    } else {
      log.error('File content mismatch');
      return false;
    }

    // Check file exists
    if (fs.existsSync(testFile)) {
      log.success('File exists check passed');
    }

    // Cleanup
    fs.unlinkSync(testFile);
    fs.rmdirSync(testDir);
    log.success('Cleanup successful');

    return true;
  } catch (error) {
    log.error(`File system test failed: ${error.message}`);
    return false;
  }
};

// Test script execution
const testScriptExecution = () => {
  log.section('Testing Script Execution');

  const scriptsToTest = [
    { name: 'build:clean', cmd: 'npm run build:clean' },
    { name: 'generate:dart', cmd: 'npm run generate:dart' },
    { name: 'generate:swift', cmd: 'npm run generate:swift' },
    { name: 'generate:react-native', cmd: 'npm run generate:react-native' },
  ];

  const results = [];

  for (const script of scriptsToTest) {
    try {
      log.info(`Running: ${script.name}`);
      execSync(script.cmd, { stdio: 'pipe', timeout: 30000 });
      log.success(`${script.name} completed successfully`);
      results.push({ name: script.name, success: true });
    } catch (error) {
      log.error(`${script.name} failed: ${error.message}`);
      results.push({ name: script.name, success: false });
    }
  }

  return results;
};

// Test generated files
const testGeneratedFiles = () => {
  log.section('Testing Generated Files');

  const checks = [
    {
      name: 'Dart models',
      path: path.join(__dirname, 'generated/flutter/lib/models'),
      requiredFiles: ['village.dart', 'division.dart', 'models.dart'],
    },
    {
      name: 'Swift models',
      path: path.join(__dirname, 'generated/ios/Sources/BdGeoLocation/Models'),
      requiredFiles: ['Village.swift', 'Division.swift', 'BangladeshGeoData.swift'],
    },
    {
      name: 'React Native components',
      path: path.join(__dirname, 'generated/react-native'),
      requiredFiles: ['GeoPicker.tsx', 'LocationSelector.tsx'],
    },
  ];

  const results = [];

  for (const check of checks) {
    log.info(`Checking ${check.name}...`);

    if (!fs.existsSync(check.path)) {
      log.error(`Directory not found: ${check.path}`);
      results.push({ name: check.name, success: false });
      continue;
    }

    const files = fs.readdirSync(check.path);
    let allFound = true;

    for (const required of check.requiredFiles) {
      if (files.includes(required)) {
        log.success(`  Found: ${required}`);
      } else {
        log.error(`  Missing: ${required}`);
        allFound = false;
      }
    }

    results.push({ name: check.name, success: allFound });
  }

  return results;
};

// Test package.json scripts
const testPackageJson = () => {
  log.section('Testing package.json Scripts');

  const packagePath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const scripts = packageJson.scripts;

  const requiredScripts = [
    'build',
    'build:watch',
    'build:clean',
    'generate:dart',
    'generate:swift',
    'generate:react-native',
    'generate:all',
  ];

  let allFound = true;

  for (const script of requiredScripts) {
    if (scripts[script]) {
      log.success(`Script found: ${script}`);
    } else {
      log.error(`Script missing: ${script}`);
      allFound = false;
    }
  }

  // Check that build:clean uses Node.js (not Unix commands)
  if (scripts['build:clean'].includes('node ')) {
    log.success('build:clean uses cross-platform Node.js script');
  } else {
    log.error('build:clean may use platform-specific commands');
    allFound = false;
  }

  return allFound;
};

// Main test runner
const runTests = () => {
  log.section('Cross-Platform Compatibility Test');
  const platformInfo = getPlatformInfo();
  log.info(`Platform: ${platformInfo.platformName}`);
  log.info(`Architecture: ${platformInfo.arch}`);
  log.info(`Node.js: ${platformInfo.nodeVersion}`);

  const results = {
    pathHandling: testPathHandling(),
    fileSystem: testFileSystem(),
    packageJson: testPackageJson(),
    scriptExecution: testScriptExecution(),
    generatedFiles: testGeneratedFiles(),
  };

  // Print summary
  log.section('Test Summary');

  const printResult = (name, passed) => {
    if (typeof passed === 'boolean') {
      if (passed) {
        log.success(`${name}: PASSED`);
      } else {
        log.error(`${name}: FAILED`);
      }
    } else if (Array.isArray(passed)) {
      const allPassed = passed.every((r) => r.success);
      const passedCount = passed.filter((r) => r.success).length;
      log.info(`${name}: ${passedCount}/${passed.length} passed`);
      for (const result of passed) {
        if (result.success) {
          log.success(`  ✓ ${result.name}`);
        } else {
          log.error(`  ✗ ${result.name}`);
        }
      }
    }
  };

  printResult('Path Handling', results.pathHandling);
  printResult('File System Operations', results.fileSystem);
  printResult('package.json Scripts', results.packageJson);
  printResult('Script Execution', results.scriptExecution);
  printResult('Generated Files', results.generatedFiles);

  // Calculate overall pass rate
  const booleanResults = [
    results.pathHandling,
    results.fileSystem,
    results.packageJson,
  ];
  const arrayResults = [results.scriptExecution, results.generatedFiles];

  const booleanPassed = booleanResults.filter((r) => r === true).length;
  const arrayPassed = arrayResults.reduce((sum, arr) => {
    return sum + arr.filter((r) => r.success).length;
  }, 0);
  const arrayTotal = arrayResults.reduce((sum, arr) => sum + arr.length, 0);

  const totalPassed = booleanPassed + arrayPassed;
  const totalTests = booleanResults.length + arrayTotal;

  log.section(`Overall: ${totalPassed}/${totalTests} tests passed`);

  if (totalPassed === totalTests) {
    log.success('All tests passed! Platform is fully compatible.');
    process.exit(0);
  } else {
    log.error('Some tests failed. Please review the output above.');
    process.exit(1);
  }
};

// Run tests
try {
  runTests();
} catch (error) {
  log.error(`Test runner failed: ${error.message}`);
  console.error(error);
  process.exit(1);
}
