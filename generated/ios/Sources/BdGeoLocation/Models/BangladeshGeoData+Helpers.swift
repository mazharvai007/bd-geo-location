//
//  BangladeshGeoData+Helpers.swift
//  BdGeoLocation
//
//  Generated from bd-geo-location package
//

import Foundation

// MARK: - BangladeshGeoData Helpers
public extension BangladeshGeoData {

    /// Load Bangladesh geo data from JSON
    static func load(from jsonData: Data) throws -> BangladeshGeoData {
        return try JSONDecoder().decode(BangladeshGeoData.self, from: jsonData)
    }

    /// Get all divisions
    func getAllDivisions() -> [Division] {
        return divisions
    }

    /// Find districts by division ID
    func getDistricts(divisionId: String) -> [District] {
        guard let division = divisions.first(where: { $0.id == divisionId }) else {
            return []
        }
        return division.districts ?? []
    }

    /// Find upazilas by district and division IDs
    func getUpazilas(divisionId: String, districtId: String) -> [Upazila] {
        let districts = getDistricts(divisionId: divisionId)
        guard let district = districts.first(where: { $0.id == districtId }) else {
            return []
        }
        return district.upazilas ?? []
    }

    /// Find unions by upazila, district, and division IDs
    func getUnions(divisionId: String, districtId: String, upazilaId: String) -> [Union] {
        let upazilas = getUpazilas(divisionId: divisionId, districtId: districtId)
        guard let upazila = upazilas.first(where: { $0.id == upazilaId }) else {
            return []
        }
        return upazila.unions ?? []
    }

    /// Find pourosovas by upazila, district, and division IDs
    func getPourosovas(divisionId: String, districtId: String, upazilaId: String) -> [Pourosova] {
        let upazilas = getUpazilas(divisionId: divisionId, districtId: districtId)
        guard let upazila = upazilas.first(where: { $0.id == upazilaId }) else {
            return []
        }
        return upazila.pourosovas ?? []
    }

    /// Find city corporations by district and division IDs
    func getCityCorporations(divisionId: String, districtId: String) -> [CityCorporation] {
        let districts = getDistricts(divisionId: divisionId)
        guard let district = districts.first(where: { $0.id == districtId }) else {
            return []
        }
        return district.cityCorporations ?? []
    }

    /// Search results structure
    struct SearchResults {
        public var divisions: [Division] = []
        public var districts: [District] = []
        public var upazilas: [Upazila] = []
        public var unions: [Union] = []
        public var pourosovas: [Pourosova] = []
        public var cityCorporations: [CityCorporation] = []
    }

    /// Search locations by name (with input sanitization)
    func search(searchTerm: String) -> SearchResults {
        // Sanitize input - prevent DoS attacks
        let sanitizedTerm = String(searchTerm.prefix(100))
        let term = sanitizedTerm.lowercased()
        var results = SearchResults()

        for division in divisions {
            // Check division
            if division.name.lowercased().contains(term) || division.nameBn.contains(sanitizedTerm) {
                results.divisions.append(division)
            }

            // Check districts
            if let districts = division.districts {
                for district in districts {
                    if district.name.lowercased().contains(term) || district.nameBn.contains(sanitizedTerm) {
                        results.districts.append(district)
                    }

                    // Check upazilas
                    if let upazilas = district.upazilas {
                        for upazila in upazilas {
                            if upazila.name.lowercased().contains(term) || upazila.nameBn.contains(searchTerm) {
                                results.upazilas.append(upazila)
                            }

                            // Check unions
                            if let unions = upazila.unions {
                                for union in unions {
                                    if union.name.lowercased().contains(term) || union.nameBn.contains(searchTerm) {
                                        results.unions.append(union)
                                    }
                                }
                            }

                            // Check pourosovas
                            if let pourosovas = upazila.pourosovas {
                                for pourosova in pourosovas {
                                    if pourosova.name.lowercased().contains(term) || pourosova.nameBn.contains(searchTerm) {
                                        results.pourosovas.append(pourosova)
                                    }
                                }
                            }
                        }
                    }

                    // Check city corporations
                    if let cityCorporations = district.cityCorporations {
                        for cityCorp in cityCorporations {
                            if cityCorp.name.lowercased().contains(term) || cityCorp.nameBn.contains(searchTerm) {
                                results.cityCorporations.append(cityCorp)
                            }
                        }
                    }
                }
            }
        }

        return results
    }

    /// Get location by ID and type
    func getLocationById(id: String, type: LocationType) -> Any? {
        switch type {
        case .division:
            return divisions.first(where: { $0.id == id })
        case .district:
            for division in divisions {
                if let district = division.districts?.first(where: { $0.id == id }) {
                    return district
                }
            }
            return nil
        case .upazila:
            for division in divisions {
                if let districts = division.districts {
                    for district in districts {
                        if let upazila = district.upazilas?.first(where: { $0.id == id }) {
                            return upazila
                        }
                    }
                }
            }
            return nil
        case .union:
            for division in divisions {
                if let districts = division.districts {
                    for district in districts {
                        if let upazilas = district.upazilas {
                            for upazila in upazilas {
                                if let union = upazila.unions?.first(where: { $0.id == id }) {
                                    return union
                                }
                            }
                        }
                    }
                }
            }
            return nil
        case .pourosova:
            for division in divisions {
                if let districts = division.districts {
                    for district in districts {
                        if let upazilas = district.upazilas {
                            for upazila in upazilas {
                                if let pourosova = upazila.pourosovas?.first(where: { $0.id == id }) {
                                    return pourosova
                                }
                            }
                        }
                    }
                }
            }
            return nil
        case .cityCorporation:
            for division in divisions {
                if let districts = division.districts {
                    for district in districts {
                        if let cityCorp = district.cityCorporations?.first(where: { $0.id == id }) {
                            return cityCorp
                        }
                    }
                }
            }
            return nil
        }
    }
}

// MARK: - Location Type
public enum LocationType {
    case division
    case district
    case upazila
    case union
    case pourosova
    case cityCorporation
}
