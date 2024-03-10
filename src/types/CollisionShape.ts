import Shape from "../utils/shape/Shape";
import CollisionManager from "./CollisionManager";
import PhysicsBody from "./PhysicsBody";

export default class CollisionShape {
  parent?: PhysicsBody;
  shape: Shape;

  constructor(shape: Shape) {
    this.shape = shape;
    CollisionManager.addShape(this);
  }
}
