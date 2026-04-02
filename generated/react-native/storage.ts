import AsyncStorage from '@react-native-async-storage/async-storage';
import type { BangladeshGeoData } from 'bd-geo-location';

const STORAGE_KEY = '@bd_geo_location';

/**
 * Storage utilities for Bangladesh geo data
 */
export class GeoDataStorage {
  /**
   * Save geo data to AsyncStorage
   */
  static async save(data: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving geo data:', error);
      throw error;
    }
  }

  /**
   * Load geo data from AsyncStorage
   */
  static async load(): Promise<any> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error loading geo data:', error);
      return null;
    }
  }

  /**
   * Remove geo data from AsyncStorage
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing geo data:', error);
      throw error;
    }
  }

  /**
   * Check if geo data exists in AsyncStorage
   */
  static async exists(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      return value !== null;
    } catch (error) {
      console.error('Error checking geo data:', error);
      return false;
    }
  }
}

/**
 * Recent locations storage
 */
export class RecentLocationsStorage {
  private static readonly KEY = '@bd_recent_locations';
  private static readonly MAX_RECENT = 10;

  /**
   * Save a recent location
   */
  static async add(location: {
    division: string;
    district?: string;
    upazila?: string;
  }): Promise<void> {
    try {
      const recent = await this.getAll();
      const filtered = recent.filter(
        (r) => r.division !== location.division
      );
      filtered.unshift(location);
      const limited = filtered.slice(0, this.MAX_RECENT);
      await AsyncStorage.setItem(this.KEY, JSON.stringify(limited));
    } catch (error) {
      console.error('Error saving recent location:', error);
    }
  }

  /**
   * Get all recent locations
   */
  static async getAll(): Promise<
    Array<{
      division: string;
      district?: string;
      upazila?: string;
    }>
  > {
    try {
      const value = await AsyncStorage.getItem(this.KEY);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error loading recent locations:', error);
      return [];
    }
  }

  /**
   * Clear recent locations
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.KEY);
    } catch (error) {
      console.error('Error clearing recent locations:', error);
    }
  }
}
