import Rect2d from "../../utils/shape/Rect2d";
import Viewport from "../../utils/Viewport";
import ObjectManager from "./ObjectManager";

export default class Renderer {
  private static _id: string = "game";
  private static _wrapper: HTMLCanvasElement;
  private static _width = 0;
  private static _height = 0;

  private constructor() {}

  static boot() {
    document.body.style.margin = "0";
    document.body.style.width = "100dvw";
    document.body.style.height = "100dvh";
    document.body.style.overflow = "hidden";

    const existing = document.querySelector(`#${Renderer.id}`);
    if (existing)
      console.warn(
        `Couldn't start renderer: There is already an existing element with id ${Renderer.id}`
      );
    const wrapper = document.createElement("canvas");
    wrapper.id = Renderer.id;
    Renderer._wrapper = wrapper;
    Renderer.setSize();
    document.body.appendChild(Renderer._wrapper);
  }

  static get id() {
    return Renderer._id;
  }

  static get width() {
    return this._width;
  }

  static get height() {
    return this._height;
  }

  private static get ctx() {
    return Renderer._wrapper.getContext("2d")!;
  }

  private static setSize() {
    const { width, height } = Viewport.size();
    this._width = width;
    this._height = height;
    this._wrapper.width = Renderer._width;
    this._wrapper.height = Renderer._height;
  }

  static clear() {
    this.ctx.clearRect(0, 0, this._width, this._height);
  }

  static render() {
    this.clear();
    ObjectManager.objects.forEach((obj) => obj.draw());
  }

  static fillArea(color: string, area: Rect2d) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(area.start.x, area.start.y, area.width, area.height);
    this.ctx.restore();
  }

  static strokeArea(color: string, width: number,  area: Rect2d) {
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.strokeRect(area.start.x, area.start.y, area.width, area.height);
    this.ctx.restore();
  }
}
