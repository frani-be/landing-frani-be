/** Converts `assets/images/foo.png` → `/images/foo.png` for public/ serving */
export function fixImagePath(src: string): string {
  if (!src) return src;
  return src.replace(/^assets\//, '/');
}
