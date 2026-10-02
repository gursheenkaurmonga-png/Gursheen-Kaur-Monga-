/**
 * URL Helper & Media Sanitizer.
 * Automatically converts Google Drive, Dropbox, and Imgur web links into direct viewable/streamable media URLs,
 * and provides FileReader utilities for direct device uploads.
 */

export function cleanImageUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // 1. If it's already a data URL or relative path, return as is
  if (trimmed.startsWith('data:') || trimmed.startsWith('/') || trimmed.startsWith('./')) {
    return trimmed;
  }

  // 2. Google Drive links:
  // e.g. https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing
  // or https://drive.google.com/open?id=1ABC123xyz
  const gDriveMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (gDriveMatch && gDriveMatch[1]) {
    const fileId = gDriveMatch[1];
    // Google's direct CDN endpoint for images:
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // 3. Dropbox links:
  // https://www.dropbox.com/s/xyz/photo.jpg?dl=0 -> raw=1
  if (trimmed.includes('dropbox.com')) {
    return trimmed.replace(/[?&]dl=0/, '?raw=1').replace(/[?&]dl=1/, '?raw=1');
  }

  // 4. Imgur page links:
  // https://imgur.com/abc1234 -> https://i.imgur.com/abc1234.jpg
  if (trimmed.match(/^https?:\/\/imgur\.com\/([a-zA-Z0-9]+)$/)) {
    const id = trimmed.split('imgur.com/')[1];
    return `https://i.imgur.com/${id}.jpg`;
  }

  return trimmed;
}

export function cleanAudioUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  if (trimmed.startsWith('data:') || trimmed.startsWith('/') || trimmed.startsWith('./')) {
    return trimmed;
  }

  // 1. Google Drive direct audio link:
  const gDriveMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (gDriveMatch && gDriveMatch[1]) {
    const fileId = gDriveMatch[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  // 2. Dropbox direct audio:
  if (trimmed.includes('dropbox.com')) {
    return trimmed.replace(/[?&]dl=0/, '?dl=1').replace(/[?&]raw=1/, '?dl=1');
  }

  return trimmed;
}

export function validateMediaUrl(url: string, type: 'audio' | 'image'): {
  isValid: boolean;
  isStreamingPage?: boolean;
  warning?: string;
  cleanedUrl: string;
} {
  if (!url || !url.trim()) {
    return { isValid: false, cleanedUrl: '' };
  }

  const trimmed = url.trim();

  if (type === 'audio') {
    // Check if user pasted YouTube or Spotify web page
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      return {
        isValid: false,
        isStreamingPage: true,
        warning: 'YouTube links are video web pages and cannot be played directly by browsers. Please upload your MP3 file directly from your device below!',
        cleanedUrl: trimmed,
      };
    }

    if (trimmed.includes('spotify.com')) {
      return {
        isValid: false,
        isStreamingPage: true,
        warning: 'Spotify links require Spotify login and cannot be streamed as an HTML5 background audio file. Please upload an MP3 file directly from your device!',
        cleanedUrl: trimmed,
      };
    }

    const cleaned = cleanAudioUrl(trimmed);
    return { isValid: true, cleanedUrl: cleaned };
  } else {
    const cleaned = cleanImageUrl(trimmed);
    return { isValid: true, cleanedUrl: cleaned };
  }
}

/**
 * Converts a selected device file (photo or audio) to Base64 Data URL.
 * Works 100% offline with zero CORS or hosting requirements.
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to data URL'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
