import GameObject from "./GameObject";
import ObjectManager from "./ObjectManager";
import TimeEngine from "./TimeEngine";

export default class Game {
  static boot() {
    ObjectManager.boot();
    document.body.appendChild(ObjectManager.wrapper);
  }

  static start() {
    TimeEngine.start();
  }

  static stop() {
    TimeEngine.stop();
  }

  static addObject(obj: GameObject) {
    ObjectManager.addObject(obj);
  }
}
