export class MathUtils {
  public static generateQueryRequestHash(): string {
    return Math.random().toString(36).substring(2, 7);
  }

  public static isNumeric(n: any): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}
