const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

// Load schema
const schema = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'bangladesh-geo-schema.json'), 'utf8')
);

// Load data
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/bangladesh.json'), 'utf8')
);

// Create AJV instance
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Compile schema
const validate = ajv.compile(schema);

// Validate data
const valid = validate(data);

if (valid) {
  console.log('✅ JSON data is valid!\n');

  // Print statistics
  console.log('📊 Data Statistics:');
  console.log(`   Divisions: ${data.divisions.length}`);

  let totalDistricts = 0;
  let totalUpazilas = 0;
  let totalUnions = 0;

  data.divisions.forEach(div => {
    totalDistricts += div.districts.length;
    div.districts.forEach(dist => {
      totalUpazilas += dist.upazilas.length;
      dist.upazilas.forEach(upa => {
        totalUnions += upa.unions ? upa.unions.length : 0;
      });
    });
  });

  console.log(`   Districts: ${totalDistricts}`);
  console.log(`   Upazilas: ${totalUpazilas}`);
  console.log(`   Unions: ${totalUnions}`);

  console.log('\n📋 Breakdown by Division:');
  data.divisions.forEach(div => {
    const distCount = div.districts.length;
    const upaCount = div.districts.reduce((sum, d) => sum + d.upazilas.length, 0);
    const unionCount = div.districts.reduce((sum, d) =>
      sum + d.upazilas.reduce((s, u) => s + (u.unions ? u.unions.length : 0), 0), 0);

    console.log(`   ${div.name} (${div.nameBn}):`);
    console.log(`     Districts: ${distCount}, Upazilas: ${upaCount}, Unions: ${unionCount}`);
  });

  process.exit(0);
} else {
  console.error('❌ JSON data validation failed!\n');

  if (validate.errors) {
    console.error('Errors found:');
    validate.errors.forEach((err, idx) => {
      console.error(`\n${idx + 1}. ${err.instancePath} ${err.message}`);
      if (err.params) {
        console.error(`   Expected: ${err.schema}`);
        console.error(`   Received: ${JSON.stringify(err.data)}`);
      }
    });
  }

  process.exit(1);
}
