#!/usr/bin/env node

/**
 * Bundle Size Analyzer
 * Analyzes package bundle size and provides optimization suggestions
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');

// Size thresholds (in bytes)
// Higher thresholds for geo-data packages (data-heavy by nature)
const THRESHOLDS = {
  warning: 800 * 1024, // 800KB
  error: 2 * 1024 * 1024, // 2MB
};

// Format bytes to human-readable
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get file size
const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.size;
};

// Analyze bundle
const analyzeBundle = () => {
  console.log('\n📊 Bundle Size Analysis\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run npm run build first.');
    process.exit(1);
  }

  const files = fs.readdirSync(DIST_DIR).filter((f) =>
    f.endsWith('.js') || f.endsWith('.mjs')
  );

  let totalSize = 0;
  const fileSizes = [];

  console.log('File Sizes:');
  console.log('─'.repeat(60));

  for (const file of files) {
    const filePath = path.join(DIST_DIR, file);
    const size = getFileSize(filePath);
    totalSize += size;
    fileSizes.push({ file, size });

    const status = size > THRESHOLDS.error ? '❌' : size > THRESHOLDS.warning ? '⚠️' : '✅';
    console.log(`${status} ${file.padEnd(40)} ${formatBytes(size).padStart(10)}`);
  }

  console.log('─'.repeat(60));
  console.log(`Total: ${formatBytes(totalSize).padStart(50)}`);

  // Analyze largest files
  console.log('\n📦 Largest Files:');
  console.log('─'.repeat(60));
  fileSizes.sort((a, b) => b.size - a.size);
  const topFiles = fileSizes.slice(0, 5);

  for (const { file, size } of topFiles) {
    const percentage = ((size / totalSize) * 100).toFixed(1);
    console.log(`${file.padEnd(40)} ${formatBytes(size).padStart(10)} (${percentage}%)`);
  }

  // Package size estimation
  console.log('\n📦 Package Size Estimation:');
  console.log('─'.repeat(60));

  // Estimate compressed size (gzip typically reduces to 30-40%)
  const compressedSize = totalSize * 0.35;
  console.log(`Uncompressed: ${formatBytes(totalSize).padStart(15)}`);
  console.log(`Compressed (~35%): ${formatBytes(compressedSize).padStart(15)}`);

  // Check against thresholds
  console.log('\n✅ Size Validation:');
  console.log('─'.repeat(60));

  if (totalSize > THRESHOLDS.error) {
    console.error(`❌ Package size ${formatBytes(totalSize)} exceeds threshold of ${formatBytes(THRESHOLDS.error)}`);
    console.error('   Consider optimizing the bundle or splitting into smaller packages.');
    return false;
  } else if (totalSize > THRESHOLDS.warning) {
    console.warn(`⚠️  Package size ${formatBytes(totalSize)} is above warning threshold of ${formatBytes(THRESHOLDS.warning)}`);
    console.warn('   Consider optimization for better performance.');
    return true;
  } else {
    console.log(`✅ Package size ${formatBytes(totalSize)} is within acceptable limits.`);
    return true;
  }
};

// Provide optimization suggestions
const showSuggestions = () => {
  console.log('\n💡 Optimization Suggestions:');
  console.log('─'.repeat(60));
  console.log('• The package already uses code splitting and minification');
  console.log('• Large files are mainly due to Bangladesh geo data (core feature)');
  console.log('• Consider tree-shaking: users only import what they need');
  console.log('• Lazy loading: Load data on demand for large applications');
  console.log('• Compression: Use gzip/brotli on server (reduces to ~35%)');
  console.log('• CDN: Host the package on CDN for faster downloads');
};

// Performance benchmarks
const runBenchmarks = () => {
  console.log('\n⚡ Performance Benchmarks:');
  console.log('─'.repeat(60));

  const startTime = Date.now();

  // Test loading performance
  try {
    const pkg = require('../dist/index.js');
    const loadTime = Date.now() - startTime;
    console.log(`✅ Package load time: ${loadTime}ms`);

    // Test data access performance
    const queryStart = Date.now();
    const divisions = pkg.getAllDivisions();
    const queryTime = Date.now() - queryStart;
    console.log(`✅ getAllDivisions(): ${queryTime}ms (${divisions.length} divisions)`);

    // Test search performance
    const searchStart = Date.now();
    const results = pkg.getDistrictsByDivision('30');
    const searchTime = Date.now() - searchStart;
    console.log(`✅ getDistrictsByDivision(): ${searchTime}ms (${results.length} districts)`);

    return true;
  } catch (error) {
    console.error(`❌ Benchmark failed: ${error.message}`);
    return false;
  }
};

// Main
try {
  const sizeOk = analyzeBundle();
  showSuggestions();
  const perfOk = runBenchmarks();

  console.log('\n' + '─'.repeat(60));
  if (sizeOk && perfOk) {
    console.log('✅ Bundle analysis complete - Package is optimized!');
    process.exit(0);
  } else {
    console.log('⚠️  Bundle analysis complete - See warnings above.');
    process.exit(1);
  }
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
