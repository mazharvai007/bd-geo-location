/**
 * Represents a Village in Bangladesh
 */
export interface Village {
  id: string;
  name: string;
  nameBn: string;
}

/**
 * Represents a Union Council (lowest rural administrative unit)
 */
export interface Union {
  id: string;
  name: string;
  nameBn: string;
  villages?: Village[];
}

/**
 * Represents a Pourosova (Municipality)
 */
export interface Pourosova {
  id: string;
  name: string;
  nameBn: string;
  villages?: Village[];
}

/**
 * Represents an Upazila (Sub-district) or Thana
 */
export interface Upazila {
  id: string;
  name: string;
  nameBn: string;
  unions?: Union[];
  pourosovas?: Pourosova[];
}

/**
 * Represents a City Corporation
 */
export interface CityCorporation {
  id: string;
  name: string;
  nameBn: string;
  thanas?: Upazila[];
}

/**
 * Represents a District (Zila)
 */
export interface District {
  id: string;
  name: string;
  nameBn: string;
  upazilas?: Upazila[];
  cityCorporations?: CityCorporation[];
}

/**
 * Represents a Division (primary administrative division)
 */
export interface Division {
  id: string;
  name: string;
  nameBn: string;
  districts?: District[];
}

/**
 * Complete geographical hierarchy of Bangladesh
 */
export interface BangladeshGeoData {
  divisions: Division[];
}

/**
 * Filter options for querying geographical data
 */
export interface FilterOptions {
  language?: 'en' | 'bn';
  searchTerm?: string;
}

/**
 * Geographic location response
 */
export type GeoLocation = Division | District | Upazila | Union | Pourosova | CityCorporation;

/**
 * Geographic level type
 */
export type GeoLevel = 'division' | 'district' | 'upazila' | 'thana' | 'union' | 'pourosova' | 'cityCorporation' | 'village';
