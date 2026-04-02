#!/usr/bin/env node

/**
 * Generate React Native compatible code
 * This script creates React Native components and utilities for the Bangladesh geo data
 */

const fs = require('fs');
const path = require('path');

// Output directory for generated React Native files
const OUTPUT_DIR = path.join(__dirname, '../generated/react-native');

// Ensure output directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Generate React Native Picker component
const generatePickerComponent = () => {
  return `import React from 'react';
import { View, StyleSheet } from 'react-native';
import Picker from '@react-native-picker/picker';

interface PickerItem {
  label: string;
  value: string;
}

interface GeoPickerProps {
  items: PickerItem[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  enabled?: boolean;
}

/**
 * GeoPicker - A reusable picker component for geographic selections
 *
 * @example
 * <GeoPicker
 *   items={[{ label: 'Dhaka', value: '30' }]}
 *   selectedValue={selectedValue}
 *   onValueChange={setSelectedValue}
 * />
 */
export const GeoPicker: React.FC<GeoPickerProps> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  enabled = true,
}) => {
  return (
    <View style={styles.container}>
      <Picker
        enabled={enabled}
        selectedValue={selectedValue ?? ''}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        <Picker.Item label={placeholder} value="" />
        {items.map((item) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
`;
};

// Generate React Native Location Selector component
const generateLocationSelectorComponent = () => {
  return `import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GeoPicker } from './GeoPicker';
import bangladeshJson from 'bd-geo-location';
import {
  Division,
  District,
  Upazila,
  Union,
} from 'bd-geo-location';

interface LocationSelectorProps {
  onLocationChange?: (location: {
    division?: string;
    district?: string;
    upazila?: string;
    union?: string;
  }) => void;
  initialLocation?: {
    division?: string;
    district?: string;
    upazila?: string;
    union?: string;
  };
  showUnion?: boolean;
}

/**
 * LocationSelector - A cascading location selector for Bangladesh
 *
 * @example
 * <LocationSelector
 *   onLocationChange={(location) => console.log(location)}
 *   showUnion={true}
 * />
 */
export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationChange,
  initialLocation,
  showUnion = false,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(
    initialLocation?.division || null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
    initialLocation?.district || null
  );
  const [selectedUpazila, setSelectedUpazila] = useState<string | null>(
    initialLocation?.upazila || null
  );
  const [selectedUnion, setSelectedUnion] = useState<string | null>(
    initialLocation?.union || null
  );

  // Get divisions from data
  const divisions: Division[] = bangladeshJson.divisions || [];

  // Get districts based on selected division
  const districts: District[] = React.useMemo(() => {
    if (!selectedDivision) return [];
    const division = divisions.find((d) => d.id === selectedDivision);
    return division?.districts || [];
  }, [selectedDivision, divisions]);

  // Get upazilas based on selected district
  const upazilas: Upazila[] = React.useMemo(() => {
    if (!selectedDistrict || !selectedDivision) return [];
    const division = divisions.find((d) => d.id === selectedDivision);
    const district = division?.districts?.find((dist) => dist.id === selectedDistrict);
    return district?.upazilas || [];
  }, [selectedDistrict, selectedDivision, districts]);

  // Get unions based on selected upazila
  const unions: Union[] = React.useMemo(() => {
    if (!selectedUpazila || !selectedDistrict || !selectedDivision) return [];
    const division = divisions.find((d) => d.id === selectedDivision);
    const district = division?.districts?.find((dist) => dist.id === selectedDistrict);
    const upazila = district?.upazilas?.find((u) => u.id === selectedUpazila);
    return upazila?.unions || [];
  }, [selectedUpazila, selectedDistrict, selectedDivision, divisions]);

  useEffect(() => {
    if (onLocationChange) {
      onLocationChange({
        division: selectedDivision ?? undefined,
        district: selectedDistrict ?? undefined,
        upazila: selectedUpazila ?? undefined,
        union: selectedUnion ?? undefined,
      });
    }
  }, [selectedDivision, selectedDistrict, selectedUpazila, selectedUnion, onLocationChange]);

  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value);
    setSelectedDistrict(null);
    setSelectedUpazila(null);
    setSelectedUnion(null);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedUpazila(null);
    setSelectedUnion(null);
  };

  const handleUpazilaChange = (value: string) => {
    setSelectedUpazila(value);
    setSelectedUnion(null);
  };

  const divisionItems = divisions.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  const districtItems = districts.map((d) => ({
    label: d.name,
    value: d.id,
  }));

  const upazilaItems = upazilas.map((u) => ({
    label: u.name,
    value: u.id,
  }));

  const unionItems = unions.map((u) => ({
    label: u.name,
    value: u.id,
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Division</Text>
        <GeoPicker
          items={divisionItems}
          selectedValue={selectedDivision}
          onValueChange={handleDivisionChange}
          placeholder="Select Division"
        />
      </View>

      {selectedDivision && (
        <View style={styles.section}>
          <Text style={styles.label}>District</Text>
          <GeoPicker
            items={districtItems}
            selectedValue={selectedDistrict}
            onValueChange={handleDistrictChange}
            placeholder="Select District"
          />
        </View>
      )}

      {selectedDistrict && (
        <View style={styles.section}>
          <Text style={styles.label}>Upazila</Text>
          <GeoPicker
            items={upazilaItems}
            selectedValue={selectedUpazila}
            onValueChange={handleUpazilaChange}
            placeholder="Select Upazila"
          />
        </View>
      )}

      {showUnion && selectedUpazila && (
        <View style={styles.section}>
          <Text style={styles.label}>Union</Text>
          <GeoPicker
            items={unionItems}
            selectedValue={selectedUnion}
            onValueChange={setSelectedUnion}
            placeholder="Select Union"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
});
`;
};

// Generate AsyncStorage utilities
const generateAsyncStorageUtils = () => {
  return `import AsyncStorage from '@react-native-async-storage/async-storage';
import type { BangladeshGeoData } from 'bd-geo-location';

const STORAGE_KEY = '@bd_geo_location';

/**
 * Storage utilities for Bangladesh geo data
 */
export class GeoDataStorage {
  /**
   * Save geo data to AsyncStorage
   */
  static async save(data: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving geo data:', error);
      throw error;
    }
  }

  /**
   * Load geo data from AsyncStorage
   */
  static async load(): Promise<any> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error loading geo data:', error);
      return null;
    }
  }

  /**
   * Remove geo data from AsyncStorage
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing geo data:', error);
      throw error;
    }
  }

  /**
   * Check if geo data exists in AsyncStorage
   */
  static async exists(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      return value !== null;
    } catch (error) {
      console.error('Error checking geo data:', error);
      return false;
    }
  }
}

/**
 * Recent locations storage
 */
export class RecentLocationsStorage {
  private static readonly KEY = '@bd_recent_locations';
  private static readonly MAX_RECENT = 10;

  /**
   * Save a recent location
   */
  static async add(location: {
    division: string;
    district?: string;
    upazila?: string;
  }): Promise<void> {
    try {
      const recent = await this.getAll();
      const filtered = recent.filter(
        (r) => r.division !== location.division
      );
      filtered.unshift(location);
      const limited = filtered.slice(0, this.MAX_RECENT);
      await AsyncStorage.setItem(this.KEY, JSON.stringify(limited));
    } catch (error) {
      console.error('Error saving recent location:', error);
    }
  }

  /**
   * Get all recent locations
   */
  static async getAll(): Promise<
    Array<{
      division: string;
      district?: string;
      upazila?: string;
    }>
  > {
    try {
      const value = await AsyncStorage.getItem(this.KEY);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error loading recent locations:', error);
      return [];
    }
  }

  /**
   * Clear recent locations
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.KEY);
    } catch (error) {
      console.error('Error clearing recent locations:', error);
    }
  }
}
`;
};

// Generate index file for React Native
const generateIndexFile = () => {
  return `// React Native exports
export { GeoPicker } from './GeoPicker';
export { LocationSelector } from './LocationSelector';
export { GeoDataStorage, RecentLocationsStorage } from './storage';

// Re-export types from the main package
export type {
  Division,
  District,
  Upazila,
  Union,
  Pourosova,
  CityCorporation,
  Village,
  BangladeshGeoData,
  GeoLocation,
  GeoLevel,
  FilterOptions,
} from 'bd-geo-location';

// Export the raw data
export { default as bangladeshData } from 'bd-geo-location';
`;
};

// Generate README for React Native
const generateReadme = () => {
  return `# bd-geo-location - React Native

React Native components and utilities for Bangladesh geographical location data.

## Installation

\`\`\`bash
npm install bd-geo-location
npm install @react-native-async-storage/async-storage
\`\`\`

## Components

### LocationSelector

A cascading location selector for Bangladesh administrative divisions.

\`\`\`tsx
import { LocationSelector } from 'bd-geo-location/react-native';

function MyComponent() {
  return (
    <LocationSelector
      onLocationChange={(location) => console.log(location)}
      showUnion={true}
    />
  );
}
\`\`\`

### GeoPicker

A reusable picker component.

\`\`\`tsx
import { GeoPicker } from 'bd-geo-location/react-native';

<GeoPicker
  items={[{ label: 'Dhaka', value: '30' }]}
  selectedValue={selectedValue}
  onValueChange={setSelectedValue}
/>
\`\`\`

## Storage Utilities

### GeoDataStorage

Store and retrieve geo data using AsyncStorage.

\`\`\`tsx
import { GeoDataStorage } from 'bd-geo-location/react-native';

// Save data
await GeoDataStorage.save(geoData);

// Load data
const data = await GeoDataStorage.load();

// Clear data
await GeoDataStorage.clear();
\`\`\`

### RecentLocationsStorage

Store and retrieve recent location selections.

\`\`\`tsx
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
\`\`\`

## Hooks

All hooks from the main package are available:

\`\`\`tsx
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
\`\`\`

## License

MIT
`;
};

// Generate all React Native code
const generateReactNativeCode = () => {
  console.log('🎯 Generating React Native components...');

  ensureDir(OUTPUT_DIR);

  // Generate components
  const components = [
    { name: 'GeoPicker.tsx', content: generatePickerComponent() },
    { name: 'LocationSelector.tsx', content: generateLocationSelectorComponent() },
    { name: 'storage.ts', content: generateAsyncStorageUtils() },
    { name: 'index.ts', content: generateIndexFile() },
    { name: 'README.md', content: generateReadme() },
  ];

  for (const component of components) {
    const filePath = path.join(OUTPUT_DIR, component.name);
    fs.writeFileSync(filePath, component.content);
    console.log(`  ✓ Generated ${component.name}`);
  }

  console.log(`\n✅ React Native components generated successfully in: ${OUTPUT_DIR}`);
};

// Run the generator
try {
  generateReactNativeCode();
} catch (error) {
  console.error('❌ Error generating React Native code:', error.message);
  process.exit(1);
}
