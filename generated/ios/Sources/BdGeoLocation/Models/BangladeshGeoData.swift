/// BangladeshGeoData model
public struct BangladeshGeoData: Codable, Sendable {
  public enum CodingKeys: String, CodingKey {
    case divisions = "divisions"
  }

  public let divisions: [Division]

  public init(
    divisions: [Division]
  ) {
    self.divisions = divisions
  }
}

