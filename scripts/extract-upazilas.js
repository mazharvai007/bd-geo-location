const fs = require('fs');
const path = require('path');

console.log('📝 Extracting all upazilas and creating English name mapping...\n');

// Read the current data
const dataPath = path.join(__dirname, '../src/data/bangladesh.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Extract all unique upazilas
const upazilaMap = {};
let totalUpazilas = 0;

data.divisions.forEach(division => {
  console.log(`\n📍 Processing ${division.name} Division...`);

  division.districts.forEach(district => {
    if (district.upazilas) {
      district.upazilas.forEach(upazila => {
        totalUpazilas++;
        const key = `${district.id}-${upazila.id}`;

        // Check if we already have this upazila
        if (!upazilaMap[upazila.nameBn]) {
          upazilaMap[upazila.nameBn] = {
            id: upazila.id,
            districtId: district.id,
            district: district.name,
            division: division.name,
            nameBn: upazila.nameBn,
            nameEn: generateEnglishName(upazila.nameBn, district.name)
          };
        }
      });
    }
  });
});

console.log(`\n📊 Total upazilas found: ${totalUpazilas}`);
console.log(`📝 Unique upazilas: ${Object.keys(upazilaMap).length}`);

// Function to generate English names (basic transliteration + common mappings)
function generateEnglishName(nameBn, districtName) {
  // Common mappings for well-known upazilas
  const commonMappings = {
    'সদর': 'Sadar',
    'উত্তর': 'North',
    'দক্ষিণ': 'South',
    'পূর্ব': 'East',
    'পশ্চিম': 'West',
    'কেন্দ্র': 'Center',
    'সিটি কর্পোরেশন': 'City Corporation',
  };

  // District-specific suffixes
  const suffixes = {
    'Dhaka': '',
    'Chittagong': '',
    'Khulna': '',
    'Rajshahi': '',
    'Sylhet': '',
    'Barisal': '',
    'Rangpur': '',
    'Mymensingh': '',
  };

  // Apply common mappings first
  let result = nameBn;
  for (const [bn, en] of Object.entries(commonMappings)) {
    result = result.replace(new RegExp(bn, 'g'), en);
  }

  // Basic transliteration rules (simplified)
  const transliterationMap = {
    'ঢ': 'Dh', 'ধ': 'Dh', 'ন': 'N', 'ত': 'T', 'প': 'P',
    'ব': 'B', 'ম': 'M', 'য': 'Y', 'র': 'R', 'ল': 'L',
    'ক': 'K', 'খ': 'Kh', 'গ': 'G', 'ঘ': 'Gh', 'ঙ': 'Ng',
    'চ': 'Ch', 'ছ': 'Chh', 'জ': 'J', 'ঝ': 'Jh',
    'ট': 'T', 'ঠ': 'Th', 'ড': 'D', 'ণ': 'N',
    'ড়': 'Ḍ', 'ঢ়': 'ḍ', 'য়': 'ẏ', 'র়': 'ṛ',
    'শ': 'Sh', 'ষ': 'Ss', 'স': 'S', 'হ': 'H',
    'আ': 'A', 'ই': 'I', 'ঈ': 'I', 'উ': 'U', 'ঊ': 'U',
    'ঋ': 'Ri', 'এ': 'E', 'ঐ': 'Oi', 'ও': 'O', 'ঔ': 'Ou',
  };

  // Apply transliteration
  let englishName = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    englishName += transliterationMap[char] || char;
  }

  return englishName;
}

// Convert the map to an array and save
const upazilaList = Object.values(upazilaMap);

// Save to file
const outputPath = path.join(__dirname, 'upazila-english-names.json');
fs.writeFileSync(outputPath, JSON.stringify(upazilaList, null, 2), 'utf8');

console.log(`\n✅ Extracted ${upazilaList.length} upazilas`);
console.log(`📄 Saved to: ${outputPath}`);
console.log('\n⚠️  Note: Auto-generated English names need manual review!');
console.log('💡 Recommendation: Review and correct the English names before applying.');

// Show sample
console.log('\n📋 Sample of extracted upazilas:');
console.log('─'.repeat(80));
upazilaList.slice(0, 20).forEach(u => {
  console.log(`${u.nameBn.padEnd(40)} → ${u.nameEn.padEnd(40)} (${u.district}, ${u.division})`);
});
console.log('─'.repeat(80));
