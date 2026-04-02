class CityCorporation {
  final String id;
  final String name;
  final String nameBn;
  final List<Upazila>? thanas;

  CityCorporation({
    required this.id,
    required this.name,
    required this.nameBn,
    this.thanas,
  });

  factory CityCorporation.fromJson(Map<String, dynamic> json) {
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
    return CityCorporation(
      id: json['id'] as String,
      name: json['name'] as String,
      nameBn: json['nameBn'] as String,
      thanas: json['thanas'] == null ? null : (json['thanas'] as List).map((e) => Upazila.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'nameBn': nameBn,
      'thanas': thanas,
    };
  }

  CityCorporation copyWith({
    String? id,
    String? name,
    String? nameBn,
    List<Upazila>? thanas,
  }) {
    return CityCorporation(
      id: id ?? this.id,
      name: name ?? this.name,
      nameBn: nameBn ?? this.nameBn,
      thanas: thanas ?? this.thanas,
    );
  }
}

