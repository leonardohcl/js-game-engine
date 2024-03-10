import { Vector3d } from "../Vector";

export default class Shape {
  color: string;
  protected _position: Vector3d;

  constructor(position: Vector3d, color = "white") {
    this.color = color;
    this._position = position;
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
  intersects(shape: Shape) {
    return this.contains(shape.position);
  }
  
  get boundingPoints() {
    return [this.position]
  }

  get area() {
    return 0;
  }
}
