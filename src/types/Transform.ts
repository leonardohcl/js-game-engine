import { Vector3d } from "../utils/Vector";

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
    this._position = pos
  }
}
