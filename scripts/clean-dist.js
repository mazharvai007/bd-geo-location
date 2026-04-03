#!/usr/bin/env node

/**
 * Cross-platform script to clean dist directory
 * Removes .d.mts and .map files from dist directory
 * Works on Windows, Linux, and macOS
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');

// Recursively remove files matching patterns
const cleanDirectory = (dir, patterns) => {
  if (!fs.existsSync(dir)) {
    console.log(`✓ Directory does not exist: ${dir}`);
    return;
  }

  let deletedCount = 0;

  const traverse = (currentDir) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile()) {
        // Check if file matches any pattern
        for (const pattern of patterns) {
          if (pattern.test(entry.name)) {
            try {
              fs.unlinkSync(fullPath);
              deletedCount++;
              console.log(`✓ Deleted: ${path.relative(DIST_DIR, fullPath)}`);
            } catch (err) {
              console.warn(`⚠ Could not delete ${fullPath}:`, err.message);
            }
            break; // Only delete once per file
          }
        }
      }
    }
  };

  traverse(dir);

  if (deletedCount === 0) {
    console.log('✓ No files to clean (dist directory is already clean)');
  } else {
    console.log(`\n✓ Cleaned ${deletedCount} file(s) from dist directory`);
  }
};

// Run the cleaner
try {
  console.log('🧹 Cleaning dist directory...');
  cleanDirectory(DIST_DIR, [/\.d\.mts$/, /\.map$/]);
} catch (error) {
  console.error('❌ Error cleaning dist directory:', error.message);
  process.exit(1);
}
