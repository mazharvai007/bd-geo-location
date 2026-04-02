class Upazila {
  final String id;
  final String name;
  final String nameBn;
  final List<Union>? unions;
  final List<Pourosova>? pourosovas;

  Upazila({
    required this.id,
    required this.name,
    required this.nameBn,
    this.unions,
    this.pourosovas,
  });

  factory Upazila.fromJson(Map<String, dynamic> json) {
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
    return Upazila(
      id: json['id'] as String,
      name: json['name'] as String,
      nameBn: json['nameBn'] as String,
      unions: json['unions'] == null ? null : (json['unions'] as List).map((e) => Union.fromJson(e as Map<String, dynamic>)).toList(),
      pourosovas: json['pourosovas'] == null ? null : (json['pourosovas'] as List).map((e) => Pourosova.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'nameBn': nameBn,
      'unions': unions,
      'pourosovas': pourosovas,
    };
  }

  Upazila copyWith({
    String? id,
    String? name,
    String? nameBn,
    List<Union>? unions,
    List<Pourosova>? pourosovas,
  }) {
    return Upazila(
      id: id ?? this.id,
      name: name ?? this.name,
      nameBn: nameBn ?? this.nameBn,
      unions: unions ?? this.unions,
      pourosovas: pourosovas ?? this.pourosovas,
    );
  }
}

