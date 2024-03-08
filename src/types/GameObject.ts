import ObjectManager from "./ObjectManager";
import Transform from "./Transform";

export default class GameObject {
  private _transform: Transform;

  private tag: string;
  private classname?: string;
  private _element!: HTMLElement;

  constructor({
    tag = "div",
    classname,
  }: {
    tag?: string;
    classname?: string;
    initialize?: boolean;
  } = {}) {
    this.tag = tag;
    this.classname = classname;
    this._element = this.render();
    this._transform = new Transform()
    this.updateRender();

    ObjectManager.addObject(this);
  }

  get transform() {
    return this._transform;
  }

  get element() {
    return this._element;
  }

  get CSSTransform() {
    return `translate(${this.transform.position.x}px, ${this.transform.position.y}px)`;
  }

  get style() {
    return {
      transform: this.CSSTransform,
    };
  }

  private updateRender() {
    const css = Object.entries(this.style)
      .map((set) => {
        const [key, value] = set;
        return `${key}: ${value};`;
      })
      .join("");
    this._element.style.cssText = css;
  }

  protected render() {
    const el = document.createElement(this.tag);
    el.classList.add("game-object");
    if (this.classname) el.classList.add(this.classname);
    return el;
  }

  process(_: number) {
    this.updateRender();
  }
}
