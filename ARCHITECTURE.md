# Ramadan Companion - Code Architecture Analysis

## Overview
This document maps how all files work together to achieve the app's purpose.

## App Structure

```
ramadhan-companion/
├── App.tsx                    # Entry point
├── src/
│   ├── context/
│   │   └── AppContext.tsx    # Global state management
│   ├── navigation/
│   │   └── AppNavigator.tsx  # Bottom tabs + Stack navigation
│   ├── screens/              # 11 screens total
│   │   ├── HomeScreen.tsx
│   │   ├── PrayerTimesScreen.tsx
│   │   ├── QuranScreen.tsx
│   │   ├── QuranReaderScreen.tsx
│   │   ├── MediaScreen.tsx
│   │   ├── MediaSearchScreen.tsx
│   │   ├── MediaPlayerScreen.tsx
│   │   ├── AppLockScreen.tsx
│   │   ├── MemeGeneratorScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── services/             # 5 services
│   │   ├── PrayerTimesService.ts   # Astronomical calculations
│   │   ├── QuranService.ts         # Quran data & chapters
│   │   ├── MediaService.ts         # Media fetching
│   │   ├── MemeGeneratorService.ts # Meme creation
│   │   └── AppLockService.ts       # App locking logic
│   └── types/
│       └── index.ts         # TypeScript interfaces
```

## Data Flow

### 1. App Startup
```
App.tsx
  → AppProvider (AppContext.tsx)
    → Load settings from AsyncStorage
    → Request location permission
    → Calculate prayer times
  → AppNavigator.tsx
    → Bottom Tab Navigator (5 tabs)
    → Stack Navigator (modal screens)
```

### 2. Prayer Times Flow
```
AppContext (location)
  → PrayerTimesService.calculatePrayerTimes()
    → Uses astronomical formulas
    → Returns PrayerTimes object
  → HomeScreen displays next prayer + countdown
  → PrayerTimesScreen allows method selection
```

### 3. Quran Flow
```
QuranScreen
  → QuranService.getAllChapters()
  → User taps chapter
  → QuranReaderScreen
    → QuranService.getChapterVerses()
    → Displays Arabic + translation
```

### 4. Media Flow
```
MediaScreen
  → MediaService.fetchMedia()
  → MediaSearchScreen (search)
  → MediaPlayerScreen (play video/audio)
```

### 5. Settings Flow
```
SettingsScreen
  → AppContext.updateSettings()
  → AsyncStorage persists
  → Components re-render with new settings
```

## Screen Dependencies

| Screen | Uses | Provides |
|--------|------|----------|
| HomeScreen | AppContext | Dashboard view |
| PrayerTimesScreen | AppContext, PrayerTimesService | Prayer times + Adhan |
| QuranScreen | QuranService | Chapter list |
| QuranReaderScreen | QuranService | Verses |
| MediaScreen | MediaService | Media grid |
| MediaSearchScreen | MediaService | Search |
| MediaPlayerScreen | expo-av | Playback |
| AppLockScreen | AppLockService | Lock functionality |
| MemeGeneratorScreen | MemeGeneratorService | Meme creation |
| SettingsScreen | AppContext | Settings form |

## Key Features Implemented

✅ Ramadan countdown
✅ Location-based prayer times
✅ 7 calculation methods
✅ Adhan audio playback
✅ Quran chapters list
✅ Quran verse reader
✅ Media browsing
✅ Video/audio player
✅ App lock (PIN)
✅ Meme generator
✅ Settings persistence

## Files to Review

1. **Core**: App.tsx, AppContext.tsx, AppNavigator.tsx
2. **Screens**: All 11 screens
3. **Services**: PrayerTimesService, QuranService
4. **Types**: Complete type definitions
