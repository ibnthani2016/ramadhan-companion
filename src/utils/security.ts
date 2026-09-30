// Security Utils - Input validation and sanitization

// Sanitize search query to prevent injection
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    // Remove potential XSS vectors
    .replace(/[<>]/g, '')
    // Remove control characters
    .replace(/[\x00-\x1F\x7F]/g, '')
    // Trim whitespace
    .trim()
    // Limit length
    .slice(0, 100);
};

// Validate PIN format
export const validatePin = (pin: string): { valid: boolean; error?: string } => {
  if (!pin) {
    return { valid: false, error: 'PIN is required' };
  }
  
  if (pin.length < 4) {
    return { valid: false, error: 'PIN must be at least 4 digits' };
  }
  
  if (pin.length > 8) {
    return { valid: false, error: 'PIN must be at most 8 digits' };
  }
  
  if (!/^\d+$/.test(pin)) {
    return { valid: false, error: 'PIN must contain only numbers' };
  }
  
  return { valid: true };
};

// Validate URL
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Escape HTML entities
export const escapeHtml = (text: string): string => {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  
  return text.replace(/[&<>"']/g, char => htmlEntities[char]);
};

export default {
  sanitizeInput,
  validatePin,
  isValidUrl,
  isValidEmail,
  escapeHtml,
};
