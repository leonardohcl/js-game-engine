import GameObject from "./GameObject";

export default class ObjectManager {
  static id: string = "game";
  static wrapper: Element;
  static objects: GameObject[] = [];

  private constructor() {}

  static boot() {
    const existing = document.querySelector(`#${ObjectManager.id}`);
    this.wrapper = existing || document.createElement("div");
    if (!existing) this.wrapper.id = ObjectManager.id;
  }

  static addObject(obj: GameObject) {
    ObjectManager.objects.push(obj);
    ObjectManager.wrapper.appendChild(obj.element);
  }
}
