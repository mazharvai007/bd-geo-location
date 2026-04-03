#!/usr/bin/env node

/**
 * Generate Swift models from TypeScript interfaces
 * This script creates iOS-compatible Swift models from the Bangladesh geo data types
 */

const fs = require('fs');
const path = require('path');

// Output directory for generated Swift files
const OUTPUT_DIR = path.join(__dirname, '../generated/ios/Sources/BdGeoLocation/Models');
const DATA_FILE = path.join(__dirname, '../src/data/bangladesh.json');

// Ensure output directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Generate Swift struct from TypeScript interface
const generateSwiftStruct = (structName, properties) => {
  let swiftCode = `/// ${structName} model\n`;
  swiftCode += `public struct ${structName}: Codable, Sendable {\n`;

  // Coding keys enum
  swiftCode += `  public enum CodingKeys: String, CodingKey {\n`;
  for (const prop of properties) {
    swiftCode += `    case ${prop.name} = "${prop.name}"\n`;
  }
  swiftCode += `  }\n\n`;

  // Properties
  for (const prop of properties) {
    const swiftType = mapTypeToSwift(prop.type);
    swiftCode += `  public let ${prop.name}: ${swiftType}\n`;
  }
  swiftCode += `\n`;

  // Initializer
  swiftCode += `  public init(\n`;
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    swiftCode += `    ${prop.name}: ${mapTypeToSwift(prop.type)}`;
    if (i < properties.length - 1) {
      swiftCode += `,`;
    }
    swiftCode += `\n`;
  }
  swiftCode += `  ) {\n`;
  for (const prop of properties) {
    swiftCode += `    self.${prop.name} = ${prop.name}\n`;
  }
  swiftCode += `  }\n`;

  swiftCode += `}\n\n`;

  return swiftCode;
};

// Map TypeScript types to Swift types
const mapTypeToSwift = (tsType) => {
  const typeMap = {
    'string': 'String',
    'number': 'Double',
    'boolean': 'Bool',
    'any': 'Any',
    'Division[]': '[Division]',
    'District[]': '[District]',
    'Upazila[]': '[Upazila]',
    'Union[]': '[Union]',
    'Pourosova[]': '[Pourosova]',
    'CityCorporation[]': '[CityCorporation]',
    'Village[]': '[Village]',
    'Division[]?': '[Division]?',
    'District[]?': '[District]?',
    'Upazila[]?': '[Upazila]?',
    'Union[]?': '[Union]?',
    'Pourosova[]?': '[Pourosova]?',
    'CityCorporation[]?': '[CityCorporation]?',
    'Village[]?': '[Village]?',
  };

  return typeMap[tsType] || 'Any';
};

// Generate all Swift models
const generateSwiftModels = () => {
  console.log('🎯 Generating Swift models for iOS...');

  ensureDir(OUTPUT_DIR);

  // Define models based on TypeScript interfaces
  const models = [
    {
      name: 'Village',
      properties: [
        { name: 'id', type: 'string', isNullable: false },
        { name: 'name', type: 'string', isNullable: false },
        { name: 'nameBn', type: 'string', isNullable: false },
      ],
    },
    {
      name: 'Union',
      properties: [
        { name: 'id', type: 'string', isNullable: false },
        { name: 'name', type: 'string', isNullable: false },
        { name: 'nameBn', type: 'string', isNullable: false },
        { name: 'villages', type: 'Village[]?', isNullable: true },
      ],
    },
    {
      name: 'Pourosova',
      properties: [
        { name: 'id', type: 'string', isNullable: false },
        { name: 'name', type: 'string', isNullable: false },
        { name: 'nameBn', type: 'string', isNullable: false },
        { name: 'villages', type: 'Village[]?', isNullable: true },
      ],
    },
    {
      name: 'Upazila',
      properties: [
        { name: 'id', type: 'string', isNullable: false },
        { name: 'name', type: 'string', isNullable: false },
        { name: 'nameBn', type: 'string', isNullable: false },
        { name: 'unions', type: 'Union[]?', isNullable: true },
        { name: 'pourosovas', type: 'Pourosova[]?', isNullable: true },
      ],
    },
    {
      name: 'CityCorporation',
      properties: [
        { name: 'id', type: 'string', isNullable: false },
        { name: 'name', type: 'string', isNullable: false },
        { name: 'nameBn', type: 'string', isNullable: false },
        { name: 'thanas', type: 'Upazila[]?', isNullable: true },
      ],
    },
    {
      name: 'District',
      properties: [
        { name: 'id', type: 'string', isNullable: false },
        { name: 'name', type: 'string', isNullable: false },
        { name: 'nameBn', type: 'string', isNullable: false },
        { name: 'upazilas', type: 'Upazila[]?', isNullable: true },
        { name: 'cityCorporations', type: 'CityCorporation[]?', isNullable: true },
      ],
    },
    {
      name: 'Division',
      properties: [
        { name: 'id', type: 'string', isNullable: false },
        { name: 'name', type: 'string', isNullable: false },
        { name: 'nameBn', type: 'string', isNullable: false },
        { name: 'districts', type: 'District[]?', isNullable: true },
      ],
    },
    {
      name: 'BangladeshGeoData',
      properties: [
        { name: 'divisions', type: 'Division[]', isNullable: false },
      ],
    },
  ];

  // Generate individual model files
  for (const model of models) {
    const swiftCode = generateSwiftStruct(model.name, model.properties);
    const fileName = `${model.name}.swift`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, swiftCode);
    console.log(`  ✓ Generated ${fileName}`);
  }

  // Generate BangladeshGeoData helper class
  const helperClass = `//
//  BangladeshGeoData+Helpers.swift
//  BdGeoLocation
//
//  Generated from bd-geo-location package
//

import Foundation

// MARK: - BangladeshGeoData Helpers
public extension BangladeshGeoData {

    /// Load Bangladesh geo data from JSON
    static func load(from jsonData: Data) throws -> BangladeshGeoData {
        return try JSONDecoder().decode(BangladeshGeoData.self, from: jsonData)
    }

    /// Get all divisions
    func getAllDivisions() -> [Division] {
        return divisions
    }

    /// Find districts by division ID
    func getDistricts(divisionId: String) -> [District] {
        guard let division = divisions.first(where: { $0.id == divisionId }) else {
            return []
        }
        return division.districts ?? []
    }

    /// Find upazilas by district and division IDs
    func getUpazilas(divisionId: String, districtId: String) -> [Upazila] {
        let districts = getDistricts(divisionId: divisionId)
        guard let district = districts.first(where: { $0.id == districtId }) else {
            return []
        }
        return district.upazilas ?? []
    }

    /// Find unions by upazila, district, and division IDs
    func getUnions(divisionId: String, districtId: String, upazilaId: String) -> [Union] {
        let upazilas = getUpazilas(divisionId: divisionId, districtId: districtId)
        guard let upazila = upazilas.first(where: { $0.id == upazilaId }) else {
            return []
        }
        return upazila.unions ?? []
    }

    /// Find pourosovas by upazila, district, and division IDs
    func getPourosovas(divisionId: String, districtId: String, upazilaId: String) -> [Pourosova] {
        let upazilas = getUpazilas(divisionId: divisionId, districtId: districtId)
        guard let upazila = upazilas.first(where: { $0.id == upazilaId }) else {
            return []
        }
        return upazila.pourosovas ?? []
    }

    /// Find city corporations by district and division IDs
    func getCityCorporations(divisionId: String, districtId: String) -> [CityCorporation] {
        let districts = getDistricts(divisionId: divisionId)
        guard let district = districts.first(where: { $0.id == districtId }) else {
            return []
        }
        return district.cityCorporations ?? []
    }

    /// Search results structure
    struct SearchResults {
        public var divisions: [Division] = []
        public var districts: [District] = []
        public var upazilas: [Upazila] = []
        public var unions: [Union] = []
        public var pourosovas: [Pourosova] = []
        public var cityCorporations: [CityCorporation] = []
    }

    /// Search locations by name (with input sanitization)
    func search(searchTerm: String) -> SearchResults {
        // Sanitize input - prevent DoS attacks
        let sanitizedTerm = String(searchTerm.prefix(100))
        let term = sanitizedTerm.lowercased()
        var results = SearchResults()

        for division in divisions {
            // Check division
            if division.name.lowercased().contains(term) || division.nameBn.contains(sanitizedTerm) {
                results.divisions.append(division)
            }

            // Check districts
            if let districts = division.districts {
                for district in districts {
                    if district.name.lowercased().contains(term) || district.nameBn.contains(sanitizedTerm) {
                        results.districts.append(district)
                    }

                    // Check upazilas
                    if let upazilas = district.upazilas {
                        for upazila in upazilas {
                            if upazila.name.lowercased().contains(term) || upazila.nameBn.contains(searchTerm) {
                                results.upazilas.append(upazila)
                            }

                            // Check unions
                            if let unions = upazila.unions {
                                for union in unions {
                                    if union.name.lowercased().contains(term) || union.nameBn.contains(searchTerm) {
                                        results.unions.append(union)
                                    }
                                }
                            }

                            // Check pourosovas
                            if let pourosovas = upazila.pourosovas {
                                for pourosova in pourosovas {
                                    if pourosova.name.lowercased().contains(term) || pourosova.nameBn.contains(searchTerm) {
                                        results.pourosovas.append(pourosova)
                                    }
                                }
                            }
                        }
                    }

                    // Check city corporations
                    if let cityCorporations = district.cityCorporations {
                        for cityCorp in cityCorporations {
                            if cityCorp.name.lowercased().contains(term) || cityCorp.nameBn.contains(searchTerm) {
                                results.cityCorporations.append(cityCorp)
                            }
                        }
                    }
                }
            }
        }

        return results
    }

    /// Get location by ID and type
    func getLocationById(id: String, type: LocationType) -> Any? {
        switch type {
        case .division:
            return divisions.first(where: { $0.id == id })
        case .district:
            for division in divisions {
                if let district = division.districts?.first(where: { $0.id == id }) {
                    return district
                }
            }
            return nil
        case .upazila:
            for division in divisions {
                if let districts = division.districts {
                    for district in districts {
                        if let upazila = district.upazilas?.first(where: { $0.id == id }) {
                            return upazila
                        }
                    }
                }
            }
            return nil
        case .union:
            for division in divisions {
                if let districts = division.districts {
                    for district in districts {
                        if let upazilas = district.upazilas {
                            for upazila in upazilas {
                                if let union = upazila.unions?.first(where: { $0.id == id }) {
                                    return union
                                }
                            }
                        }
                    }
                }
            }
            return nil
        case .pourosova:
            for division in divisions {
                if let districts = division.districts {
                    for district in districts {
                        if let upazilas = district.upazilas {
                            for upazila in upazilas {
                                if let pourosova = upazila.pourosovas?.first(where: { $0.id == id }) {
                                    return pourosova
                                }
                            }
                        }
                    }
                }
            }
            return nil
        case .cityCorporation:
            for division in divisions {
                if let districts = division.districts {
                    for district in districts {
                        if let cityCorp = district.cityCorporations?.first(where: { $0.id == id }) {
                            return cityCorp
                        }
                    }
                }
            }
            return nil
        }
    }
}

// MARK: - Location Type
public enum LocationType {
    case division
    case district
    case upazila
    case union
    case pourosova
    case cityCorporation
}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'BangladeshGeoData+Helpers.swift'), helperClass);
  console.log(`  ✓ Generated BangladeshGeoData+Helpers.swift`);

  // Generate Package.swift file for Swift Package Manager
  const packageSwift = `// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "BdGeoLocation",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15),
    ],
    products: [
        .library(
            name: "BdGeoLocation",
            targets: ["BdGeoLocation"]),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "BdGeoLocation",
            dependencies: [],
            path: "Sources/BdGeoLocation"),
        .testTarget(
            name: "BdGeoLocationTests",
            dependencies: ["BdGeoLocation"]),
    ]
)
`;

  const packageDir = path.join(__dirname, '../generated/ios');
  ensureDir(packageDir);
  fs.writeFileSync(path.join(packageDir, 'Package.swift'), packageSwift);
  console.log(`  ✓ Generated Package.swift`);

  // Generate README for iOS
  const readme = `# BdGeoLocation - Swift Package

Bangladesh geographical location data for iOS/macOS apps.

## Models

This package includes the following Swift models:

- \`Village\` - Represents a village in Bangladesh
- \`Union\` - Represents a Union Council (lowest rural administrative unit)
- \`Pourosova\` - Represents a Pourosova (Municipality)
- \`Upazila\` - Represents an Upazila (Sub-district) or Thana
- \`CityCorporation\` - Represents a City Corporation
- \`District\` - Represents a District (Zila)
- \`Division\` - Represents a Division (primary administrative division)
- \`BangladeshGeoData\` - Complete geographical hierarchy of Bangladesh

## Installation

### Swift Package Manager

Add this package to your \`Package.swift\`:

\`\`\`swift
dependencies: [
    .package(path: "../generated/ios")
]
\`\`\`

Or in Xcode:
1. File → Add Package Dependencies
2. Select this package directory

## Usage

### Loading Data

\`\`\`swift
import BdGeoLocation

// Load from JSON data
guard let jsonData = readJsonFile() else { return }
let geoData = try BangladeshGeoData.load(from: jsonData)
\`\`\`

### Getting Divisions

\`\`\`swift
let divisions = geoData.getAllDivisions()
\`\`\`

### Getting Districts by Division

\`\`\`swift
let districts = geoData.getDistricts(divisionId: "30")
\`\`\`

### Getting Upazilas

\`\`\`swift
let upazilas = geoData.getUpazilas(divisionId: "30", districtId: "22")
\`\`\`

### Getting Unions

\`\`\`swift
let unions = geoData.getUnions(divisionId: "30", districtId: "22", upazilaId: "55")
\`\`\`

### Getting City Corporations

\`\`\`swift
let cityCorps = geoData.getCityCorporations(divisionId: "30", districtId: "22")
\`\`\`

### Searching Locations

\`\`\`swift
let results = geoData.search(searchTerm: "Dhaka")
print(results.divisions)
print(results.districts)
print(results.upazilas)
\`\`\`

### Getting Location by ID

\`\`\`swift
if let division = geoData.getLocationById(id: "30", type: .division) as? Division {
    print(division.name)
}
\`\`\`

## Data Format

The JSON data follows this structure:

\`\`\`json
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
\`\`\`

## License

MIT
`;

  fs.writeFileSync(path.join(packageDir, 'README.md'), readme);
  console.log(`  ✓ Generated README.md`);

  console.log(`\n✅ Swift models generated successfully in: ${OUTPUT_DIR}`);
};

// Run the generator
try {
  generateSwiftModels();
} catch (error) {
  console.error('❌ Error generating Swift models:', error.message);
  process.exit(1);
}
