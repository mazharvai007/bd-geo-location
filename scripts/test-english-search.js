// Test search functionality with English upazila names
const { searchByName } = require('../dist/index.js');

console.log('🔍 Testing search with English upazila names...\n');

// Test searches with English names
const testSearches = [
  'Savar',
  'Dhamrai',
  'Gazipur',
  'Chandpur',
  'Brahmanbaria',
  'Comilla',
  'Mymensingh',
  'Rangpur',
  'Sylhet',
  'Barisal'
];

testSearches.forEach(searchTerm => {
  const results = searchByName(searchTerm);
  const upazilas = results.upazilas || [];
  console.log(`📍 Searching for "${searchTerm}":`);
  console.log(`   Found ${upazilas.length} upazilas`);
  if (upazilas.length > 0) {
    upazilas.slice(0, 3).forEach(u => {
      console.log(`   - ${u.name} (${u.nameBn}) in ${u.districtName}, ${u.divisionName}`);
    });
    if (upazilas.length > 3) {
      console.log(`   ... and ${upazilas.length - 3} more`);
    }
  }
  console.log('');
});

console.log('✅ English name search test completed!');
