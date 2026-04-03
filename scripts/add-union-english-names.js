const fs = require('fs');
const path = require('path');

console.log('🌍 Adding English names to all unions...\n');

// Read the current data
const dataPath = path.join(__dirname, '../src/data/bangladesh.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Common Bengali to English word mappings for unions
const commonWords = {
  // Geographic terms
  'পূর্ব': 'Purbo', 'পশ্চিম': 'Paschim', 'উত্তর': 'Uttor', 'দক্ষিণ': 'Dokkhin',
  'উত্তর': 'Uttar', 'দক্ষিণ': 'Dakshin', 'পূর্ব': 'Purbo', 'পশ্চিম': 'Pashchim',
  'চর': 'Char', 'দিয়ারা': 'Diara', 'বাড়ি': 'Bari', 'পাড়া': 'Para', 'গ্রাম': 'Gram',
  'নগর': 'Nagar', 'পুর': 'Pur', 'গঞ্জ': 'Ganj', 'হাট': 'Hat', 'বাজার': 'Bazar',
  'মাটি': 'Mati', 'তলা': 'Tala', 'খালি': 'Khali', 'পুকুর': 'Pukur', 'সার': 'Sar',
  'ইউনিয়ন': 'Union',

  // Numbers
  'এক': 'Ek', 'দুই': 'Dui', 'তিন': 'Tin', 'চার': 'Char', 'পাঁচ': 'Panch',
  'ছয়': 'Chhoy', 'সাত': 'Sat', 'আট': 'At', 'নয়': 'Noy', 'দশ': 'Dosh',

  // Common words
  'নতুন': 'Notun', 'পুরানো': 'Purano', 'বড়': 'Baro', 'ছোট': 'Chhoto',
  'মাঝি': 'Majhi', 'মধ্য': 'Madhya', 'কেন্দ্র': 'Kendra', 'সদর': 'Sadar',
  'ইসলাম': 'Islam', 'নগর': 'Nagar', 'আবাদ': 'Abad', 'পুর': 'Pur',

  // Common name components
  'রাম': 'Ram', 'শ্যাম': 'Shyam', 'জয়': 'Joy', 'লাল': 'Lal', 'পাল': 'Pal',
  'রায়': 'Roy', 'সিংহ': 'Singh', 'দাস': 'Das', 'মণ্ডল': 'Mandal',
  'শেখ': 'Sheikh', 'মিয়া': 'Mia', 'হোসেন': 'Hossain', 'উদ্দিন': 'Uddin',
  'খান': 'Khan', 'মোল্লা': 'Mullah', 'কাজী': 'Kazi', 'ফকির': 'Fakir',

  // Common place name suffixes/prefixes
  'শিব': 'Shib', 'হরি': 'Hari', 'বিষ্ণু': 'Bishnu', 'কালী': 'Kali',
  'দুর্গা': 'Durga', 'লক্ষ্মী': 'Lokkhi', 'সরস্বতী': 'Saraswati',
  'মা': 'Ma', 'পীর': 'Peer', 'শাহ': 'Shah',

  // Directional compounds
  'পূর্ব পাড়া': 'Purbo Para', 'পশ্চিম পাড়া': 'Paschim Para',
  'উত্তর পাড়া': 'Uttor Para', 'দক্ষিণ পাড়া': 'Dokkhin Para',

  // Common geographic features
  'বিল': 'Beel', 'হাওর': 'Haor', 'বাওড়': 'Baor', 'ঝিল': 'Jheel',
  'নদী': 'Nodi', 'খাল': 'Khal', 'বিল': 'Bill',

  // Administrative terms
  'ইউনিয়ন': 'Union', 'কাউন্সিল': 'Council',
};

// Bengali character to English transliteration map
const transliterationMap = {
  'অ': 'O', 'আ': 'A', 'ই': 'I', 'ঈ': 'I', 'উ': 'U', 'ঊ': 'U',
  'ঋ': 'Ri', 'এ': 'E', 'ঐ': 'Oi', 'ও': 'O', 'ঔ': 'Ou',
  'ং': 'Ng', 'ঃ': 'H', 'ঁ': 'n',

  'ক': 'K', 'খ': 'Kh', 'গ': 'G', 'ঘ': 'Gh', 'ঙ': 'Ng',
  'চ': 'Ch', 'ছ': 'Chh', 'জ': 'J', 'ঝ': 'Jh', 'ঞ': 'Nyo',
  'ট': 'T', 'ঠ': 'Th', 'ড': 'D', 'ঢ': 'Dh', 'ণ': 'N',
  'ত': 'T', 'থ': 'Th', 'দ': 'D', 'ধ': 'Dh', 'ন': 'N',
  'প': 'P', 'ফ': 'F', 'ব': 'B', 'ভ': 'V', 'ম': 'M',
  'য': 'J', 'র': 'R', 'ল': 'L', 'শ': 'Sh', 'ষ': 'Ss',
  'স': 'S', 'হ': 'H',

  'ড়': 'Ri', 'ঢ়': 'Dhri', 'য়': 'Y', 'ৰ': 'R',

  'া': 'a', 'ি': 'i', 'ী': 'i', 'ু': 'u', 'ূ': 'u',
  'ৃ': 'ri', 'ে': 'e', 'ৈ': 'oi', 'ো': 'o', 'ৌ': 'ou',

  'ৃ': 'ri', 'ৗ': 'u',

  '়': '', '‍': '',

  // Numbers
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
};

// Function to transliterate Bengali to English
function transliterate(bengaliText) {
  // First, check if it's a common word
  if (commonWords[bengaliText]) {
    return commonWords[bengaliText];
  }

  // Apply multi-character mappings first
  let result = bengaliText;

  // Apply common word substitutions (partial matches)
  for (const [bn, en] of Object.entries(commonWords)) {
    const regex = new RegExp(bn, 'g');
    result = result.replace(regex, en);
  }

  // Transliterate remaining characters
  let transliterated = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (transliterationMap[char]) {
      transliterated += transliterationMap[char];
    } else {
      transliterated += char;
    }
  }

  // Clean up and capitalize
  transliterated = transliterated.replace(/\s+/g, ' ').trim();
  transliterated = transliterated.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  return transliterated;
}

// Track statistics
let updatedCount = 0;
let notFoundCount = 0;

// Update unions with English names
data.divisions.forEach(division => {
  division.districts.forEach(district => {
    if (district.upazilas) {
      district.upazilas.forEach(upazila => {
        if (upazila.unions) {
          upazila.unions.forEach(union => {
            // Only update if name is same as nameBn (Bengali)
            if (union.name === union.nameBn) {
              const englishName = transliterate(union.nameBn);
              union.name = englishName;
              updatedCount++;
            }
          });
        }
      });
    }
  });
});

console.log(`\n✅ Updated ${updatedCount} unions with English names`);

// Write back to file
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`📄 Updated: ${dataPath}`);

// Show some examples
console.log('\n📋 Sample updated unions:');
console.log('─'.repeat(80));
let sampleCount = 0;
data.divisions.slice(0, 2).forEach(division => {
  division.districts.slice(0, 2).forEach(district => {
    if (district.upazilas) {
      district.upazilas.slice(0, 2).forEach(upazila => {
        if (upazila.unions) {
          upazila.unions.slice(0, 2).forEach(union => {
            if (sampleCount < 10) {
              console.log(`${union.name.padEnd(40)} (${union.nameBn}) - ${upazila.name}, ${district.name}`);
              sampleCount++;
            }
          });
        }
      });
    }
  });
});
console.log('─'.repeat(80));

console.log('\n💡 Note: Auto-generated English names should be reviewed for accuracy.');
console.log('   Some names may need manual correction for proper transliteration.');
