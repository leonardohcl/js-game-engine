export default class Random {
  static number(size: number = 1) {
    return Math.random() * size;
  }

  static range(min: number, max: number) {
    const size = max - min;
    return min + Random.number(size);
  }

  static integer(size: number = 1) {
    return Math.round(Random.number(size));
  }

  static integerRange(min: number, max: number) {
    return Math.round(Random.range(min, max));
  }
}
