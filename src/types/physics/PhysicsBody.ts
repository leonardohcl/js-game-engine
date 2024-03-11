import { Vector3d } from "../../utils/Vector";
import Rect2d from "../../utils/shape/Rect2d";
import GameObject from "../GameObject";

export default class PhysicsBody extends GameObject {
  protected _mass = 1;
  protected _collider?: Rect2d;
  protected _velocity: Vector3d;

  constructor(position: Vector3d, velocity: Vector3d) {
    super(position);
    this._velocity = velocity;
  }

  get mass() {
    return this._mass;
  }

  get velocity() {
    return this._velocity;
  }

  get collider(){
    return this._collider;
  }

  processPhysics(deltaTime: number) {
    const movement = this.velocity.clone();
    movement.multiply(deltaTime);
    const position = this.position.clone();
    position.add(movement);
    this.setPosition(position);
  }

  onCollision(obj: PhysicsBody, force:Vector3d) {}
}
