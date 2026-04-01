const fs = require('fs');
const path = require('path');

// Read the current data
const dataPath = path.join(__dirname, '../src/data/bangladesh.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Check union names
let totalUnions = 0;
let englishOnly = 0;
let bengaliOnly = 0;
let bothMatch = 0;
let samples = [];

data.divisions.slice(0, 2).forEach(division => {
  division.districts.slice(0, 2).forEach(district => {
    if (district.upazilas) {
      district.upazilas.slice(0, 2).forEach(upazila => {
        if (upazila.unions) {
          upazila.unions.slice(0, 3).forEach(union => {
            totalUnions++;
            if (union.name === union.nameBn) {
              bengaliOnly++;
              if (samples.length < 10) {
                samples.push({
                  name: union.name,
                  nameBn: union.nameBn,
                  upazila: upazila.name,
                  district: district.name,
                  division: division.name
                });
              }
            } else if (union.nameBn === union.name) {
              bothMatch++;
            } else {
              englishOnly++;
            }
          });
        }
      });
    }
  });
});

console.log(`\n📊 Union Name Analysis (sample of ${totalUnions} unions):\n`);
console.log(`English only: ${englishOnly}`);
console.log(`Bengali only (both fields same): ${bengaliOnly}`);
console.log(`Different names: ${bothMatch}`);

if (samples.length > 0) {
  console.log(`\n📋 Sample unions with Bengali names only:\n`);
  samples.forEach(s => {
    console.log(`"${s.name}" (${s.nameBn})`);
    console.log(`   Location: ${s.upazila}, ${s.district}, ${s.division}\n`);
  });
}

// Count all unions
let allUnionsCount = 0;
data.divisions.forEach(division => {
  division.districts.forEach(district => {
    if (district.upazilas) {
      district.upazilas.forEach(upazila => {
        if (upazila.unions) {
          allUnionsCount += upazila.unions.length;
        }
      });
    }
  });
});

console.log(`\n📊 Total unions in dataset: ${allUnionsCount}`);
console.log(`⚠️  Most unions likely have Bengali names in both fields`);
