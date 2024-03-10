import CollisionShape from "./CollisionShape";

export default class CollisionManager {
  static objects: CollisionShape[] = [];

  private constructor() {}

  static addShape(obj: CollisionShape) {
    CollisionManager.objects.push(obj);
  }

  static calculateCollisions() {
    for (let i = 0; i < CollisionManager.objects.length; i++) {
      const obj1 = CollisionManager.objects[i];
      for (let j = i + 1; j < CollisionManager.objects.length; j++) {
        const obj2 = CollisionManager.objects[j];
        if (obj1.shape.intersects(obj2.shape)) {
          if (obj2.parent) {
            obj1.parent?.onCollision(obj2.parent);
          }
          if (obj1.parent) {
            obj2.parent?.onCollision(obj1.parent);
          }
        }
      }
    }
  }
}
