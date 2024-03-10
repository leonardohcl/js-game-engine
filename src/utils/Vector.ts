export class Vector2d {
  protected _x = 0;
  protected _y = 0;

  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  get x() {
    return this._x!;
  }

  get y() {
    return this._y!;
  }

  static get ZERO() {
    return new Vector2d(0, 0);
  }

  setX(value: number) {
    this._x = value;
  }

  setY(value: number) {
    this._y = value;
  }
}

export class Vector3d extends Vector2d {
  protected _z = 0;

  constructor(x = 0, y = 0, z = 0) {
    super(x, y);
    this._z = z;
  }

  get z() {
    return this._z!;
  }

  static get ZERO() {
    return new Vector3d(0, 0, 0);
  }

  setZ(value: number) {
    this._z = value;
  }
}
