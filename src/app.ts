import "./styles/main.scss";

import Game from "./types/Game";
import { Vector2d, Vector3d } from "./utils/Vector";
import Random from "./utils/Random";
import Rect2d from "./utils/shape/Rect";
import Renderer from "./types/Renderer";
import StaticBody from "./types/StaticBody";

const randomColorChannel = () => Random.integerRange(50, 240);

class Square extends StaticBody {
  private shape: Rect2d;

  constructor(side = 10, velocity = Random.point(STEP_RECT) as Vector3d) {
    super(velocity);
    const color = `rgba(${randomColorChannel()},${randomColorChannel()},${randomColorChannel()},${Random.range(
      0.5,
      1
    )})`;
    this.shape = new Rect2d(new Vector2d(), new Vector2d(side, side), color);
  }

  private get limit() {
    return new Vector2d(
      Renderer.width - this.shape.centerPad.x,
      Renderer.height - this.shape.centerPad.y
    );
  }

  process(deltaTime: number): void {
    super.process(deltaTime);
    const position = this.position.copy();
    const redirect = [1, 1, 1];
    const replace = this.position.coords;
    position.vectorOperation(position, (idx) => {
      const value = position.coords[idx];
      if (value <= this.shape.centerPad.coords[idx]) {
        redirect[idx] = -1;
        replace[idx] = this.shape.centerPad.coords[idx];
      } else if (value >= this.limit.coords[idx]) {
        redirect[idx] = -1;
        replace[idx] = this.limit.coords[idx];
      } 
    });

    this.velocity.multiply(redirect);
    this.setPosition(new Vector3d(...replace));
    this.shape.place(this.position);
  }

  draw() {
    this.shape.draw();
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

const amount = 1;

for (let i = 0; i < amount; i++) {
  const obj = new Square(100);
  const position = Random.point(area);
  obj.setPosition(position as Vector3d);
}

Game.start();
// setTimeout(() => Game.stop(), 50);
