# Installation Guide

Complete installation instructions for **bd-geo-location** across all platforms.

---

## 📦 Table of Contents

- [npm Package (JavaScript/TypeScript)](#npm-package-javascripttypescript)
  - [React](#react)
  - [Vue](#vue)
  - [Angular](#angular)
  - [React Native](#react-native)
  - [Vanilla TypeScript/JavaScript](#vanilla-typescriptjavascript)
- [Flutter](#flutter)
- [iOS/macOS](#iosmacos)
- [Platform Generators](#platform-generators)

---

## npm Package (JavaScript/TypeScript)

### Base Installation

Install the package in your project:

```bash
npm install bd-geo-location
# or
yarn add bd-geo-location
# or
pnpm add bd-geo-location
```

### React

**Requirements:**
- React 16.8+ (with hooks support)
- TypeScript 4.0+ (recommended)

**Installation:**

```bash
npm install bd-geo-location
```

**Usage:**

```tsx
import { useDivisions, useDistricts } from 'bd-geo-location/react';

function MyComponent() {
  const divisions = useDivisions();
  // ...
}
```

**No additional dependencies required** - React is a peer dependency.

---

### Vue

**Requirements:**
- Vue 3.0+
- TypeScript 4.0+ (recommended)

**Installation:**

```bash
npm install bd-geo-location
```

**Usage:**

```vue
<script setup lang="ts">
import { useDivisions } from 'bd-geo-location/vue';

const { divisions } = useDivisions();
</script>
```

**No additional dependencies required** - Vue is a peer dependency.

---

### Angular

**Requirements:**
- Angular 12+
- TypeScript 4.0+

**Installation:**

```bash
npm install bd-geo-location
```

**Usage:**

```typescript
import { getAllDivisions } from 'bd-geo-location';

export class MyComponent {
  divisions = getAllDivisions();
}
```

**No additional dependencies required** - Works with base package.

---

### React Native

**Requirements:**
- React Native 0.60+
- React 16.8+

**Installation:**

```bash
# Install the package
npm install bd-geo-location

# Install required peer dependencies
npm install @react-native-picker/picker
npm install @react-native-async-storage/async-storage

# For iOS, install pods
cd ios && pod install
```

**Usage:**

```tsx
import { LocationSelector } from 'bd-geo-location/react-native';

function MyScreen() {
  return (
    <LocationSelector
      onLocationChange={(location) => console.log(location)}
      showUnion={true}
    />
  );
}
```

**Note:** For iOS, you need to install pods after adding dependencies.

---

### Vanilla TypeScript/JavaScript

**Requirements:**
- TypeScript 4.0+ (recommended)
- ES2020+ support

**Installation:**

```bash
npm install bd-geo-location
```

**Usage:**

```typescript
import { getAllDivisions, getDistrictsByDivision } from 'bd-geo-location';

const divisions = getAllDivisions();
const districts = getDistrictsByDivision('30');
```

**No additional dependencies required.**

---

## Flutter

### Option 1: Use Generated Dart Models

**Requirements:**
- Flutter 3.0+ (Dart 3.0+)

**Installation:**

1. **Generate Dart models** from the npm package:

```bash
# Install bd-geo-location globally
npm install -g bd-geo-location

# Generate Dart code in your Flutter project
cd your_flutter_project
mkdir -p lib/models
bd-geo-location-generate-dart > lib/models/bangladesh_geo_data.dart
```

Or manually generate:

```bash
# Clone the repository
git clone https://github.com/mazharvai007/bd-geo-location.git
cd bd-geo-location

# Generate Flutter code
npm run generate:dart

# Copy generated files to your Flutter project
cp -r generated/flutter/lib/models/* your_flutter_project/lib/models/
```

2. **Add the generated files** to your Flutter project:

```dart
// In your Flutter app
import 'package:your_app/models/models.dart';
import 'package:your_app/models/bangladesh_geo_data.dart';
```

3. **Load JSON data**:

```dart
import 'dart:convert';
import 'package:flutter/services.dart';

Future<BangladeshGeoData> loadGeoData() async {
  final jsonString = await rootBundle.loadString('assets/bangladesh.json');
  final json = jsonDecode(jsonString);
  return BangladeshGeoData.fromJson(json);
}
```

**Usage:**

```dart
final geoData = await loadGeoData();
final divisions = geoData.divisions;
final dhakaDistricts = geoData.getDistrictsByDivision('30');
```

---

### Option 2: Use Package Directly (Recommended)

For production use, we recommend publishing the generated Dart code as a Flutter package.

**Coming soon:** `bd_geo_location` Flutter package on pub.dev

---

## iOS/macOS

### Option 1: Use Generated Swift Models

**Requirements:**
- Xcode 15.0+
- Swift 5.9+

**Installation:**

1. **Generate Swift models** from the npm package:

```bash
# Clone the repository
git clone https://github.com/mazharvai007/bd-geo-location.git
cd bd-geo-location

# Generate Swift code
npm run generate:swift

# Copy generated files to your iOS/macOS project
cp -r generated/ios/Sources your_project/
```

2. **Add to your Xcode project:**

   - Drag the `Sources/BdGeoLocation` folder into your Xcode project
   - Make sure "Copy items if needed" is unchecked if you want to reference the generated files

3. **Load JSON data:**

```swift
import BdGeoLocation

// Load JSON from bundle
guard let url = Bundle.main.url(forResource: "bangladesh", withExtension: "json"),
      let data = try? Data(contentsOf: url) else {
    fatalError("Failed to load bangladesh.json")
}

let geoData = try BangladeshGeoData.load(from: data)
```

**Usage:**

```swift
let divisions = geoData.getAllDivisions()
let dhakaDistricts = geoData.getDistricts(divisionId: "30")
```

---

### Option 2: Swift Package Manager

Create a local Swift package:

1. **Generate the Swift package:**

```bash
npm run generate:swift
```

2. **In Xcode:**
   - File → Add Package Dependencies
   - Select `generated/ios` directory
   - Add to your target

3. **Import and use:**

```swift
import BdGeoLocation
```

---

## Platform Generators

If you want to generate platform-specific code yourself:

### Prerequisites

```bash
# Install the package
npm install bd-geo-location

# Or clone the repository
git clone https://github.com/mazharvai007/bd-geo-location.git
cd bd-geo-location
npm install
```

### Generate for Specific Platform

```bash
# Flutter (Dart)
npm run generate:dart

# iOS/macOS (Swift)
npm run generate:swift

# React Native
npm run generate:react-native

# All platforms
npm run generate:all
```

### Output Locations

- **Flutter**: `generated/flutter/lib/models/`
- **iOS/macOS**: `generated/ios/Sources/BdGeoLocation/`
- **React Native**: `generated/react-native/`

---

## 📋 Platform Support Summary

| Platform | Package | Status | Notes |
|----------|---------|--------|-------|
| **React** | bd-geo-location | ✅ Ready | Import from `bd-geo-location/react` |
| **Vue** | bd-geo-location | ✅ Ready | Import from `bd-geo-location/vue` |
| **Angular** | bd-geo-location | ✅ Ready | Use base package |
| **React Native** | bd-geo-location | ✅ Ready | Import from `bd-geo-location/react-native` |
| **Flutter** | Generated code | ✅ Ready | Run `npm run generate:dart` |
| **iOS** | Generated code | ✅ Ready | Run `npm run generate:swift` |
| **macOS** | Generated code | ✅ Ready | Run `npm run generate:swift` |

---

## 🔧 Troubleshooting

### React: "useMemo is not a function"

**Solution:** Make sure you're using React 16.8 or higher.

```bash
npm install react@latest
```

### Vue: "computed is not a function"

**Solution:** Make sure you're using Vue 3.0 or higher.

```bash
npm install vue@latest
```

### React Native: Picker not showing

**Solution:** Install the native dependencies:

```bash
cd ios && pod install
```

### Flutter: "Target of URI doesn't exist"

**Solution:** Make sure you've copied the generated files to the correct location in your Flutter project.

### iOS: "Cannot find 'BdGeoLocation' in scope"

**Solution:** Make sure you've added the generated files to your Xcode target:
- Select the file in Xcode
- Open File Inspector (Cmd + Option + 1)
- Check "Target Membership"

---

## 📚 Next Steps

After installation:

1. Read [USAGE_GUIDE.md](./USAGE_GUIDE.md) for detailed usage examples
2. Explore [API_REFERENCE.md](./API_REFERENCE.md) for complete API documentation
3. Check platform-specific guides in the `docs/` folder

---

*Last updated: 2025-01-XX*
