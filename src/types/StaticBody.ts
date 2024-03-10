import { Vector3d } from "../utils/Vector";
import PhysicsBody from "./PhysicsBody";

export default class StaticBody extends PhysicsBody {
  private _velocity: Vector3d;

  constructor(velocity = Vector3d.ZERO) {
    super();
    this._velocity = velocity;
  }

  get velocity() {
    return this._velocity;
  }

  process(deltaTime: number): void {
    super.process(deltaTime);
    const nextPosition = new Vector3d(
      this.position.x + this.velocity.x * deltaTime,
      this.position.y + this.velocity.y * deltaTime,
      this.position.z + this.velocity.z * deltaTime
    );
    this.setPosition(nextPosition as Vector3d);
  }
}
