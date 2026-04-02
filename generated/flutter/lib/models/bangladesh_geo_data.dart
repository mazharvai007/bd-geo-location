import 'models.dart';

/// Bangladesh Geo Location Data Helper
class BangladeshGeoData {
  final List<Division> divisions;

  BangladeshGeoData({required this.divisions});

  /// Load Bangladesh geo data from JSON
  factory BangladeshGeoData.fromJson(Map<String, dynamic> json) {
    if (json['divisions'] == null) {
      throw ArgumentError('Missing divisions field');
    }

    final divisionsList = json['divisions'] as List;
    final divisions = divisionsList
        .map((e) => Division.fromJson(e as Map<String, dynamic>))
        .toList();

    return BangladeshGeoData(divisions: divisions);
  }

  /// Get all divisions
  List<Division> getAllDivisions() {
    return divisions;
  }

  /// Find districts by division ID
  List<District> getDistrictsByDivision(String divisionId) {
    if (divisionId.isEmpty) {
      return [];
    }

    final division = divisions.firstWhere(
      (d) => d.id == divisionId,
      orElse: () => Division(
        id: '',
        name: '',
        nameBn: '',
      ),
    );
    return division.districts ?? [];
  }

  /// Find upazilas by district and division IDs
  List<Upazila> getUpazilasByDistrict(
    String divisionId,
    String districtId,
  ) {
    if (divisionId.isEmpty || districtId.isEmpty) {
      return [];
    }

    final districts = getDistrictsByDivision(divisionId);
    final district = districts.firstWhere(
      (d) => d.id == districtId,
      orElse: () => District(
        id: '',
        name: '',
        nameBn: '',
      ),
    );
    return district.upazilas ?? [];
  }

  /// Search locations by name (with input sanitization)
  Map<String, List<dynamic>> searchLocations(
    String searchTerm,
  ) {
    // Sanitize input - prevent DoS
    if (searchTerm.length > 100) {
      searchTerm = searchTerm.substring(0, 100);
    }

    final term = searchTerm.toLowerCase();
    final results = <String, List<dynamic>>{
      'divisions': <Division>[],
      'districts': <District>[],
      'upazilas': <Upazila>[],
      'unions': <Union>[],
      'pourosovas': <Pourosova>[],
      'cityCorporations': <CityCorporation>[],
    };

    for (final division in divisions) {
      if (division.name.toLowerCase().contains(term) ||
          division.nameBn.contains(searchTerm)) {
        results['divisions']!.add(division);
      }

      if (division.districts != null) {
        for (final district in division.districts!) {
          if (district.name.toLowerCase().contains(term) ||
              district.nameBn.contains(searchTerm)) {
            results['districts']!.add(district);
          }

          if (district.upazilas != null) {
            for (final upazila in district.upazilas!) {
              if (upazila.name.toLowerCase().contains(term) ||
                  upazila.nameBn.contains(searchTerm)) {
                results['upazilas']!.add(upazila);
              }

              if (upazila.unions != null) {
                for (final union in upazila.unions!) {
                  if (union.name.toLowerCase().contains(term) ||
                      union.nameBn.contains(searchTerm)) {
                    results['unions']!.add(union);
                  }
                }
              }

              if (upazila.pourosovas != null) {
                for (final pourosova in upazila.pourosovas!) {
                  if (pourosova.name.toLowerCase().contains(term) ||
                      pourosova.nameBn.contains(searchTerm)) {
                    results['pourosovas']!.add(pourosova);
                  }
                }
              }
            }
          }

          if (district.cityCorporations != null) {
            for (final cityCorp in district.cityCorporations!) {
              if (cityCorp.name.toLowerCase().contains(term) ||
                  cityCorp.nameBn.contains(searchTerm)) {
                results['cityCorporations']!.add(cityCorp);
              }
            }
          }
        }
      }
    }

    return results;
  }

  /// Convert to JSON
  Map<String, dynamic> toJson() {
    return {
      'divisions': divisions.map((d) => d.toJson()).toList(),
    };
  }
}
