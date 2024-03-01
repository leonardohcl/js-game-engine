export type SubscribedFunction<T> = (newValue: T, oldValue: T) => void;

export default class Reactive<T = any> {
  private proxy = new Proxy(
    {
      value: undefined as T,
      subscribers: [] as Array<SubscribedFunction<T>>,
    },
    {
      set(target, prop, newValue) {
        if (prop === "value") {
          if (newValue != target.value) {
            const old = target.value;
            target.value = newValue;
            target.subscribers.forEach((fn) => {
              fn(target.value, old);
            });
          }
        }
        return Reflect.set(target, prop, newValue);
      },
    }
  );

  constructor(value?: T) {
    this.value = value as T;
  }

  onDependencyChange?: (oldValue: T, newValue: T) => void;

  get value(): T | undefined {
    return this.proxy.value;
  }

  set value(x: T) {
    this.proxy.value = x;
  }

  subscribe(fn: SubscribedFunction<T>) {
    this.proxy.subscribers.push(fn);
  }
}
