// Test search functionality with English union names
const { searchByName } = require('../dist/index.js');

console.log('🔍 Testing search with English union names...\n');

// Test searches with English union names
const testSearches = [
  'Kashipur',
  'Rajapur',
  'Ilisha',
  'Char',
  'Paschim',
  'Purbo',
];

testSearches.forEach(searchTerm => {
  const results = searchByName(searchTerm);
  const unions = results.unions || [];
  console.log(`📍 Searching for "${searchTerm}":`);
  console.log(`   Found ${unions.length} unions`);
  if (unions.length > 0 && unions.length <= 5) {
    unions.slice(0, 3).forEach(u => {
      console.log(`   - ${u.name} (${u.nameBn})`);
    });
  } else if (unions.length > 5) {
    console.log(`   First 3 of ${unions.length}:`);
    unions.slice(0, 3).forEach(u => {
      console.log(`   - ${u.name} (${u.nameBn})`);
    });
  }
  console.log('');
});

console.log('✅ English union name search test completed!');
console.log(`\n📊 Note: Union names are auto-generated transliterations.`);
console.log(`   Some may need manual refinement for perfect accuracy.`);
