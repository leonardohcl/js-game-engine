import GameObject from "./GameObject";
import ObjectManager from "./engine/ObjectManager";
import Renderer from "./engine/Renderer";
import TimeEngine from "./engine/TimeEngine";

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
