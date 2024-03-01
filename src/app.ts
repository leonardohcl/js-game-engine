import "./styles/main.scss";

import Game from "./types/Game";
import GameObject from "./types/GameObject";
import Reactive from "./types/Reactive";
import Random from "./utils/Random";

const STEP_SIZE = 10;
const POSITION_SQUARE_SIZE = 500;
const POSITION_SQUARE_OFFSET = 100;

class Test extends GameObject {
  value: number;
  constructor(value: number) {
    super({ initialize: false });
    this.value = value;
    this.init();
  }

  process(delta: number): void {
    super.process(delta);
    if (Random.number() < 0.9) return;

    const vertical = Random.integerRange(-STEP_SIZE, STEP_SIZE);
    const horizontal = Random.integerRange(-STEP_SIZE, STEP_SIZE);
    this.y.value! += vertical;
    this.x.value! += horizontal;
  }

  render() {
    const el = super.render();
    el.classList.add("test-object");
    // el.innerHTML = this.value?.toString();
    return el;
  }
}

const amount: Reactive<number> = new Reactive<number>();
amount.value = 100;

for (let i = 0; i < amount.value; i++) {
  const obj = new Test(i);
  const x = Random.integerRange(
    POSITION_SQUARE_OFFSET,
    POSITION_SQUARE_OFFSET + POSITION_SQUARE_SIZE
  );
  const y = Random.integerRange(
    POSITION_SQUARE_OFFSET,
    POSITION_SQUARE_OFFSET + POSITION_SQUARE_SIZE
  );
  obj.setPosition(x, y);
}

Game.startTime();
setTimeout(() => Game.stopTime(), 5000);
