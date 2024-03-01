import ObjectManager from "./ObjectManager";

export default class GameObject {
  x: number = 0;
  y: number = 0;
  width?: string;
  height?: string;
  private tag: string;
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
    this._element = this._render();
    this.updateRender();
    ObjectManager.addObject(this);
  }

  get element() {
    return this._element;
  }

  get transform() {
    return `translate(${this.x}px, ${this.y}px)`;
  }

  get style() {
    return {
      width: this.width,
      height: this.height,
      transform: this.transform,
    };
  }

  setSize(width: string, height: string) {
    this.width = width;
    this.height = height;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  updateRender() {
    const css = Object.entries(this.style)
      .map((set) => {
        const [key, value] = set;
        return `${key}: ${value};`;
      })
      .join("");
    this._element.style.cssText = css;
  }

  _render() {
    const el = document.createElement(this.tag);
    el.classList.add("game-object");
    if (this.classname) el.classList.add(this.classname);
    return el;
  }

  process(_: number) {}
}
