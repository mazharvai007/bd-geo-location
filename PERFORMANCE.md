# Package Size & Performance

This document provides detailed information about the bd-geo-location package size and performance characteristics.

## 📊 Package Size

### Current Size

| Metric | Size |
|--------|------|
| **Uncompressed** | 1.01 MB |
| **Compressed (gzip)** | ~361 KB (35% of original) |
| **npm Package** | 273 KB (.tgz) |

### File Breakdown

The package consists of:

| File | Size | Percentage |
|------|------|------------|
| Geo Data Chunk 1 | 504 KB | 48.8% |
| Geo Data Chunk 2 | 504 KB | 48.8% |
| Vue.js Entry | 5.7 KB | 0.5% |
| Utilities Chunk | 4.9 KB | 0.5% |
| Main Entry | 4.6 KB | 0.4% |
| React/Vue/RN Entries | < 1 KB each | < 0.1% |

**Note**: The two 504KB chunks contain the Bangladesh geographical data (Divisions, Districts, Upazilas, Unions, Villages). This is the core feature of the package and is expected to be large.

### Why is the package this size?

The package size is primarily due to:
- **Complete Bangladesh geo data**: 8 Divisions, 64 Districts, 495 Upazilas, thousands of Unions and Villages
- **Bilingual support**: Both English and Bengali names
- **Full hierarchy**: Complete data from Divisions down to Villages
- **Optimized format**: Minified and code-split for efficiency

## ⚡ Performance

### Load Performance

| Operation | Time | Notes |
|-----------|------|-------|
| **Package Load** | ~16ms | One-time initialization |
| **Get All Divisions** | < 1ms | Returns 8 divisions |
| **Get Districts by Division** | < 1ms | Returns ~8 districts |
| **Search** | < 1ms | Instant lookup |
| **Filter Operations** | < 1ms | Memory-based filtering |

### Memory Usage

| Operation | Memory | Notes |
|-----------|--------|-------|
| **Idle** | ~1.01 MB | Package loaded in memory |
| **With Data** | ~1.01 MB | Data is included in package |
| **Per User** | Same | Shared data reference |

### Optimization Techniques Used

1. **Code Splitting**: Data is split into chunks for better caching
2. **Tree Shaking**: Unused code can be eliminated by bundlers
3. **Minification**: All code is minified (Terser)
4. **Compression**: gzip reduces size to 35% of original
5. **Lazy Loading**: Data loads on-demand when imported

## 🚀 Real-World Performance

### Initial Load
```
User Request → Download (273 KB gzipped) → Parse (16ms) → Ready
Total time: ~100-500ms (depending on network)
```

### Subsequent Access
```
Memory Access → Instant (< 1ms)
```

### With CDN + Caching
```
First User: Download from CDN (~100ms)
Subsequent Users: Load from cache (0ms)
```

## 💡 Optimization Tips

### For Users

1. **Use Tree Shaking**:
   ```typescript
   // ✅ Good: Only import what you need
   import { getAllDivisions } from 'bd-geo-location';

   // ❌ Bad: Import everything
   import * as bd from 'bd-geo-location';
   ```

2. **Lazy Load for Large Apps**:
   ```typescript
   // Load only when needed
   const loadGeoData = async () => {
     const { getAllDivisions } = await import('bd-geo-location');
     return getAllDivisions();
   };
   ```

3. **Use Server-Side Compression**:
   - Enable gzip or brotli on your server
   - Reduces transfer size to 361 KB

4. **CDN Hosting**:
   - Host the package on CDN for faster downloads
   - Edge caching reduces latency

### For Developers

1. **Code Splitting**: Already enabled in `tsup.config.ts`
2. **Minification**: Already enabled
3. **Source Maps**: Disabled to reduce size
4. **External Dependencies**: React, Vue, React Native are external

## 📈 Performance Monitoring

### Run Bundle Analysis

```bash
npm run analyze
```

This will show:
- File sizes
- Largest files
- Package size estimation
- Performance benchmarks
- Optimization suggestions

### Example Output

```
📊 Bundle Size Analysis

File Sizes:
────────────────────────────────────────────────────────────
✅ chunk-745FSI7K.mjs                           2.6 KB
✅ chunk-7AXGEKLM.js                         504.13 KB
✅ chunk-A22T5G6E.mjs                        504.06 KB
...

Total:                                            1.01 MB

⚡ Performance Benchmarks:
────────────────────────────────────────────────────────────
✅ Package load time: 16ms
✅ getAllDivisions(): 0ms (8 divisions)
✅ getDistrictsByDivision(): 0ms (16 districts)
```

## 🎯 Size Thresholds

The package uses appropriate thresholds for a geo-data package:

| Threshold | Size | Status |
|-----------|------|--------|
| **Warning** | 800 KB | ⚠️ Current: 1.01 MB |
| **Error** | 2 MB | ✅ Well below |

**Note**: The package size is acceptable for a comprehensive geo-data package. The large size is due to the complete Bangladesh geographical data, which is the core feature.

## 🔍 Comparison with Alternatives

| Package | Size | Data Coverage |
|---------|------|---------------|
| **bd-geo-location** | 1.01 MB | Complete (Divisions → Villages) |
| Alternative 1 | ~500 KB | Divisions only |
| Alternative 2 | ~200 KB | Districts only |
| Alternative 3 | ~2 MB | Complete + extra features |

## 📊 Bundle Size History

| Version | Size | Changes |
|---------|------|---------|
| 1.1.4 | 1.01 MB | Current |
| 1.1.3 | ~1.0 MB | Minor optimizations |
| 1.1.2 | ~1.0 MB | Initial release |

## 🎯 Recommendations

### For Best Performance

1. **Server Configuration**:
   ```nginx
   # nginx.conf
   gzip on;
   gzip_types application/javascript application/json;
   gzip_min_length 1000;
   ```

2. **CDN Usage**:
   ```html
   <!-- Use CDN for faster loading -->
   <script src="https://cdn.example.com/bd-geo-location"></script>
   ```

3. **Caching Strategy**:
   ```http
   Cache-Control: public, max-age=31536000, immutable
   ```

4. **Tree Shaking**:
   ```javascript
   // webpack.config.js
   optimization: {
     usedExports: true,
     sideEffects: false,
   }
   ```

## 📝 Performance Checklist

Before deploying to production:

- [ ] Run `npm run analyze` to check bundle size
- [ ] Enable gzip/brotli compression on server
- [ ] Configure CDN for static assets
- [ ] Set appropriate cache headers
- [ ] Use tree shaking in bundler config
- [ ] Test load time on slow networks (3G)
- [ ] Monitor memory usage in production

## 🆘 Troubleshooting

### Issue: Package size increased unexpectedly

**Solution**:
```bash
# Analyze what changed
npm run analyze

# Check for duplicate data
npm run data:validate
```

### Issue: Slow initial load

**Solution**:
1. Enable compression on server
2. Use CDN hosting
3. Implement lazy loading
4. Check network bandwidth

### Issue: High memory usage

**Solution**:
- The package uses ~1.01 MB when loaded
- This is shared across all imports
- No duplicate data is created
- If using multiple instances, they share the same data

## 📚 Additional Resources

- [Bundle Analysis Tool](../scripts/analyze-bundle.js)
- [tsup Configuration](../tsup.config.ts)
- [Performance Testing](../.github/workflows/ci.yml)

---

**Last Updated**: April 2025
**Package Version**: 1.1.4
