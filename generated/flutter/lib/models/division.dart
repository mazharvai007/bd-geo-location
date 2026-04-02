class Division {
  final String id;
  final String name;
  final String nameBn;
  final List<District>? districts;

  Division({
    required this.id,
    required this.name,
    required this.nameBn,
    this.districts,
  });

  factory Division.fromJson(Map<String, dynamic> json) {
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
    return Division(
      id: json['id'] as String,
      name: json['name'] as String,
      nameBn: json['nameBn'] as String,
      districts: json['districts'] == null ? null : (json['districts'] as List).map((e) => District.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'nameBn': nameBn,
      'districts': districts,
    };
  }

  Division copyWith({
    String? id,
    String? name,
    String? nameBn,
    List<District>? districts,
  }) {
    return Division(
      id: id ?? this.id,
      name: name ?? this.name,
      nameBn: nameBn ?? this.nameBn,
      districts: districts ?? this.districts,
    );
  }
}

