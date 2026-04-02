/// Upazila model
public struct Upazila: Codable, Sendable {
  public enum CodingKeys: String, CodingKey {
    case id = "id"
    case name = "name"
    case nameBn = "nameBn"
    case unions = "unions"
    case pourosovas = "pourosovas"
  }

  public let id: String
  public let name: String
  public let nameBn: String
  public let unions: [Union]?
  public let pourosovas: [Pourosova]?

  public init(
    id: String,
    name: String,
    nameBn: String,
    unions: [Union]?,
    pourosovas: [Pourosova]?
  ) {
    self.id = id
    self.name = name
    self.nameBn = nameBn
    self.unions = unions
    self.pourosovas = pourosovas
  }
}

