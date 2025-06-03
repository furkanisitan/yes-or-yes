export class ResponsiveHelper {
  static getScale(): number {
    const width = window.innerWidth;
    if (width < 500) return 0.4;
    if (width < 900) return 0.7;
    if (width < 1200) return 0.85;
    return 1;
  }
}
