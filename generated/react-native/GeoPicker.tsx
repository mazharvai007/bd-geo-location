import React from 'react';
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
