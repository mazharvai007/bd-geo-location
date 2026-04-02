/// Village model
public struct Village: Codable, Sendable {
  public enum CodingKeys: String, CodingKey {
    case id = "id"
    case name = "name"
    case nameBn = "nameBn"
  }

  public let id: String
  public let name: String
  public let nameBn: String

  public init(
    id: String,
    name: String,
    nameBn: String
  ) {
    self.id = id
    self.name = name
    self.nameBn = nameBn
  }
}

