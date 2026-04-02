import React, { useState, useEffect } from 'react';
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
