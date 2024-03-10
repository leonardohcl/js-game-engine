import Shape2d from ".";
import Renderer from "../../types/Renderer";
import { Vector2d, Vector3d } from "../Vector";

export default class Rect2d extends Shape2d {
  _start: Vector2d;
  _end: Vector2d;

  constructor(start: Vector2d, end: Vector2d, color?: string) {
    const pad = end.clone()
    pad.subtract(start)
    pad.multiply(-1)
    super(start.x + pad.x, start.y + pad.y, 0, color);
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

  get centerPad() {
    return new Vector2d(this.width / 2, this.height / 2);
  }

  get area() {
    return this.width * this.height;
  }

  get corners() {
    return [
      this.start,
      new Vector2d(this.start.x, this.start.y + this.height),
      new Vector2d(this.start.x + this.width, this.start.y),
      this.end,
    ];
  }

  toString(): string {
    return `start:${this.start}, end:${this.end}`;
  }

  place(position: Vector3d) {
    const start = position.clone()
    start.subtract(this.centerPad)

    const end = start.clone()
    end.add(new Vector3d(this.width, this.height, 0));
    
    this._start = start;
    this._end = end;
  }

  contains(point: Vector2d) {
    return point.coords.every(
      (idx) =>
        point.coords[idx] >= this.start.coords[idx] &&
        point.coords[idx] <= this.end.coords[idx]
    );
  }

  intercepts(_: Shape2d) {
    return false;
  }

  draw() {
    Renderer.fillArea(this.color, this);
  }
}
