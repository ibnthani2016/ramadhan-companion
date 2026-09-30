// Theme - Typography System
import { TextStyle, Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  // Headings
  h1: {
    fontFamily,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  } as TextStyle,
  
  h2: {
    fontFamily,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  } as TextStyle,
  
  h3: {
    fontFamily,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  } as TextStyle,
  
  h4: {
    fontFamily,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,
  
  // Body
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } as TextStyle,
  
  bodyBold: {
    fontFamily,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,
  
  // Small
  caption: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  } as TextStyle,
  
  captionBold: {
    fontFamily,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  } as TextStyle,
  
  // Tiny
  tiny: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  } as TextStyle,
  
  // Button
  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,
  
  buttonSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  } as TextStyle,
};

export default typography;
