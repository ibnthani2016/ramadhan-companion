# 🌙 Ramadan Companion App

## Overview

**Ramadan Companion** is a comprehensive mobile application designed to help Muslims during the holy month of Ramadan. It provides essential tools for prayer, Quran reading, media consumption, and productivity — all in one beautifully designed app.

Built with **React Native** and **Expo**, the app runs natively on Android devices with smooth performance and a modern UI.

---

## 🎯 What Problem Does It Solve?

During Ramadan, Muslims need to:
- Know exact prayer times based on their location
- Read and study the Quran daily
- Stay focused and avoid distractions during fasting hours
- Access Islamic media content easily
- Share Ramadan-themed content with friends and family

**Ramadan Companion** brings all these needs into a single, easy-to-use app.

---

## 📱 App Features

### 1. 🏠 Home Dashboard
The home screen provides a quick overview of everything you need:
- **Ramadan Countdown** — Days remaining until Ramadan starts/ends
- **Current Prayer Time** — Shows the next upcoming prayer with countdown
- **Fasting Timer** — Tracks Suhoor (pre-dawn meal) and Iftar (breaking fast) times
- **Quick Access Cards** — One-tap access to all app features
- **Daily Dua (Supplication)** — A rotating collection of Ramadan duas

### 2. 🕌 Prayer Times
Accurate prayer times calculated based on your GPS location:
- **5 Daily Prayers** — Fajr, Dhuhr, Asr, Maghrib, Isha
- **7 Calculation Methods** — Choose from:
  - Muslim World League (MWL)
  - Islamic Society of North America (ISNA)
  - Egyptian General Authority of Survey
  - Umm Al-Qura University, Makkah
  - University of Islamic Sciences, Karachi
  - Institute of Geophysics, University of Tehran
  - Shia Ithna-Ashari (Jafari)
- **Adhan Notification** — Get notified when it's time to pray
- **Astronomical Calculations** — Uses precise solar position algorithms for accuracy
- **Location-Based** — Automatically detects your city and coordinates

### 3. 📖 Quran Reader
A complete Quran reading experience:
- **All 114 Surahs** — Complete list with Arabic names, English translations, and verse counts
- **Verse-by-Verse Reading** — Clean, readable layout for each Surah
- **Verse Repeat Controls** — Repeat specific verses for memorization (Hifz)
- **Surah Information** — Revelation type (Meccan/Medinan), verse count, Surah number
- **Search & Browse** — Quickly find any Surah by name or number
- **Bookmarking** — Save your reading progress

### 4. 🎬 Media Center
Access Islamic content:
- **Search Functionality** — Find Islamic lectures, nasheeds, and educational content
- **Media Player** — Built-in audio/video player
- **Categories** — Browse by topic, speaker, or type
- **Offline Support** — Download content for offline listening

### 5. 🔒 App Lock (Focus Mode)
Stay productive during fasting:
- **Block Distracting Apps** — Set a timer to lock yourself out of social media and games
- **Customizable Duration** — Set focus periods from 15 minutes to several hours
- **Fasting Hours Mode** — Automatically activates during fasting hours
- **Whitelist** — Allow essential apps while blocking distractions

### 6. 😄 Meme Generator
Share the Ramadan spirit:
- **Pre-made Templates** — Ramadan-themed meme templates
- **Custom Text** — Add your own captions
- **Image Picker** — Use your own photos as backgrounds
- **Share** — Directly share to WhatsApp, Instagram, Twitter, etc.

### 7. ⚙️ Settings
Customize your experience:
- **Calculation Method** — Choose your preferred prayer time calculation
- **Notification Preferences** — Enable/disable prayer reminders
- **Theme** — Light/dark mode
- **Language** — Interface language selection
- **Location** — Manual location override

---

## 🏗️ Technical Architecture

### Tech Stack
| Component | Technology |
|-----------|-----------|
| Framework | React Native with Expo SDK 54 |
| Language | TypeScript |
| Navigation | @react-navigation (Bottom Tabs + Stack) |
| Location | expo-location (GPS) |
| Audio/Video | expo-av |
| Camera | expo-camera |
| Image Picker | expo-image-picker |
| Storage | @react-native-async-storage |
| Animations | react-native-reanimated |
| Gestures | react-native-gesture-handler |

### Project Structure
```
ramadan-companion/
├── App.tsx                          # Entry point
├── index.ts                         # App registration
├── app.json                         # Expo configuration
├── src/
│   ├── context/
│   │   └── AppContext.tsx            # Global state management
│   ├── navigation/
│   │   └── AppNavigator.tsx          # Tab & stack navigation
│   ├── screens/
│   │   ├── HomeScreen.tsx            # Dashboard
│   │   ├── PrayerTimesScreen.tsx     # Prayer times with GPS
│   │   ├── QuranScreen.tsx           # Surah list
│   │   ├── QuranReaderScreen.tsx     # Verse reader
│   │   ├── MediaScreen.tsx           # Media browser
│   │   ├── MediaSearchScreen.tsx     # Media search
│   │   ├── MediaPlayerScreen.tsx     # Audio/video player
│   │   ├── AppLockScreen.tsx         # Focus mode
│   │   ├── MemeGeneratorScreen.tsx   # Meme creator
│   │   └── SettingsScreen.tsx        # App settings
│   ├── services/
│   │   ├── PrayerTimesService.ts     # Prayer calculation engine
│   │   ├── QuranService.ts           # Quran data (114 Surahs)
│   │   ├── MediaService.ts           # Media API integration
│   │   ├── AppLockService.ts         # App blocking logic
│   │   └── MemeGeneratorService.ts   # Meme creation engine
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── android/                          # Android native project
│   └── app/build/outputs/apk/release/
│       └── app-release.apk           # Built APK (106.7 MB)
└── assets/                           # App icons and images
```

### Prayer Time Calculation
The app uses **astronomical algorithms** to calculate prayer times:
1. Calculates the **Sun's position** (declination and equation of time) for the current date
2. Determines **solar noon** based on longitude and timezone
3. Computes each prayer time using the selected calculation method's angles:
   - **Fajr**: When the sun is a specific angle below the horizon (varies by method: 15°-19.5°)
   - **Sunrise**: When the sun reaches 0.833° below the horizon
   - **Dhuhr**: Solar noon + a small offset
   - **Asr**: When shadow length equals object height (Shafi'i) or twice the height (Hanafi)
   - **Maghrib**: Sunset time
   - **Isha**: When the sun is a specific angle below the horizon (varies by method: 15°-18°)

---

## 📲 Installation

### Option 1: Install the APK directly
1. Transfer `ramadan-companion/android/app/build/outputs/apk/release/app-release.apk` to your Android phone
2. On your phone, go to **Settings → Security → Enable "Install from unknown sources"**
3. Tap the APK file to install
4. Open **Ramadan Companion** from your app drawer

### Option 2: Run in development mode
```bash
cd ramadan-companion
npm install
npx expo start
```
Then scan the QR code with the **Expo Go** app on your phone.

### Option 3: Build from source
```bash
cd ramadan-companion
npm install
npx expo prebuild
cd android
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
gradlew assembleRelease
```

---

## 🎨 Design Philosophy

- **Islamic Green & Gold** color scheme reflecting Ramadan aesthetics
- **Clean, minimal UI** for distraction-free usage during worship
- **Large, readable text** for Quran reading
- **Bottom tab navigation** for easy one-handed use
- **Dark mode support** for nighttime Taraweeh prayers

---

## 📋 Requirements

- **Android 7.0+** (API level 24)
- **GPS/Location services** for prayer time calculations
- **Internet connection** for media features (prayer times work offline)
- **~107 MB** storage space

---

## 🤲 Ramadan Mubarak!

May this app be a helpful companion during the blessed month of Ramadan. May your fasts be accepted and your prayers answered. 🌙✨
