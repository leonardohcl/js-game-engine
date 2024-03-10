import "./styles/main.scss";

import Game from "./types/Game";
import { Vector2d, Vector3d } from "./utils/Vector";
import Random from "./utils/Random";
import { Rectangle } from "./types/Shape";
import Rect2d from "./utils/Rect";
import Renderer from "./types/Renderer";
import StaticBody from "./types/StaticBody";

class Square extends StaticBody {
  private side: number;
  private rect: Rectangle;

  constructor(side = 10, velocity = Random.point(STEP_RECT) as Vector3d) {
    super(velocity);
    this.rect = new Rectangle(0, 0, side, side, "rgba(0,0,0,0.6)");
    this.side = side;
  }

  private get centerPad() {
    return this.side * 0.5;
  }

  private get limitX() {
    return Renderer.width - this.centerPad;
  }

  private get limitY() {
    return Renderer.height - this.centerPad;
  }

  process(deltaTime: number): void {
    super.process(deltaTime);
    if (this.position.x < this.centerPad) {
      this.position.setX(this.centerPad);
      this.velocity.setX(-this.velocity.x);
    } else if (this.position.x >= this.limitX) {
      this.position.setX(this.limitX);
      this.velocity.setX(-this.velocity.x);
    }
    if (this.position.y < this.centerPad) {
      this.velocity.setY(-this.velocity.y)
      this.position.setY(this.centerPad);
    } else if (this.position.y >= this.limitY) {
      this.position.setY(this.limitY);
      this.velocity.setY(-this.velocity.y)
    }
    this.rect.setPosition(this.position);
  }

  draw() {
    this.rect.draw();
  }
}
const STEP_SIZE = 0.2;
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
