// App Constants - All hardcoded values in one place
export const APP_NAME = 'Ramadan Companion';
export const APP_VERSION = '1.0.0';

// API Endpoints
export const API = {
  // Quran API
  QURAN_API: 'https://api.alquran.cloud/v1',
  QURAN_AUDIO: 'https://cdn.islamic.network/quran/audio',
  
  // Adhan Audio
  ADHAN_URL: 'https://www.islamcan.com/audio/adhan/azan1.mp3',
};

// Storage Keys
export const STORAGE_KEYS = {
  SETTINGS: '@ramadan_companion/settings',
  APP_LOCK: '@ramadan_companion/app_lock_config',
  LAST_LOCATION: '@ramadan_companion/last_location',
  BOOKMARKS: '@ramadan_companion/bookmarks',
  HISTORY: '@ramadan_companion/history',
};

// Ramadan Dates (approximate - actual depends on moon sighting)
export const RAMADAN_DATES = {
  2024: { start: '2024-03-10', end: '2024-04-09' },
  2025: { start: '2025-02-28', end: '2025-03-30' },
  2026: { start: '2026-02-17', end: '2026-03-19' },
  2027: { start: '2027-02-06', end: '2027-03-08' },
  2028: { start: '2028-01-26', end: '2028-02-24' },
};

// Prayer Names
export const PRAYER_NAMES = {
  fajr: { en: 'Fajr', ar: 'الفجر', icon: 'moon-outline' },
  sunrise: { en: 'Sunrise', ar: 'الشروق', icon: 'sunny-outline' },
  dhuhr: { en: 'Dhuhr', ar: 'الظهر', icon: 'sunny' },
  asr: { en: 'Asr', ar: 'العصر', icon: 'partly-sunny-outline' },
  maghrib: { en: 'Maghrib', ar: 'المغرب', icon: 'moon' },
  isha: { en: 'Isha', ar: 'العشاء', icon: 'cloudy-night-outline' },
};

// Greetings
export const GREETINGS = {
  morning: 'Good Morning',
  afternoon: 'Good Afternoon',
  evening: 'Good Evening',
  ramadan: 'Ramadan Mubarak',
};

// Error Messages
export const ERROR_MESSAGES = {
  LOCATION_PERMISSION: 'Location permission is required to show prayer times.',
  NETWORK_ERROR: 'Please check your internet connection.',
  LOADING_ERROR: 'Failed to load data. Please try again.',
  GENERAL: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SETTINGS_SAVED: 'Settings saved successfully.',
  LOCATION_UPDATED: 'Location updated successfully.',
};

export default {
  APP_NAME,
  APP_VERSION,
  API,
  STORAGE_KEYS,
  RAMADAN_DATES,
  PRAYER_NAMES,
  GREETINGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
