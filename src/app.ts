import "./styles/main.scss";

import Game from "./types/Game";
import GameObject from "./types/GameObject";

class Test extends GameObject {
  value: number;
  constructor(value: number) {
    super({ initialize: false });
    this.value = value;
    this.init();
  }

  process(delta: number): void {
    super.process(delta);
    const vertical =
      Math.ceil(Math.random() * 8) * (Math.random() > 0.5 ? 1 : -1);
    const horizontal =
      Math.ceil(Math.random() * 8) * (Math.random() > 0.5 ? 1 : -1);
    this.y += vertical;
    this.x += horizontal;
  }

  _render() {
    const el = super._render();
    el.classList.add("test-object");
    el.innerHTML = this.value?.toString();
    return el;
  }
}

const game = new Game();

const amount = 25;

for (let i = 0; i < amount; i++) {
  const obj = new Test(i);
  const x = 100 + Math.ceil(Math.random() * 200);
  const y = 100 + Math.ceil(Math.random() * 200);
  obj.setPosition(x, y);
  obj.setSize("20px", "20px");
}

game.engine.start();
setTimeout(() => game.engine.stop(), 5000);
