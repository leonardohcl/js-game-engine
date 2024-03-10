import "./styles/main.scss";

import Game from "./types/Game";
import { Vector2d, Vector3d } from "./utils/Vector";
import Random from "./utils/Random";
import { Rectangle } from "./types/Shape";
import Rect2d from "./utils/Rect";
import Renderer from "./types/Renderer";

class Square extends Rectangle {
  private side: number;
  private speed = 0.2;
  private dir: Vector2d;

  constructor(side = 10) {
    super(0, 0, side, side, "rgba(0,0,0,0.6)");
    this.side = side;
    this.dir = Random.point(STEP_RECT);
  }

  private get centerPad() {
    return this.side * 0.5;
  }

  process(deltaTime: number): void {
    let newPosition = this.getNextPosition(deltaTime);
    let changedDir = false;
    if (
      newPosition.x <= this.centerPad ||
      newPosition.x >= Renderer.width - this.centerPad
    ) {
      changedDir = true;
      this.dir.setX(-this.dir.x);
    }
    if (
      newPosition.y <= this.centerPad ||
      newPosition.y >= Renderer.height - this.centerPad
    ) {
      changedDir = true;
      this.dir.setY(-this.dir.y);
    }

    if (changedDir) newPosition = this.getNextPosition(deltaTime)
    this.setPosition(newPosition as Vector3d);
  }

  getNextPosition(deltaTime: number) {
    return new Vector2d(
      this.position.x + this.dir.x * this.speed * deltaTime,
      this.position.y + this.dir.y * this.speed * deltaTime
    );
  }
}
const STEP_SIZE = 1;
const STEP_RECT = new Rect2d(
  new Vector2d(-STEP_SIZE, -STEP_SIZE),
  new Vector2d(STEP_SIZE, STEP_SIZE)
);
const POSITION_SQUARE_SIZE = 500;
const POSITION_SQUARE_OFFSET = 100;

const area = new Rect2d(
  new Vector2d(POSITION_SQUARE_OFFSET, POSITION_SQUARE_OFFSET),
  new Vector2d(
    POSITION_SQUARE_OFFSET + POSITION_SQUARE_SIZE,
    POSITION_SQUARE_OFFSET + POSITION_SQUARE_SIZE
  )
);

const amount = 100;

for (let i = 0; i < amount; i++) {
  const obj = new Square(25);
  const position = Random.point(area);
  obj.setPosition(position as Vector3d);
}

Game.start();
// setTimeout(() => Game.stop(), 5000);
