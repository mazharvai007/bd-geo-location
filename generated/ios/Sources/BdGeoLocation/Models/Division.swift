/// Division model
public struct Division: Codable, Sendable {
  public enum CodingKeys: String, CodingKey {
    case id = "id"
    case name = "name"
    case nameBn = "nameBn"
    case districts = "districts"
  }

  public let id: String
  public let name: String
  public let nameBn: String
  public let districts: [District]?

  public init(
    id: String,
    name: String,
    nameBn: String,
    districts: [District]?
  ) {
    self.id = id
    self.name = name
    self.nameBn = nameBn
    self.districts = districts
  }
}

