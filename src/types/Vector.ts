import Reactive from "./Reactive";

export class Vector2d {
  protected _x = new Reactive<number>(0);
  protected _y = new Reactive<number>(0);

  constructor(x = 0, y = 0) {
    this._x.value = x;
    this._y.value = y;
  }

  get x() {
    return this._x.value!;
  }

  get y() {
    return this._y.value!;
  }

  setX(value: number) {
    this._x.value = value;
  }

  setY(value: number) {
    this._y.value = value;
  }
}

export class Vector3d extends Vector2d {
  protected _z = new Reactive<number>(0);

  constructor(x = 0, y = 0, z = 0) {
    super(x, y);
    this._z.value = z;
  }

  get z() {
    return this._z.value!;
  }

  setZ(value: number) {
    this._z.value = value;
  }
}
