// Quran Service - Handles Quran data, chapters, verses, and audio

import { QuranChapter, QuranVerse } from '../types';

// Complete list of Quran chapters (Surahs)
export const QURAN_CHAPTERS: QuranChapter[] = [
  { id: 1, name: 'Al-Fatihah', englishName: 'The Opening', englishNameTranslation: 'The Opening', revelationType: 'Meccan', numberOfAyahs: 7 },
  { id: 2, name: 'Al-Baqarah', englishName: 'The Cow', englishNameTranslation: 'The Cow', revelationType: 'Medinan', numberOfAyahs: 286 },
  { id: 3, name: 'Aal-E-Imran', englishName: 'The Family of Imran', englishNameTranslation: 'The Family of Imran', revelationType: 'Medinan', numberOfAyahs: 200 },
  { id: 4, name: 'An-Nisa', englishName: "The Women", englishNameTranslation: 'The Women', revelationType: 'Medinan', numberOfAyahs: 176 },
  { id: 5, name: 'Al-Maidah', englishName: 'The Table Spread', englishNameTranslation: 'The Table Spread', revelationType: 'Medinan', numberOfAyahs: 120 },
  { id: 6, name: 'Al-Anam', englishName: 'The Cattle', englishNameTranslation: 'The Cattle', revelationType: 'Meccan', numberOfAyahs: 165 },
  { id: 7, name: 'Al-Araf', englishName: 'The Heights', englishNameTranslation: 'The Heights', revelationType: 'Meccan', numberOfAyahs: 206 },
  { id: 8, name: 'Al-Anfal', englishName: 'The Spoils of War', englishNameTranslation: 'The Spoils of War', revelationType: 'Medinan', numberOfAyahs: 75 },
  { id: 9, name: 'At-Tawbah', englishName: 'The Repentance', englishNameTranslation: 'The Repentance', revelationType: 'Medinan', numberOfAyahs: 129 },
  { id: 10, name: 'Yunus', englishName: 'Jonah', englishNameTranslation: 'Jonah', revelationType: 'Meccan', numberOfAyahs: 109 },
  { id: 11, name: 'Hud', englishName: 'Hud', englishNameTranslation: 'Hud', revelationType: 'Meccan', numberOfAyahs: 123 },
  { id: 12, name: 'Yusuf', englishName: 'Joseph', englishNameTranslation: 'Joseph', revelationType: 'Meccan', numberOfAyahs: 111 },
  { id: 13, name: 'Ar-Rad', englishName: 'The Thunder', englishNameTranslation: 'The Thunder', revelationType: 'Medinan', numberOfAyahs: 43 },
  { id: 14, name: 'Ibrahim', englishName: 'Abraham', englishNameTranslation: 'Abraham', revelationType: 'Meccan', numberOfAyahs: 52 },
  { id: 15, name: 'Al-Hijr', englishName: 'The Rocky Tract', englishNameTranslation: 'The Rocky Tract', revelationType: 'Meccan', numberOfAyahs: 99 },
  { id: 16, name: 'An-Nahl', englishName: 'The Bee', englishNameTranslation: 'The Bee', revelationType: 'Meccan', numberOfAyahs: 128 },
  { id: 17, name: 'Al-Isra', englishName: 'The Night Journey', englishNameTranslation: 'The Night Journey', revelationType: 'Meccan', numberOfAyahs: 111 },
  { id: 18, name: 'Al-Kahf', englishName: 'The Cave', englishNameTranslation: 'The Cave', revelationType: 'Meccan', numberOfAyahs: 110 },
  { id: 19, name: 'Maryam', englishName: 'Mary', englishNameTranslation: 'Mary', revelationType: 'Meccan', numberOfAyahs: 98 },
  { id: 20, name: 'Ta-Ha', englishName: 'Ta-Ha', englishNameTranslation: 'Ta-Ha', revelationType: 'Meccan', numberOfAyahs: 135 },
  { id: 21, name: 'Al-Anbiya', englishName: 'The Prophets', englishNameTranslation: 'The Prophets', revelationType: 'Meccan', numberOfAyahs: 112 },
  { id: 22, name: 'Al-Hajj', englishName: 'The Pilgrimage', englishNameTranslation: 'The Pilgrimage', revelationType: 'Medinan', numberOfAyahs: 78 },
  { id: 23, name: 'Al-Muminun', englishName: 'The Believers', englishNameTranslation: 'The Believers', revelationType: 'Meccan', numberOfAyahs: 118 },
  { id: 24, name: 'An-Nur', englishName: 'The Light', englishNameTranslation: 'The Light', revelationType: 'Medinan', numberOfAyahs: 64 },
  { id: 25, name: 'Al-Furqan', englishName: 'The Criterion', englishNameTranslation: 'The Criterion', revelationType: 'Meccan', numberOfAyahs: 77 },
  { id: 26, name: 'Ash-Shuara', englishName: 'The Poets', englishNameTranslation: 'The Poets', revelationType: 'Meccan', numberOfAyahs: 227 },
  { id: 27, name: 'An-Naml', englishName: 'The Ant', englishNameTranslation: 'The Ant', revelationType: 'Meccan', numberOfAyahs: 93 },
  { id: 28, name: 'Al-Qasas', englishName: 'The Stories', englishNameTranslation: 'The Stories', revelationType: 'Meccan', numberOfAyahs: 88 },
  { id: 29, name: 'Al-Ankabut', englishName: 'The Spider', englishNameTranslation: 'The Spider', revelationType: 'Meccan', numberOfAyahs: 69 },
  { id: 30, name: 'Ar-Rum', englishName: 'The Romans', englishNameTranslation: 'The Romans', revelationType: 'Meccan', numberOfAyahs: 60 },
  { id: 31, name: 'Luqman', englishName: 'Luqman', englishNameTranslation: 'Luqman', revelationType: 'Meccan', numberOfAyahs: 34 },
  { id: 32, name: 'As-Sajdah', englishName: 'The Prostration', englishNameTranslation: 'The Prostration', revelationType: 'Meccan', numberOfAyahs: 30 },
  { id: 33, name: 'Al-Ahzab', englishName: 'The Combined Forces', englishNameTranslation: 'The Combined Forces', revelationType: 'Medinan', numberOfAyahs: 73 },
  { id: 34, name: 'Saba', englishName: 'Sheba', englishNameTranslation: 'Sheba', revelationType: 'Meccan', numberOfAyahs: 54 },
  { id: 35, name: 'Fatir', englishName: 'Originator', englishNameTranslation: 'Originator', revelationType: 'Meccan', numberOfAyahs: 45 },
  { id: 36, name: 'Ya-Sin', englishName: 'Ya Sin', englishNameTranslation: 'Ya Sin', revelationType: 'Meccan', numberOfAyahs: 83 },
  { id: 37, name: 'As-Saffat', englishName: 'Those Who Set The Ranks', englishNameTranslation: 'Those Who Set The Ranks', revelationType: 'Meccan', numberOfAyahs: 182 },
  { id: 38, name: 'Sad', englishName: 'The Letter Sad', englishNameTranslation: 'The Letter Sad', revelationType: 'Meccan', numberOfAyahs: 88 },
  { id: 39, name: 'Az-Zumar', englishName: 'The Troops', englishNameTranslation: 'The Troops', revelationType: 'Meccan', numberOfAyahs: 75 },
  { id: 40, name: 'Ghafir', englishName: 'The Forgiver', englishNameTranslation: 'The Forgiver', revelationType: 'Meccan', numberOfAyahs: 85 },
  { id: 41, name: 'Fussilat', englishName: 'Explained in Detail', englishNameTranslation: 'Explained in Detail', revelationType: 'Meccan', numberOfAyahs: 54 },
  { id: 42, name: 'Ash-Shura', englishName: 'The Consultation', englishNameTranslation: 'The Consultation', revelationType: 'Meccan', numberOfAyahs: 53 },
  { id: 43, name: 'Az-Zukhruf', englishName: 'The Ornaments of Gold', englishNameTranslation: 'The Ornaments of Gold', revelationType: 'Meccan', numberOfAyahs: 89 },
  { id: 44, name: 'Ad-Dukhan', englishName: 'The Smoke', englishNameTranslation: 'The Smoke', revelationType: 'Meccan', numberOfAyahs: 59 },
  { id: 45, name: 'Al-Jathiyah', englishName: 'The Crouching', englishNameTranslation: 'The Crouching', revelationType: 'Meccan', numberOfAyahs: 37 },
  { id: 46, name: 'Al-Ahqaf', englishName: 'The Wind-Curved Sandhills', englishNameTranslation: 'The Wind-Curved Sandhills', revelationType: 'Meccan', numberOfAyahs: 35 },
  { id: 47, name: 'Muhammad', englishName: 'Muhammad', englishNameTranslation: 'Muhammad', revelationType: 'Medinan', numberOfAyahs: 38 },
  { id: 48, name: 'Al-Fath', englishName: 'The Victory', englishNameTranslation: 'The Victory', revelationType: 'Medinan', numberOfAyahs: 29 },
  { id: 49, name: 'Al-Hujurat', englishName: 'The Rooms', englishNameTranslation: 'The Rooms', revelationType: 'Medinan', numberOfAyahs: 18 },
  { id: 50, name: 'Qaf', englishName: 'The Letter Qaf', englishNameTranslation: 'The Letter Qaf', revelationType: 'Meccan', numberOfAyahs: 45 },
  { id: 51, name: 'Adh-Dhariyat', englishName: 'The Winnowing Winds', englishNameTranslation: 'The Winnowing Winds', revelationType: 'Meccan', numberOfAyahs: 60 },
  { id: 52, name: 'At-Tur', englishName: 'The Mount', englishNameTranslation: 'The Mount', revelationType: 'Meccan', numberOfAyahs: 49 },
  { id: 53, name: 'An-Najm', englishName: 'The Star', englishNameTranslation: 'The Star', revelationType: 'Meccan', numberOfAyahs: 62 },
  { id: 54, name: 'Al-Qamar', englishName: 'The Moon', englishNameTranslation: 'The Moon', revelationType: 'Meccan', numberOfAyahs: 55 },
  { id: 55, name: 'Ar-Rahman', englishName: 'The Beneficent', englishNameTranslation: 'The Beneficent', revelationType: 'Medinan', numberOfAyahs: 78 },
  { id: 56, name: 'Al-Waqiah', englishName: 'The Inevitable', englishNameTranslation: 'The Inevitable', revelationType: 'Meccan', numberOfAyahs: 96 },
  { id: 57, name: 'Al-Hadid', englishName: 'The Iron', englishNameTranslation: 'The Iron', revelationType: 'Medinan', numberOfAyahs: 29 },
  { id: 58, name: 'Al-Mujadila', englishName: 'The Pleading Woman', englishNameTranslation: 'The Pleading Woman', revelationType: 'Medinan', numberOfAyahs: 22 },
  { id: 59, name: 'Al-Hashr', englishName: 'The Exile', englishNameTranslation: 'The Exile', revelationType: 'Medinan', numberOfAyahs: 24 },
  { id: 60, name: 'Al-Mumtahanah', englishName: 'She that is to be examined', englishNameTranslation: 'She that is to be examined', revelationType: 'Medinan', numberOfAyahs: 13 },
  { id: 61, name: 'As-Saf', englishName: 'The Ranks', englishNameTranslation: 'The Ranks', revelationType: 'Medinan', numberOfAyahs: 14 },
  { id: 62, name: 'Al-Jumuah', englishName: 'The Congregation', englishNameTranslation: 'The Congregation', revelationType: 'Medinan', numberOfAyahs: 11 },
  { id: 63, name: 'Al-Munafiqun', englishName: 'The Hypocrites', englishNameTranslation: 'The Hypocrites', revelationType: 'Medinan', numberOfAyahs: 11 },
  { id: 64, name: 'At-Taghabun', englishName: 'The Mutual Disillusion', englishNameTranslation: 'The Mutual Disillusion', revelationType: 'Medinan', numberOfAyahs: 18 },
  { id: 65, name: 'At-Talaq', englishName: 'The Divorce', englishNameTranslation: 'The Divorce', revelationType: 'Medinan', numberOfAyahs: 12 },
  { id: 66, name: 'At-Tahrim', englishName: 'The Prohibition', englishNameTranslation: 'The Prohibition', revelationType: 'Medinan', numberOfAyahs: 12 },
  { id: 67, name: 'Al-Mulk', englishName: 'The Sovereignty', englishNameTranslation: 'The Sovereignty', revelationType: 'Meccan', numberOfAyahs: 30 },
  { id: 68, name: 'Al-Qalam', englishName: 'The Pen', englishNameTranslation: 'The Pen', revelationType: 'Meccan', numberOfAyahs: 52 },
  { id: 69, name: 'Al-Haqqah', englishName: 'The Reality', englishNameTranslation: 'The Reality', revelationType: 'Meccan', numberOfAyahs: 52 },
  { id: 70, name: 'Al-Maarij', englishName: 'The Ascending Stairways', englishNameTranslation: 'The Ascending Stairways', revelationType: 'Meccan', numberOfAyahs: 44 },
  { id: 71, name: 'Nuh', englishName: 'Noah', englishNameTranslation: 'Noah', revelationType: 'Meccan', numberOfAyahs: 28 },
  { id: 72, name: 'Al-Jinn', englishName: 'The Jinn', englishNameTranslation: 'The Jinn', revelationType: 'Meccan', numberOfAyahs: 28 },
  { id: 73, name: 'Al-Muzzammil', englishName: 'The Enshrouded One', englishNameTranslation: 'The Enshrouded One', revelationType: 'Meccan', numberOfAyahs: 20 },
  { id: 74, name: 'Al-Muddaththir', englishName: 'The Cloaked One', englishNameTranslation: 'The Cloaked One', revelationType: 'Meccan', numberOfAyahs: 56 },
  { id: 75, name: 'Al-Qiyamah', englishName: 'The Resurrection', englishNameTranslation: 'The Resurrection', revelationType: 'Meccan', numberOfAyahs: 40 },
  { id: 76, name: 'Al-Insan', englishName: 'The Human', englishNameTranslation: 'The Human', revelationType: 'Medinan', numberOfAyahs: 31 },
  { id: 77, name: 'Al-Mursalat', englishName: 'The Emissaries', englishNameTranslation: 'The Emissaries', revelationType: 'Meccan', numberOfAyahs: 50 },
  { id: 78, name: 'An-Naba', englishName: 'The Tidings', englishNameTranslation: 'The Tidings', revelationType: 'Meccan', numberOfAyahs: 40 },
  { id: 79, name: 'An-Naziat', englishName: 'Those who drag forth', englishNameTranslation: 'Those who drag forth', revelationType: 'Meccan', numberOfAyahs: 46 },
  { id: 80, name: 'Abasa', englishName: 'He Frowned', englishNameTranslation: 'He Frowned', revelationType: 'Meccan', numberOfAyahs: 42 },
  { id: 81, name: 'At-Takwir', englishName: 'The Overthrowing', englishNameTranslation: 'The Overthrowing', revelationType: 'Meccan', numberOfAyahs: 29 },
  { id: 82, name: 'Al-Infitar', englishName: 'The Cleaving', englishNameTranslation: 'The Cleaving', revelationType: 'Meccan', numberOfAyahs: 19 },
  { id: 83, name: 'Al-Mutaffifin', englishName: 'The Defrauding', englishNameTranslation: 'The Defrauding', revelationType: 'Meccan', numberOfAyahs: 36 },
  { id: 84, name: 'Al-Inshiqaq', englishName: 'The Sundering', englishNameTranslation: 'The Sundering', revelationType: 'Meccan', numberOfAyahs: 25 },
  { id: 85, name: 'Al-Buruj', englishName: 'The Mansions of the Stars', englishNameTranslation: 'The Mansions of the Stars', revelationType: 'Meccan', numberOfAyahs: 22 },
  { id: 86, name: 'At-Tariq', englishName: 'The Nightcomer', englishNameTranslation: 'The Nightcomer', revelationType: 'Meccan', numberOfAyahs: 17 },
  { id: 87, name: 'Al-Ala', englishName: 'The Most High', englishNameTranslation: 'The Most High', revelationType: 'Meccan', numberOfAyahs: 19 },
  { id: 88, name: 'Al-Ghashiyah', englishName: 'The Overwhelming', englishNameTranslation: 'The Overwhelming', revelationType: 'Meccan', numberOfAyahs: 26 },
  { id: 89, name: 'Al-Fajr', englishName: 'The Dawn', englishNameTranslation: 'The Dawn', revelationType: 'Meccan', numberOfAyahs: 30 },
  { id: 90, name: 'Al-Balad', englishName: 'The City', englishNameTranslation: 'The City', revelationType: 'Meccan', numberOfAyahs: 20 },
  { id: 91, name: 'Ash-Shams', englishName: 'The Sun', englishNameTranslation: 'The Sun', revelationType: 'Meccan', numberOfAyahs: 15 },
  { id: 92, name: 'Al-Layl', englishName: 'The Night', englishNameTranslation: 'The Night', revelationType: 'Meccan', numberOfAyahs: 21 },
  { id: 93, name: 'Ad-Dhuhaa', englishName: 'The Morning Hours', englishNameTranslation: 'The Morning Hours', revelationType: 'Meccan', numberOfAyahs: 11 },
  { id: 94, name: 'Ash-Sharh', englishName: 'The Relief', englishNameTranslation: 'The Relief', revelationType: 'Meccan', numberOfAyahs: 8 },
  { id: 95, name: 'At-Tin', englishName: 'The Fig', englishNameTranslation: 'The Fig', revelationType: 'Meccan', numberOfAyahs: 8 },
  { id: 96, name: 'Al-Alaq', englishName: 'The Clot', englishNameTranslation: 'The Clot', revelationType: 'Meccan', numberOfAyahs: 19 },
  { id: 97, name: 'Al-Qadr', englishName: 'The Power', englishNameTranslation: 'The Power', revelationType: 'Meccan', numberOfAyahs: 5 },
  { id: 98, name: 'Al-Bayyinah', englishName: 'The Clear Proof', englishNameTranslation: 'The Clear Proof', revelationType: 'Medinan', numberOfAyahs: 8 },
  { id: 99, name: 'Az-Zalzalah', englishName: 'The Earthquake', englishNameTranslation: 'The Earthquake', revelationType: 'Medinan', numberOfAyahs: 8 },
  { id: 100, name: 'Al-Adiyat', englishName: 'The Courser', englishNameTranslation: 'The Courser', revelationType: 'Meccan', numberOfAyahs: 11 },
  { id: 101, name: 'Al-Qariah', englishName: 'The Calamity', englishNameTranslation: 'The Calamity', revelationType: 'Meccan', numberOfAyahs: 11 },
  { id: 102, name: 'At-Takathur', englishName: 'The Rivalry in world', englishNameTranslation: 'The Rivalry in world', revelationType: 'Meccan', numberOfAyahs: 8 },
  { id: 103, name: 'Al-Asr', englishName: 'The Declining Day', englishNameTranslation: 'The Declining Day', revelationType: 'Meccan', numberOfAyahs: 3 },
  { id: 104, name: 'Al-Humazah', englishName: 'The Traducer', englishNameTranslation: 'The Traducer', revelationType: 'Meccan', numberOfAyahs: 9 },
  { id: 105, name: 'Al-Fil', englishName: 'The Elephant', englishNameTranslation: 'The Elephant', revelationType: 'Meccan', numberOfAyahs: 5 },
  { id: 106, name: 'Quraysh', englishName: 'Quraysh', englishNameTranslation: 'Quraysh', revelationType: 'Meccan', numberOfAyahs: 4 },
  { id: 107, name: 'Al-Maun', englishName: 'The Small Kindnesses', englishNameTranslation: 'The Small Kindnesses', revelationType: 'Meccan', numberOfAyahs: 7 },
  { id: 108, name: 'Al-Kawthar', englishName: 'The Abundance', englishNameTranslation: 'The Abundance', revelationType: 'Meccan', numberOfAyahs: 3 },
  { id: 109, name: 'Al-Kafirun', englishName: 'The Disbelievers', englishNameTranslation: 'The Disbelievers', revelationType: 'Meccan', numberOfAyahs: 6 },
  { id: 110, name: 'An-Nasr', englishName: 'The Divine Support', englishNameTranslation: 'The Divine Support', revelationType: 'Medinan', numberOfAyahs: 3 },
  { id: 111, name: 'Al-Masad', englishName: 'The Palm Fiber', englishNameTranslation: 'The Palm Fiber', revelationType: 'Meccan', numberOfAyahs: 5 },
  { id: 112, name: 'Al-Ikhlas', englishName: 'The Sincerity', englishNameTranslation: 'The Sincerity', revelationType: 'Meccan', numberOfAyahs: 4 },
  { id: 113, name: 'Al-Falaq', englishName: 'The Daybreak', englishNameTranslation: 'The Daybreak', revelationType: 'Meccan', numberOfAyahs: 5 },
  { id: 114, name: 'An-Nas', englishName: 'Mankind', englishNameTranslation: 'Mankind', revelationType: 'Meccan', numberOfAyahs: 6 },
];

// Sample verses for Al-Fatihah (Chapter 1)
export const SAMPLE_VERSES: Record<number, QuranVerse[]> = {
  1: [
    { id: 1, chapterId: 1, verseNumber: 1, textArabic: 'bismi allahi alrrahmani alrrahimi', textTranslation: 'In the name of Allah, the Most Gracious, the Most Merciful.', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3' },
    { id: 2, chapterId: 1, verseNumber: 2, textArabic: 'alhamdu lillahi rabbi alAAalameena', textTranslation: 'All praise is due to Allah, Lord of the worlds.', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3' },
    { id: 3, chapterId: 1, verseNumber: 3, textArabic: 'alrrahmani alrrahimi', textTranslation: 'The Most Gracious, the Most Merciful.', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3' },
    { id: 4, chapterId: 1, verseNumber: 4, textArabic: 'maliki yawmi alddeeni', textTranslation: 'Master of the Day of Judgment.', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3' },
    { id: 5, chapterId: 1, verseNumber: 5, textArabic: 'iyyaka naAAbudu wa-iyyaka nastaAAeenu', textTranslation: 'You alone we worship, and You alone we ask for help.', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3' },
    { id: 6, chapterId: 1, verseNumber: 6, textArabic: 'ihdina alssirata almustaqeema', textTranslation: 'Guide us on the Straight Path.', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3' },
    { id: 7, chapterId: 1, verseNumber: 7, textArabic: 'sirata allatheena anAAamta AAalayhim ghayri almaghdoobi AAalayhim wala alddalleena', textTranslation: 'The path of those who have received Your grace; not the path of those who have brought down wrath upon themselves, nor of those who have gone astray.', audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3' },
  ],
  // Additional chapters would be loaded from API or local database
};

// Audio reciters list
export const RECITERS = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy', language: 'Arabic' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', language: 'Arabic' },
  { id: 'ar.abdulsamad', name: 'Abdul Samad', language: 'Arabic' },
  { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', language: 'Arabic' },
  { id: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi', language: 'Arabic' },
  { id: 'ar.muhammadayyoub', name: 'Muhammad Ayyoub', language: 'Arabic' },
];

// Translation languages
export const TRANSLATIONS = [
  { id: 'en.asad', name: 'Muhammad Asad (English)', language: 'English' },
  { id: 'en.sahih', name: 'Saheeh International (English)', language: 'English' },
  { id: 'en.pickthall', name: 'Muhammad Pickthall (English)', language: 'English' },
  { id: 'en.yusufali', name: 'Abdullah Yusuf Ali (English)', language: 'English' },
  { id: 'fr.hamidullah', name: 'Hamidullah (French)', language: 'French' },
  { id: 'de.bubenheim', name: 'Bubenheim & Elyas (German)', language: 'German' },
];

// Get all chapters
export const getAllChapters = (): QuranChapter[] => {
  return QURAN_CHAPTERS;
};

// Get a single chapter by ID
export const getChapterById = (id: number): QuranChapter | undefined => {
  return QURAN_CHAPTERS.find(chapter => chapter.id === id);
};

// Get verses for a chapter (would normally fetch from API)
export const getChapterVerses = async (chapterId: number): Promise<QuranVerse[]> => {
  // Check if we have cached verses
  if (SAMPLE_VERSES[chapterId]) {
    return SAMPLE_VERSES[chapterId];
  }

  // In a real app, this would fetch from an API like:
  // https://api.alquran.cloud/v1/surah/{chapterId}
  // For now, return empty array for chapters we don't have
  return [];
};

// Get audio URL for a verse
export const getVerseAudioUrl = (chapterId: number, verseNumber: number, reciter: string = 'ar.alafasy'): string => {
  const verseKey = `${chapterId}:${verseNumber}`;
  return `https://cdn.islamic.network/quran/audio/128/${reciter}/${verseKey}.mp3`;
};

// Search verses by text
export const searchVerses = async (query: string): Promise<QuranVerse[]> => {
  const results: QuranVerse[] = [];
  const lowerQuery = query.toLowerCase();

  // Search through all cached verses
  for (const verses of Object.values(SAMPLE_VERSES)) {
    for (const verse of verses) {
      if (
        verse.textArabic.toLowerCase().includes(lowerQuery) ||
        verse.textTranslation.toLowerCase().includes(lowerQuery)
      ) {
        results.push(verse);
      }
    }
  }

  return results;
};

// Juz (section) information - Quran is divided into 30 juz
export const JUZ_INFO = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Juz ${i + 1}`,
  startChapter: i === 0 ? 1 : i === 1 ? 2 : Math.floor(i * 3.8) + 1,
  startVerse: 1,
}));

export default {
  getAllChapters,
  getChapterById,
  getChapterVerses,
  getVerseAudioUrl,
  searchVerses,
  QURAN_CHAPTERS,
  RECITERS,
  TRANSLATIONS,
  JUZ_INFO,
};