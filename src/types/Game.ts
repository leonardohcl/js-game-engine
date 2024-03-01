import GameObject from "./GameObject";
import ObjectManager from "./ObjectManager";
import TimeEngine from "./TimeEngine";

export default class Game {
  private static isBooted = false;
  static boot() {
    if (Game.isBooted) return;
    Game.isBooted = true;
    ObjectManager.boot();
    document.body.appendChild(ObjectManager.wrapper);
  }

  static startTime() {
    TimeEngine.start();
  }

  static stopTime() {
    TimeEngine.stop();
  }

  static addObject(obj: GameObject) {
    ObjectManager.addObject(obj);
  }
}

Game.boot();