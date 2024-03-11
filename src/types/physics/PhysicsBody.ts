import { Vector3d } from "../../utils/Vector";
import CollisionShape from "./CollisionShape";
import GameObject from "../GameObject";

export default class PhysicsBody extends GameObject {
  protected _mass = 1;
  protected _collisionShape?: CollisionShape;
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

  set collisionShape(value) {
    this._collisionShape = value;
    if (value) {
      value.parent = this;
    }
  }

  get collisionShape() {
    return this._collisionShape;
  }

  processPhysics(deltaTime: number) {
    const movement = this.velocity.clone();
    movement.multiply(deltaTime);
    const position = this.position.clone();
    position.add(movement);
    this.setPosition(position);
  }

  onCollision(_: GameObject) {}
}
