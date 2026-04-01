import bangladeshJson from '../data/bangladesh.json';
import {
  Division,
  District,
  Upazila,
  Union,
  Pourosova,
  CityCorporation,
  Village,
  BangladeshGeoData,
} from '../types';

// Type assertion for JSON data
const bangladeshData = bangladeshJson as BangladeshGeoData;

/**
 * Get all divisions
 */
export function getAllDivisions(): Division[] {
  return bangladeshData.divisions;
}

/**
 * Get a division by ID
 */
export function getDivisionById(id: string): Division | undefined {
  return bangladeshData.divisions.find((division) => division.id === id);
}

/**
 * Get a division by name (English or Bengali)
 */
export function getDivisionByName(name: string): Division | undefined {
  return bangladeshData.divisions.find(
    (division) => division.name === name || division.nameBn === name
  );
}

/**
 * Get all districts in a division
 */
export function getDistrictsByDivision(divisionId: string): District[] {
  const division = getDivisionById(divisionId);
  return division?.districts || [];
}

/**
 * Get a district by ID
 */
export function getDistrictById(id: string, divisionId?: string): District | undefined {
  if (divisionId) {
    const division = getDivisionById(divisionId);
    return division?.districts?.find((district) => district.id === id);
  }

  for (const division of bangladeshData.divisions) {
    const district = division.districts?.find((d) => d.id === id);
    if (district) return district;
  }
  return undefined;
}

/**
 * Get a district by name
 */
export function getDistrictByName(name: string): District | undefined {
  for (const division of bangladeshData.divisions) {
    const district = division.districts?.find(
      (d) => d.name === name || d.nameBn === name
    );
    if (district) return district;
  }
  return undefined;
}

/**
 * Get all upazilas in a district
 */
export function getUpazilasByDistrict(districtId: string): Upazila[] {
  const district = getDistrictById(districtId);
  return district?.upazilas || [];
}

/**
 * Get an upazila by ID
 */
export function getUpazilaById(id: string, districtId?: string): Upazila | undefined {
  if (districtId) {
    const district = getDistrictById(districtId);
    return district?.upazilas?.find((upazila) => upazila.id === id);
  }

  for (const division of bangladeshData.divisions) {
    for (const district of division.districts || []) {
      const upazila = district.upazilas?.find((u) => u.id === id);
      if (upazila) return upazila;
    }
  }
  return undefined;
}

/**
 * Get an upazila by name
 */
export function getUpazilaByName(name: string): Upazila | undefined {
  for (const division of bangladeshData.divisions) {
    for (const district of division.districts || []) {
      const upazila = district.upazilas?.find(
        (u) => u.name === name || u.nameBn === name
      );
      if (upazila) return upazila;
    }
  }
  return undefined;
}

/**
 * Get all unions in an upazila
 */
export function getUnionsByUpazila(upazilaId: string, districtId: string): Union[] {
  const upazila = getUpazilaById(upazilaId, districtId);
  return upazila?.unions || [];
}

/**
 * Get all pourosovas in an upazila
 */
export function getPourosovasByUpazila(upazilaId: string, districtId: string): Pourosova[] {
  const upazila = getUpazilaById(upazilaId, districtId);
  return upazila?.pourosovas || [];
}

/**
 * Get all city corporations in a district
 */
export function getCityCorporationsByDistrict(districtId: string): CityCorporation[] {
  const district = getDistrictById(districtId);
  return district?.cityCorporations || [];
}

/**
 * Get all villages in a union
 */
export function getVillagesByUnion(
  unionId: string,
  upazilaId: string,
  districtId: string
): Village[] {
  const unions = getUnionsByUpazila(upazilaId, districtId);
  const union = unions.find((u) => u.id === unionId);
  return union?.villages || [];
}

/**
 * Get all villages in a pourosova
 */
export function getVillagesByPourosova(
  pourosovaId: string,
  upazilaId: string,
  districtId: string
): Village[] {
  const pourosovas = getPourosovasByUpazila(upazilaId, districtId);
  const pourosova = pourosovas.find((p) => p.id === pourosovaId);
  return pourosova?.villages || [];
}

/**
 * Search for locations by name
 */
export function searchByName(searchTerm: string): {
  divisions: Division[];
  districts: District[];
  upazilas: Upazila[];
  unions: Union[];
  pourosovas: Pourosova[];
  cityCorporations: CityCorporation[];
} {
  const term = searchTerm.toLowerCase();

  const divisions = bangladeshData.divisions.filter(
    (d) => d.name.toLowerCase().includes(term) || d.nameBn.includes(searchTerm)
  );

  const districts: District[] = [];
  const upazilas: Upazila[] = [];
  const unions: Union[] = [];
  const pourosovas: Pourosova[] = [];
  const cityCorporations: CityCorporation[] = [];

  for (const division of bangladeshData.divisions) {
    if (division.districts) {
      for (const district of division.districts) {
        if (
          district.name.toLowerCase().includes(term) ||
          district.nameBn.includes(searchTerm)
        ) {
          districts.push(district);
        }

        if (district.upazilas) {
          for (const upazila of district.upazilas) {
            if (
              upazila.name.toLowerCase().includes(term) ||
              upazila.nameBn.includes(searchTerm)
            ) {
              upazilas.push(upazila);
            }

            if (upazila.unions) {
              for (const union of upazila.unions) {
                if (
                  union.name.toLowerCase().includes(term) ||
                  union.nameBn.includes(searchTerm)
                ) {
                  unions.push(union);
                }
              }
            }

            if (upazila.pourosovas) {
              for (const pourosova of upazila.pourosovas) {
                if (
                  pourosova.name.toLowerCase().includes(term) ||
                  pourosova.nameBn.includes(searchTerm)
                ) {
                  pourosovas.push(pourosova);
                }
              }
            }
          }
        }

        if (district.cityCorporations) {
          for (const cityCorp of district.cityCorporations) {
            if (
              cityCorp.name.toLowerCase().includes(term) ||
              cityCorp.nameBn.includes(searchTerm)
            ) {
              cityCorporations.push(cityCorp);
            }
          }
        }
      }
    }
  }

  return {
    divisions,
    districts,
    upazilas,
    unions,
    pourosovas,
    cityCorporations,
  };
}

/**
 * Get geographical hierarchy for a location
 * Returns the complete path from division to the specified location
 */
export function getGeoHierarchy(locationId: string, level: 'division' | 'district' | 'upazila'): {
  division: Division;
  district?: District;
  upazila?: Upazila;
} | null {
  if (level === 'division') {
    const division = getDivisionById(locationId);
    if (division) {
      return { division };
    }
  }

  if (level === 'district') {
    for (const division of bangladeshData.divisions) {
      const district = division.districts?.find((d) => d.id === locationId);
      if (district) {
        return { division, district };
      }
    }
  }

  if (level === 'upazila') {
    for (const division of bangladeshData.divisions) {
      for (const district of division.districts || []) {
        const upazila = district.upazilas?.find((u) => u.id === locationId);
        if (upazila) {
          return { division, district, upazila };
        }
      }
    }
  }

  return null;
}
