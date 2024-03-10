export class Vector {
  protected _dimensions: number = 0;
  protected _coords: number[] = [];

  constructor(dimensions: number, coords?: number[]) {
    this.dimensions = dimensions;
    if (coords) this.assign(coords);
  }

  get coords() {
    return [...this._coords];
  }

  protected get dimensions() {
    return this._dimensions;
  }

  protected set dimensions(value) {
    this._dimensions = value;
    this._coords = new Array(value).fill(0);
  }

  private solveValues(value: number | number[] | Vector): number[] {
    if (value instanceof Vector) return value.coords;
    if (typeof value === "number")
      return new Array(this.dimensions).fill(value);
    return value;
  }

  vectorOperation(
    value: number | number[] | Vector,
    operation: (idx: number, value: number) => void
  ) {
    const values = this.solveValues(value);
    for (let idx = 0; idx < this.dimensions && idx < values.length; idx++) {
      operation(idx, values[idx]);
    }
  }

  toString() {
    return `(${this._coords.join(", ")})`;
  }

  assign(value: number[] | Vector) {
    this.vectorOperation(value, (idx, value) => {
      this._coords[idx] = value;
    });
  }

  copy() {
    return new Vector(this.dimensions, this.coords);
  }

  equals(vector: Vector) {
    return this.coords.every(
      (_, idx) => this.coords[idx] === vector.coords[idx]
    );
  }

  add(value: number | number[] | Vector) {
    this.vectorOperation(value, (idx, value) => {
      this._coords[idx] += value;
    });
  }

  subtract(value: number | number[] | Vector) {
    this.vectorOperation(value, (idx, value) => {
      this._coords[idx] -= value;
    });
  }

  multiply(value: number | number[] | Vector) {
    this.vectorOperation(value, (idx, value) => {
      this._coords[idx] *= value;
    });
  }
}

export class Vector2d extends Vector {
  constructor(x = 0, y = 0) {
    super(2, [x, y]);
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

  copy() {
    return new Vector2d(this.x, this.y);
  }
}

export class Vector3d extends Vector2d {
  constructor(x = 0, y = 0, z = 0) {
    super();
    this.dimensions = 3;
    this.assign([x, y, z]);
  }

  set z(value) {
    this._coords[2] = value;
  }

  get z() {
    return this._coords[2] ?? 0;
  }

  copy() {
    return new Vector3d(this.x, this.y, this.z);
  }
}
