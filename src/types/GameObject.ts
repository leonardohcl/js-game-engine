import ObjectManager from "./ObjectManager";
import Reactive from "./Reactive";

export default class GameObject {
  x = new Reactive<number>(0);
  y = new Reactive<number>(0);
  private tag: string;
  private isRenderUpdated = false;
  private classname?: string;
  private _element!: HTMLElement;

  constructor({
    tag = "div",
    classname,
    initialize = true,
  }: {
    tag?: string;
    classname?: string;
    initialize?: boolean;
  } = {}) {
    this.tag = tag;
    this.classname = classname;
    if (initialize) this.init();
  }

  init() {
    this._element = this.render();
    this.updateRender();

    this.x.subscribe(() => this.setRenderUpdated());
    this.y.subscribe(() => this.setRenderUpdated());

    ObjectManager.addObject(this);
  }

  private setRenderUpdated(value = true) {
    this.isRenderUpdated = value;
  }

  get element() {
    return this._element;
  }

  get transform() {
    return `translate(${this.x.value}px, ${this.y.value}px)`;
  }

  get style() {
    return {
      transform: this.transform,
    };
  }

  setPosition(x: number, y: number) {
    this.x.value = x;
    this.y.value = y;
  }

  private updateRender() {
    const css = Object.entries(this.style)
      .map((set) => {
        const [key, value] = set;
        return `${key}: ${value};`;
      })
      .join("");
    this._element.style.cssText = css;
    this.setRenderUpdated(false);
  }

  protected render() {
    const el = document.createElement(this.tag);
    el.classList.add("game-object");
    if (this.classname) el.classList.add(this.classname);
    return el;
  }

  process(_: number) {
    if (this.isRenderUpdated) this.updateRender();
  }
}
