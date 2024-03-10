import "./styles/main.scss";

import Game from "./types/Game";
import { Vector2d, Vector3d } from "./utils/Vector";
import Random from "./utils/Random";
import Rect2d from "./utils/shape/Rect";
import Renderer from "./types/Renderer";
import StaticBody from "./types/StaticBody";
import CollisionShape from "./types/CollisionShape";

const randomColorChannel = () => Random.integerRange(50, 240);

class Square extends StaticBody {
  private shape: Rect2d;
  slowRate = 1;

  constructor(
    position: Vector3d,
    side = 10,
    velocity = Random.point(STEP_RECT) as Vector3d
  ) {
    super(position, velocity);
    const color = `rgba(${randomColorChannel()},${randomColorChannel()},${randomColorChannel()},${Random.range(
      0.5,
      1
    )})`;
    this.shape = new Rect2d(position, side, side, color);
    this.collisionShape = new CollisionShape(this.shape);
  }

  private get limit() {
    return new Vector2d(
      Renderer.width - this.shape.centerPad.x,
      Renderer.height - this.shape.centerPad.y
    );
  }

  processPhysics(deltaTime: number): void {
    super.processPhysics(deltaTime);
    const position = this.position.clone();
    const redirect = new Vector3d(1, 1, 1);
    const replace = this.position.coords;
    position.coords.forEach((value, idx) => {
      if (value <= this.shape.centerPad.coords[idx]) {
        redirect.coords[idx] = -this.slowRate;
        replace[idx] = this.shape.centerPad.coords[idx];
      } else if (value >= this.limit.coords[idx]) {
        redirect.coords[idx] = -this.slowRate;
        replace[idx] = this.limit.coords[idx];
      }
    });
    this.velocity.multiply(redirect);
    this.setPosition(new Vector3d(...replace));
  }

  draw() {
    this.shape.place(this.position);
    this.shape.draw();
  }
}
const STEP_SIZE = 0.5;
const STEP_RECT = new Rect2d(new Vector3d(), STEP_SIZE, STEP_SIZE);
const POSITION_SQUARE_SIZE = 700;
const POSITION_SQUARE_OFFSET = 100;

const area = new Rect2d(
  new Vector3d(POSITION_SQUARE_OFFSET, POSITION_SQUARE_OFFSET),
  POSITION_SQUARE_SIZE,
  POSITION_SQUARE_SIZE
);

const amount = 10;
const side = 25

const spawnSquare = () => {
  new Square(Random.point(area) as Vector3d, side);
};

for (let i = 0; i < amount; i++) {
  spawnSquare()
}

Game.start();
// setTimeout(() => Game.stop(), 50);
