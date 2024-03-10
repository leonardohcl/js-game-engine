import Rect2d from "./shape/Rect";
import { Vector2d } from "./Vector";

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

  static point(area: Rect2d) {
    const x = Random.range(area.start.x, area.end.x);
    const y = Random.range(area.start.y, area.end.y);
    return new Vector2d(x, y);
  }
}
