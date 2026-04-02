class Pourosova {
  final String id;
  final String name;
  final String nameBn;
  final List<Village>? villages;

  Pourosova({
    required this.id,
    required this.name,
    required this.nameBn,
    this.villages,
  });

  factory Pourosova.fromJson(Map<String, dynamic> json) {
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
    return Pourosova(
      id: json['id'] as String,
      name: json['name'] as String,
      nameBn: json['nameBn'] as String,
      villages: json['villages'] == null ? null : (json['villages'] as List).map((e) => Village.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'nameBn': nameBn,
      'villages': villages,
    };
  }

  Pourosova copyWith({
    String? id,
    String? name,
    String? nameBn,
    List<Village>? villages,
  }) {
    return Pourosova(
      id: id ?? this.id,
      name: name ?? this.name,
      nameBn: nameBn ?? this.nameBn,
      villages: villages ?? this.villages,
    );
  }
}

