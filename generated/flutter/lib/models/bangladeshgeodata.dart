class BangladeshGeoData {
  final List<Division> divisions;

  BangladeshGeoData({
    required this.divisions,
  });

  factory BangladeshGeoData.fromJson(Map<String, dynamic> json) {
    // Validate required fields
    return BangladeshGeoData(
      divisions: (json['divisions'] as List?)?.map((e) => Division.fromJson(e as Map<String, dynamic>)).toList() ?? [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'divisions': divisions,
    };
  }

  BangladeshGeoData copyWith({
    List<Division>? divisions,
  }) {
    return BangladeshGeoData(
      divisions: divisions ?? this.divisions,
    );
  }
}

