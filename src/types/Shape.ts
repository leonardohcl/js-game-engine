import Rect2d from "../utils/Rect";
import { Vector2d, Vector3d } from "../utils/Vector";
import Renderer from "./Renderer";
import VisualComponent from "./VisualComponent";

interface IShape {
  area: number;
  draw: () => void;
  setPosition: (position: Vector3d) => void;
}

export class Shape extends VisualComponent implements IShape {
  setPosition(_: Vector3d) {}
  draw() {}
  get area() {
    return 0;
  }
}

export class Rectangle extends Shape {
  protected _rect: Rect2d;
  color: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    super();
    this._rect = new Rect2d(
      new Vector2d(x, y),
      new Vector2d(x + width, y + height)
    );

    this.color = color;
  }

  get position() {
    return this._rect.center as Vector3d;
  }

  get area() {
    return this._rect.area;
  }

  draw() {
    Renderer.fillArea(this.color, this._rect);
  }

  setPosition(position: Vector3d): void {
    this.moveTo(position);
  }

  moveTo(position: Vector2d) {
    const halfWidth = this._rect.width * 0.5;
    const halfHeight = this._rect.height * 0.5;
    const newPosition = new Vector2d(
      position.x - halfWidth,
      position.y - halfHeight
    );
    this._rect.moveTo(newPosition);
  }
}
