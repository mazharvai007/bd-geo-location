class Village {
  final String id;
  final String name;
  final String nameBn;

  Village({
    required this.id,
    required this.name,
    required this.nameBn,
  });

  factory Village.fromJson(Map<String, dynamic> json) {
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
    return Village(
      id: json['id'] as String,
      name: json['name'] as String,
      nameBn: json['nameBn'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'nameBn': nameBn,
    };
  }

  Village copyWith({
    String? id,
    String? name,
    String? nameBn,
  }) {
    return Village(
      id: id ?? this.id,
      name: name ?? this.name,
      nameBn: nameBn ?? this.nameBn,
    );
  }
}

