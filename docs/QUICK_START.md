# Quick Start Guide

Get started with **bd-geo-location** in 5 minutes!

---

## 🚀 5-Minute Setup

### Choose Your Platform

<select>
  <option>React</option>
  <option>Vue</option>
  <option>Angular</option>
  <option>React Native</option>
  <option>Flutter</option>
  <option>iOS/macOS</option>
</select>

---

## React

### 1. Install

```bash
npm install bd-geo-location
```

### 2. Use

```tsx
import { useDivisions, useDistricts } from 'bd-geo-location/react';

function App() {
  const divisions = useDivisions();
  const [selectedDivision, setSelectedDivision] = useState(null);
  const districts = useDistricts(selectedDivision);

  return (
    <div>
      <select onChange={(e) => setSelectedDivision(e.target.value)}>
        <option value="">Select Division</option>
        {divisions.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <select>
        <option value="">Select District</option>
        {districts.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
    </div>
  );
}
```

### 3. Run

```bash
npm start
```

✅ Done!

---

## Vue

### 1. Install

```bash
npm install bd-geo-location
```

### 2. Use

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useDivisions, useDistricts } from 'bd-geo-location/vue';

const selectedDivision = ref(null);
const { divisions } = useDivisions();
const { districts } = useDistricts(selectedDivision);
</script>

<template>
  <select v-model="selectedDivision">
    <option value="">Select Division</option>
    <option v-for="d in divisions" :key="d.id" :value="d.id">
      {{ d.name }}
    </option>
  </select>

  <select>
    <option value="">Select District</option>
    <option v-for="d in districts" :key="d.id" :value="d.id">
      {{ d.name }}
    </option>
  </select>
</template>
```

### 3. Run

```bash
npm run dev
```

✅ Done!

---

## Angular

### 1. Install

```bash
npm install bd-geo-location
```

### 2. Use

```typescript
import { Component } from '@angular/core';
import { getAllDivisions, getDistrictsByDivision } from 'bd-geo-location';

@Component({
  selector: 'app-root',
  template: `
    <select (change)="onDivisionChange($event)">
      <option value="">Select Division</option>
      <option *ngFor="let d of divisions" [value]="d.id">
        {{ d.name }}
      </option>
    </select>

    <select>
      <option value="">Select District</option>
      <option *ngFor="let d of districts" [value]="d.id">
        {{ d.name }}
      </option>
    </select>
  `
})
export class AppComponent {
  divisions = getAllDivisions();
  districts: any[] = [];

  onDivisionChange(event: any) {
    this.districts = getDistrictsByDivision(event.target.value);
  }
}
```

### 3. Run

```bash
ng serve
```

✅ Done!

---

## React Native

### 1. Install

```bash
npm install bd-geo-location
npm install @react-native-picker/picker
cd ios && pod install
```

### 2. Use

```tsx
import { LocationSelector } from 'bd-geo-location/react-native';

function App() {
  return (
    <LocationSelector
      onLocationChange={(loc) => console.log(loc)}
      showUnion={false}
    />
  );
}
```

### 3. Run

```bash
npx react-native run-ios
# or
npx react-native run-android
```

✅ Done!

---

## Flutter

### 1. Generate Dart Code

```bash
# Install the package
npm install -g bd-geo-location

# Generate code
bd-geo-location-generate-dart > lib/models/geo_data.dart
```

Or clone and generate:

```bash
git clone https://github.com/mazharvai007/bd-geo-location.git
cd bd-geo-location
npm run generate:dart

# Copy to your Flutter project
cp -r generated/flutter/lib/models/* your_flutter_project/lib/models/
```

### 2. Use

```dart
import 'package:flutter/material.dart';
import 'package:your_app/models/models.dart';
import 'package:your_app/models/bangladesh_geo_data.dart';

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final geoData = BangladeshGeoData(divisions: []);
  String? selectedDivision;

  @override
  Widget build(BuildContext context) {
    final divisions = geoData.getAllDivisions();

    return DropdownButton<String>(
      value: selectedDivision,
      onChanged: (value) => setState(() => selectedDivision = value),
      items: divisions.map((d) =>
        DropdownMenuItem(
          value: d.id,
          child: Text(d.name),
        )
      ).toList(),
    );
  }
}
```

### 3. Run

```bash
flutter run
```

✅ Done!

---

## iOS/macOS

### 1. Generate Swift Code

```bash
# Clone the repository
git clone https://github.com/mazharvai007/bd-geo-location.git
cd bd-geo-location

# Generate code
npm run generate:swift

# Copy to your Xcode project
cp -r generated/ios/Sources your_project/
```

### 2. Add to Xcode

1. Open your Xcode project
2. File → Add Package Dependencies
3. Select the `generated/ios` directory
4. Add to your target

### 3. Use

```swift
import BdGeoLocation

struct ContentView: View {
    let geoData: BangladeshGeoData
    @State private var selectedDivision: String?

    var body: some View {
        Picker("Division", selection: $selectedDivision) {
            Text("Select Division").tag(nil as String?)
            ForEach(geoData.getAllDivisions(), id: \.id) { division in
                Text(division.name).tag(division.id as String?)
            }
        }
    }
}
```

### 4. Run

```bash
# In Xcode, press Cmd+R to run
```

✅ Done!

---

## 📚 Next Steps

Now that you're set up:

1. 📖 Read the [Usage Guide](./USAGE_GUIDE.md) for detailed examples
2. 🔍 Check the [API Reference](./API_REFERENCE.md) for all available functions
3. 🏗️ Explore advanced patterns and best practices

---

## 💡 Common Examples

### Search Locations

```typescript
// TypeScript/JavaScript
import { searchByName } from 'bd-geo-location';

const results = searchByName('Dhaka');
console.log(results.divisions);  // All divisions matching "Dhaka"
```

```tsx
// React
import { useSearch } from 'bd-geo-location/react';

function Search() {
  const [term, setTerm] = useState('');
  const results = useSearch(term);

  return (
    <input onChange={(e) => setTerm(e.target.value)} />
  );
}
```

### Get Location Hierarchy

```typescript
import { getGeoHierarchy } from 'bd-geo-location';

const hierarchy = getGeoHierarchy('26', 'district');
console.log(hierarchy);
// {
//   division: { id: '30', name: 'Dhaka', ... },
//   district: { id: '26', name: 'Dhaka', ... },
//   upazilas: [...],
//   unions: [...]
// }
```

### Bengali Name Support

```typescript
const division = getDivisionById('30');

console.log(division.name);     // "Dhaka"
console.log(division.nameBn);   // "ঢাকা"
```

---

## ❓ Troubleshooting

### "Cannot find module 'bd-geo-location/react'"

**Solution:** Make sure you installed the package:

```bash
npm install bd-geo-location
```

### React Native: Picker not showing

**Solution:** Install iOS pods:

```bash
cd ios && pod install
```

### Flutter: "Target of URI doesn't exist"

**Solution:** Make sure you copied the generated files to the correct location:

```bash
cp generated/flutter/lib/models/* your_flutter_project/lib/models/
```

---

## 🎯 You're Ready!

You now have Bangladesh geo location data working in your app. Here's what you can do:

- ✅ Select divisions, districts, upazilas
- ✅ Search for locations by name
- ✅ Get complete location hierarchy
- ✅ Support both English and Bengali names

**Need help?** Check out the [full documentation](../README.md) or [open an issue](https://github.com/mazharvai007/bd-geo-location/issues).

---

*Last updated: 2025-01-XX*
