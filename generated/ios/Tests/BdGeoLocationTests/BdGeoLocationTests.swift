import XCTest
@testable import BdGeoLocation

final class BdGeoLocationTests: XCTestCase {

    // MARK: - Division Model Tests
    func testDivisionCreation() {
        let division = Division(
            id: "30",
            name: "Dhaka",
            nameBn: "ঢাকা",
            districts: nil
        )

        XCTAssertEqual(division.id, "30")
        XCTAssertEqual(division.name, "Dhaka")
        XCTAssertEqual(division.nameBn, "ঢাকা")
        XCTAssertNil(division.districts)
    }

    func testDivisionJSONDecoding() {
        let json = """
        {
            "id": "30",
            "name": "Dhaka",
            "nameBn": "ঢাকা",
            "districts": [
                {
                    "id": "26",
                    "name": "Dhaka",
                    "nameBn": "ঢাকা"
                }
            ]
        }
        """.data(using: .utf8)!

        do {
            let division = try JSONDecoder().decode(Division.self, from: json)
            XCTAssertEqual(division.id, "30")
            XCTAssertEqual(division.name, "Dhaka")
            XCTAssertNotNil(division.districts)
            XCTAssertEqual(division.districts?.count, 1)
        } catch {
            XCTFail("Failed to decode Division: \(error)")
        }
    }

    func testDivisionJSONEncoding() {
        let division = Division(
            id: "30",
            name: "Dhaka",
            nameBn: "ঢাকা",
            districts: [
                District(id: "26", name: "Dhaka", nameBn: "ঢাকা")
            ]
        )

        do {
            let jsonData = try JSONEncoder().encode(division)
            let json = try JSONSerialization.jsonObject(with: jsonData) as! [String: Any]

            XCTAssertEqual(json["id"] as? String, "30")
            XCTAssertEqual(json["name"] as? String, "Dhaka")
            XCTAssertNotNil(json["districts"])
        } catch {
            XCTFail("Failed to encode Division: \(error)")
        }
    }

    // MARK: - District Model Tests
    func testDistrictCreation() {
        let district = District(
            id: "26",
            name: "Dhaka",
            nameBn: "ঢাকা",
            upazilas: nil,
            cityCorporations: nil
        )

        XCTAssertEqual(district.id, "26")
        XCTAssertEqual(district.name, "Dhaka")
        XCTAssertNil(district.upazilas)
        XCTAssertNil(district.cityCorporations)
    }

    // MARK: - BangladeshGeoData Helper Tests
    func testGetAllDivisions() {
        let geoData = BangladeshGeoData(
            divisions: [
                Division(id: "30", name: "Dhaka", nameBn: "ঢাকা"),
                Division(id: "20", name: "Chittagong", nameBn: "চট্টগ্রাম")
            ]
        )

        let divisions = geoData.getAllDivisions()

        XCTAssertEqual(divisions.count, 2)
        XCTAssertEqual(divisions[0].name, "Dhaka")
        XCTAssertEqual(divisions[1].name, "Chittagong")
    }

    func testGetDistrictsByDivision() {
        let geoData = BangladeshGeoData(
            divisions: [
                Division(
                    id: "30",
                    name: "Dhaka",
                    nameBn: "ঢাকা",
                    districts: [
                        District(id: "26", name: "Dhaka", nameBn: "ঢাকা"),
                        District(id: "27", name: "Gazipur", nameBn: "গাজীপুর")
                    ]
                )
            ]
        )

        let districts = geoData.getDistricts(divisionId: "30")

        XCTAssertEqual(districts.count, 2)
        XCTAssertEqual(districts[0].name, "Dhaka")
        XCTAssertEqual(districts[1].name, "Gazipur")
    }

    func testGetDistrictsByDivisionNotFound() {
        let geoData = BangladeshGeoData(
            divisions: [
                Division(id: "30", name: "Dhaka", nameBn: "ঢাকা")
            ]
        )

        let districts = geoData.getDistricts(divisionId: "99")

        XCTAssertEqual(districts.count, 0)
    }

    func testSearchLocations() {
        let geoData = BangladeshGeoData(
            divisions: [
                Division(
                    id: "30",
                    name: "Dhaka",
                    nameBn: "ঢাকা",
                    districts: [
                        District(id: "26", name: "Dhaka", nameBn: "ঢাকা")
                    ]
                ),
                Division(id: "20", name: "Chittagong", nameBn: "চট্টগ্রাম")
            ]
        )

        let results = geoData.search(searchTerm: "Dhaka")

        XCTAssertEqual(results.divisions.count, 1)
        XCTAssertEqual(results.districts.count, 1)
        XCTAssertEqual(results.divisions[0].name, "Dhaka")
    }

    func testSearchWithBengaliText() {
        let geoData = BangladeshGeoData(
            divisions: [
                Division(id: "30", name: "Dhaka", nameBn: "ঢাকা"),
                Division(id: "20", name: "Chittagong", nameBn: "চট্টগ্রাম")
            ]
        )

        let results = geoData.search(searchTerm: "ঢাকা")

        XCTAssertEqual(results.divisions.count, 1)
        XCTAssertEqual(results.divisions[0].id, "30")
    }

    // MARK: - Upazila Tests
    func testGetUpazilas() {
        let geoData = BangladeshGeoData(
            divisions: [
                Division(
                    id: "30",
                    name: "Dhaka",
                    nameBn: "ঢাকা",
                    districts: [
                        District(
                            id: "26",
                            name: "Dhaka",
                            nameBn: "ঢাকা",
                            upazilas: [
                                Upazila(id: "55", name: "Dhaka", nameBn: "ঢাকা"),
                                Upazila(id: "56", name: "Savar", nameBn: "সাভার")
                            ]
                        )
                    ]
                )
            ]
        )

        let upazilas = geoData.getUpazilas(divisionId: "30", districtId: "26")

        XCTAssertEqual(upazilas.count, 2)
        XCTAssertEqual(upazilas[0].name, "Dhaka")
        XCTAssertEqual(upazilas[1].name, "Savar")
    }

    // MARK: - Union Tests
    func testGetUnions() {
        let geoData = BangladeshGeoData(
            divisions: [
                Division(
                    id: "30",
                    name: "Dhaka",
                    nameBn: "ঢাকা",
                    districts: [
                        District(
                            id: "26",
                            name: "Dhaka",
                            nameBn: "ঢাকা",
                            upazilas: [
                                Upazila(
                                    id: "55",
                                    name: "Dhaka",
                                    nameBn: "ঢাকা",
                                    unions: [
                                        Union(id: "100", name: "Union 1", nameBn: "ইউনিয়ন ১"),
                                        Union(id: "101", name: "Union 2", nameBn: "ইউনিয়ন ২")
                                    ]
                                )
                            ]
                        )
                    ]
                )
            ]
        )

        let unions = geoData.getUnions(divisionId: "30", districtId: "26", upazilaId: "55")

        XCTAssertEqual(unions.count, 2)
        XCTAssertEqual(unions[0].name, "Union 1")
        XCTAssertEqual(unions[1].name, "Union 2")
    }

    // MARK: - City Corporation Tests
    func testGetCityCorporations() {
        let geoData = BangladeshGeoData(
            divisions: [
                Division(
                    id: "30",
                    name: "Dhaka",
                    nameBn: "ঢাকা",
                    districts: [
                        District(
                            id: "26",
                            name: "Dhaka",
                            nameBn: "ঢাকা",
                            cityCorporations: [
                                CityCorporation(id: "200", name: "Dhaka South", nameBn: "ঢাকা দক্ষিণ"),
                                CityCorporation(id: "201", name: "Dhaka North", nameBn: "ঢাকা উত্তর")
                            ]
                        )
                    ]
                )
            ]
        )

        let cityCorps = geoData.getCityCorporations(divisionId: "30", districtId: "26")

        XCTAssertEqual(cityCorps.count, 2)
        XCTAssertEqual(cityCorps[0].name, "Dhaka South")
        XCTAssertEqual(cityCorps[1].name, "Dhaka North")
    }
}
