import { useCallback } from 'react';
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
 * React Hook: Get all divisions
 */
export function useDivisions() {
  return bangladeshData.divisions;
}

/**
 * React Hook: Get districts by division ID
 */
export function useDistricts(divisionId: string | null) {
  return useCallback(() => {
    if (!divisionId) return [];
    const division = bangladeshData.divisions.find((d) => d.id === divisionId);
    return division?.districts || [];
  }, [divisionId])();
}

/**
 * React Hook: Get upazilas by district ID
 */
export function useUpazilas(districtId: string | null, divisionId: string | null) {
  return useCallback(() => {
    if (!districtId || !divisionId) return [];
    const division = bangladeshData.divisions.find((d) => d.id === divisionId);
    const district = division?.districts?.find((dist) => dist.id === districtId);
    return district?.upazilas || [];
  }, [districtId, divisionId])();
}

/**
 * React Hook: Get unions by upazila ID
 */
export function useUnions(
  upazilaId: string | null,
  districtId: string | null,
  divisionId: string | null
) {
  return useCallback(() => {
    if (!upazilaId || !districtId || !divisionId) return [];
    const division = bangladeshData.divisions.find((d) => d.id === divisionId);
    const district = division?.districts?.find((dist) => dist.id === districtId);
    const upazila = district?.upazilas?.find((u) => u.id === upazilaId);
    return upazila?.unions || [];
  }, [upazilaId, districtId, divisionId])();
}

/**
 * React Hook: Get pourosovas by upazila ID
 */
export function usePourosovas(
  upazilaId: string | null,
  districtId: string | null,
  divisionId: string | null
) {
  return useCallback(() => {
    if (!upazilaId || !districtId || !divisionId) return [];
    const division = bangladeshData.divisions.find((d) => d.id === divisionId);
    const district = division?.districts?.find((dist) => dist.id === districtId);
    const upazila = district?.upazilas?.find((u) => u.id === upazilaId);
    return upazila?.pourosovas || [];
  }, [upazilaId, districtId, divisionId])();
}

/**
 * React Hook: Get city corporations by district ID
 */
export function useCityCorporations(districtId: string | null, divisionId: string | null) {
  return useCallback(() => {
    if (!districtId || !divisionId) return [];
    const division = bangladeshData.divisions.find((d) => d.id === divisionId);
    const district = division?.districts?.find((dist) => dist.id === districtId);
    return district?.cityCorporations || [];
  }, [districtId, divisionId])();
}

/**
 * React Hook: Search locations by name
 */
export function useSearch(searchTerm: string) {
  return useCallback(() => {
    if (!searchTerm) {
      return {
        divisions: [],
        districts: [],
        upazilas: [],
        unions: [],
        pourosovas: [],
        cityCorporations: [],
      };
    }

    const term = searchTerm.toLowerCase();
    const results = {
      divisions: [] as Division[],
      districts: [] as District[],
      upazilas: [] as Upazila[],
      unions: [] as Union[],
      pourosovas: [] as Pourosova[],
      cityCorporations: [] as CityCorporation[],
    };

    for (const division of bangladeshData.divisions) {
      // Check division
      if (
        division.name.toLowerCase().includes(term) ||
        division.nameBn.includes(searchTerm)
      ) {
        results.divisions.push(division);
      }

      // Check districts
      if (division.districts) {
        for (const district of division.districts) {
          if (
            district.name.toLowerCase().includes(term) ||
            district.nameBn.includes(searchTerm)
          ) {
            results.districts.push(district);
          }

          // Check upazilas
          if (district.upazilas) {
            for (const upazila of district.upazilas) {
              if (
                upazila.name.toLowerCase().includes(term) ||
                upazila.nameBn.includes(searchTerm)
              ) {
                results.upazilas.push(upazila);
              }

              // Check unions
              if (upazila.unions) {
                for (const union of upazila.unions) {
                  if (
                    union.name.toLowerCase().includes(term) ||
                    union.nameBn.includes(searchTerm)
                  ) {
                    results.unions.push(union);
                  }
                }
              }

              // Check pourosovas
              if (upazila.pourosovas) {
                for (const pourosova of upazila.pourosovas) {
                  if (
                    pourosova.name.toLowerCase().includes(term) ||
                    pourosova.nameBn.includes(searchTerm)
                  ) {
                    results.pourosovas.push(pourosova);
                  }
                }
              }
            }
          }

          // Check city corporations
          if (district.cityCorporations) {
            for (const cityCorp of district.cityCorporations) {
              if (
                cityCorp.name.toLowerCase().includes(term) ||
                cityCorp.nameBn.includes(searchTerm)
              ) {
                results.cityCorporations.push(cityCorp);
              }
            }
          }
        }
      }
    }

    return results;
  }, [searchTerm])();
}

/**
 * React Hook: Get location by ID and type
 */
export function useLocationById(
  id: string | null,
  type: 'division' | 'district' | 'upazila' | 'union' | 'pourosova' | 'cityCorporation'
) {
  return useCallback(() => {
    if (!id) return null;

    switch (type) {
      case 'division':
        return bangladeshData.divisions.find((d) => d.id === id) || null;

      case 'district':
        for (const division of bangladeshData.divisions) {
          const district = division.districts?.find((d) => d.id === id);
          if (district) return district;
        }
        return null;

      case 'upazila':
        for (const division of bangladeshData.divisions) {
          for (const district of division.districts || []) {
            const upazila = district.upazilas?.find((u) => u.id === id);
            if (upazila) return upazila;
          }
        }
        return null;

      case 'union':
        for (const division of bangladeshData.divisions) {
          for (const district of division.districts || []) {
            for (const upazila of district.upazilas || []) {
              const union = upazila.unions?.find((u) => u.id === id);
              if (union) return union;
            }
          }
        }
        return null;

      case 'pourosova':
        for (const division of bangladeshData.divisions) {
          for (const district of division.districts || []) {
            for (const upazila of district.upazilas || []) {
              const pourosova = upazila.pourosovas?.find((p) => p.id === id);
              if (pourosova) return pourosova;
            }
          }
        }
        return null;

      case 'cityCorporation':
        for (const division of bangladeshData.divisions) {
          for (const district of division.districts || []) {
            const cityCorp = district.cityCorporations?.find((c) => c.id === id);
            if (cityCorp) return cityCorp;
          }
        }
        return null;

      default:
        return null;
    }
  }, [id, type])();
}

// Export types for React users
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
