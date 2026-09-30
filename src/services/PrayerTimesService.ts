// Prayer Times Calculation Service
// Based on astronomical calculations for Islamic prayer times

import { PrayerTimes, Location, CalculationMethod } from '../types';

interface CalculationParams {
  fajrAngle: number;
  ishaAngle: number;
  maghribMinutes: number;
  ishaMinutes: number;
  midnightMethod: 'standard' | 'jafari';
}

const CALCULATION_METHODS: Record<CalculationMethod, CalculationParams> = {
  MWL: { fajrAngle: 18, ishaAngle: 17, maghribMinutes: 0, ishaMinutes: 0, midnightMethod: 'standard' },
  ISNA: { fajrAngle: 15, ishaAngle: 15, maghribMinutes: 0, ishaMinutes: 0, midnightMethod: 'standard' },
  Egyptian: { fajrAngle: 19.5, ishaAngle: 17.5, maghribMinutes: 0, ishaMinutes: 0, midnightMethod: 'standard' },
  Makkah: { fajrAngle: 18.5, ishaAngle: 0, maghribMinutes: 0, ishaMinutes: 90, midnightMethod: 'standard' },
  Karachi: { fajrAngle: 18, ishaAngle: 18, maghribMinutes: 0, ishaMinutes: 0, midnightMethod: 'standard' },
  Tehran: { fajrAngle: 17.7, ishaAngle: 14, maghribMinutes: 4.5, ishaMinutes: 0, midnightMethod: 'jafari' },
  Jafari: { fajrAngle: 16, ishaAngle: 14, maghribMinutes: 0, ishaMinutes: 0, midnightMethod: 'jafari' },
};

// Convert degrees to radians
const dtr = (degree: number): number => (degree * Math.PI) / 180;

// Convert radians to degrees
const rtd = (radian: number): number => (radian * 180) / Math.PI;

// Calculate Julian Date
const julianDate = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month <= 2) {
    return Math.floor(365.25 * (year - 1)) + Math.floor(30.6001 * (month + 13)) + day + 1720995;
  }
  return Math.floor(365.25 * year) + Math.floor(30.6001 * (month + 1)) + day + 1720995;
};

// Calculate sun position
const sunPosition = (jd: number): { declination: number; equation: number } => {
  const d = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * Math.sin(dtr(g)) + 0.020 * Math.sin(dtr(2 * g))) % 360;
  const e = 23.439 - 0.00000036 * d;
  const ra = rtd(Math.atan2(Math.cos(dtr(e)) * Math.sin(dtr(L)), Math.cos(dtr(L))));
  const D = rtd(Math.asin(Math.sin(dtr(e)) * Math.sin(dtr(L))));
  const EqT = (q - ra) / 15;

  return { declination: D, equation: EqT };
};

// Calculate prayer time for a given angle
const calculatePrayerTime = (
  angle: number,
  latitude: number,
  declination: number,
  equation: number,
  isRising: boolean
): number => {
  const latRad = dtr(latitude);
  const decRad = dtr(declination);
  const angleRad = dtr(angle);

  const cosLat = Math.cos(latRad);
  const sinLat = Math.sin(latRad);
  const cosDec = Math.cos(decRad);
  const sinDec = Math.sin(decRad);
  const cosAngle = Math.cos(angleRad);

  const part1 = cosAngle - sinLat * sinDec;
  const part2 = cosLat * cosDec;

  if (Math.abs(part1 / part2) > 1) {
    return -1; // No valid time (polar day/night)
  }

  const t = rtd(Math.acos(part1 / part2)) / 15;
  return isRising ? 6 - t - equation : 6 + t - equation;
};

// Convert decimal hours to Date
const hoursToDate = (hours: number, date: Date): Date => {
  if (hours < 0) return date; // Invalid time

  const hoursInt = Math.floor(hours);
  const minutes = Math.floor((hours - hoursInt) * 60);
  const seconds = Math.floor(((hours - hoursInt) * 60 - minutes) * 60);

  const result = new Date(date);
  result.setHours(hoursInt, minutes, seconds, 0);
  return result;
};

// Calculate Dhuhr time
const calculateDhuhr = (longitude: number, timezone: number, equation: number): number => {
  return 12 + timezone - longitude / 15 - equation;
};

// Calculate Asr time based on juristic method
const calculateAsr = (
  latitude: number,
  declination: number,
  equation: number,
  isHanafi: boolean
): number => {
  const factor = isHanafi ? 2 : 1;
  const angle = rtd(Math.atan(1 / (factor + Math.tan(Math.abs(dtr(latitude - declination))))));
  return calculatePrayerTime(angle, latitude, declination, equation, false);
};

// Main function to calculate all prayer times
export const calculatePrayerTimes = (
  location: Location,
  date: Date = new Date(),
  method: CalculationMethod = 'MWL',
  asrJuristicMethod: 'standard' | 'hanafi' = 'standard'
): PrayerTimes => {
  const { latitude, longitude } = location;
  const params = CALCULATION_METHODS[method];

  // Get timezone offset
  const timezone = -date.getTimezoneOffset() / 60;

  // Calculate Julian Date
  const jd = julianDate(date);

  // Get sun position
  const { declination, equation } = sunPosition(jd);

  // Calculate Dhuhr
  const dhuhrHours = calculateDhuhr(longitude, timezone, equation);

  // Calculate Fajr
  const fajrHours = calculatePrayerTime(params.fajrAngle, latitude, declination, equation, true);

  // Calculate Sunrise
  const sunriseHours = calculatePrayerTime(0.833, latitude, declination, equation, true);

  // Calculate Asr
  const asrHours = calculateAsr(latitude, declination, equation, asrJuristicMethod === 'hanafi');

  // Calculate Maghrib
  const maghribHours = dhuhrHours + params.maghribMinutes / 60;

  // Calculate Isha
  let ishaHours: number;
  if (params.ishaMinutes > 0) {
    ishaHours = maghribHours + params.ishaMinutes / 60;
  } else {
    ishaHours = calculatePrayerTime(params.ishaAngle, latitude, declination, equation, false);
  }

  return {
    fajr: hoursToDate(fajrHours, date),
    sunrise: hoursToDate(sunriseHours, date),
    dhuhr: hoursToDate(dhuhrHours, date),
    asr: hoursToDate(asrHours, date),
    maghrib: hoursToDate(maghribHours, date),
    isha: hoursToDate(ishaHours, date),
  };
};

// Get current prayer
export const getCurrentPrayer = (prayerTimes: PrayerTimes): keyof PrayerTimes | null => {
  const now = new Date();
  const prayers: (keyof PrayerTimes)[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

  // If it's before fajr, return null (no current prayer)
  if (now < prayerTimes.fajr) {
    return null;
  }

  // If it's after isha, return isha
  if (now >= prayerTimes.isha) {
    return 'isha';
  }

  for (let i = prayers.length - 1; i >= 0; i--) {
    if (now >= prayerTimes[prayers[i]]) {
      return prayers[i];
    }
  }

  return null;
};

// Get next prayer
export const getNextPrayer = (
  prayerTimes: PrayerTimes
): { name: keyof PrayerTimes; time: Date; remaining: number } | null => {
  const now = new Date();
  const prayers: (keyof PrayerTimes)[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

  for (const prayer of prayers) {
    if (now < prayerTimes[prayer]) {
      const remaining = prayerTimes[prayer].getTime() - now.getTime();
      return { name: prayer, time: prayerTimes[prayer], remaining };
    }
  }

  // If all prayers have passed, return Fajr for next day
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(4, 30, 0, 0); // Approximate Fajr time
  
  const remaining = tomorrow.getTime() - now.getTime();
  return { name: 'fajr', time: tomorrow, remaining };
};

// Format time for display
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Format remaining time
export const formatRemaining = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

export default {
  calculatePrayerTimes,
  getCurrentPrayer,
  getNextPrayer,
  formatTime,
  formatRemaining,
};