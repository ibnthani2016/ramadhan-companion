// Meme Generator Service - Create custom memes with Islamic/Ramadan themes

import { MemeTemplate, TextPosition } from '../types';

// Predefined meme templates for Ramadan
export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: 'ramadan-mubarak',
    name: 'Ramadan Mubarak',
    imageUrl: 'https://example.com/templates/ramadan-mubarak.png',
    textPositions: [
      { x: 50, y: 10, maxWidth: 80, fontSize: 24 },
      { x: 50, y: 85, maxWidth: 80, fontSize: 20 },
    ],
  },
  {
    id: 'fasting-hunger',
    name: 'Fasting Hunger',
    imageUrl: 'https://example.com/templates/hunger.png',
    textPositions: [
      { x: 50, y: 5, maxWidth: 90, fontSize: 22 },
      { x: 50, y: 90, maxWidth: 90, fontSize: 22 },
    ],
  },
  {
    id: 'iftar-time',
    name: 'Iftar Time',
    imageUrl: 'https://example.com/templates/iftar.png',
    textPositions: [
      { x: 50, y: 15, maxWidth: 85, fontSize: 24 },
      { x: 50, y: 80, maxWidth: 85, fontSize: 20 },
    ],
  },
  {
    id: 'suhoor-struggle',
    name: 'Suhoor Struggle',
    imageUrl: 'https://example.com/templates/suhoor.png',
    textPositions: [
      { x: 50, y: 10, maxWidth: 80, fontSize: 20 },
      { x: 50, y: 85, maxWidth: 80, fontSize: 20 },
    ],
  },
  {
    id: 'quran-reading',
    name: 'Quran Reading Goals',
    imageUrl: 'https://example.com/templates/quran.png',
    textPositions: [
      { x: 50, y: 5, maxWidth: 90, fontSize: 22 },
      { x: 50, y: 90, maxWidth: 90, fontSize: 22 },
    ],
  },
  {
    id: 'taraweeh',
    name: 'Taraweeh Prayers',
    imageUrl: 'https://example.com/templates/taraweeh.png',
    textPositions: [
      { x: 50, y: 10, maxWidth: 85, fontSize: 24 },
      { x: 50, y: 85, maxWidth: 85, fontSize: 20 },
    ],
  },
];

// Ramadan-themed text suggestions
export const MEME_TEXT_SUGGESTIONS = {
  top: [
    'When you realize Ramadan is tomorrow',
    'Me trying to wake up for Suhoor',
    'That feeling when Maghrib adhan starts',
    'My stomach during Asr prayer',
    'When someone offers you food during fasting',
    'Trying to read the entire Quran this Ramadan',
    'When you accidentally swallow your saliva',
    'Me after eating too much at Iftar',
    'That moment when you smell food cooking',
    'When Ramadan ends and you miss it already',
  ],
  bottom: [
    'Ramadan Mubarak!',
    'Alhamdulillah for another Ramadan',
    'May Allah accept our fasts',
    'The struggle is real',
    'But the reward is greater',
    'Patience is key',
    'Stay strong, stay blessed',
    'Ramadan vibes only',
    'Fasting with a smile',
    'Making every moment count',
  ],
};

// Popular meme formats
export const MEME_FORMATS = [
  { id: 'classic', name: 'Classic Top/Bottom', positions: 2 },
  { id: 'single-top', name: 'Top Text Only', positions: 1 },
  { id: 'single-bottom', name: 'Bottom Text Only', positions: 1 },
  { id: 'dialogue', name: 'Dialogue Style', positions: 4 },
];

// Create a meme with custom text
export const createMeme = async (
  templateId: string,
  texts: string[],
  customBackground?: string
): Promise<string | null> => {
  const template = MEME_TEMPLATES.find(t => t.id === templateId);
  if (!template && !customBackground) {
    return null;
  }

  // In a real implementation, this would:
  // 1. Load the image (from URL or local)
  // 2. Use canvas or image manipulation library to add text
  // 3. Save the result and return the path

  // For now, return a placeholder
  return `generated_meme_${Date.now()}.png`;
};

// Create meme from custom image
export const createMemeFromImage = async (
  imageUri: string,
  topText: string,
  bottomText: string
): Promise<string | null> => {
  // In a real implementation, this would:
  // 1. Load the image from the provided URI
  // 2. Add text overlays at top and bottom
  // 3. Apply meme-style formatting (white text with black outline)
  // 4. Save and return the result

  return `custom_meme_${Date.now()}.png`;
};

// Get all templates
export const getAllTemplates = (): MemeTemplate[] => {
  return MEME_TEMPLATES;
};

// Get template by ID
export const getTemplateById = (id: string): MemeTemplate | undefined => {
  return MEME_TEMPLATES.find(t => t.id === id);
};

// Save meme to gallery
export const saveMemeToGallery = async (memeUri: string): Promise<boolean> => {
  // In a real implementation, this would use expo-media-library
  // const { status } = await MediaLibrary.requestPermissionsAsync();
  // if (status === 'granted') {
  //   await MediaLibrary.saveToLibraryAsync(memeUri);
  //   return true;
  // }
  return false;
};

// Share meme
export const shareMeme = async (memeUri: string): Promise<boolean> => {
  // In a real implementation, this would use expo-sharing
  // await Sharing.shareAsync(memeUri);
  return true;
};

// Get random text suggestions
export const getRandomSuggestions = (): { top: string; bottom: string } => {
  const topIndex = Math.floor(Math.random() * MEME_TEXT_SUGGESTIONS.top.length);
  const bottomIndex = Math.floor(Math.random() * MEME_TEXT_SUGGESTIONS.bottom.length);

  return {
    top: MEME_TEXT_SUGGESTIONS.top[topIndex],
    bottom: MEME_TEXT_SUGGESTIONS.bottom[bottomIndex],
  };
};

// Text styling options
export const TEXT_STYLES = {
  fonts: ['Impact', 'Arial', 'Helvetica', 'Comic Sans'],
  colors: ['#FFFFFF', '#000000', '#FFD700', '#228B22', '#8B0000'],
  outlineColors: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF'],
  sizes: [16, 20, 24, 28, 32, 36, 40],
};

// Ramadan background images
export const RAMADAN_BACKGROUNDS = [
  { id: 'mosque', name: 'Mosque Silhouette', url: 'https://example.com/bg/mosque.png' },
  { id: 'crescent', name: 'Crescent Moon', url: 'https://example.com/bg/crescent.png' },
  { id: 'lantern', name: 'Ramadan Lantern', url: 'https://example.com/bg/lantern.png' },
  { id: 'dates', name: 'Dates & Water', url: 'https://example.com/bg/dates.png' },
  { id: 'quran-pattern', name: 'Quran Pattern', url: 'https://example.com/bg/quran-pattern.png' },
  { id: 'geometric', name: 'Islamic Geometric', url: 'https://example.com/bg/geometric.png' },
];

// Stickers for meme decoration
export const MEME_STICKERS = [
  { id: 'star', name: 'Star', url: 'https://example.com/stickers/star.png' },
  { id: 'crescent', name: 'Crescent', url: 'https://example.com/stickers/crescent.png' },
  { id: 'mosque', name: 'Mosque', url: 'https://example.com/stickers/mosque.png' },
  { id: 'lantern', name: 'Lantern', url: 'https://example.com/stickers/lantern.png' },
  { id: 'dates', name: 'Dates', url: 'https://example.com/stickers/dates.png' },
  { id: 'water', name: 'Water Drop', url: 'https://example.com/stickers/water.png' },
];

export default {
  createMeme,
  createMemeFromImage,
  getAllTemplates,
  getTemplateById,
  saveMemeToGallery,
  shareMeme,
  getRandomSuggestions,
  MEME_TEMPLATES,
  MEME_TEXT_SUGGESTIONS,
  MEME_FORMATS,
  TEXT_STYLES,
  RAMADAN_BACKGROUNDS,
  MEME_STICKERS,
};