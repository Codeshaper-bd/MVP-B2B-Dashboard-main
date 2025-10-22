import { type TMimeType } from "./url-to-file";

export type TUrlToFileInput = {
  url: RequestInfo | URL | undefined;
  filename: string | undefined;
  mimeType: TMimeType | undefined;
  lastModified?: number;
  // Add new cache-related options
  bypassCache?: boolean;
  cacheMaxAge?: number; // in milliseconds
};

// In-memory cache for storing fetched files
interface CacheEntry {
  file: File;
  timestamp: number;
}

// Cache implementation with expiration
export default class UrlToFileCache {
  private cache = new Map<string, CacheEntry>();
  private defaultMaxAge = 5 * 60 * 1000; // 5 minutes default cache time

  // Generate a unique cache key based on input parameters
  generateKey(input: TUrlToFileInput): string {
    const urlStr =
      typeof input.url === "string" ? input.url : input.url?.toString() || "";
    return `${urlStr}|${input.filename || ""}|${input.mimeType || ""}`;
  }

  // Get an item from cache if it exists and is not expired
  get(key: string, maxAge: number = this.defaultMaxAge): File | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > maxAge) {
      // Cache entry has expired
      this.cache.delete(key);
      return null;
    }

    return entry.file;
  }

  // Store an item in cache
  set(key: string, file: File): void {
    this.cache.set(key, {
      file,
      timestamp: Date.now(),
    });
  }

  // Clear entire cache
  clear(): void {
    this.cache.clear();
  }

  // Remove specific item from cache
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  // Clean expired entries
  cleanExpired(maxAge: number = this.defaultMaxAge): void {
    const now = Date.now();
    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > maxAge) {
        this.cache.delete(key);
      }
    });
  }

  // Get cache size
  get size(): number {
    return this.cache.size;
  }
}
