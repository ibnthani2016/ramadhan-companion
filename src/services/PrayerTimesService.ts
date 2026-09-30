// Prayer Times Service - Powered by the `adhan` library (Batoul Apps)
// The industry-standard Islamic prayer time calculations used by Muslim Pro,
// Athan apps, and IslamicFinder. Works fully offline.

import {
  Coordinates,
  CalculationMethod,
  PrayerTimes as AdhanPrayerTimes,
  Madhab,
} from 'adhan';

import { PrayerTimes, Location, CalculationMethod as AppMethod } from '../types';

// Map our method names to adhan's calculation methods
const getAdhanMethod = (method: AppMethod, asrJuristicMethod: 'standard' | 'hanafi' = 'standard') => {
  const params = (() => {
    switch (method) {
      case 'ISNA': return CalculationMethod.NorthAmerica();
      case 'Egyptian': return CalculationMethod.Egyptian();
      case 'Makkah': return CalculationMethod.UmmAlQura();
      case 'Karachi': return CalculationMethod.Karachi();
      case 'Tehran': return CalculationMethod.Tehran();
      case 'Jafari': return CalculationMethod.Other();
      case 'MWL':
      default: return CalculationMethod.MuslimWorldLeague();
    }
  })();

  // Asr shadow factor (standard = 1, Hanafi = 2)
  params.madhab = asrJuristicMethod === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;

  // Jafari tweaks
  if (method === 'Jafari') {
    params.fajrAngle = 16;
    params.ishaAngle = 14;
    params.maghribAngle = 4;
  }
  return params;
};

// Calculate all prayer times for a location and date
export const calculatePrayerTimes = (
  location: Location,
  date: Date = new Date(),
  method: AppMethod = 'MWL',
  asrJuristicMethod: 'standard' | 'hanafi' = 'standard'
): PrayerTimes => {
  const coordinates = new Coordinates(location.latitude, location.longitude);
  const params = getAdhanMethod(method, asrJuristicMethod);
  const times = new AdhanPrayerTimes(coordinates, date, params);

  return {
    fajr: times.fajr,
    sunrise: times.sunrise,
    dhuhr: times.dhuhr,
    asr: times.asr,
    maghrib: times.maghrib,
    isha: times.isha,
    date,
    location,
    calculationMethod: method,
  };
};

// Get the next upcoming prayer with countdown
export const getNextPrayer = (
  prayerTimes: PrayerTimes
): { name: string; time: Date; remaining: number } | null => {
  const now = new Date();

  const prayers: { name: string; time: Date }[] = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Sunrise', time: prayerTimes.sunrise },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ];

  // Find the next prayer today
  for (const prayer of prayers) {
    if (prayer.time > now) {
      return {
        name: prayer.name.toLowerCase(),
        time: prayer.time,
        remaining: prayer.time.getTime() - now.getTime(),
      };
    }
  }

  // All prayers passed — next is tomorrow's Fajr
  const tomorrow = new Date(prayerTimes.date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTimes = calculatePrayerTimes(
    prayerTimes.location,
    tomorrow,
    prayerTimes.calculationMethod as AppMethod
  );

  return {
    name: 'fajr',
    time: tomorrowTimes.fajr,
    remaining: tomorrowTimes.fajr.getTime() - now.getTime(),
  };
};

// Get the current prayer (the one whose window we're in)
export const getCurrentPrayer = (prayerTimes: PrayerTimes): string | null => {
  const now = new Date();

  const prayers: { name: string; time: Date }[] = [
    { name: 'isha', time: prayerTimes.isha },
    { name: 'maghrib', time: prayerTimes.maghrib },
    { name: 'asr', time: prayerTimes.asr },
    { name: 'dhuhr', time: prayerTimes.dhuhr },
    { name: 'sunrise', time: prayerTimes.sunrise },
    { name: 'fajr', time: prayerTimes.fajr },
  ];

  for (const prayer of prayers) {
    if (now >= prayer.time) {
      return prayer.name;
    }
  }
  return null;
};

// Format a Date as local time string
export const formatTime = (date: Date): string =>
  date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

// Format milliseconds remaining as "1h 23m" or "45m 30s"
export const formatRemaining = (ms: number): string => {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

export default {
  calculatePrayerTimes,
  getNextPrayer,
  getCurrentPrayer,
  formatTime,
  formatRemaining,
};
