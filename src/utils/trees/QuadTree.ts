import GameObject from "../../types/GameObject";
import Renderer from "../../types/engine/Renderer";
import { Vector2d } from "../Vector";
import Rect2d, {
  BOTTOM_LEFT_QUAD,
  BOTTOM_RIGHT_QUAD,
  TOP_LEFT_QUAD,
  TOP_RIGHT_QUAD,
} from "../shape/Rect2d";

export default class QuadTree<T extends GameObject = GameObject> {
  private boundary: Rect2d;
  private divided: boolean = false;
  private capacity: number;
  private objects: T[] = [];
  private topRight?: QuadTree<T>;
  private topLeft?: QuadTree<T>;
  private bottomRight?: QuadTree<T>;
  private bottomLeft?: QuadTree<T>;

  constructor(boundary: Rect2d, capacity: number = 1) {
    this.boundary = boundary;
    this.capacity = capacity;
  }

  get area() {
    return this.boundary;
  }

  subdivide() {
    if (this.divided) return;
    this.divided = true;
    this.topRight = new QuadTree(
      this.boundary.quadrant(TOP_RIGHT_QUAD),
      this.capacity
    );
    this.topLeft = new QuadTree(
      this.boundary.quadrant(TOP_LEFT_QUAD),
      this.capacity
    );
    this.bottomRight = new QuadTree(
      this.boundary.quadrant(BOTTOM_RIGHT_QUAD),
      this.capacity
    );
    this.bottomLeft = new QuadTree(
      this.boundary.quadrant(BOTTOM_LEFT_QUAD),
      this.capacity
    );
  }

  insert(obj: T) {
    if (!this.boundary.contains(obj.position)) return false;
    if (this.objects.length < this.capacity) {
      this.objects.push(obj);
      return true;
    } else {
      this.subdivide();
      if (this.topRight!.insert(obj)) return true;
      else if (this.topLeft!.insert(obj)) return true;
      else if (this.bottomRight!.insert(obj)) return true;
      else if (this.bottomLeft!?.insert(obj)) return true;
      return false;
    }
  }

  search(area: Rect2d): T[] {
    const found: T[] = [];
    if (!this.boundary.intersects(area)) return found;
    this.objects.forEach((obj) => {
      if (area.contains(obj.position)) found.push(obj);
    });
    return [
      ...found,
      ...(this.topRight?.search(area) ?? []),
      ...(this.topLeft?.search(area) ?? []),
      ...(this.bottomRight?.search(area) ?? []),
      ...(this.bottomLeft?.search(area) ?? []),
    ];
  }

  draw() {
    Renderer.strokeArea("black", 1, this.boundary);
    this.bottomLeft?.draw();
    this.bottomRight?.draw();
    this.topRight?.draw();
    this.topLeft?.draw();
  }

  list(): T[] {
    return [
      ...this.objects,
      ...(this.topRight?.list() ?? []),
      ...(this.topLeft?.list() ?? []),
      ...(this.bottomRight?.list() ?? []),
      ...(this.bottomLeft?.list() ?? []),
    ];
  }
}
