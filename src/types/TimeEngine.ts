import ObjectManager from "./ObjectManager";

export default class TimeEngine {
  private static instance: TimeEngine;

  private lastTimestamp: number = 0;
  private currentTimestamp: number = 0;
  private deltaTime: number = 0;
  private isPaused: boolean = true;
  private framesPerSecond: number;
  private frameTime: number;
  private frameTimeCooldown: number;

  private processMillisecondsDelay: number = 10;
  private objManager: ObjectManager = ObjectManager.getInstance();

  constructor(maxfps = 30) {
    this.framesPerSecond = maxfps;
    this.frameTime = 1000 / this.framesPerSecond;
    this.frameTimeCooldown = this.frameTime
  }

  private updateTimestamp() {
    const timestamp = new Date().getTime();
    this.lastTimestamp = this.currentTimestamp || timestamp;
    this.currentTimestamp = timestamp;
    this.deltaTime = this.currentTimestamp - this.lastTimestamp;
  }

  private process() {
    if (this.isPaused) return;
    this.updateTimestamp();
    this.frameTimeCooldown -= this.deltaTime;
    const isOnFrameCooldown = this.frameTimeCooldown > 0

    if (!isOnFrameCooldown ){
      this.frameTimeCooldown = this.frameTime - this.frameTimeCooldown;
      this.objManager.objects.forEach((obj) => {
        obj.process(this.deltaTime);
        obj.updateRender();
      });
    }
  
    setTimeout(() => this.process(), this.processMillisecondsDelay);
  }

  static getInstance(): TimeEngine {
    if (!TimeEngine.instance) {
      TimeEngine.instance = new TimeEngine();
    }

    return TimeEngine.instance;
  }

  start() {
    this.isPaused = false;
    this.process();
  }

  stop() {
    this.isPaused = true;
  }
}
