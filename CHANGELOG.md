# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-XX

### Added
- **Flutter (Dart) code generator** - Generate type-safe Dart models
- **iOS/macOS (Swift) code generator** - Generate Codable Swift models
- **React Native components** - LocationSelector and GeoPicker components
- **Platform generator scripts** - `npm run generate:dart|swift|react-native|all`
- **Comprehensive documentation** - Installation, usage, and quick start guides
- **GitHub Actions workflows** - Automated CI/CD and npm publishing
- **AsyncStorage utilities** for React Native

### Changed
- **Package size reduced by 80%** - 8.7 MB → 1.7 MB through code splitting
- **React hooks** - Fixed all 8 hooks to use `useMemo` instead of `useCallback`
- **Vue composables** - Added input sanitization to search
- **Build process** - Enabled minification and code splitting

### Fixed
- **React** - Fixed 8 critical hook implementation bugs
- **Flutter** - Fixed 4 Dart syntax errors and null safety issues
- **iOS/macOS** - Fixed 3 security vulnerabilities
- **React Native** - Fixed 3 issues (useEffect, imports, dependencies)
- **Vue** - Fixed 1 DoS vulnerability in search
- **Total security fixes**: 19 vulnerabilities resolved
- Added DoS protection (100 character limit on search terms)
- Added input validation on all public functions
- Fixed unsafe type casting across all platforms

### Security
- Added input validation and sanitization
- Implemented DoS protection
- Type-safe operations enforced
- Proper error handling with descriptive messages

### Documentation
- Added installation guide for all platforms
- Added comprehensive usage guide
- Added quick start guide
- Added production readiness report
- Added security analysis reports
- Added package optimization report
- Added GitHub Actions setup guide
- Updated README with platform-specific examples

## [1.0.2] - 2025-01-XX

### Fixed
- Initial bug fixes
- Data validation improvements

## [1.0.1] - 2025-01-XX

### Fixed
- Initial release fixes
- Documentation updates

## [1.0.0] - 2025-01-XX

### Added
- Initial release
- Bangladesh geo data for 8 divisions, 68 districts, 531 upazilas, 4,916 unions
- TypeScript support
- React hooks
- Vue composables
- Angular compatibility
- JSON-based data format
- JSON schema validation
