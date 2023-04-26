export declare class Factory {
    static build<T, D extends any[]>(Cls: {
        new (...args: D): T;
    }, ...deps: D): T;
}
