// Media Service - Handles media search and playback from various sources

import { MediaItem } from '../types';

// API endpoints for media search
const APIS = {
  youtube: {
    search: 'https://www.googleapis.com/youtube/v3/search',
    key: 'YOUR_YOUTUBE_API_KEY', // Would be configured in production
  },
  // Facebook Graph API would require OAuth
  facebook: {
    search: 'https://graph.facebook.com/v18.0/search',
  },
};

// Sample Islamic media content for demonstration
export const SAMPLE_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: 'Beautiful Quran Recitation - Surah Al-Mulk',
    description: 'Recitation by Mishary Rashid Alafasy',
    thumbnailUrl: 'https://i.ytimg.com/vi/example1/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    source: 'youtube',
    duration: 600,
  },
  {
    id: '2',
    title: 'Ramadan Dua Collection',
    description: 'Collection of duas for Ramadan',
    thumbnailUrl: 'https://i.ytimg.com/vi/example2/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=example2',
    source: 'youtube',
    duration: 1200,
  },
  {
    id: '3',
    title: 'Islamic Lecture: The Virtues of Ramadan',
    description: 'Lecture about the importance and benefits of Ramadan',
    thumbnailUrl: 'https://i.ytimg.com/vi/example3/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=example3',
    source: 'youtube',
    duration: 1800,
  },
  {
    id: '4',
    title: 'Adhan - Call to Prayer',
    description: 'Beautiful Adhan from Makkah',
    audioUrl: 'https://example.com/adhan.mp3',
    source: 'other',
    duration: 180,
  },
  {
    id: '5',
    title: 'Nasheed - Ramadan Mubarak',
    description: 'Islamic nasheed for Ramadan',
    audioUrl: 'https://example.com/nasheed.mp3',
    source: 'other',
    duration: 240,
  },
];

// Categories for media browsing
export const MEDIA_CATEGORIES = [
  { id: 'quran', name: 'Quran Recitation', icon: 'book' },
  { id: 'lectures', name: 'Islamic Lectures', icon: 'mic' },
  { id: 'duas', name: 'Duas & Supplications', icon: 'hands-pray' },
  { id: 'nasheeds', name: 'Nasheeds', icon: 'music' },
  { id: 'documentaries', name: 'Documentaries', icon: 'film' },
  { id: 'kids', name: 'Kids Content', icon: 'child' },
];

// Search media from all sources
export const searchMedia = async (query: string): Promise<MediaItem[]> => {
  const results: MediaItem[] = [];
  const lowerQuery = query.toLowerCase();

  // Search through sample media
  for (const item of SAMPLE_MEDIA) {
    if (
      item.title.toLowerCase().includes(lowerQuery) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery))
    ) {
      results.push(item);
    }
  }

  // In production, this would call actual APIs:
  // - YouTube Data API for videos
  // - Facebook Graph API for Facebook content
  // - Local device media library

  return results;
};

// Search YouTube videos
export const searchYouTube = async (query: string, maxResults: number = 20): Promise<MediaItem[]> => {
  // In production, this would use the YouTube Data API
  // const response = await fetch(
  //   `${APIS.youtube.search}?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${APIS.youtube.key}`
  // );
  // const data = await response.json();
  // return data.items.map(item => ({
  //   id: item.id.videoId,
  //   title: item.snippet.title,
  //   description: item.snippet.description,
  //   thumbnailUrl: item.snippet.thumbnails.high.url,
  //   videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  //   source: 'youtube',
  // }));

  // For now, filter sample media
  return SAMPLE_MEDIA.filter(item => 
    item.source === 'youtube' && 
    item.title.toLowerCase().includes(query.toLowerCase())
  );
};

// Search Facebook videos (requires OAuth)
export const searchFacebook = async (query: string): Promise<MediaItem[]> => {
  // Facebook Graph API requires authentication
  // This would need OAuth implementation
  return [];
};

// Get media by category
export const getMediaByCategory = async (categoryId: string): Promise<MediaItem[]> => {
  // In production, this would fetch from API based on category
  return SAMPLE_MEDIA;
};

// Get trending/popular Islamic content
export const getTrendingMedia = async (): Promise<MediaItem[]> => {
  // In production, this would fetch trending content
  return SAMPLE_MEDIA.slice(0, 5);
};

// Get recently played media
export const getRecentlyPlayed = async (): Promise<MediaItem[]> => {
  // In production, this would fetch from local storage
  return [];
};

// Save to recently played
export const saveToRecentlyPlayed = async (item: MediaItem): Promise<void> => {
  // In production, this would save to AsyncStorage
};

// Get video info
export const getVideoInfo = async (videoId: string, source: string): Promise<MediaItem | null> => {
  // In production, this would fetch video details from the source API
  return SAMPLE_MEDIA.find(item => item.id === videoId) || null;
};

// Extract video ID from URL
export const extractVideoId = (url: string): { id: string; source: string } | null => {
  // YouTube URL patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return { id: match[1], source: 'youtube' };
    }
  }

  // Facebook URL pattern
  const facebookPattern = /facebook\.com\/.*\/videos\/(\d+)/;
  const fbMatch = url.match(facebookPattern);
  if (fbMatch) {
    return { id: fbMatch[1], source: 'facebook' };
  }

  return null;
};

// Format duration
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Popular reciters for quick access
export const POPULAR_RECITERS = [
  { name: 'Mishary Rashid Alafasy', followers: '50M+' },
  { name: 'Abdul Rahman Al-Sudais', followers: '40M+' },
  { name: 'Maher Al-Muaiqly', followers: '30M+' },
  { name: 'Saad Al-Ghamdi', followers: '25M+' },
  { name: 'Abdul Basit Abdul Samad', followers: '20M+' },
];

// Popular Islamic speakers
export const POPULAR_SPEAKERS = [
  { name: 'Mufti Menk', followers: '15M+' },
  { name: 'Omar Suleiman', followers: '10M+' },
  { name: 'Yasir Qadhi', followers: '8M+' },
  { name: 'Nouman Ali Khan', followers: '7M+' },
  { name: 'Hamza Yusuf', followers: '5M+' },
];

export default {
  searchMedia,
  searchYouTube,
  searchFacebook,
  getMediaByCategory,
  getTrendingMedia,
  getRecentlyPlayed,
  saveToRecentlyPlayed,
  getVideoInfo,
  extractVideoId,
  formatDuration,
  MEDIA_CATEGORIES,
  POPULAR_RECITERS,
  POPULAR_SPEAKERS,
};