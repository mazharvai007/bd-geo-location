/// Union model
public struct Union: Codable, Sendable {
  public enum CodingKeys: String, CodingKey {
    case id = "id"
    case name = "name"
    case nameBn = "nameBn"
    case villages = "villages"
  }

  public let id: String
  public let name: String
  public let nameBn: String
  public let villages: [Village]?

  public init(
    id: String,
    name: String,
    nameBn: String,
    villages: [Village]?
  ) {
    self.id = id
    self.name = name
    self.nameBn = nameBn
    self.villages = villages
  }
}

