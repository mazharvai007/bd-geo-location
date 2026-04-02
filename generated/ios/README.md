# BdGeoLocation - Swift Package

Bangladesh geographical location data for iOS/macOS apps.

## Models

This package includes the following Swift models:

- `Village` - Represents a village in Bangladesh
- `Union` - Represents a Union Council (lowest rural administrative unit)
- `Pourosova` - Represents a Pourosova (Municipality)
- `Upazila` - Represents an Upazila (Sub-district) or Thana
- `CityCorporation` - Represents a City Corporation
- `District` - Represents a District (Zila)
- `Division` - Represents a Division (primary administrative division)
- `BangladeshGeoData` - Complete geographical hierarchy of Bangladesh

## Installation

### Swift Package Manager

Add this package to your `Package.swift`:

```swift
dependencies: [
    .package(path: "../generated/ios")
]
```

Or in Xcode:
1. File → Add Package Dependencies
2. Select this package directory

## Usage

### Loading Data

```swift
import BdGeoLocation

// Load from JSON data
guard let jsonData = readJsonFile() else { return }
let geoData = try BangladeshGeoData.load(from: jsonData)
```

### Getting Divisions

```swift
let divisions = geoData.getAllDivisions()
```

### Getting Districts by Division

```swift
let districts = geoData.getDistricts(divisionId: "30")
```

### Getting Upazilas

```swift
let upazilas = geoData.getUpazilas(divisionId: "30", districtId: "22")
```

### Getting Unions

```swift
let unions = geoData.getUnions(divisionId: "30", districtId: "22", upazilaId: "55")
```

### Getting City Corporations

```swift
let cityCorps = geoData.getCityCorporations(divisionId: "30", districtId: "22")
```

### Searching Locations

```swift
let results = geoData.search(searchTerm: "Dhaka")
print(results.divisions)
print(results.districts)
print(results.upazilas)
```

### Getting Location by ID

```swift
if let division = geoData.getLocationById(id: "30", type: .division) as? Division {
    print(division.name)
}
```

## Data Format

The JSON data follows this structure:

```json
{
  "divisions": [
    {
      "id": "30",
      "name": "Dhaka",
      "nameBn": "ঢাকা",
      "districts": [...]
    }
  ]
}
```

## License

MIT
