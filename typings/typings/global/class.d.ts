type Class<T = any> = (new (...args: any[]) => T) & {prototype: object};

type ClassWithCtor<C = any[], T = any> = (new (...args: C) => T) & {prototype: object};

type ConstructorArgs<T> = T extends new(...args: infer U) => any ? U : never;
