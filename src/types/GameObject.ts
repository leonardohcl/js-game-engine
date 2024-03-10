import { Vector3d } from "../utils/Vector";
import ObjectManager from "./ObjectManager";
import Transform from "./Transform";

export default class GameObject {
  private _transform: Transform;

  constructor() {
    this._transform = new Transform();

    ObjectManager.addObject(this);
  }

  get position() {
    return this._transform.position;
  }

  setPosition(position: Vector3d) {
    this._transform.setPosition(position);
  }

  process(_: number) {}
  physicsProcess(_: number) {}
  draw() {}
}
