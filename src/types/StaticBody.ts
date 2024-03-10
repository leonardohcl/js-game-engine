import { Vector3d } from "../utils/Vector";
import PhysicsBody from "./PhysicsBody";

export default class StaticBody extends PhysicsBody {
  private _velocity: Vector3d;

  constructor(velocity = new Vector3d()) {
    super();
    this._velocity = velocity;
  }

  get velocity() {
    return this._velocity;
  }

  process(deltaTime: number): void {
    super.process(deltaTime);
    const movement = this.velocity.copy()
    movement.multiply(deltaTime)
    const position = this.position.copy()
    position.add(movement)
    this.setPosition(position);
  }
}
