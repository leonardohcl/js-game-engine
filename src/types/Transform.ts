import { Vector3d } from "./Vector";

export default class Transform {
  private _position: Vector3d;

  constructor(position?: Vector3d) {
    this._position = new Vector3d();
    if (position) this.setPosition(position);
  }

  get position() {
    return this._position;
  }

  setPosition(pos: Vector3d) {
    this.position.setX(pos.x);
    this.position.setY(pos.y);
    this.position.setZ(pos.z);
  }
}