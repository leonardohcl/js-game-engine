import GameObject from "../GameObject";

export default class ObjectManager {
  static objects: GameObject[] = [];

  private constructor() {}

  static addObject(obj: GameObject) {
    ObjectManager.objects.push(obj);
  }
}
