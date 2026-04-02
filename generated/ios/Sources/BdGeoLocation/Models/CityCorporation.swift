/// CityCorporation model
public struct CityCorporation: Codable, Sendable {
  public enum CodingKeys: String, CodingKey {
    case id = "id"
    case name = "name"
    case nameBn = "nameBn"
    case thanas = "thanas"
  }

  public let id: String
  public let name: String
  public let nameBn: String
  public let thanas: [Upazila]?

  public init(
    id: String,
    name: String,
    nameBn: String,
    thanas: [Upazila]?
  ) {
    self.id = id
    self.name = name
    self.nameBn = nameBn
    self.thanas = thanas
  }
}

