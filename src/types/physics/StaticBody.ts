import { Vector3d } from "../../utils/Vector";
import PhysicsBody from "./PhysicsBody";

export default class StaticBody extends PhysicsBody {
  constructor(position: Vector3d, velocity: Vector3d) {
    super(position, velocity);
  }

  processPhysics(deltaTime: number): void {
    super.processPhysics(deltaTime);
  }

  onCollision(obj: PhysicsBody, force: Vector3d) {}
}
