import 'package:bd_geo_location/models/models.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Division Model Tests', () {
    test('Division should create from JSON', () {
      // Test data
      final json = {
        'id': '30',
        'name': 'Dhaka',
        'nameBn': 'ঢাকা',
        'districts': [
          {
            'id': '26',
            'name': 'Dhaka',
            'nameBn': 'ঢাকা',
          },
        ],
      };

      // Create Division from JSON
      final division = Division.fromJson(json);

      // Verify
      expect(division.id, '30');
      expect(division.name, 'Dhaka');
      expect(division.nameBn, 'ঢাকা');
      expect(division.districts, isNotNull);
      expect(division.districts!.length, 1);
      expect(division.districts![0].id, '26');
    });

    test('Division should handle null districts', () {
      final json = {
        'id': '30',
        'name': 'Dhaka',
        'nameBn': 'ঢাকা',
        'districts': null,
      };

      final division = Division.fromJson(json);

      expect(division.districts, isNull);
    });

    test('Division should convert to JSON', () {
      final division = Division(
        id: '30',
        name: 'Dhaka',
        nameBn: 'ঢাকা',
        districts: [
          District(
            id: '26',
            name: 'Dhaka',
            nameBn: 'ঢাকা',
          ),
        ],
      );

      final json = division.toJson();

      expect(json['id'], '30');
      expect(json['name'], 'Dhaka');
      expect(json['nameBn'], 'ঢাকা');
      expect(json['districts'], isNotNull);
    });

    test('Division copyWith should work', () {
      final division = Division(
        id: '30',
        name: 'Dhaka',
        nameBn: 'ঢাকা',
      );

      final updated = division.copyWith(name: 'Chittagong');

      expect(updated.id, '30');
      expect(updated.name, 'Chittagong');
      expect(division.name, 'Dhaka'); // Original unchanged
    });
  });

  group('District Model Tests', () {
    test('District should create from JSON', () {
      final json = {
        'id': '26',
        'name': 'Dhaka',
        'nameBn': 'ঢাকা',
        'upazilas': null,
        'cityCorporations': null,
      };

      final district = District.fromJson(json);

      expect(district.id, '26');
      expect(district.name, 'Dhaka');
      expect(district.upazilas, isNull);
    });
  });

  group('BangladeshGeoData Helper Tests', () {
    test('getAllDivisions should return divisions', () {
      final geoData = BangladeshGeoData(
        divisions: [
          Division(id: '30', name: 'Dhaka', nameBn: 'ঢাকা'),
          Division(id: '20', name: 'Chittagong', nameBn: 'চট্টগ্রাম'),
        ],
      );

      final divisions = geoData.getAllDivisions();

      expect(divisions.length, 2);
      expect(divisions[0].name, 'Dhaka');
      expect(divisions[1].name, 'Chittagong');
    });

    test('getDistrictsByDivision should return districts', () {
      final geoData = BangladeshGeoData(
        divisions: [
          Division(
            id: '30',
            name: 'Dhaka',
            nameBn: 'ঢাকা',
            districts: [
              District(id: '26', name: 'Dhaka', nameBn: 'ঢাকা'),
              District(id: '27', name: 'Gazipur', nameBn: 'গাজীপুর'),
            ],
          ),
        ],
      );

      final districts = geoData.getDistrictsByDivision('30');

      expect(districts.length, 2);
      expect(districts[0].name, 'Dhaka');
      expect(districts[1].name, 'Gazipur');
    });

    test('searchLocations should find matches', () {
      final geoData = BangladeshGeoData(
        divisions: [
          Division(
            id: '30',
            name: 'Dhaka',
            nameBn: 'ঢাকা',
            districts: [
              District(id: '26', name: 'Dhaka', nameBn: 'ঢাকা'),
            ],
          ),
          Division(id: '20', name: 'Chittagong', nameBn: 'চট্টগ্রাম'),
        ],
      );

      final results = geoData.searchLocations('Dhaka');

      expect(results['divisions']!.length, 1);
      expect(results['districts']!.length, 1);
      expect((results['divisions']![0] as Division).name, 'Dhaka');
    });
  });
}
