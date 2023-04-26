export class Factory {
  static build<T, D extends any[]>(
    Cls: { new (...args: D): T },
    ...deps: D
  ) {
    return new Cls(...deps);
  }
}
