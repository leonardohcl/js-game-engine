import CollisionManager from "./CollisionManager";
import ObjectManager from "./ObjectManager";
import PhysicsBody from "../physics/PhysicsBody";
import Renderer from "./Renderer";

export default class TimeEngine {
  private static lastTimestamp: number = 0;
  private static currentTimestamp: number = 0;
  private static deltaTime: number = 0;
  private static isPaused: boolean = true;
  private static framesPerSecond: number;
  private static frameTime: number;
  private static frameTimeCooldown: number;

  private static processMillisecondsDelay: number = 10;

  private constructor(maxfps = 30) {
    TimeEngine.framesPerSecond = maxfps;
    TimeEngine.frameTime = 1000 / TimeEngine.framesPerSecond;
    TimeEngine.frameTimeCooldown = TimeEngine.frameTime;
  }

  private static updateTimestamp() {
    const timestamp = new Date().getTime();
    TimeEngine.lastTimestamp = this.currentTimestamp || timestamp;
    TimeEngine.currentTimestamp = timestamp;
    TimeEngine.deltaTime = this.currentTimestamp - this.lastTimestamp;
  }

  private static process() {
    if (this.isPaused) return;
    this.updateTimestamp();
    this.frameTimeCooldown -= this.deltaTime;
    const isOnFrameCooldown = this.frameTimeCooldown > 0;

    if (!isOnFrameCooldown) {
      this.frameTimeCooldown = this.frameTime - this.frameTimeCooldown;
      CollisionManager.calculateCollisions()
      ObjectManager.objects.forEach((obj) => {
        obj.process(this.deltaTime);
        if (obj instanceof PhysicsBody) obj.processPhysics(this.deltaTime);
      });
    }

    window.requestAnimationFrame(() => Renderer.render());

    setTimeout(() => this.process(), this.processMillisecondsDelay);
  }

  static start() {
    TimeEngine.isPaused = false;
    TimeEngine.process();
  }

  static stop() {
    this.isPaused = true;
  }
}
