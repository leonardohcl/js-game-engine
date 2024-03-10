import { Vector2d } from "./Vector";

export default class Rect2d {
  _start: Vector2d;
  _end: Vector2d;

  constructor(start: Vector2d, end: Vector2d) {
    this._start = start;
    this._end = end;
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get width() {
    return this.end.x - this.start.x;
  }

  get height() {
    return this.end.y - this.start.y;
  }

  get area() {
    return this.width * this.height;
  }

  get center() {
    const xCenter = this._start.x + this.width * 0.5;
    const yCenter = this._start.y + this.height * 0.5;
    return new Vector2d(xCenter, yCenter);
  }

  moveTo(position: Vector2d) {
    this.end.setX(position.x + this.width);
    this.end.setY(position.y + this.height);
    this.start.setX(position.x);
    this.start.setY(position.y);
  }
}
