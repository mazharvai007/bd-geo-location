# BD Geo Location

> 🇧🇩 Complete geographical location data for Bangladesh with multi-platform support

A comprehensive TypeScript package for Bangladesh's geographical administrative divisions. This package provides complete hierarchical data for Divisions, Districts, Upazilas/Thanas, City Corporations, Unions, Pourosovas, and Villages.

## ✅ Production Ready

**Status**: All platforms tested and verified production-ready

- ✅ React (Web)
- ✅ Vue (Web)
- ✅ Angular (Web)
- ✅ React Native (Mobile)
- ✅ Flutter (Mobile)
- ✅ iOS/macOS (Native)

[📖 View Production Readiness Report](./generated/FINAL_PRODUCTION_READINESS.md)

---

## 🚀 Quick Start

### React

```bash
npm install bd-geo-location
```

```tsx
import { useDivisions, useDistricts } from 'bd-geo-location/react';

function App() {
  const divisions = useDivisions();
  const [divisionId, setDivisionId] = useState(null);
  const districts = useDistricts(divisionId);

  return <YourLocationSelector divisions={divisions} districts={districts} />;
}
```

### Vue

```bash
npm install bd-geo-location
```

```vue
<script setup>
import { useDivisions, useDistricts } from 'bd-geo-location/vue';

const { divisions } = useDivisions();
const divisionId = ref(null);
const { districts } = useDistricts(divisionId);
</script>
```

### Flutter

```bash
# Generate Dart code
npm run generate:dart

# Copy to your Flutter project
cp -r generated/flutter/lib/models/* your_flutter_project/lib/models/
```

```dart
import 'package:bd_geo_location/models/models.dart';

final geoData = BangladeshGeoData.fromJson(jsonData);
final districts = geoData.getDistrictsByDivision('30');
```

### iOS/macOS (Swift)

```bash
# Generate Swift code
npm run generate:swift

# Add to Xcode project
cp -r generated/ios/Sources your_project/
```

```swift
import BdGeoLocation

let geoData = try BangladeshGeoData.load(from: jsonData)
let districts = geoData.getDistricts(divisionId: "30")
```

[📖 Full Installation Guide](./docs/INSTALLATION.md) | [⚡ Quick Start Guide](./docs/QUICK_START.md)

---

## Features

- **Complete data for Bangladesh**: 8 Divisions, 68 Districts, 531 Upazilas, 4,916 Unions
- **JSON-based data format** - Easy to edit and extend without recompiling
- **JSON Schema validation** - Ensures data integrity
- **TypeScript support** with full type definitions
- **Framework-specific integrations**:
  - React Hooks
  - Vue 3 Composables
  - React Native components
  - Angular compatible
- **Platform-specific code generators**:
  - Flutter (Dart models)
  - iOS/macOS (Swift models)
- **Support for both English and Bengali names**
- **Tree-shakeable and optimized bundle size**
- **ES Modules and CommonJS support**
- **Production-ready with security best practices**

## Data Coverage

| Division | Districts | Upazilas | Unions |
|----------|-----------|----------|--------|
| Barisal | 6 | 42 | 355 |
| Chittagong | 12 | 117 | 1,052 |
| Dhaka | 16 | 112 | 1,142 |
| Khulna | 10 | 59 | 580 |
| Mymensingh | 4 | 35 | 351 |
| Rajshahi | 8 | 67 | 567 |
| Rangpur | 8 | 58 | 533 |
| Sylhet | 4 | 41 | 336 |
| **Total** | **68** | **531** | **4,916** |

## Working with JSON Data

The package data is stored in JSON format, making it easy to:

1. **View and edit directly** - No TypeScript compilation needed
2. **Validate easily** - Use any JSON validator
3. **Extend data** - Add new divisions, districts, upazilas, etc.
4. **Import from other sources** - Convert CSV, Excel, or other formats to JSON

### Access Raw JSON Data

You can import the raw JSON data directly:

```typescript
import bangladeshData from 'bd-geo-location/dist/data/bangladesh.json';

console.log(bangladeshData.divisions);
// [
//   { id: '30', name: 'Dhaka', nameBn: 'ঢাকা', districts: [...] },
//   { id: '20', name: 'Chittagong', nameBn: 'চট্টগ্রাম', districts: [...] },
//   ...
// ]
```

### Custom Data Processing

```typescript
import bangladeshData from 'bd-geo-location/dist/data/bangladesh.json';

// Count all districts
const totalDistricts = bangladeshData.divisions.reduce((sum, division) => {
  return sum + (division.districts?.length || 0);
}, 0);

// Get all upazilas in a division
function getAllUpazilasInDivision(divisionId: string) {
  const division = bangladeshData.divisions.find(d => d.id === divisionId);
  const upazilas = [];

  division?.districts?.forEach(district => {
    if (district.upazilas) {
      upazilas.push(...district.upazilas);
    }
  });

  return upazilas;
}
```

For more details on the JSON structure and how to extend it, see [DATA_STRUCTURE.md](./DATA_STRUCTURE.md).

## Data Validation

The package includes JSON Schema validation to ensure data integrity:

```bash
# Validate the JSON data
npm run data:validate

# Test the data
npm run data:test
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Installation Guide](./docs/INSTALLATION.md) | Complete setup instructions for all platforms |
| [Usage Guide](./docs/USAGE_GUIDE.md) | Comprehensive usage examples and patterns |
| [Quick Start Guide](./docs/QUICK_START.md) | Get started in 5 minutes |
| [Production Readiness](./generated/FINAL_PRODUCTION_READINESS.md) | Full verification and security report |

---

## 📦 Installation

### npm Package (JavaScript/TypeScript Frameworks)

```bash
npm install bd-geo-location
# or
yarn add bd-geo-location
# or
pnpm add bd-geo-location
```

**Framework-specific imports**:

```typescript
// React
import { useDivisions } from 'bd-geo-location/react';

// Vue
import { useDivisions } from 'bd-geo-location/vue';

// Angular/Vanilla TypeScript
import { getAllDivisions } from 'bd-geo-location';

// React Native
import { LocationSelector } from 'bd-geo-location/react-native';
```

### Platform Code Generators

Generate platform-specific code:

```bash
# Flutter (Dart)
npm run generate:dart

# iOS/macOS (Swift)
npm run generate:swift

# React Native components
npm run generate:react-native

# All platforms
npm run generate:all
```

### Cross-Platform Support

This package is designed to work seamlessly across all operating systems:

- ✅ **Windows** (PowerShell, CMD, Git Bash)
- ✅ **Linux** (All distributions)
- ✅ **macOS** (Intel & Apple Silicon)

All scripts use Node.js for maximum compatibility and work the same way on all platforms.

**Available Scripts:**

| Script | Description |
|--------|-------------|
| `npm run build` | Build the package |
| `npm run build:watch` | Build in watch mode |
| `npm run build:clean` | Clean build artifacts |
| `npm run data:validate` | Validate geo data integrity |
| `npm run data:test` | Test data functionality |
| `npm run generate:dart` | Generate Flutter/Dart models |
| `npm run generate:swift` | Generate iOS/macOS Swift models |
| `npm run generate:react-native` | Generate React Native components |
| `npm run generate:all` | Generate all platform code |
| `npm run test:platform` | Test cross-platform compatibility |

**Test Your Setup:**

```bash
# Run comprehensive cross-platform tests
npm run test:platform
```

This verifies all functionality works correctly on your platform.

**Note:** If you encounter any issues running scripts on Windows, make sure you have Node.js installed and run commands from a terminal (PowerShell, CMD, or Git Bash).

[📖 Detailed Installation Guide](./docs/INSTALLATION.md)

## Data Hierarchy

```
Division (বিভাগ)
  └── District (জেলা)
       ├── City Corporation (সিটি কর্পোরেশন)
       │    └── Thana
       └── Upazila/Thana (উপজেলা/থানা)
            ├── Union (ইউনিয়ন)
            │    └── Village (গ্রাম)
            └── Pourosova (পৌরসভা)
                 └── Village (গ্রাম)
```

## 💻 Basic Usage

### TypeScript/JavaScript (Vanilla, Angular)

```typescript
import {
  getAllDivisions,
  getDistrictsByDivision,
  searchByName
} from 'bd-geo-location';

// Get all divisions
const divisions = getAllDivisions();

// Get districts by division ID
const dhakaDistricts = getDistrictsByDivision('30');

// Search locations
const results = searchByName('Dhaka');
```

### React

```tsx
import { useDivisions, useDistricts } from 'bd-geo-location/react';

function LocationSelector() {
  const divisions = useDivisions();
  const [divisionId, setDivisionId] = useState(null);
  const districts = useDistricts(divisionId);

  return (
    <div>
      <select onChange={(e) => setDivisionId(e.target.value)}>
        {divisions.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
      <select>
        {districts.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
    </div>
  );
}
```

### Vue 3

```vue
<script setup>
import { useDivisions, useDistricts } from 'bd-geo-location/vue';

const { divisions } = useDivisions();
const divisionId = ref(null);
const { districts } = useDistricts(divisionId);
</script>

<template>
  <select v-model="divisionId">
    <option v-for="d in divisions" :key="d.id" :value="d.id">
      {{ d.name }}
    </option>
  </select>
</template>
```

### React Native

```tsx
import { LocationSelector } from 'bd-geo-location/react-native';

<LocationSelector
  onLocationChange={(location) => console.log(location)}
  showUnion={true}
/>
```

### Flutter

```dart
import 'package:bd_geo_location/models/models.dart';

final geoData = BangladeshGeoData.fromJson(jsonData);
final divisions = geoData.getAllDivisions();
final dhakaDistricts = geoData.getDistrictsByDivision('30');
```

### iOS/macOS (Swift)

```swift
import BdGeoLocation

let geoData = try BangladeshGeoData.load(from: jsonData)
let divisions = geoData.getAllDivisions()
let dhakaDistricts = geoData.getDistricts(divisionId: "30")
```

[📖 Full Usage Guide](./docs/USAGE_GUIDE.md)

### React

```tsx
import {
  useDivisions,
  useDistricts,
  useUpazilas,
  useUnions,
  useSearch
} from 'bd-geo-location/react';

function LocationSelector() {
  const divisions = useDivisions();
  const [selectedDivision, setSelectedDivision] = useState(null);
  const districts = useDistricts(selectedDivision);

  return (
    <div>
      <select onChange={(e) => setSelectedDivision(e.target.value)}>
        <option value="">Select Division</option>
        {divisions.map(division => (
          <option key={division.id} value={division.id}>
            {division.name} ({division.nameBn})
          </option>
        ))}
      </select>

      <select>
        <option value="">Select District</option>
        {districts.map(district => (
          <option key={district.id} value={district.id}>
            {district.name} ({district.nameBn})
          </option>
        ))}
      </select>
    </div>
  );
}

// Search example
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const results = useSearch(searchTerm);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search locations..."
      />

      <div>
        <h3>Divisions</h3>
        {results.divisions.map(division => (
          <div key={division.id}>{division.name}</div>
        ))}

        <h3>Districts</h3>
        {results.districts.map(district => (
          <div key={district.id}>{district.name}</div>
        ))}
      </div>
    </div>
  );
}
```

### Vue 3

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  useDivisions,
  useDistricts,
  useUpazilas,
  useSearch
} from 'bd-geo-location/vue';

const selectedDivision = ref(null);
const { divisions } = useDivisions();
const { districts } = useDistricts(selectedDivision);
const searchTerm = ref('');
const { results } = useSearch(searchTerm);
</script>

<template>
  <div>
    <select v-model="selectedDivision">
      <option value="">Select Division</option>
      <option v-for="division in divisions" :key="division.id" :value="division.id">
        {{ division.name }} ({{ division.nameBn }})
      </option>
    </select>

    <select>
      <option value="">Select District</option>
      <option v-for="district in districts" :key="district.id" :value="district.id">
        {{ district.name }} ({{ district.nameBn }})
      </option>
    </select>

    <!-- Search -->
    <input v-model="searchTerm" type="text" placeholder="Search locations..." />

    <div>
      <h3>Search Results</h3>
      <div v-for="division in results.divisions" :key="division.id">
        {{ division.name }}
      </div>
    </div>
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import {
  getAllDivisions,
  getDistrictsByDivision
} from 'bd-geo-location';

@Component({
  selector: 'app-location',
  template: `
    <select (change)="onDivisionChange($event)">
      <option value="">Select Division</option>
      <option *ngFor="let division of divisions" [value]="division.id">
        {{ division.name }} ({{ division.nameBn }})
      </option>
    </select>

    <select>
      <option value="">Select District</option>
      <option *ngFor="let district of districts" [value]="district.id">
        {{ district.name }} ({{ district.nameBn }})
      </option>
    </select>
  `
})
export class LocationComponent {
  divisions = getAllDivisions();
  districts: any[] = [];

  onDivisionChange(event: any) {
    const divisionId = event.target.value;
    this.districts = getDistrictsByDivision(divisionId);
  }
}
```

### React Native

```tsx
import React, { useState } from 'react';
import { View, Picker, Text } from 'react-native';
import { useDivisions, useDistricts } from 'bd-geo-location/react';

function LocationScreen() {
  const divisions = useDivisions();
  const [selectedDivision, setSelectedDivision] = useState(null);
  const districts = useDistricts(selectedDivision);

  return (
    <View>
      <Picker
        selectedValue={selectedDivision}
        onValueChange={(itemValue) => setSelectedDivision(itemValue)}
      >
        <Picker.Item label="Select Division" value="" />
        {divisions.map(division => (
          <Picker.Item
            key={division.id}
            label={`${division.name} (${division.nameBn})`}
            value={division.id}
          />
        ))}
      </Picker>

      <Picker>
        <Picker.Item label="Select District" value="" />
        {districts.map(district => (
          <Picker.Item
            key={district.id}
            label={`${district.name} (${district.nameBn})`}
            value={district.id}
          />
        ))}
      </Picker>
    </View>
  );
}
```

## 🔧 Platform-Specific Code Generators

This package includes code generators for creating platform-specific models and components:

### Flutter (Dart)

```bash
npm run generate:dart
```

Creates:
- Dart model classes for all geo data types
- Helper methods for querying data
- Files in `generated/flutter/lib/models/`

### iOS/macOS (Swift)

```bash
npm run generate:swift
```

Creates:
- Swift structs with Codable support
- Helper methods for querying data
- Swift Package Manager setup
- Files in `generated/ios/Sources/BdGeoLocation/`

### React Native

```bash
npm run generate:react-native
```

Creates:
- Ready-to-use React Native components
- AsyncStorage utilities for caching
- Location selector component
- Files in `generated/react-native/`

### All Platforms

```bash
npm run generate:all
```

[📖 Full Usage Guide](./docs/USAGE_GUIDE.md)

## 📖 API Reference

### Core Functions

- `getAllDivisions()` - Returns all divisions
- `getDivisionById(id: string)` - Get division by ID
- `getDistrictsByDivision(divisionId: string)` - Get districts by division
- `getUpazilasByDistrict(districtId: string)` - Get upazilas by district
- `getUnionsByUpazila(upazilaId: string, districtId: string)` - Get unions by upazila
- `getPourosovasByUpazila(upazilaId: string, districtId: string)` - Get pourosovas by upazila
- `getCityCorporationsByDistrict(districtId: string)` - Get city corporations by district
- `searchByName(searchTerm: string)` - Search locations by name
- `getGeoHierarchy(locationId: string, level: string)` - Get complete hierarchy

### React Hooks

- `useDivisions()` - Get all divisions
- `useDistricts(divisionId)` - Get districts by division ID
- `useUpazilas(districtId, divisionId)` - Get upazilas by district ID
- `useUnions(upazilaId, districtId, divisionId)` - Get unions by upazila ID
- `usePourosovas(upazilaId, districtId, divisionId)` - Get pourosovas by upazila ID
- `useCityCorporations(districtId, divisionId)` - Get city corporations by district ID
- `useSearch(searchTerm)` - Search locations by name
- `useLocationById(id, type)` - Get location by ID and type

### Vue Composables

Same as React hooks but return reactive objects:

```typescript
const { divisions } = useDivisions();
const { districts } = useDistricts(divisionId);
```

## Types

```typescript
interface Village {
  id: string;
  name: string;
  nameBn: string;
}

interface Union {
  id: string;
  name: string;
  nameBn: string;
  villages?: Village[];
}

interface Pourosova {
  id: string;
  name: string;
  nameBn: string;
  villages?: Village[];
}

interface Upazila {
  id: string;
  name: string;
  nameBn: string;
  unions?: Union[];
  pourosovas?: Pourosova[];
}

interface CityCorporation {
  id: string;
  name: string;
  nameBn: string;
  thanas?: Upazila[];
}

interface District {
  id: string;
  name: string;
  nameBn: string;
  upazilas?: Upazila[];
  cityCorporations?: CityCorporation[];
}

interface Division {
  id: string;
  name: string;
  nameBn: string;
  districts?: District[];
}
```

## 🔒 Security

All platforms include security best practices:

- ✅ Input validation and sanitization
- ✅ DoS protection (search terms limited to 100 characters)
- ✅ Type-safe operations
- ✅ Safe error handling
- ✅ No unsafe type casting

[📖 Security Analysis Report](./generated/SECURITY_ANALYSIS.md)

---

## 📊 Platform Support Matrix

| Platform | Status | Documentation |
|----------|--------|---------------|
| **React** | ✅ Production Ready | [React Guide](./docs/USAGE_GUIDE.md#react-hooks) |
| **Vue** | ✅ Production Ready | [Vue Guide](./docs/USAGE_GUIDE.md#vue-composables) |
| **Angular** | ✅ Production Ready | [Angular Guide](./docs/USAGE_GUIDE.md#angular-services) |
| **React Native** | ✅ Production Ready | [React Native Guide](./docs/USAGE_GUIDE.md#react-native-components) |
| **Flutter** | ✅ Production Ready | [Flutter Guide](./docs/USAGE_GUIDE.md#flutter-dart) |
| **iOS** | ✅ Production Ready | [iOS Guide](./docs/USAGE_GUIDE.md#iosmacos-swift) |
| **macOS** | ✅ Production Ready | [iOS Guide](./docs/USAGE_GUIDE.md#iosmacos-swift) |

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT © [Mazharul Islam](https://github.com/mazharvai007)

---

## 📞 Support

- 📖 [Documentation](./docs/)
- 🐛 [Issues](https://github.com/mazharvai007/bd-geo-location/issues)
- 💬 [Discussions](https://github.com/mazharvai007/bd-geo-location/discussions)

---

**Made with ❤️ for Bangladesh 🇧🇩**
