class District {
  final String id;
  final String name;
  final String nameBn;
  final List<Upazila>? upazilas;
  final List<CityCorporation>? cityCorporations;

  District({
    required this.id,
    required this.name,
    required this.nameBn,
    this.upazilas,
    this.cityCorporations,
  });

  factory District.fromJson(Map<String, dynamic> json) {
    // Validate required fields
    if (json['id'] == null || json['id'] is! String) {
      throw ArgumentError('Invalid or missing id');
    }
    if (json['name'] == null || json['name'] is! String) {
      throw ArgumentError('Invalid or missing name');
    }
    if (json['nameBn'] == null || json['nameBn'] is! String) {
      throw ArgumentError('Invalid or missing nameBn');
    }
    return District(
      id: json['id'] as String,
      name: json['name'] as String,
      nameBn: json['nameBn'] as String,
      upazilas: json['upazilas'] == null ? null : (json['upazilas'] as List).map((e) => Upazila.fromJson(e as Map<String, dynamic>)).toList(),
      cityCorporations: json['cityCorporations'] == null ? null : (json['cityCorporations'] as List).map((e) => CityCorporation.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'nameBn': nameBn,
      'upazilas': upazilas,
      'cityCorporations': cityCorporations,
    };
  }

  District copyWith({
    String? id,
    String? name,
    String? nameBn,
    List<Upazila>? upazilas,
    List<CityCorporation>? cityCorporations,
  }) {
    return District(
      id: id ?? this.id,
      name: name ?? this.name,
      nameBn: nameBn ?? this.nameBn,
      upazilas: upazilas ?? this.upazilas,
      cityCorporations: cityCorporations ?? this.cityCorporations,
    );
  }
}

