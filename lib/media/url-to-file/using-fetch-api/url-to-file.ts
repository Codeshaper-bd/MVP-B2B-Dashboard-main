import UrlToFileCache from "./cache-file-fetching";

export enum EMimeType {
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
  PDF = "application/pdf",
  DOC = "application/msword",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  SVG = "image/svg+xml",
  GIF = "image/gif",
  WEBP = "image/webp",
  AVIF = "image/avif",
  BMP = "image/bmp",
  ICO = "image/x-icon",
  TIFF = "image/tiff",
  HEIC = "image/heic",
  HEIF = "image/heif",
  MP4 = "video/mp4",
  WEBM = "video/webm",
  OGG = "video/ogg",
  MP3 = "audio/mp3",
  WAV = "audio/wav",
  OGA = "audio/ogg",
  AAC = "audio/aac",
  FLAC = "audio/flac",
  OPUS = "audio/opus",
}

export type TMimeType = `${EMimeType}`;

export type TUrlToFileInput = {
  url: RequestInfo | URL | undefined;
  filename: string | undefined;
  mimeType: TMimeType | undefined;
  lastModified?: number;
  bypassCache?: boolean;
  cacheMaxAge?: number; // in milliseconds
};

const fileCache = new UrlToFileCache();

export async function urlToFile({
  url,
  filename = new Date().toISOString(),
  mimeType,
  lastModified,
  bypassCache = false,
  cacheMaxAge,
}: TUrlToFileInput): Promise<File | null> {
  fileCache.cleanExpired();

  try {
    if (!url) {
      throw new Error("URL is required");
    }

    // Generate cache key for this request
    const cacheKey = fileCache.generateKey({ url, filename, mimeType });

    if (!bypassCache) {
      const cachedFile = fileCache.get(cacheKey, cacheMaxAge);
      if (cachedFile) {
        return cachedFile;
      }
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const blob = await response.blob();
    const file = new File([blob], filename, {
      type: mimeType,
      lastModified,
    });

    if (!bypassCache) {
      fileCache.set(cacheKey, file);
    }

    return file;
  } catch (error) {
    console.error("Error converting URL to file:", error);
    return null;
  }
}
