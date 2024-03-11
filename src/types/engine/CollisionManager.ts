import { Vector2d } from "../../utils/Vector";
import Rect2d from "../../utils/shape/Rect2d";
import QuadTree from "../../utils/trees/QuadTree";
import PhysicsBody from "../physics/PhysicsBody";
import ObjectManager from "./ObjectManager";
import Renderer from "./Renderer";

export default class CollisionManager {
  private constructor() {}

  static calculateCollisions() {
    const qTree = new QuadTree<PhysicsBody>(
      new Rect2d(
        new Vector2d(),
        Renderer.width,
        Renderer.height,
        new Vector2d()
      )
    );

    ObjectManager.objects.forEach((obj) => {
      if (obj instanceof PhysicsBody) qTree.insert(obj);
    });

    qTree.list().forEach((obj) => {
      const colliding = qTree.search(obj.collider!);
      colliding.forEach((collisionEntity) => {
        if (collisionEntity === obj) return;
        collisionEntity.onCollision(obj, obj.velocity);
      });
    });
  }
}
