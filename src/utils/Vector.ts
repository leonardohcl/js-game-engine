export class Vector {
  protected _coords: number[];

  constructor(coords: number[] = []) {
    this._coords = coords;
  }

  get coords() {
    return this._coords;
  }

  toString() {
    return `(${this._coords.join(", ")})`;
  }

  clone() {
    return new Vector([...this.coords]);
  }

  equals(vector: Vector) {
    return this.coords.every(
      (_, idx) => this.coords[idx] === vector.coords[idx]
    );
  }

  add(value: number | Vector) {
    const getValue =
      value instanceof Vector
        ? (idx: number) => value.coords[idx] ?? 0
        : () => value;
    this._coords = this._coords.map((coord, idx) => coord + getValue(idx));
  }

  subtract(value: number | Vector) {
    const getValue =
      value instanceof Vector
        ? (idx: number) => value.coords[idx] ?? 0
        : () => value;
    this._coords = this._coords.map((coord, idx) => coord - getValue(idx));
  }

  multiply(value: number | Vector) {
    const getValue =
      value instanceof Vector
        ? (idx: number) => value.coords[idx] ?? 0
        : () => value;
    this._coords = this._coords.map((coord, idx) => coord * getValue(idx));
  }
}

export class Vector2d extends Vector {
  constructor(x = 0, y = 0) {
    super([x, y]);
  }

  set x(value) {
    this._coords[0] = value;
  }

  set y(value) {
    this._coords[1] = value;
  }

  get x() {
    return this._coords[0];
  }

  get y() {
    return this._coords[1];
  }

  clone() {
    return new Vector2d(this.x, this.y);
  }
}

export class Vector3d extends Vector2d {
  constructor(x = 0, y = 0, z = 0) {
    super(x, y);
    this._coords.push(z);
  }

  set z(value) {
    this._coords[2] = value;
  }

  get z() {
    return this._coords[2];
  }

  clone() {
    return new Vector3d(this.x, this.y, this.z);
  }
}
