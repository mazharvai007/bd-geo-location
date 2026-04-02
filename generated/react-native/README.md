# bd-geo-location - React Native

React Native components and utilities for Bangladesh geographical location data.

## Installation

```bash
npm install bd-geo-location
npm install @react-native-async-storage/async-storage
```

## Components

### LocationSelector

A cascading location selector for Bangladesh administrative divisions.

```tsx
import { LocationSelector } from 'bd-geo-location/react-native';

function MyComponent() {
  return (
    <LocationSelector
      onLocationChange={(location) => console.log(location)}
      showUnion={true}
    />
  );
}
```

### GeoPicker

A reusable picker component.

```tsx
import { GeoPicker } from 'bd-geo-location/react-native';

<GeoPicker
  items={[{ label: 'Dhaka', value: '30' }]}
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
/>
```

## Storage Utilities

### GeoDataStorage

Store and retrieve geo data using AsyncStorage.

```tsx
import { GeoDataStorage } from 'bd-geo-location/react-native';

// Save data
await GeoDataStorage.save(geoData);

// Load data
const data = await GeoDataStorage.load();

// Clear data
await GeoDataStorage.clear();
```

### RecentLocationsStorage

Store and retrieve recent location selections.

```tsx
import { RecentLocationsStorage } from 'bd-geo-location/react-native';

// Add recent location
await RecentLocationsStorage.add({
  division: '30',
  district: '22',
});

// Get all recent locations
const recent = await RecentLocationsStorage.getAll();

// Clear recent locations
await RecentLocationsStorage.clear();
```

## Hooks

All hooks from the main package are available:

```tsx
import {
  useDivisions,
  useDistricts,
  useUpazilas,
  useUnions,
  usePourosovas,
  useCityCorporations,
  useSearch,
  useLocationById,
} from 'bd-geo-location/react-native';
```

## License

MIT
