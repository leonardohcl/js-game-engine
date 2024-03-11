import "./styles/main.scss";

import Game from "./types/Game";
import { Vector2d, Vector3d } from "./utils/Vector";
import Random from "./utils/Random";
import Rect2d from "./utils/shape/Rect2d";
import Renderer from "./types/engine/Renderer";
import StaticBody from "./types/physics/StaticBody";
import PhysicsBody from "./types/physics/PhysicsBody";

const randomColorChannel = () => Random.integerRange(50, 240);
const randomColor = () =>
  `rgba(${randomColorChannel()},${randomColorChannel()},${randomColorChannel()},${Random.range(
    0.5,
    1
  )})`;

class MovingSquare extends StaticBody {
  private shape: Rect2d;

  constructor(
    position: Vector3d,
    side = 10,
    velocity = Random.point(STEP_RECT) as Vector3d
  ) {
    super(position, velocity);
    const color = randomColor();
    this.shape = new Rect2d(position, side, side, new Vector3d(), color);

    this._collider = this.shape;
  }

  private get limit() {
    return new Rect2d(
      new Vector2d(),
      Renderer.width,
      Renderer.height,
      new Vector2d()
    );
  }

  correctPath(limit: Rect2d) {
    const position = this.position.clone();
    const redirect = new Vector3d(1, 1, 1);
    if (position.x < limit.start.x) {
      position.x = limit.start.x;
      redirect.x = -1;
    }
    if (position.x + this.shape.width > limit.end.x) {
      position.x = limit.end.x - this.shape.width;
      redirect.x = -1;
    }
    if (position.y < limit.start.y) {
      position.y = limit.start.y;
      redirect.y = -1;
    }
    if (position.y + this.shape.height > limit.end.y) {
      position.y = limit.end.y - this.shape.height;
      redirect.y = -1;
    }
    this.velocity.multiply(redirect);
    this.setPosition(position);
  }

  processPhysics(deltaTime: number): void {
    super.processPhysics(deltaTime);
    this.correctPath(this.limit);
  }

  draw() {
    this.shape.place(this.position);
    this.shape.draw();
  }

  onCollision(obj: PhysicsBody): void {}
}
const STEP_SIZE = 0.5;
const STEP_RECT = new Rect2d(new Vector3d(), STEP_SIZE, STEP_SIZE);
const POSITION_SQUARE_SIZE = 800;
const POSITION_SQUARE_OFFSET = 50;

const area = new Rect2d(
  new Vector3d(POSITION_SQUARE_OFFSET, POSITION_SQUARE_OFFSET),
  POSITION_SQUARE_SIZE,
  POSITION_SQUARE_SIZE,
  new Vector3d()
);

const amount = 5;
const side = 200;

Game.start();

const spawnSquare = () => {
  new MovingSquare(Random.point(area) as Vector3d, side);
};

for (let i = 0; i < amount; i++) {
  spawnSquare();
}

// setTimeout(() => Game.stop(), 50);
