export function openUrl(url: string | undefined, newTab: boolean): void {
  if (!url) return;
  if (newTab) {
    window.open(url, '_blank', 'noopener');
  } else {
    window.location.assign(url);
  }
}

/**
 * Hostname without the "www." prefix, or the input when it is not a valid URL
 */
export function hostnameOf(url: string | undefined): string {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Bundled wallpapers ship as large PNG/JPEG originals. Serve the screen-sized WebP copy instead.
 * Keep in sync with the preload snippet in index.html.
 */
export function optimizedWallpaper(src: string): string {
  const match = /^assets\/wallpapers\/([^/]+)\.(png|jpe?g)$/.exec(src);
  return match ? `assets/wallpapers/optimized/${match[1]}.webp` : src;
}

/**
 * Wallpaper blur per strength step (1–6), in pixels
 */
export const WALLPAPER_BLUR_STEPS = [2, 4, 6, 8, 12, 16];

export function wallpaperBlurPx(strength: number): number {
  const step = Math.min(Math.max(Number(strength) || 1, 1), WALLPAPER_BLUR_STEPS.length);
  return WALLPAPER_BLUR_STEPS[step - 1];
}

/**
 * Largest edge of an uploaded logo, in pixels
 */
const LOGO_MAX_SIZE = 256;

/**
 * Turn an uploaded image into a small data URL that fits in localStorage.
 * Raster images are scaled down to 256px on their longest edge. SVGs are kept as-is.
 */
export async function imageFileToDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('not-an-image');
  if (file.type === 'image/svg+xml') {
    if (file.size > 200_000) throw new Error('too-large');
    return readAsDataUrl(file);
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, LOGO_MAX_SIZE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/webp', 0.9);
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Whether the browser's locale writes time on a 24-hour clock, e.g. de-DE → true, en-US → false.
 * Dates and times use the browser's Intl locale, independent of the app's UI language.
 */
export function browserUses24h(): boolean {
  const format = new Intl.DateTimeFormat(undefined, { hour: 'numeric' });
  const cycle = format.resolvedOptions().hourCycle;
  if (cycle) return cycle === 'h23' || cycle === 'h24';
  return !format.formatToParts(new Date()).some((part) => part.type === 'dayPeriod');
}
