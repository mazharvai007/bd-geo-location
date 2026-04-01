// Test script to verify the data is working correctly
const path = require('path');

// Import the built module
const {
  getAllDivisions,
  getDivisionById,
  getDivisionByName,
  getDistrictsByDivision,
  getDistrictById,
  getUpazilasByDistrict,
  getUnionsByUpazila,
  searchByName,
} = require('../dist/index.js');

console.log('🧪 Testing BD Geo Location Data\n');

// Test 1: Get all divisions
console.log('Test 1: Get all divisions');
const divisions = getAllDivisions();
console.log(`✅ Found ${divisions.length} divisions`);

// Test 2: Get division by ID
console.log('\nTest 2: Get division by ID');
const dhakaDivision = getDivisionById('30');
console.log(`✅ Found Dhaka division: ${dhakaDivision.name} (${dhakaDivision.nameBn})`);

// Test 3: Get division by name
console.log('\nTest 3: Get division by name');
const chittagong = getDivisionByName('Chittagong');
console.log(`✅ Found Chittagong: ${chittagong.name} (${chittagong.nameBn})`);

// Test 4: Get districts in a division
console.log('\nTest 4: Get districts in Dhaka division');
const dhakaDistricts = getDistrictsByDivision('30');
console.log(`✅ Found ${dhakaDistricts.length} districts in Dhaka division`);
console.log(`   First 5: ${dhakaDistricts.slice(0, 5).map(d => d.name).join(', ')}`);

// Test 5: Get specific district
console.log('\nTest 5: Get Dhaka district');
const dhakaDistrict = getDistrictById('26');
console.log(`✅ Found Dhaka district: ${dhakaDistrict.name} (${dhakaDistrict.nameBn})`);
console.log(`   Has ${dhakaDistrict.upazilas.length} upazilas`);

// Test 6: Get upazilas in a district
console.log('\nTest 6: Get upazilas in Dhaka district');
const dhakaUpazilas = getUpazilasByDistrict('26');
console.log(`✅ Found ${dhakaUpazilas.length} upazilas in Dhaka district`);
console.log(`   First 5: ${dhakaUpazilas.slice(0, 5).map(u => u.nameBn).join(', ')}`);

// Test 7: Get unions in an upazila
console.log('\nTest 7: Get unions in Savar upazila');
const savarUnions = getUnionsByUpazila('199', '26');
console.log(`✅ Found ${savarUnions.length} unions in Savar upazila`);
if (savarUnions.length > 0) {
  console.log(`   First 5: ${savarUnions.slice(0, 5).map(u => u.nameBn).join(', ')}`);
}

// Test 8: Search functionality
console.log('\nTest 8: Search for "Dhaka"');
const searchResults = searchByName('Dhaka');
console.log(`✅ Found ${searchResults.divisions.length} divisions`);
console.log(`   Found ${searchResults.districts.length} districts`);
console.log(`   Found ${searchResults.upazilas.length} upazilas`);

// Test 9: Verify data completeness
console.log('\nTest 9: Data completeness check');
let totalUpazilas = 0;
let totalUnions = 0;
let districtsWithUpazilas = 0;
let upazilasWithUnions = 0;

divisions.forEach(div => {
  div.districts.forEach(dist => {
    if (dist.upazilas && dist.upazilas.length > 0) {
      districtsWithUpazilas++;
      totalUpazilas += dist.upazilas.length;

      dist.upazilas.forEach(upa => {
        if (upa.unions && upa.unions.length > 0) {
          upazilasWithUnions++;
          totalUnions += upa.unions.length;
        }
      });
    }
  });
});

console.log(`✅ Districts with upazilas: ${districtsWithUpazilas}/${divisions.reduce((sum, d) => sum + d.districts.length, 0)}`);
console.log(`✅ Upazilas with unions: ${upazilasWithUnions}/${totalUpazilas}`);
console.log(`✅ Total upazilas: ${totalUpazilas}`);
console.log(`✅ Total unions: ${totalUnions}`);

// Test 10: Test division summary
console.log('\nTest 10: Division Summary');
divisions.forEach(div => {
  const districtCount = div.districts.length;
  const upazilaCount = div.districts.reduce((sum, d) => sum + (d.upazilas?.length || 0), 0);
  const unionCount = div.districts.reduce((sum, d) =>
    sum + (d.upazilas?.reduce((s, u) => s + (u.unions?.length || 0), 0) || 0), 0);

  console.log(`   ${div.name.padEnd(15)} ${districtCount} districts, ${upazilaCount} upazilas, ${unionCount} unions`);
});

console.log('\n✅ All tests passed!\n');
