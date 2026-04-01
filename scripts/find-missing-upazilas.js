const fs = require('fs');
const path = require('path');

// Read the current data
const dataPath = path.join(__dirname, '../src/data/bangladesh.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Find upazilas still using Bengali names in the 'name' field
const missing = [];

data.divisions.forEach(division => {
  division.districts.forEach(district => {
    if (district.upazilas) {
      district.upazilas.forEach(upazila => {
        if (upazila.name === upazila.nameBn) {
          missing.push({
            name: upazila.nameBn,
            district: district.name,
            division: division.name
          });
        }
      });
    }
  });
});

console.log(`\n📊 Found ${missing.length} upazilas missing English names:\n`);

// Group by division for better organization
const byDivision = {};
missing.forEach(m => {
  if (!byDivision[m.division]) byDivision[m.division] = [];
  byDivision[m.division].push(m);
});

Object.keys(byDivision).slice(0, 5).forEach(division => {
  console.log(`\n${division}:`);
  byDivision[division].forEach(m => {
    console.log(`  '${m.name}': '',  // ${m.district}`);
  });
});

console.log(`\n... and ${Object.keys(byDivision).length - 5} more divisions`);
console.log(`\nTotal missing: ${missing.length} out of 531 upazilas`);
