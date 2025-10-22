const STORAGE_KEY = "temp-deleted-bars";

function notifyUpdate() {
  window.dispatchEvent(new Event("deleted-bars-changed"));
}

export function getDeletedBarSlugs(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function markAsDeleted(slug: string) {
  const current = getDeletedBarSlugs();
  const updated = Array.from(new Set([...current, slug]));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyUpdate();
}

export function undoDelete(slug: string) {
  const current = getDeletedBarSlugs();
  const updated = current.filter((s) => s !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  notifyUpdate();
}

export function clearAllDeleted() {
  localStorage.removeItem(STORAGE_KEY);
  notifyUpdate();
}
