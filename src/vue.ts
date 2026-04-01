import { computed, Ref, ref } from 'vue';
import bangladeshJson from './data/bangladesh.json';
import {
  Division,
  District,
  Upazila,
  Union,
  Pourosova,
  CityCorporation,
  Village,
  BangladeshGeoData,
} from './types';

// Type assertion for JSON data
const bangladeshData = bangladeshJson as BangladeshGeoData;

/**
 * Vue Composable: Get all divisions
 */
export function useDivisions() {
  const divisions = computed(() => bangladeshData.divisions);

  return {
    divisions,
  };
}

/**
 * Vue Composable: Get districts by division ID
 */
export function useDistricts(divisionId: Ref<string | null> | string | null = null) {
  const districts = computed(() => {
    if (!divisionId) return [];
    const id = typeof divisionId === 'string' ? divisionId : divisionId.value;
    if (!id) return [];

    const division = bangladeshData.divisions.find((d) => d.id === id);
    return division?.districts || [];
  });

  return {
    districts,
  };
}

/**
 * Vue Composable: Get upazilas by district and division IDs
 */
export function useUpazilas(
  districtId: Ref<string | null> | string | null = null,
  divisionId: Ref<string | null> | string | null = null
) {
  const upazilas = computed(() => {
    if (!districtId || !divisionId) return [];
    const dId = typeof districtId === 'string' ? districtId : districtId.value;
    const divId = typeof divisionId === 'string' ? divisionId : divisionId.value;
    if (!dId || !divId) return [];

    const division = bangladeshData.divisions.find((d) => d.id === divId);
    const district = division?.districts?.find((dist) => dist.id === dId);
    return district?.upazilas || [];
  });

  return {
    upazilas,
  };
}

/**
 * Vue Composable: Get unions by upazila, district, and division IDs
 */
export function useUnions(
  upazilaId: Ref<string | null> | string | null = null,
  districtId: Ref<string | null> | string | null = null,
  divisionId: Ref<string | null> | string | null = null
) {
  const unions = computed(() => {
    if (!upazilaId || !districtId || !divisionId) return [];
    const uId = typeof upazilaId === 'string' ? upazilaId : upazilaId.value;
    const dId = typeof districtId === 'string' ? districtId : districtId.value;
    const divId = typeof divisionId === 'string' ? divisionId : divisionId.value;
    if (!uId || !dId || !divId) return [];

    const division = bangladeshData.divisions.find((d) => d.id === divId);
    const district = division?.districts?.find((dist) => dist.id === dId);
    const upazila = district?.upazilas?.find((u) => u.id === uId);
    return upazila?.unions || [];
  });

  return {
    unions,
  };
}

/**
 * Vue Composable: Get pourosovas by upazila, district, and division IDs
 */
export function usePourosovas(
  upazilaId: Ref<string | null> | string | null = null,
  districtId: Ref<string | null> | string | null = null,
  divisionId: Ref<string | null> | string | null = null
) {
  const pourosovas = computed(() => {
    if (!upazilaId || !districtId || !divisionId) return [];
    const uId = typeof upazilaId === 'string' ? upazilaId : upazilaId.value;
    const dId = typeof districtId === 'string' ? districtId : districtId.value;
    const divId = typeof divisionId === 'string' ? divisionId : divisionId.value;
    if (!uId || !dId || !divId) return [];

    const division = bangladeshData.divisions.find((d) => d.id === divId);
    const district = division?.districts?.find((dist) => dist.id === dId);
    const upazila = district?.upazilas?.find((u) => u.id === uId);
    return upazila?.pourosovas || [];
  });

  return {
    pourosovas,
  };
}

/**
 * Vue Composable: Get city corporations by district and division IDs
 */
export function useCityCorporations(
  districtId: Ref<string | null> | string | null = null,
  divisionId: Ref<string | null> | string | null = null
) {
  const cityCorporations = computed(() => {
    if (!districtId || !divisionId) return [];
    const dId = typeof districtId === 'string' ? districtId : districtId.value;
    const divId = typeof divisionId === 'string' ? divisionId : divisionId.value;
    if (!dId || !divId) return [];

    const division = bangladeshData.divisions.find((d) => d.id === divId);
    const district = division?.districts?.find((dist) => dist.id === dId);
    return district?.cityCorporations || [];
  });

  return {
    cityCorporations,
  };
}

/**
 * Vue Composable: Search locations by name
 */
export function useSearch(searchTerm: Ref<string> | string = '') {
  const results = computed(() => {
    const term = typeof searchTerm === 'string' ? searchTerm : searchTerm.value;
    if (!term) {
      return {
        divisions: [] as Division[],
        districts: [] as District[],
        upazilas: [] as Upazila[],
        unions: [] as Union[],
        pourosovas: [] as Pourosova[],
        cityCorporations: [] as CityCorporation[],
      };
    }

    const searchResults = {
      divisions: [] as Division[],
      districts: [] as District[],
      upazilas: [] as Upazila[],
      unions: [] as Union[],
      pourosovas: [] as Pourosova[],
      cityCorporations: [] as CityCorporation[],
    };

    const lowerTerm = term.toLowerCase();

    for (const division of bangladeshData.divisions) {
      // Check division
      if (
        division.name.toLowerCase().includes(lowerTerm) ||
        division.nameBn.includes(term)
      ) {
        searchResults.divisions.push(division);
      }

      // Check districts
      if (division.districts) {
        for (const district of division.districts) {
          if (
            district.name.toLowerCase().includes(lowerTerm) ||
            district.nameBn.includes(term)
          ) {
            searchResults.districts.push(district);
          }

          // Check upazilas
          if (district.upazilas) {
            for (const upazila of district.upazilas) {
              if (
                upazila.name.toLowerCase().includes(lowerTerm) ||
                upazila.nameBn.includes(term)
              ) {
                searchResults.upazilas.push(upazila);
              }

              // Check unions
              if (upazila.unions) {
                for (const union of upazila.unions) {
                  if (
                    union.name.toLowerCase().includes(lowerTerm) ||
                    union.nameBn.includes(term)
                  ) {
                    searchResults.unions.push(union);
                  }
                }
              }

              // Check pourosovas
              if (upazila.pourosovas) {
                for (const pourosova of upazila.pourosovas) {
                  if (
                    pourosova.name.toLowerCase().includes(lowerTerm) ||
                    pourosova.nameBn.includes(term)
                  ) {
                    searchResults.pourosovas.push(pourosova);
                  }
                }
              }
            }
          }

          // Check city corporations
          if (district.cityCorporations) {
            for (const cityCorp of district.cityCorporations) {
              if (
                cityCorp.name.toLowerCase().includes(lowerTerm) ||
                cityCorp.nameBn.includes(term)
              ) {
                searchResults.cityCorporations.push(cityCorp);
              }
            }
          }
        }
      }
    }

    return searchResults;
  });

  return {
    results,
  };
}

/**
 * Vue Composable: Get location by ID and type
 */
export function useLocationById(
  id: Ref<string | null> | string | null,
  type: Ref<'division' | 'district' | 'upazila' | 'union' | 'pourosova' | 'cityCorporation'> | 'division' | 'district' | 'upazila' | 'union' | 'pourosova' | 'cityCorporation'
) {
  const location = computed(() => {
    const locationId = id === null ? null : typeof id === 'string' ? id : id.value;
    const locationType = type === null ? null : typeof type === 'string' ? type : type.value;

    if (!locationId || !locationType) return null;

    switch (locationType) {
      case 'division':
        return bangladeshData.divisions.find((d) => d.id === locationId) || null;

      case 'district':
        for (const division of bangladeshData.divisions) {
          const district = division.districts?.find((d) => d.id === locationId);
          if (district) return district;
        }
        return null;

      case 'upazila':
        for (const division of bangladeshData.divisions) {
          for (const district of division.districts || []) {
            const upazila = district.upazilas?.find((u) => u.id === locationId);
            if (upazila) return upazila;
          }
        }
        return null;

      case 'union':
        for (const division of bangladeshData.divisions) {
          for (const district of division.districts || []) {
            for (const upazila of district.upazilas || []) {
              const union = upazila.unions?.find((u) => u.id === locationId);
              if (union) return union;
            }
          }
        }
        return null;

      case 'pourosova':
        for (const division of bangladeshData.divisions) {
          for (const district of division.districts || []) {
            for (const upazila of district.upazilas || []) {
              const pourosova = upazila.pourosovas?.find((p) => p.id === locationId);
              if (pourosova) return pourosova;
            }
          }
        }
        return null;

      case 'cityCorporation':
        for (const division of bangladeshData.divisions) {
          for (const district of division.districts || []) {
            const cityCorp = district.cityCorporations?.find((c) => c.id === locationId);
            if (cityCorp) return cityCorp;
          }
        }
        return null;

      default:
        return null;
    }
  });

  return {
    location,
  };
}

// Export types for Vue users
export type {
  Division,
  District,
  Upazila,
  Union,
  Pourosova,
  CityCorporation,
  Village,
  BangladeshGeoData,
  GeoLocation,
  GeoLevel,
  FilterOptions,
} from './types';
