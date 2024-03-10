import { Vector3d } from "../Vector";

export interface IShape {
  color: string;
  area: number;
  draw: () => void;
  place: (position: Vector3d) => void;
  contains: (point: Vector3d) => boolean;
  intercepts: (shape: Shape) => boolean;
}

export default class Shape implements IShape {
  color: string;
  protected _position: Vector3d;

  constructor(x = 0, y = 0, z = 0, color = "white") {
    this.color = color;
    this._position = new Vector3d(x, y, z);
  }

  get position() {
    return this._position;    
  }
  toString() {
    return `${this.position}`
  }
  draw() {}
  place(_: Vector3d) {}
  contains(point: Vector3d) {
    return this.position.equals(point);
  }
  intercepts(shape: Shape) {
    return this.contains(shape.position);
  }
  get area() {
    return 0;
  }
}
