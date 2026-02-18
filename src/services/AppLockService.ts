// App Lock Service - Manages app locking functionality
// Note: Full app locking requires native modules and special permissions

import { AppLockConfig, LockSchedule } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_LOCK_STORAGE_KEY = '@ramadan_companion/app_lock_config';

// Default configuration
const DEFAULT_CONFIG: AppLockConfig = {
  enabled: false,
  lockedApps: [],
  schedule: null,
  pin: '',
};

// Get current lock configuration
export const getLockConfig = async (): Promise<AppLockConfig> => {
  try {
    const configJson = await AsyncStorage.getItem(APP_LOCK_STORAGE_KEY);
    if (configJson) {
      return JSON.parse(configJson) as AppLockConfig;
    }
  } catch (error) {
    console.error('Error loading app lock config:', error);
  }
  return DEFAULT_CONFIG;
};

// Save lock configuration
export const saveLockConfig = async (config: AppLockConfig): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(APP_LOCK_STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Error saving app lock config:', error);
    return false;
  }
};

// Enable app lock
export const enableAppLock = async (pin: string): Promise<boolean> => {
  const config = await getLockConfig();
  config.enabled = true;
  config.pin = pin;
  return saveLockConfig(config);
};

// Disable app lock
export const disableAppLock = async (): Promise<boolean> => {
  const config = await getLockConfig();
  config.enabled = false;
  return saveLockConfig(config);
};

// Add app to locked list
export const lockApp = async (packageName: string): Promise<boolean> => {
  const config = await getLockConfig();
  if (!config.lockedApps.includes(packageName)) {
    config.lockedApps.push(packageName);
    return saveLockConfig(config);
  }
  return true;
};

// Remove app from locked list
export const unlockApp = async (packageName: string): Promise<boolean> => {
  const config = await getLockConfig();
  config.lockedApps = config.lockedApps.filter(app => app !== packageName);
  return saveLockConfig(config);
};

// Set lock schedule
export const setLockSchedule = async (schedule: LockSchedule): Promise<boolean> => {
  const config = await getLockConfig();
  config.schedule = schedule;
  return saveLockConfig(config);
};

// Check if current time is within lock schedule
export const isWithinLockSchedule = (schedule: LockSchedule | null): boolean => {
  if (!schedule) return false;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentDay = now.getDay();

  switch (schedule.type) {
    case 'always':
      return true;

    case 'scheduled':
      if (!schedule.startTime || !schedule.endTime) return false;
      if (schedule.days && !schedule.days.includes(currentDay)) return false;

      const [startHour, startMin] = schedule.startTime.split(':').map(Number);
      const [endHour, endMin] = schedule.endTime.split(':').map(Number);
      
      const currentMinutes = currentHour * 60 + currentMinute;
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      if (startMinutes <= endMinutes) {
        return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
      } else {
        // Overnight schedule
        return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
      }

    case 'ramadan-hours':
      // During fasting hours (from Fajr to Maghrib)
      // This would need to be integrated with prayer times
      return true;

    default:
      return false;
  }
};

// Verify PIN
export const verifyPin = async (inputPin: string): Promise<boolean> => {
  const config = await getLockConfig();
  return config.pin === inputPin;
};

// Change PIN
export const changePin = async (oldPin: string, newPin: string): Promise<boolean> => {
  const config = await getLockConfig();
  if (config.pin === oldPin) {
    config.pin = newPin;
    return saveLockConfig(config);
  }
  return false;
};

// Get list of installed apps (placeholder - requires native module)
export const getInstalledApps = async (): Promise<{ name: string; packageName: string; icon: string }[]> => {
  // In a real implementation, this would use a native module to get installed apps
  // For now, return a placeholder list of common apps
  return [
    { name: 'Facebook', packageName: 'com.facebook.katana', icon: 'facebook' },
    { name: 'Instagram', packageName: 'com.instagram.android', icon: 'instagram' },
    { name: 'Twitter/X', packageName: 'com.twitter.android', icon: 'twitter' },
    { name: 'TikTok', packageName: 'com.zhiliaoapp.musically', icon: 'tiktok' },
    { name: 'YouTube', packageName: 'com.google.android.youtube', icon: 'youtube' },
    { name: 'Snapchat', packageName: 'com.snapchat.android', icon: 'snapchat' },
    { name: 'WhatsApp', packageName: 'com.whatsapp', icon: 'whatsapp' },
    { name: 'Telegram', packageName: 'org.telegram.messenger', icon: 'telegram' },
    { name: 'Netflix', packageName: 'com.netflix.mediaclient', icon: 'netflix' },
    { name: 'Spotify', packageName: 'com.spotify.music', icon: 'spotify' },
  ];
};

// Check if an app should be locked
export const shouldLockApp = async (packageName: string): Promise<boolean> => {
  const config = await getLockConfig();
  
  if (!config.enabled) return false;
  if (!config.lockedApps.includes(packageName)) return false;
  
  return isWithinLockSchedule(config.schedule);
};

// Quick lock presets for Ramadan
export const RAMADAN_PRESETS = {
  fastingHours: {
    name: 'During Fasting Hours',
    description: 'Lock distracting apps from Fajr to Maghrib',
    schedule: {
      type: 'ramadan-hours' as const,
    },
  },
  allDay: {
    name: 'All Day',
    description: 'Lock apps throughout the entire day',
    schedule: {
      type: 'always' as const,
    },
  },
  custom: {
    name: 'Custom Schedule',
    description: 'Set your own schedule',
    schedule: {
      type: 'scheduled' as const,
      startTime: '05:00',
      endTime: '19:00',
      days: [0, 1, 2, 3, 4, 5, 6], // All days
    },
  },
  weekends: {
    name: 'Weekends Only',
    description: 'Lock apps on Saturday and Sunday',
    schedule: {
      type: 'scheduled' as const,
      startTime: '00:00',
      endTime: '23:59',
      days: [0, 6], // Sunday and Saturday
    },
  },
};

export default {
  getLockConfig,
  saveLockConfig,
  enableAppLock,
  disableAppLock,
  lockApp,
  unlockApp,
  setLockSchedule,
  isWithinLockSchedule,
  verifyPin,
  changePin,
  getInstalledApps,
  shouldLockApp,
  RAMADAN_PRESETS,
};