import { Vector3d } from "../utils/Vector";

export default class Transform {
  private _position: Vector3d;

  constructor(position: Vector3d) {
    this._position = position
  }

  get position() {
    return this._position;
  }

  setPosition(position: Vector3d) {
    this._position = position
  }
}
