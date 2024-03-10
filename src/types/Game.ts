import GameObject from "./GameObject";
import ObjectManager from "./ObjectManager";
import Renderer from "./Renderer";
import TimeEngine from "./TimeEngine";

export default class Game {
  private constructor() {}

  static start() {
    Renderer.boot()
    TimeEngine.start();
  }

  static stop() {
    TimeEngine.stop();
  }

  static addObject(obj: GameObject) {
    ObjectManager.addObject(obj);
  }
}
