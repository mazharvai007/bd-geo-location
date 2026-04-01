/**
 * Example: Working with JSON data directly
 *
 * This example shows how to import and work with the raw JSON data
 * from the bd-geo-location package.
 */

// Example 1: Import and use the helper functions
import {
  getAllDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  searchByName,
} from 'bd-geo-location';

console.log('=== Example 1: Using Helper Functions ===\n');

// Get all divisions
const divisions = getAllDivisions();
console.log(`Total Divisions: ${divisions.length}`);
console.log('Divisions:', divisions.map(d => `${d.name} (${d.nameBn})`));

// Get districts in Dhaka division
const dhakaDistricts = getDistrictsByDivision('30');
console.log('\nDistricts in Dhaka division:');
dhakaDistricts.forEach(district => {
  console.log(`  - ${district.name} (${district.nameBn})`);
});

// Example 2: Import raw JSON data for custom processing
import bangladeshData from 'bd-geo-location/dist/data/bangladesh.json';

console.log('\n\n=== Example 2: Working with Raw JSON ===\n');

// Count total administrative units
const totalDivisions = bangladeshData.divisions.length;
let totalDistricts = 0;
let totalUpazilas = 0;
let totalCityCorporations = 0;

bangladeshData.divisions.forEach(division => {
  if (division.districts) {
    totalDistricts += division.districts.length;

    division.districts.forEach(district => {
      if (district.upazilas) {
        totalUpazilas += district.upazilas.length;
      }
      if (district.cityCorporations) {
        totalCityCorporations += district.cityCorporations.length;
      }
    });
  }
});

console.log('Bangladesh Administrative Summary:');
console.log(`  Divisions: ${totalDivisions}`);
console.log(`  Districts: ${totalDistricts}`);
console.log(`  Upazilas: ${totalUpazilas}`);
console.log(`  City Corporations: ${totalCityCorporations}`);

// Example 3: Custom filtering and processing
console.log('\n\n=== Example 3: Custom Data Processing ===\n');

// Find all divisions with "City" in their name (city corporations)
const divisionsWithCityCorps = bangladeshData.divisions.filter(division => {
  return division.districts?.some(district =>
    district.cityCorporations && district.cityCorporations.length > 0
  );
});

console.log('Divisions with City Corporations:');
divisionsWithCityCorps.forEach(division => {
  const cityCorpCount = division.districts?.reduce((sum, district) => {
    return sum + (district.cityCorporations?.length || 0);
  }, 0);
  console.log(`  - ${division.name}: ${cityCorpCount} city corporation(s)`);
});

// Example 4: Search functionality
console.log('\n\n=== Example 4: Search ===\n');

const searchResults = searchByName('Dhaka');
console.log(`Search results for "Dhaka":`);
console.log(`  Divisions: ${searchResults.divisions.length}`);
console.log(`  Districts: ${searchResults.districts.length}`);
console.log(`  Upazilas: ${searchResults.upazilas.length}`);
console.log(`  City Corporations: ${searchResults.cityCorporations.length}`);

// Example 5: Building a custom lookup table
console.log('\n\n=== Example 5: Custom Lookup Table ===\n');

// Create a lookup map for quick access by name
const districtLookup = new Map<string, any>();

bangladeshData.divisions.forEach(division => {
  division.districts?.forEach(district => {
    districtLookup.set(district.name.toLowerCase(), {
      district: district.name,
      districtBn: district.nameBn,
      division: division.name,
      divisionBn: division.nameBn,
      id: district.id,
    });
  });
});

// Quick lookup
const lookupResult = districtLookup.get('dhaka');
console.log('Lookup result for "Dhaka":', lookupResult);

// Example 6: Export data for frontend
console.log('\n\n=== Example 6: Data for Frontend ===\n');

// Prepare data for a dropdown selector
const divisionOptions = bangladeshData.divisions.map(division => ({
  value: division.id,
  label: division.name,
  labelBn: division.nameBn,
}));

console.log('Data for dropdown selector:');
console.log(JSON.stringify(divisionOptions, null, 2));

// Example 7: Get geographical hierarchy
console.log('\n\n=== Example 7: Geographical Hierarchy ===\n');

function getFullHierarchy(divisionId: string) {
  const division = bangladeshData.divisions.find(d => d.id === divisionId);

  if (!division) {
    console.log('Division not found');
    return;
  }

  console.log(`Division: ${division.name} (${division.nameBn})`);

  division.districts?.forEach(district => {
    console.log(`  District: ${district.name} (${district.nameBn})`);

    if (district.cityCorporations?.length) {
      district.cityCorporations.forEach(cc => {
        console.log(`    City Corporation: ${cc.name} (${cc.nameBn})`);
      });
    }

    if (district.upazilas?.length) {
      district.upazilas.forEach(upazila => {
        console.log(`    Upazila: ${upazila.name} (${upazila.nameBn})`);
      });
    }
  });
}

getFullHierarchy('30'); // Dhaka division
