# Usage Guide

Complete usage examples for **bd-geo-location** across all platforms.

---

## 📚 Table of Contents

- [TypeScript/JavaScript](#typescriptjavascript)
  - [Core Functions](#core-functions)
  - [React Hooks](#react-hooks)
  - [Vue Composables](#vue-composables)
  - [Angular Services](#angular-services)
  - [React Native Components](#react-native-components)
- [Flutter (Dart)](#flutter-dart)
- [iOS/macOS (Swift)](#iosmacos-swift)
- [Common Patterns](#common-patterns)

---

## TypeScript/JavaScript

### Core Functions

#### Import

```typescript
import {
  getAllDivisions,
  getDivisionById,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getUnionsByUpazila,
  getPourosovasByUpazila,
  getCityCorporationsByDistrict,
  searchByName,
  getGeoHierarchy
} from 'bd-geo-location';
```

#### Get All Divisions

```typescript
const divisions = getAllDivisions();

console.log(divisions);
// [
//   { id: '30', name: 'Dhaka', nameBn: 'ঢাকা', districts: [...] },
//   { id: '20', name: 'Chittagong', nameBn: 'চট্টগ্রাম', districts: [...] },
//   ...
// ]
```

#### Get Districts by Division

```typescript
const dhakaDistricts = getDistrictsByDivision('30');

console.log(dhakaDistricts);
// [
//   { id: '26', name: 'Dhaka', nameBn: 'ঢাকা', upazilas: [...] },
//   { id: '38', name: 'Gazipur', nameBn: 'গাজীপুর', upazilas: [...] },
//   ...
// ]
```

#### Get Upazilas by District

```typescript
const dhakaUpazilas = getUpazilasByDistrict('26');

console.log(dhakaUpazilas);
// [
//   { id: '90', name: 'Dhamrai', nameBn: 'ধামরাই', unions: [...] },
//   { id: '91', name: 'Dohar', nameBn: 'দোহার', unions: [...] },
//   ...
// ]
```

#### Search Locations

```typescript
const results = searchByName('Dhaka');

console.log(results.divisions);    // Divisions matching "Dhaka"
console.log(results.districts);    // Districts matching "Dhaka"
console.log(results.upazilas);     // Upazilas matching "Dhaka"
console.log(results.unions);       // Unions matching "Dhaka"
console.log(results.pourosovas);   // Pourosovas matching "Dhaka"
console.log(results.cityCorporations); // City corporations matching "Dhaka"
```

#### Get Complete Hierarchy

```typescript
const hierarchy = getGeoHierarchy('26', 'district');

console.log(hierarchy);
// {
//   division: { id: '30', name: 'Dhaka', ... },
//   district: { id: '26', name: 'Dhaka', ... },
//   upazilas: [...],
//   unions: [...]
// }
```

---

### React Hooks

#### Import

```tsx
import {
  useDivisions,
  useDistricts,
  useUpazilas,
  useUnions,
  usePourosovas,
  useCityCorporations,
  useSearch,
  useLocationById
} from 'bd-geo-location/react';
```

#### Cascading Location Selector

```tsx
import { useState } from 'react';
import { useDivisions, useDistricts, useUpazilas } from 'bd-geo-location/react';

export function LocationSelector() {
  const divisions = useDivisions();
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = useDistricts(selectedDivision);
  const upazilas = useUpazilas(selectedDistrict, selectedDivision);

  return (
    <div className="space-y-4">
      {/* Division Selector */}
      <div>
        <label htmlFor="division">Division</label>
        <select
          id="division"
          value={selectedDivision || ''}
          onChange={(e) => {
            setSelectedDivision(e.target.value);
            setSelectedDistrict(null);
          }}
        >
          <option value="">Select Division</option>
          {divisions.map((division) => (
            <option key={division.id} value={division.id}>
              {division.name} ({division.nameBn})
            </option>
          ))}
        </select>
      </div>

      {/* District Selector */}
      {selectedDivision && (
        <div>
          <label htmlFor="district">District</label>
          <select
            id="district"
            value={selectedDistrict || ''}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name} ({district.nameBn})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Upazila Selector */}
      {selectedDistrict && (
        <div>
          <label htmlFor="upazila">Upazila</label>
          <select id="upazila">
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.id}>
                {upazila.name} ({upazila.nameBn})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
```

#### Search Component

```tsx
import { useState } from 'react';
import { useSearch } from 'bd-geo-location/react';

export function LocationSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const results = useSearch(searchTerm);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for locations..."
        className="w-full px-4 py-2 border rounded"
      />

      {searchTerm && (
        <div className="mt-4 space-y-4">
          {/* Divisions */}
          {results.divisions.length > 0 && (
            <div>
              <h3 className="font-bold">Divisions</h3>
              <ul>
                {results.divisions.map((division) => (
                  <li key={division.id}>
                    {division.name} ({division.nameBn})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Districts */}
          {results.districts.length > 0 && (
            <div>
              <h3 className="font-bold">Districts</h3>
              <ul>
                {results.districts.map((district) => (
                  <li key={district.id}>
                    {district.name} ({district.nameBn})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Upazilas */}
          {results.upazilas.length > 0 && (
            <div>
              <h3 className="font-bold">Upazilas</h3>
              <ul>
                {results.upazilas.map((upazila) => (
                  <li key={upazila.id}>
                    {upazila.name} ({upazila.nameBn})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### Vue Composables

#### Import

```vue
<script setup lang="ts">
import {
  useDivisions,
  useDistricts,
  useUpazilas,
  useSearch
} from 'bd-geo-location/vue';
</script>
```

#### Cascading Location Selector

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useDivisions, useDistricts, useUpazilas } from 'bd-geo-location/vue';

const selectedDivision = ref<string | null>(null);
const selectedDistrict = ref<string | null>(null);

const { divisions } = useDivisions();
const { districts } = useDistricts(selectedDivision);
const { upazilas } = useUpazilas(selectedDistrict, selectedDivision);
</script>

<template>
  <div class="space-y-4">
    <!-- Division Selector -->
    <div>
      <label for="division">Division</label>
      <select
        id="division"
        v-model="selectedDivision"
        @change="selectedDistrict = null"
      >
        <option value="">Select Division</option>
        <option
          v-for="division in divisions"
          :key="division.id"
          :value="division.id"
        >
          {{ division.name }} ({{ division.nameBn }})
        </option>
      </select>
    </div>

    <!-- District Selector -->
    <div v-if="selectedDivision">
      <label for="district">District</label>
      <select id="district" v-model="selectedDistrict">
        <option value="">Select District</option>
        <option
          v-for="district in districts"
          :key="district.id"
          :value="district.id"
        >
          {{ district.name }} ({{ district.nameBn }})
        </option>
      </select>
    </div>

    <!-- Upazila Selector -->
    <div v-if="selectedDistrict">
      <label for="upazila">Upazila</label>
      <select id="upazila">
        <option value="">Select Upazila</option>
        <option
          v-for="upazila in upazilas"
          :key="upazila.id"
          :value="upazila.id"
        >
          {{ upazila.name }} ({{ upazila.nameBn }})
        </option>
      </select>
    </div>
  </div>
</template>
```

---

### Angular Services

#### Create Geo Service

```typescript
import { Injectable } from '@angular/core';
import {
  getAllDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  searchByName
} from 'bd-geo-location';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  getDivisions() {
    return getAllDivisions();
  }

  getDistricts(divisionId: string) {
    return getDistrictsByDivision(divisionId);
  }

  getUpazilas(districtId: string) {
    return getUpazilasByDistrict(districtId);
  }

  search(term: string) {
    return searchByName(term);
  }
}
```

#### Use in Component

```typescript
import { Component } from '@angular/core';
import { GeoLocationService } from './geo-location.service';

@Component({
  selector: 'app-location-selector',
  template: `
    <div>
      <select (change)="onDivisionChange($event)">
        <option value="">Select Division</option>
        <option *ngFor="let division of divisions" [value]="division.id">
          {{ division.name }} ({{ division.nameBn }})
        </option>
      </select>

      <select *ngIf="selectedDivision">
        <option value="">Select District</option>
        <option *ngFor="let district of districts" [value]="district.id">
          {{ district.name }} ({{ district.nameBn }})
        </option>
      </select>
    </div>
  `
})
export class LocationSelectorComponent {
  divisions = this.geoService.getDivisions();
  districts: any[] = [];
  selectedDivision: string | null = null;

  constructor(private geoService: GeoLocationService) {}

  onDivisionChange(event: any) {
    this.selectedDivision = event.target.value;
    this.districts = this.geoService.getDistricts(this.selectedDivision);
  }
}
```

---

### React Native Components

#### Location Selector Component

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LocationSelector } from 'bd-geo-location/react-native';

export default function App() {
  const [location, setLocation] = useState({});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Location</Text>

      <LocationSelector
        onLocationChange={setLocation}
        showUnion={true}
      />

      <Text style={styles.result}>
        Selected: {JSON.stringify(location, null, 2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 14,
  },
});
```

#### Using Hooks

```tsx
import React, { useState } from 'react';
import { View, Picker, Text, StyleSheet } from 'react-native';
import {
  useDivisions,
  useDistricts,
  useUpazilas
} from 'bd-geo-location/react-native';

export function CustomLocationSelector() {
  const divisions = useDivisions();
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = useDistricts(selectedDivision);
  const upazilas = useUpazilas(selectedDistrict, selectedDivision);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Division</Text>
      <Picker
        selectedValue={selectedDivision}
        onValueChange={(value) => {
          setSelectedDivision(value);
          setSelectedDistrict(null);
        }}
      >
        <Picker.Item label="Select Division" value="" />
        {divisions.map((division) => (
          <Picker.Item
            key={division.id}
            label={`${division.name} (${division.nameBn})`}
            value={division.id}
          />
        ))}
      </Picker>

      {selectedDivision && (
        <>
          <Text style={styles.label}>District</Text>
          <Picker
            selectedValue={selectedDistrict}
            onValueChange={setSelectedDistrict}
          >
            <Picker.Item label="Select District" value="" />
            {districts.map((district) => (
              <Picker.Item
                key={district.id}
                label={`${district.name} (${district.nameBn})`}
                value={district.id}
              />
            ))}
          </Picker>
        </>
      )}

      {selectedDistrict && (
        <>
          <Text style={styles.label}>Upazila</Text>
          <Picker>
            <Picker.Item label="Select Upazila" value="" />
            {upazilas.map((upazila) => (
              <Picker.Item
                key={upazila.id}
                label={`${upazila.name} (${upazila.nameBn})`}
                value={upazila.id}
              />
            ))}
          </Picker>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
});
```

---

## Flutter (Dart)

### Load Data

```dart
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:your_app/models/models.dart';
import 'package:your_app/models/bangladesh_geo_data.dart';

class GeoDataService {
  Future<BangladeshGeoData> loadGeoData() async {
    final jsonString = await rootBundle.loadString('assets/bangladesh.json');
    final json = jsonDecode(jsonString);
    return BangladeshGeoData.fromJson(json);
  }
}
```

### Usage in Widget

```dart
import 'package:flutter/material.dart';
import 'package:your_app/models/models.dart';
import 'package:your_app/models/bangladesh_geo_data.dart';

class LocationSelector extends StatefulWidget {
  @override
  _LocationSelectorState createState() => _LocationSelectorState();
}

class _LocationSelectorState extends State<LocationSelector> {
  late BangladeshGeoData geoData;
  String? selectedDivision;
  String? selectedDistrict;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final data = await loadGeoData();
    setState(() {
      geoData = data;
    });
  }

  @override
  Widget build(BuildContext context) {
    final divisions = geoData.getAllDivisions();
    final districts = selectedDivision != null
        ? geoData.getDistrictsByDivision(selectedDivision!)
        : <Division>[];

    return Column(
      children: [
        // Division Dropdown
        DropdownButton<String>(
          hint: Text('Select Division'),
          value: selectedDivision,
          onChanged: (value) {
            setState(() {
              selectedDivision = value;
              selectedDistrict = null;
            });
          },
          items: divisions.map((division) {
            return DropdownMenuItem(
              value: division.id,
              child: Text('${division.name} (${division.nameBn})'),
            );
          }).toList(),
        ),

        // District Dropdown
        if (selectedDivision != null)
          DropdownButton<String>(
            hint: Text('Select District'),
            value: selectedDistrict,
            onChanged: (value) {
              setState(() {
                selectedDistrict = value;
              });
            },
            items: districts.map((district) {
              return DropdownMenuItem(
                value: district.id,
                child: Text('${district.name} (${district.nameBn})'),
              );
            }).toList(),
          ),
      ],
    );
  }
}
```

### Search

```dart
final results = geoData.searchLocations('Dhaka');

print('Divisions: ${results['divisions']}');
print('Districts: ${results['districts']}');
print('Upazilas: ${results['upazilas']}');
```

---

## iOS/macOS (Swift)

### Load Data

```swift
import BdGeoLocation

class GeoDataService {
    func loadGeoData() throws -> BangladeshGeoData {
        guard let url = Bundle.main.url(forResource: "bangladesh", withExtension: "json"),
              let data = try? Data(contentsOf: url) else {
            fatalError("Failed to load bangladesh.json")
        }

        return try BangladeshGeoData.load(from: data)
    }
}
```

### Usage in ViewController

```swift
import UIKit
import BdGeoLocation

class LocationViewController: UIViewController {
    private var geoData: BangladeshGeoData!
    private var selectedDivision: Division?
    private var selectedDistrict: District?

    private let divisionPicker = UIPickerView()
    private let districtPicker = UIPickerView()

    override func viewDidLoad() {
        super.viewDidLoad()

        do {
            geoData = try GeoDataService().loadGeoData()
        } catch {
            print("Error loading data: \(error)")
        }

        setupUI()
    }

    func setupUI() {
        // Setup your UI with pickers
        let divisions = geoData.getAllDivisions()
        // Populate division picker with divisions
    }

    func getDistricts(for divisionId: String) -> [District] {
        return geoData.getDistricts(divisionId: divisionId)
    }
}
```

### Search

```swift
let results = geoData.search(searchTerm: "Dhaka")

print("Divisions: \(results.divisions)")
print("Districts: \(results.districts)")
print("Upazilas: \(results.upazilas)")
```

---

## Common Patterns

### Format Location Name

```typescript
function formatLocation(location: { name: string; nameBn: string }) {
  return `${location.name} (${location.nameBn})`;
}

// Usage
formatLocation({ name: 'Dhaka', nameBn: 'ঢাকা' });
// Output: "Dhaka (ঢাকা)"
```

### Get Full Location Path

```typescript
function getFullLocationPath(unionId: string, districtId: string, divisionId: string) {
  const division = getDivisionById(divisionId);
  const district = getDistrictById(districtId, divisionId);
  const upazila = getUpazilasByDistrict(districtId).find(u => u.unions?.some(union => union.id === unionId));
  const union = upazila?.unions?.find(u => u.id === unionId);

  return {
    division: division?.name,
    district: district?.name,
    upazila: upazila?.name,
    union: union?.name,
    full: `${division?.name} > ${district?.name} > ${upazila?.name} > ${union?.name}`
  };
}
```

### Debounced Search

```typescript
import { useState, useEffect } from 'react';
import { useSearch } from 'bd-geo-location/react';

export function useDebouncedSearch(query: string, delay = 300) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay]);

  return useSearch(debouncedQuery);
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const results = useDebouncedSearch(searchTerm);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

---

*Last updated: 2025-01-XX*
