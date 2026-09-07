/** Small colour helpers — hex ⇄ HSV (h 0–360, s/v 0–1). */
export function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
export function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b].map((n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0').toUpperCase()).join('');
}
export function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return [h, max ? d / max : 0, max];
}
export function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0]; else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c]; else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}
export function hexToHsv(hex: string): [number, number, number] {
  const rgb = hexToRgb(hex) ?? [0, 0, 0];
  return rgbToHsv(...rgb);
}
export function hsvToHex(h: number, s: number, v: number): string {
  return rgbToHex(...hsvToRgb(h, s, v));
}
