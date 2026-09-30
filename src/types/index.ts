// Type definitions for Ramadan Companion App

export interface PrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
  date: Date;
  location: Location;
  calculationMethod: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface QuranChapter {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
}

export interface QuranVerse {
  id: number;
  chapterId: number;
  verseNumber: number;
  textArabic: string;
  textTranslation: string;
  audioUrl?: string;
}

export interface AppLockConfig {
  enabled: boolean;
  lockedApps: string[];
  schedule: LockSchedule | null;
  pin: string;
}

export interface LockSchedule {
  type: 'always' | 'scheduled' | 'ramadan-hours';
  startTime?: string;
  endTime?: string;
  days?: number[]; // 0-6 for Sunday-Saturday
}

export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  source: 'facebook' | 'youtube' | 'local' | 'other';
  duration?: number;
}

export interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  textPositions: TextPosition[];
}

export interface TextPosition {
  x: number;
  y: number;
  maxWidth: number;
  fontSize: number;
}

export interface UserSettings {
  calculationMethod: CalculationMethod;
  asrJuristicMethod: 'standard' | 'hanafi';
  location: Location | null;
  notifications: NotificationSettings;
  appLock: AppLockConfig;
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ar';
}

export type CalculationMethod = 
  | 'MWL' // Muslim World League
  | 'ISNA' // Islamic Society of North America
  | 'Egyptian'
  | 'Makkah'
  | 'Karachi'
  | 'Tehran'
  | 'Jafari';

export interface NotificationSettings {
  fajr: boolean;
  sunrise: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  adhan: boolean;
  reminder: number; // minutes before prayer
}

export interface FastingDay {
  date: Date;
  isFasting: boolean;
  suhoorTime: Date;
  iftarTime: Date;
  notes?: string;
}

export interface RamadanCalendar {
  year: number;
  startDate: Date;
  endDate: Date;
  days: FastingDay[];
}