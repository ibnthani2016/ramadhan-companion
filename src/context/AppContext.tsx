// App Context - Global state management for Ramadan Companion

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import { 
  UserSettings, 
  Location as AppLocation, 
  PrayerTimes, 
  CalculationMethod 
} from '../types';
import { calculatePrayerTimes } from '../services/PrayerTimesService';

// Default settings
const DEFAULT_SETTINGS: UserSettings = {
  calculationMethod: 'MWL',
  asrJuristicMethod: 'standard',
  location: null,
  notifications: {
    fajr: true,
    sunrise: false,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    adhan: true,
    reminder: 15,
  },
  appLock: {
    enabled: false,
    lockedApps: [],
    schedule: null,
    pin: '',
  },
  theme: 'system',
  language: 'en',
};

// Context type
interface AppContextType {
  settings: UserSettings;
  prayerTimes: PrayerTimes | null;
  currentLocation: AppLocation | null;
  isLoading: boolean;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  updateLocation: (location: AppLocation) => Promise<void>;
  refreshPrayerTimes: () => void;
  requestLocationPermission: () => Promise<boolean>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Storage keys
const SETTINGS_STORAGE_KEY = '@ramadan_companion/settings';

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [currentLocation, setCurrentLocation] = useState<AppLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from storage
  useEffect(() => {
    loadSettings();
  }, []);

  // Update prayer times when location or settings change
  useEffect(() => {
    if (currentLocation) {
      refreshPrayerTimes();
    }
  }, [currentLocation, settings.calculationMethod, settings.asrJuristicMethod]);

  // Load settings from AsyncStorage
  const loadSettings = async () => {
    try {
      const settingsJson = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (settingsJson) {
        const savedSettings = JSON.parse(settingsJson) as UserSettings;
        setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });
        if (savedSettings.location) {
          setCurrentLocation(savedSettings.location);
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save settings to AsyncStorage
  const saveSettings = async (newSettings: UserSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  // Update settings
  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    await saveSettings(updatedSettings);
  };

  // Update location
  const updateLocation = async (location: AppLocation) => {
    setCurrentLocation(location);
    await updateSettings({ location });
  };

  // Refresh prayer times
  const refreshPrayerTimes = () => {
    if (currentLocation) {
      const times = calculatePrayerTimes(
        currentLocation,
        new Date(),
        settings.calculationMethod,
        settings.asrJuristicMethod
      );
      setPrayerTimes(times);
    }
  };

  // Request location permission
  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return false;
      }

      const position = await Location.getCurrentPositionAsync({});
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const location: AppLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        city: reverseGeocode[0]?.city || undefined,
        country: reverseGeocode[0]?.country || undefined,
      };

      await updateLocation(location);
      return true;
    } catch (error) {
      console.error('Error getting location:', error);
      return false;
    }
  };

  const value: AppContextType = {
    settings,
    prayerTimes,
    currentLocation,
    isLoading,
    updateSettings,
    updateLocation,
    refreshPrayerTimes,
    requestLocationPermission,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;