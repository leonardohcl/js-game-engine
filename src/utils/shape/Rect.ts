import Shape from ".";
import Renderer from "../../types/engine/Renderer";
import { Vector2d, Vector3d } from "../Vector";

export default class Rect2d extends Shape {
  _start: Vector2d;
  _end: Vector2d;

  constructor(
    position: Vector3d,
    width: number,
    height: number,
    color: string = "white",
    pivot: "center" | "top-left" = "center"
  ) {
    super(position, color);
    const start = position.clone();
    if (pivot === "center") {
      const pad = new Vector2d(width / 2, height / 2);
      start.subtract(pad);
    }
    this._start = start;
    const end = start.clone();
    end.add(new Vector2d(width, height));
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

  get boundingPoints() {
    return [
      new Vector3d(this.start.x, this.start.y),
      new Vector3d(this.start.x, this.start.y + this.height),
      new Vector3d(this.start.x + this.width, this.start.y),
      new Vector3d(this.end.x, this.end.y),
    ];
  }

  toString(): string {
    return `start:${this.start}, end:${this.end}`;
  }

  place(position: Vector3d) {
    const start = position.clone();
    start.subtract(this.centerPad);

    const end = start.clone();
    end.add(new Vector3d(this.width, this.height, 0));

    this._start = start;
    this._end = end;
  }

  contains(point: Vector2d) {
    return point.coords.every((value, idx) => {
      return value >= this.start.coords[idx] && value <= this.end.coords[idx];
    });
  }

  intersects(shape: Shape) {
    return shape.boundingPoints.some((point) => this.contains(point));
  }

  draw() {
    Renderer.fillArea(this.color, this);
  }
}
