import { Vector3d } from "../utils/Vector";
import ObjectManager from "./engine/ObjectManager";
import Transform from "./Transform";

export default class GameObject {
  private _transform: Transform;

  constructor(position: Vector3d) {
    this._transform = new Transform(position);
    ObjectManager.addObject(this);
  }

  get position() {
    return this._transform.position;
  }

  setPosition(position: Vector3d) {
    this._transform.setPosition(position);
  }

  process(_: number) {}
  draw() {}
}
