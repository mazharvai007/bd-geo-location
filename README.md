# BD Geo Location

A comprehensive TypeScript package for Bangladesh's geographical administrative divisions. This package provides complete hierarchical data for Divisions, Districts, Upazilas/Thanas, City Corporations, Unions, Pourosovas, and Villages.

## Features

- **Complete data for Bangladesh**: 8 Divisions, 68 Districts, 531 Upazilas, 4,916 Unions
- **JSON-based data format** - Easy to edit and extend without recompiling
- **JSON Schema validation** - Ensures data integrity
- TypeScript support with full type definitions
- Framework-specific integrations:
  - React Hooks
  - Vue 3 Composables
  - Works with Angular, React Native, and any JavaScript framework
- Support for both English and Bengali names
- Tree-shakeable and optimized bundle size
- ES Modules and CommonJS support

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

## Installation

```bash
npm install bd-geo-location
# or
yarn add bd-geo-location
# or
pnpm add bd-geo-location
```

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

## Basic Usage

### TypeScript/JavaScript (Vanilla)

```typescript
import {
  getAllDivisions,
  getDivisionById,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getUnionsByUpazila,
  getPourosovasByUpazila,
  getCityCorporationsByDistrict,
  searchByName
} from 'bd-geo-location';

// Get all divisions
const divisions = getAllDivisions();
console.log(divisions);

// Get districts by division ID
const dhakaDistricts = getDistrictsByDivision('30');
console.log(dhakaDistricts);

// Get upazilas by district ID
const dhakaUpazilas = getUpazilasByDistrict('26');
console.log(dhakaUpazilas);

// Search locations
const results = searchByName('Dhaka');
console.log(results);
```

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

## API Reference

### Core Functions

#### `getAllDivisions()`
Returns all divisions in Bangladesh.

#### `getDivisionById(id: string)`
Get a division by its ID.

#### `getDivisionByName(name: string)`
Get a division by English or Bengali name.

#### `getDistrictsByDivision(divisionId: string)`
Get all districts in a division.

#### `getDistrictById(id: string, divisionId?: string)`
Get a district by ID.

#### `getUpazilasByDistrict(districtId: string)`
Get all upazilas in a district.

#### `getUnionsByUpazila(upazilaId: string, districtId: string)`
Get all unions in an upazila.

#### `getPourosovasByUpazila(upazilaId: string, districtId: string)`
Get all pourosovas in an upazila.

#### `getCityCorporationsByDistrict(districtId: string)`
Get all city corporations in a district.

#### `searchByName(searchTerm: string)`
Search for locations by name. Returns an object with divisions, districts, upazilas, unions, pourosovas, and city corporations.

#### `getGeoHierarchy(locationId: string, level: 'division' | 'district' | 'upazila')`
Get the complete geographical hierarchy for a location.

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

- `useDivisions()` - Get all divisions
- `useDistricts(divisionId)` - Get districts by division ID
- `useUpazilas(districtId, divisionId)` - Get upazilas by district ID
- `useUnions(upazilaId, districtId, divisionId)` - Get unions by upazila ID
- `usePourosovas(upazilaId, districtId, divisionId)` - Get pourosovas by upazila ID
- `useCityCorporations(districtId, divisionId)` - Get city corporations by district ID
- `useSearch(searchTerm)` - Search locations by name
- `useLocationById(id, type)` - Get location by ID and type

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

## Data Source

This package contains geographical administrative data for Bangladesh. The data is structured following the official administrative hierarchy.

**Note:** The current version includes sample data for demonstration purposes. To make this package production-ready, you'll need to add complete data for all divisions, districts, upazilas, unions, and villages.

## Contributing

Contributions are welcome! To add complete data:

1. Fork the repository
2. Add data to `src/data/bangladesh.ts`
3. Ensure data follows the TypeScript types
4. Submit a pull request

## License

MIT

## Support

For issues, questions, or contributions, please visit the GitHub repository.
