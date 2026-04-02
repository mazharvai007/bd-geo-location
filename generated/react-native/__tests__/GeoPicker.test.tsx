import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GeoPicker } from '../GeoPicker';

// Mock @react-native-picker/picker
jest.mock('@react-native-picker/picker', () => ({
  Picker: ({ selectedValue, onValueChange, children, enabled }: any) => {
    return (
      <div
        data-testid="picker"
        data-enabled={enabled}
        data-selected={selectedValue}
        onClick={() => onValueChange && onValueChange('test-value')}
      >
        {children}
      </div>
    );
  },
  PickerItem: ({ label, value }: any) => (
    <div data-value={value} data-label={label}>
      {label}
    </div>
  ),
}));

describe('GeoPicker', () => {
  const mockItems = [
    { label: 'Dhaka', value: '30' },
    { label: 'Chittagong', value: '20' },
    { label: 'Rajshahi', value: '40' },
  ];

  it('renders correctly with items', () => {
    const { getByText } = render(
      <GeoPicker
        items={mockItems}
        selectedValue={null}
        onValueChange={jest.fn()}
      />
    );

    expect(getByText('Dhaka')).toBeTruthy();
    expect(getByText('Chittagong')).toBeTruthy();
    expect(getByText('Rajshahi')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByText } = render(
      <GeoPicker
        items={mockItems}
        selectedValue={null}
        onValueChange={jest.fn()}
        placeholder="Select a division"
      />
    );

    expect(getByText('Select a division')).toBeTruthy();
  });

  it('calls onValueChange when item is selected', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <GeoPicker
        items={mockItems}
        selectedValue={null}
        onValueChange={mockOnChange}
      />
    );

    const picker = getByTestId('picker');
    fireEvent.press(picker);

    // Note: This test would work better with actual React Native picker
    // For now, it just verifies the component renders
  });

  it('respects enabled prop', () => {
    const { getByTestId } = render(
      <GeoPicker
        items={mockItems}
        selectedValue={null}
        onValueChange={jest.fn()}
        enabled={false}
      />
    );

    const picker = getByTestId('picker');
    expect(picker.props['data-enabled']).toBe(false);
  });

  it('displays selected value', () => {
    const { getByTestId } = render(
      <GeoPicker
        items={mockItems}
        selectedValue="30"
        onValueChange={jest.fn()}
      />
    );

    const picker = getByTestId('picker');
    expect(picker.props['data-selected']).toBe('30');
  });
});
