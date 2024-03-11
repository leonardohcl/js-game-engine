import Renderer from "../../types/engine/Renderer";
import { Vector2d } from "../Vector";

export const TOP_RIGHT_QUAD = "top-right";
export const TOP_LEFT_QUAD = "top-left";
export const BOTTOM_RIGHT_QUAD = "bottom-right";
export const BOTTOM_LEFT_QUAD = "bottom-left";

export type Quadrant =
  | typeof TOP_RIGHT_QUAD
  | typeof TOP_LEFT_QUAD
  | typeof BOTTOM_RIGHT_QUAD
  | typeof BOTTOM_LEFT_QUAD;

export default class Rect2d {
  private _start: Vector2d = new Vector2d();
  private _pivot: Vector2d = new Vector2d();
  private _width: number;
  private _height: number;
  color: string;

  constructor(
    position: Vector2d,
    width: number,
    height: number,
    pivot: Vector2d = new Vector2d(0.5, 0.5),
    color: string = "white"
  ) {
    this._width = width;
    this._height = height;
    this._pivot = pivot;
    this.color = color;
    this.place(position);
  }

  get pivot() {
    return this._pivot;
  }

  get size() {
    return new Vector2d(this.width, this.height);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get position() {
    return this.pivotCoords;
  }

  get start() {
    return this._start;
  }

  get end() {
    const end = this.start.clone();
    end.add(this.size);
    return end;
  }

  get area() {
    return this.width * this.height;
  }

  get center() {
    const center = this.size.clone();
    center.multiply(0.5);
    center.add(this.start);
    return center;
  }

  get pivotCoords() {
    const pivot = this.pivot.clone();
    pivot.multiply(this.size);
    pivot.add(this.start);
    return pivot;
  }

  toString(): string {
    return `start:${this.start}, end:${this.end}`;
  }

  place(position: Vector2d) {
    this._start = new Vector2d(
      position.x - this.width * this.pivot.x,
      position.y - this.height * this.pivot.y
    );
  }

  contains(point: Vector2d) {
    return (
      point.x >= this.start.x &&
      point.x <= this.end.x &&
      point.y >= this.start.y &&
      point.y <= this.end.y
    );
  }

  intersects(shape: Rect2d) {
    // if rectangle has area 0, no overlap
    if (
      this.start.x == this.end.x ||
      this.start.y == this.end.y ||
      shape.end.x == shape.start.x ||
      shape.start.y == shape.end.y
    )
      return false;

    // If one rectangle is on left side of other
    if (this.start.x > shape.end.x || shape.start.x > this.end.x) return false;

    // If one rectangle is above other
    if (this.end.y < shape.start.y || shape.end.y < this.start.y) return false;

    return true;
  }

  quadrant(quad: Quadrant) {
    const quadSize = this.size.clone();
    quadSize.multiply(0.5);
    let start = this.start.clone();
    if (quad === TOP_RIGHT_QUAD) {
      start.add(new Vector2d(quadSize.x));
    } else if (quad === BOTTOM_LEFT_QUAD) {
      start.add(new Vector2d(0, quadSize.y));
    } else if (quad === BOTTOM_RIGHT_QUAD) {
      start.add(quadSize);
    }
    return new Rect2d(
      start,
      quadSize.x,
      quadSize.y,
      new Vector2d(),
      this.color
    );
  }

  draw() {
    Renderer.fillArea(this.color, this);
  }
}
