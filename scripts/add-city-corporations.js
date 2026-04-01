const fs = require('fs');
const path = require('path');

console.log('🏙️  Adding City Corporations to Bangladesh data...\n');

// Read the current JSON data
const dataPath = path.join(__dirname, '../src/data/bangladesh.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// City Corporations mapping: districtId -> array of city corporations
const cityCorporationsMap = {
  '35': [ // Barisal
    {
      id: 'barisal',
      name: 'Barisal City Corporation',
      nameBn: 'বরিশাল সিটি কর্পোরেশন'
    }
  ],
  '11': [ // Chittagong
    {
      id: 'chittagong',
      name: 'Chittagong City Corporation',
      nameBn: 'চট্টগ্রাম সিটি কর্পোরেশন'
    }
  ],
  '20': [ // Comilla
    {
      id: 'comilla',
      name: 'Comilla City Corporation',
      nameBn: 'কুমিল্লা সিটি কর্পোরেশন'
    }
  ],
  '26': [ // Dhaka
    {
      id: 'dhaka-south',
      name: 'Dhaka South City Corporation',
      nameBn: 'ঢাকা দক্ষিণ সিটি কর্পোরেশন'
    },
    {
      id: 'dhaka-north',
      name: 'Dhaka North City Corporation',
      nameBn: 'ঢাকা উত্তর সিটি কর্পোরেশন'
    }
  ],
  '23': [ // Gazipur
    {
      id: 'gazipur',
      name: 'Gazipur City Corporation',
      nameBn: 'গাজীপুর সিটি কর্পোরেশন'
    }
  ],
  '2': [ // Khulna
    {
      id: 'khulna',
      name: 'Khulna City Corporation',
      nameBn: 'খুলনা সিটি কর্পোরেশন'
    }
  ],
  '41': [ // Mymensingh
    {
      id: 'mymensingh',
      name: 'Mymensingh City Corporation',
      nameBn: 'ময়মনসিংহ সিটি কর্পোরেশন'
    }
  ],
  '28': [ // Narayanganj
    {
      id: 'narayanganj',
      name: 'Narayanganj City Corporation',
      nameBn: 'নারায়ণগঞ্জ সিটি কর্পোরেশন'
    }
  ],
  '59': [ // Rajshahi
    {
      id: 'rajshahi',
      name: 'Rajshahi City Corporation',
      nameBn: 'রাজশাহী সিটি কর্পোরেশন'
    }
  ],
  '51': [ // Rangpur
    {
      id: 'rangpur',
      name: 'Rangpur City Corporation',
      nameBn: 'রংপুর সিটি কর্পোরেশন'
    }
  ],
  '62': [ // Sylhet
    {
      id: 'sylhet',
      name: 'Sylhet City Corporation',
      nameBn: 'সিলেট সিটি কর্পোরেশন'
    }
  ]
};

let addedCount = 0;

// Add city corporations to their respective districts
data.divisions.forEach(division => {
  division.districts.forEach((district, index) => {
    const cityCorps = cityCorporationsMap[district.id];

    if (cityCorps && cityCorps.length > 0) {
      // Create a new district object with cityCorporations before upazilas
      const newDistrict = {
        id: district.id,
        name: district.name,
        nameBn: district.nameBn,
        cityCorporations: cityCorps,
        upazilas: district.upazilas
      };

      // Replace the district object
      division.districts[index] = newDistrict;

      addedCount += cityCorps.length;
      console.log(`✅ Added ${cityCorps.length} city corporation(s) to ${district.name} district (${district.nameBn})`);
      cityCorps.forEach(cc => {
        console.log(`   - ${cc.name} (${cc.nameBn})`);
      });
    }
  });
});

// Write the updated data back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`\n✅ Successfully added ${addedCount} City Corporations!`);
console.log(`📄 Updated: ${dataPath}\n`);

// Print summary by division
console.log('📊 City Corporations by Division:');
data.divisions.forEach(division => {
  let totalCityCorps = 0;
  let districtsWithCC = [];

  division.districts.forEach(district => {
    if (district.cityCorporations && district.cityCorporations.length > 0) {
      totalCityCorps += district.cityCorporations.length;
      districtsWithCC.push(`${district.name} (${district.cityCorporations.length})`);
    }
  });

  if (totalCityCorps > 0) {
    console.log(`\n${division.name} (${division.nameBn}): ${totalCityCorps} city corporation(s)`);
    districtsWithCC.forEach(d => console.log(`   - ${d}`));
  }
});

console.log(`\n🏙️  Total City Corporations in Bangladesh: ${addedCount}`);
