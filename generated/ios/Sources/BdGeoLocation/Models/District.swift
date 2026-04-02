/// District model
public struct District: Codable, Sendable {
  public enum CodingKeys: String, CodingKey {
    case id = "id"
    case name = "name"
    case nameBn = "nameBn"
    case upazilas = "upazilas"
    case cityCorporations = "cityCorporations"
  }

  public let id: String
  public let name: String
  public let nameBn: String
  public let upazilas: [Upazila]?
  public let cityCorporations: [CityCorporation]?

  public init(
    id: String,
    name: String,
    nameBn: String,
    upazilas: [Upazila]?,
    cityCorporations: [CityCorporation]?
  ) {
    self.id = id
    self.name = name
    self.nameBn = nameBn
    self.upazilas = upazilas
    self.cityCorporations = cityCorporations
  }
}

