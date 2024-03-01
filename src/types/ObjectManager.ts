import GameObject from "./GameObject";

export default class ObjectManager {
  private static instance: ObjectManager;
  private _wrapper: HTMLElement;
  private _objects: GameObject[] = [];

  constructor() {
    this._wrapper = document.createElement("div");
    this._wrapper.id = "game";
    document.body.appendChild(this._wrapper);
  }

  get wrapper() {
    return this._wrapper;
  }

  get objects() {
    return this._objects;
  }

  static getInstance(): ObjectManager {
    if (!ObjectManager.instance) {
      ObjectManager.instance = new ObjectManager();
    }

    return ObjectManager.instance;
  }

  static addObject(obj: GameObject) {
    const manager = ObjectManager.getInstance();
    manager.objects.push(obj);
    manager.wrapper.appendChild(obj.element);
  }
}
