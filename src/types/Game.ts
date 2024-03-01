import ObjectManager from "./ObjectManager";
import TimeEngine from "./TimeEngine";

export default class Game {
  _engine: TimeEngine;
  _objectManager: ObjectManager;

  constructor() {
    this._engine = TimeEngine.getInstance();
    this._objectManager = ObjectManager.getInstance();
  }

  get objectManager() {
    return this._objectManager;
  }

  get engine() {
    return this._engine;
  }
}
