#!/usr/bin/env node

/**
 * Generate Dart models from TypeScript interfaces
 * This script creates Flutter-compatible Dart models from the Bangladesh geo data types
 */

const fs = require('fs');
const path = require('path');

// Output directory for generated Dart files
const OUTPUT_DIR = path.join(__dirname, '../generated/flutter/lib/models');
const DATA_FILE = path.join(__dirname, '../src/data/bangladesh.json');

// Ensure output directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Check if type is nullable
const isNullableType = (type) => {
  return type.endsWith('?') || type.includes('[]?');
};

// Get the base type without nullable marker
const getBaseType = (type) => {
  return type.replace('?', '');
};

// Validate and sanitize string input
const sanitizeString = (value, maxLength = 255) => {
  if (value == null) return null;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  if (trimmed.length > maxLength) return trimmed.substring(0, maxLength);
  return trimmed;
};

// Generate Dart class from TypeScript interface
const generateDartClass = (interfaceName, properties) => {
  const dartClassName = interfaceName;
  let dartCode = `class ${dartClassName} {\n`;

  // Properties
  for (const prop of properties) {
    const dartType = mapTypeToDart(prop.type);
    dartCode += `  final ${dartType} ${prop.name};\n`;
  }
  dartCode += `\n`;

  // Constructor
  dartCode += `  ${dartClassName}({\n`;
  for (const prop of properties) {
    const isNullable = prop.isNullable || isNullableType(prop.type);
    if (isNullable) {
      dartCode += `    this.${prop.name},\n`;
    } else {
      dartCode += `    required this.${prop.name},\n`;
    }
  }
  dartCode += `  });\n\n`;

  // From JSON factory with validation
  dartCode += `  factory ${dartClassName}.fromJson(Map<String, dynamic> json) {\n`;
  dartCode += `    // Validate required fields\n`;

  // Add validation for required string fields
  for (const prop of properties) {
    if (!prop.isNullable && !isNullableType(prop.type) && prop.type === 'string') {
      dartCode += `    if (json['${prop.name}'] == null || json['${prop.name}'] is! String) {\n`;
      dartCode += `      throw ArgumentError('Invalid or missing ${prop.name}');\n`;
      dartCode += `    }\n`;
    }
  }

  dartCode += `    return ${dartClassName}(\n`;
  for (const prop of properties) {
    const isNullable = prop.isNullable || isNullableType(prop.type);
    dartCode += `      ${prop.name}: `;

    if (prop.type === 'string') {
      if (isNullable) {
        dartCode += `json['${prop.name}'] as String?`;
      } else {
        dartCode += `json['${prop.name}'] as String`;
      }
    } else if (prop.type.includes('[]')) {
      // Handle array types with safe casting
      const baseType = prop.type.replace('[]', '').replace('?', '');
      if (isNullable) {
        dartCode += `json['${prop.name}'] == null ? null : (json['${prop.name}'] as List).map((e) => ${baseType}.fromJson(e as Map<String, dynamic>)).toList()`;
      } else {
        dartCode += `(json['${prop.name}'] as List?)?.map((e) => ${baseType}.fromJson(e as Map<String, dynamic>)).toList() ?? []`;
      }
    } else {
      dartCode += `json['${prop.name}']`;
      if (isNullable) {
        dartCode += ` as ${mapTypeToDart(prop.type)}`;
      }
    }
    dartCode += `,\n`;
  }
  dartCode += `    );\n`;
  dartCode += `  }\n\n`;

  // To JSON method
  dartCode += `  Map<String, dynamic> toJson() {\n`;
  dartCode += `    return {\n`;
  for (const prop of properties) {
    dartCode += `      '${prop.name}': ${prop.name},\n`;
  }
  dartCode += `    };\n`;
  dartCode += `  }\n\n`;

  // CopyWith method (optional, for Flutter state management)
  dartCode += `  ${dartClassName} copyWith({\n`;
  for (const prop of properties) {
    const dartType = mapTypeToDart(prop.type);
    // Handle nullable types correctly for copyWith
    if (isNullableType(prop.type)) {
      dartCode += `    ${dartType} ${prop.name},\n`;
    } else {
      dartCode += `    ${dartType}? ${prop.name},\n`;
    }
  }
  dartCode += `  }) {\n`;
  dartCode += `    return ${dartClassName}(\n`;
  for (const prop of properties) {
    const isNullable = prop.isNullable || isNullableType(prop.type);
    if (isNullable) {
      dartCode += `      ${prop.name}: ${prop.name} ?? this.${prop.name},\n`;
    } else {
      dartCode += `      ${prop.name}: ${prop.name} ?? this.${prop.name},\n`;
    }
  }
  dartCode += `    );\n`;
  dartCode += `  }\n`;

  dartCode += `}\n\n`;

  return dartCode;
};

// Map TypeScript types to Dart types
const mapTypeToDart = (tsType) => {
  const typeMap = {
    'string': 'String',
    'number': 'double',
    'boolean': 'bool',
    'any': 'dynamic',
    'Division[]': 'List<Division>',
    'District[]': 'List<District>',
    'Upazila[]': 'List<Upazila>',
    'Union[]': 'List<Union>',
    'Pourosova[]': 'List<Pourosova>',
    'CityCorporation[]': 'List<CityCorporation>',
    'Village[]': 'List<Village>',
    'Division[]?': 'List<District>?',
    'District[]?': 'List<District>?',
    'Upazila[]?': 'List<Upazila>?',
    'Union[]?': 'List<Union>?',
    'Pourosova[]?': 'List<Pourosova>?',
    'CityCorporation[]?': 'List<CityCorporation>?',
    'Village[]?': 'List<Village>?',
  };

  return typeMap[tsType] || 'dynamic';
};

// Generate all Dart models
const generateDartModels = () => {
  console.log('🎯 Generating SECURE Dart models for Flutter...');

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
    const dartCode = generateDartClass(model.name, model.properties);
    const fileName = `${model.name.toLowerCase()}.dart`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, dartCode);
    console.log(`  ✓ Generated ${fileName}`);
  }

  // Generate barrel export file
  const barrelExport = models.map(m => `export '${m.name.toLowerCase()}.dart';`).join('\n');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'models.dart'), barrelExport);
  console.log(`  ✓ Generated models.dart`);

  // Generate SECURE BangladeshGeoData helper class with validation
  const helperClass = `import 'models.dart';

/// Bangladesh Geo Location Data Helper
class BangladeshGeoData {
  final List<Division> divisions;

  BangladeshGeoData({required this.divisions});

  /// Load Bangladesh geo data from JSON
  factory BangladeshGeoData.fromJson(Map<String, dynamic> json) {
    if (json['divisions'] == null) {
      throw ArgumentError('Missing divisions field');
    }

    final divisionsList = json['divisions'] as List;
    final divisions = divisionsList
        .map((e) => Division.fromJson(e as Map<String, dynamic>))
        .toList();

    return BangladeshGeoData(divisions: divisions);
  }

  /// Get all divisions
  List<Division> getAllDivisions() {
    return divisions;
  }

  /// Find districts by division ID
  List<District> getDistrictsByDivision(String divisionId) {
    if (divisionId.isEmpty) {
      return [];
    }

    final division = divisions.firstWhere(
      (d) => d.id == divisionId,
      orElse: () => Division(
        id: '',
        name: '',
        nameBn: '',
      ),
    );
    return division.districts ?? [];
  }

  /// Find upazilas by district and division IDs
  List<Upazila> getUpazilasByDistrict(
    String divisionId,
    String districtId,
  ) {
    if (divisionId.isEmpty || districtId.isEmpty) {
      return [];
    }

    final districts = getDistrictsByDivision(divisionId);
    final district = districts.firstWhere(
      (d) => d.id == districtId,
      orElse: () => District(
        id: '',
        name: '',
        nameBn: '',
      ),
    );
    return district.upazilas ?? [];
  }

  /// Search locations by name (with input sanitization)
  Map<String, List<dynamic>> searchLocations(
    String searchTerm,
  ) {
    // Sanitize input - prevent DoS
    if (searchTerm.length > 100) {
      searchTerm = searchTerm.substring(0, 100);
    }

    final term = searchTerm.toLowerCase();
    final results = <String, List<dynamic>>{
      'divisions': <Division>[],
      'districts': <District>[],
      'upazilas': <Upazila>[],
      'unions': <Union>[],
      'pourosovas': <Pourosova>[],
      'cityCorporations': <CityCorporation>[],
    };

    for (final division in divisions) {
      if (division.name.toLowerCase().contains(term) ||
          division.nameBn.contains(searchTerm)) {
        results['divisions']!.add(division);
      }

      if (division.districts != null) {
        for (final district in division.districts!) {
          if (district.name.toLowerCase().contains(term) ||
              district.nameBn.contains(searchTerm)) {
            results['districts']!.add(district);
          }

          if (district.upazilas != null) {
            for (final upazila in district.upazilas!) {
              if (upazila.name.toLowerCase().contains(term) ||
                  upazila.nameBn.contains(searchTerm)) {
                results['upazilas']!.add(upazila);
              }

              if (upazila.unions != null) {
                for (final union in upazila.unions!) {
                  if (union.name.toLowerCase().contains(term) ||
                      union.nameBn.contains(searchTerm)) {
                    results['unions']!.add(union);
                  }
                }
              }

              if (upazila.pourosovas != null) {
                for (final pourosova in upazila.pourosovas!) {
                  if (pourosova.name.toLowerCase().contains(term) ||
                      pourosova.nameBn.contains(searchTerm)) {
                    results['pourosovas']!.add(pourosova);
                  }
                }
              }
            }
          }

          if (district.cityCorporations != null) {
            for (final cityCorp in district.cityCorporations!) {
              if (cityCorp.name.toLowerCase().contains(term) ||
                  cityCorp.nameBn.contains(searchTerm)) {
                results['cityCorporations']!.add(cityCorp);
              }
            }
          }
        }
      }
    }

    return results;
  }

  /// Convert to JSON
  Map<String, dynamic> toJson() {
    return {
      'divisions': divisions.map((d) => d.toJson()).toList(),
    };
  }
}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'bangladesh_geo_data.dart'), helperClass);
  console.log(`  ✓ Generated SECURE bangladesh_geo_data.dart`);

  console.log(`\n✅ SECURE Dart models generated successfully in: ${OUTPUT_DIR}`);
};

// Run the generator
try {
  generateDartModels();
} catch (error) {
  console.error('❌ Error generating Dart models:', error.message);
  process.exit(1);
}
