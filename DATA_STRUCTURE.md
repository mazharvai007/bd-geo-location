# Data Structure Guide

This package uses JSON format for all geographical data. This makes it easy to view, edit, and extend the data without needing to recompile TypeScript.

## File Structure

The main data file is located at:
```
src/data/bangladesh.json
```

## JSON Schema

The data follows this structure:

```json
{
  "divisions": [
    {
      "id": "string",
      "name": "string (English)",
      "nameBn": "string (Bengali)",
      "districts": [
        {
          "id": "string",
          "name": "string (English)",
          "nameBn": "string (Bengali)",
          "cityCorporations": [
            {
              "id": "string",
              "name": "string (English)",
              "nameBn": "string (Bengali)"
            }
          ],
          "upazilas": [
            {
              "id": "string",
              "name": "string (English)",
              "nameBn": "string (Bengali)",
              "unions": [
                {
                  "id": "string",
                  "name": "string (English)",
                  "nameBn": "string (Bengali)",
                  "villages": [
                    {
                      "id": "string",
                      "name": "string (English)",
                      "nameBn": "string (Bengali)"
                    }
                  ]
                }
              ],
              "pourosovas": [
                {
                  "id": "string",
                  "name": "string (English)",
                  "nameBn": "string (Bengali)",
                  "villages": [
                    {
                      "id": "string",
                      "name": "string (English)",
                      "nameBn": "string (Bengali)"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Adding New Data

### Adding a New Division

```json
{
  "id": "10",
  "name": "Division Name",
  "nameBn": "বিভাগের নাম",
  "districts": []
}
```

### Adding a New District to a Division

Add to the `districts` array of a division:

```json
{
  "id": "01",
  "name": "District Name",
  "nameBn": "জেলার নাম",
  "upazilas": []
}
```

### Adding a New Upazila to a District

Add to the `upazilas` array of a district:

```json
{
  "id": "001",
  "name": "Upazila Name",
  "nameBn": "উপজেলার নাম",
  "unions": [],
  "pourosovas": []
}
```

### Adding Unions and Pourosovas

Add to the `unions` or `pourosovas` array of an upazila:

```json
{
  "id": "0001",
  "name": "Union Name",
  "nameBn": "ইউনিয়নের নাম",
  "villages": []
}
```

### Adding Villages

Add to the `villages` array of a union or pourosova:

```json
{
  "id": "00001",
  "name": "Village Name",
  "nameBn": "গ্রামের নাম"
}
```

## ID Convention

The IDs follow a hierarchical pattern:

- **Division**: 2 digits (e.g., "30" for Dhaka)
- **District**: 2 digits (e.g., "26" for Dhaka District)
- **Upazila**: Variable length, usually descriptive (e.g., "dhaka-sadar")
- **Union/Thana**: Variable length, usually descriptive
- **Village**: Variable length, usually descriptive

For new entries, follow these patterns or use the official Bangladesh administrative codes.

## Data Validation

Before contributing, ensure your JSON:

1. **Valid JSON**: Use a JSON validator to check syntax
2. **No trailing commas**: JSON doesn't allow trailing commas
3. **Double quotes**: Use double quotes, not single quotes
4. **UTF-8 encoding**: Ensure proper Bengali character encoding
5. **Unique IDs**: All IDs should be unique at their level
6. **Consistent naming**: Follow existing naming conventions

## Complete Data Example

Here's a complete example of a division with all levels:

```json
{
  "divisions": [
    {
      "id": "30",
      "name": "Dhaka",
      "nameBn": "ঢাকা",
      "districts": [
        {
          "id": "26",
          "name": "Dhaka",
          "nameBn": "ঢাকা",
          "cityCorporations": [
            {
              "id": "dhaka-south",
              "name": "Dhaka South City Corporation",
              "nameBn": "ঢাকা দক্ষিণ সিটি কর্পোরেশন"
            }
          ],
          "upazilas": [
            {
              "id": "savar",
              "name": "Savar",
              "nameBn": "সাভার",
              "unions": [
                {
                  "id": "savar-sadar",
                  "name": "Savar Sadar",
                  "nameBn": "সাভার সদর",
                  "villages": [
                    {
                      "id": "village-001",
                      "name": "Village One",
                      "nameBn": "গ্রাম এক"
                    }
                  ]
                }
              ],
              "pourosovas": [
                {
                  "id": "savar-pourosova",
                  "name": "Savar Pourosova",
                  "nameBn": "সাভার পৌরসভা",
                  "villages": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Data Sources

Official data sources for Bangladesh administrative divisions:
- Bangladesh Bureau of Statistics (BBS)
- Local Government Division
- Bangladesh Post Office (postal codes)

## Contributing Data

When contributing data:

1. Fork the repository
2. Edit `src/data/bangladesh.json`
3. Validate your JSON
4. Test with the package functions
5. Submit a pull request

## Bulk Data Import

If you have bulk data in another format (CSV, Excel, etc.), you can convert it to JSON using various tools:

- Online JSON converters
- Node.js scripts
- Python pandas library
- Excel to JSON plugins

Example Node.js conversion script:

```javascript
const fs = require('fs');

// Your data source
const data = require('./your-data.json');

// Validate and format
const formattedData = JSON.stringify(data, null, 2);

// Write to file
fs.writeFileSync('src/data/bangladesh.json', formattedData);
```
