interface StringObject{
  [key: string]: string
}

type KeyExists<U, K> =
[K] extends [keyof U]
? true
: false;

/**
 * Creates an indexable object.
 *
 * Used when you get the
 * "Index signature of object type implicitly has an 'any' type"
 * error.
 *
 * You should cast the object to this type
 */
interface Indexer<T> {
  [id: string]: T;
}

/**
 * Mutates a property to optional
 *
 * Only root properties can be mutated
 */
type PartialK<T, K extends PropertyKey = PropertyKey> =
  Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K> extends infer O ?
  { [P in keyof O]: O[P] } : never;

/**
 * Creates an object with keys K and optional values T
 */
type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T; };

/**
 * Mutates nested properties to optional
 *
 */
type NestedPartialK<T, K extends PropertyKey = PropertyKey> =
T extends Function ? T :
T extends Array<any> ? Array<NestedPartialK<T[number], K>> :
T extends object ? PartialK<{ [P in keyof T]: NestedPartialK<T[P], K> }, K> :
T;

/**
 * Mutates nested properties to optional
 *
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends Readonly<infer U>[]
      ? Readonly<DeepPartial<U>>[]
      : DeepPartial<T[P]>
}

/**
 * Mutates a property to required
 *
 * Only root properties can be mutated
 */
type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Makes at least one property required
 */
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Mutates a property to be mutable instead of readonly
 *
 * Only root properties can be mutated
 */
type Mutable<T> = { -readonly [P in keyof T ]: T[P] };

/**
 * Mutates nested properties to be mutable instead of readonly
 *
 */
type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> };

/**
 * Gets keys
 */
type KeysMatching<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

/**
 * Mutates nested properties to be readonly
 *
 */
type DeepReadonly<T> = T extends primitive ? T : {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

/**
 * Get all valid nested paths of object
 */
type AllProps<Obj, Cache extends Array<Primitives> = []> =
 Obj extends Primitives ? Cache : {
   [Prop in keyof Obj]:
   | [...Cache, Prop] // <------ it should be unionized with recursion call
   | AllProps<Obj[Prop], [...Cache, Prop]>
}[keyof Obj]

/**
 * Gets the type of Object.entries
 * But excludes undefined keys ¯\_(ツ)_/¯
 */
type Entries<T> = ({
  [K in keyof T]: [K, T[K]]
}[keyof T])[]

type FromEntries<T> = T extends [infer Key, any][]
  ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, any]>[1] }
  : { [key in string]: any }

/**
 * Gets the type of Object.entries
 */
 type EntriesV2<T> = (Exclude<({
  [K in keyof T]: [K, Exclude<T[K], undefined>]
}[keyof T]), undefined>)[]

type NonNullAndRequired<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

/**
 * Gets the type of Object.values
 */
 type ObjValues<T> = {
  [K in keyof T]: T[K]
}[keyof T]

/**
 * Gets the type of Object.Keys
 */
 type ObjKeys<T> = keyof T

/**
 * Picks nested properties
 */
type NestedPick<T, K extends string[]> = T extends object ? {
  [P in Extract<keyof T, K[0]>]: NestedPick<T[P], Tail<K>>
} : T

/**
 * Returns an interface stripped of all keys that don't resolve to U, defaulting
 * to a non-strict comparison of T[key] extends U. Setting B to true performs
 * a strict type comparison of T[key] extends U & U extends T[key]
 */
 type KeysOfType<T, U, B = false> = {
  [P in keyof T]: B extends true
    ? T[P] extends U
      ? (U extends T[P]
        ? P
        : never)
      : never
    : T[P] extends U
      ? P
      : never;
}[keyof T];

/**
 * Omits properties that have type `never`. Utilizes key-remapping introduced in
 * TS4.1.
 *
 * @example
 * ```ts
 * type A = { x: never; y: string; }
 * OmitNever<A> // => { y: string; }
 * ```
 */
 type OmitNever<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

/**
 * Constructs a Record type that only includes shared properties between `A` and
 * `B`. If the value of a key is different in `A` and `B`, `SharedProperties<A,
 * B>` attempts to choose a type that is assignable to the types of both values.
 *
 * Note that this is NOT equivalent to `A & B`.
 *
 * @example
 * ```ts
 * type A = { x: string; y: string; }
 * type B = { y: string; z: string }
 * type C = { y: string | number; }
 *
 * A & B                  // => { x: string; y: string; z: string; }
 * SharedProperties<A, B> // => { y: string; }
 * SharedProperties<B, C> // => { y: string | number; }
 * ```
 */
type SharedProperties<A, B> = OmitNever<Pick<A & B, keyof A & keyof B>>;

type RequiredKeys<T> = { [K in keyof T]-?: object extends { [P in K]: T[K] } ? never : K }[keyof T];

type OptionalKeys<T> = { [K in keyof T]-?: object extends { [P in K]: T[K] } ? K : never }[keyof T];

type PickRequired<T> = Pick<T, RequiredKeys<T>>;

type PickOptional<T> = Pick<T, OptionalKeys<T>>;

type Nullable<T> = { [P in keyof T]: T[P] | null };
/**
 * Transforms optional properties to nullable
 */
type NullableOptional<T> = PickRequired<T> & Nullable<PickOptional<T>>;

interface ObjectConstructor {
  new(value?: any): Object;
  (): any;
  (value: any): any;

  /** A reference to the prototype for a class of objects. */
  readonly prototype: Object;

  /**
   * Returns an array of key/values of the enumerable properties of an object
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  // entries<O extends { [s: string]: T }>(o: O): EntriesV2<O>;

  // /**
  //  * Returns an array of key/values of the enumerable properties of an object
  //  * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
  //  */
  // entries<T>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];

  // /**
  // * Returns an array of key/values of the enumerable properties of an object
  // * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
  // */
  // entries(o: {}): [string, any][];

  /**
   * Returns the prototype of an object.
   * @param o The object that references the prototype.
   */
  getPrototypeOf(o: any): any;

  /**
   * Gets the own property descriptor of the specified object.
   * An own property descriptor is one that is defined directly on the object and is not inherited from the object's prototype.
   * @param o Object that contains the property.
   * @param p Name of the property.
   */
  getOwnPropertyDescriptor(o: any, p: PropertyKey): PropertyDescriptor | undefined;

  /**
   * Returns the names of the own properties of an object. The own properties of an object are those that are defined directly
   * on that object, and are not inherited from the object's prototype. The properties of an object include both fields (objects) and functions.
   * @param o Object that contains the own properties.
   */
  getOwnPropertyNames(o: any): string[];

  /**
   * Creates an object that has the specified prototype or that has null prototype.
   * @param o Object to use as a prototype. May be null.
   */
  create(o: object | null): any;

  /**
   * Creates an object that has the specified prototype, and that optionally contains specified properties.
   * @param o Object to use as a prototype. May be null
   * @param properties JavaScript object that contains one or more property descriptors.
   */
  create(o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;

  /**
   * Adds a property to an object, or modifies attributes of an existing property.
   * @param o Object on which to add or modify the property. This can be a native JavaScript object (that is, a user-defined object or a built in object) or a DOM object.
   * @param p The property name.
   * @param attributes Descriptor for the property. It can be for a data property or an accessor property.
   */
  defineProperty<T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): T;

  /**
   * Adds one or more properties to an object, and/or modifies attributes of existing properties.
   * @param o Object on which to add or modify the properties. This can be a native JavaScript object or a DOM object.
   * @param properties JavaScript object that contains one or more descriptor objects. Each descriptor object describes a data property or an accessor property.
   */
  defineProperties<T>(o: T, properties: PropertyDescriptorMap & ThisType<any>): T;

  /**
   * Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
   * @param o Object on which to lock the attributes.
   */
  seal<T>(o: T): T;

  /**
   * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
   * @param a Object on which to lock the attributes.
   */
  freeze<T>(a: T[]): readonly T[];

  /**
   * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
   * @param f Object on which to lock the attributes.
   */
  freeze<T extends Function>(f: T): T;

  /**
   * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
   * @param o Object on which to lock the attributes.
   */
  freeze<T>(o: T): Readonly<T>;

  /**
   * Prevents the addition of new properties to an object.
   * @param o Object to make non-extensible.
   */
  preventExtensions<T>(o: T): T;

  /**
   * Returns true if existing property attributes cannot be modified in an object and new properties cannot be added to the object.
   * @param o Object to test.
   */
  isSealed(o: any): boolean;

  /**
   * Returns true if existing property attributes and values cannot be modified in an object, and new properties cannot be added to the object.
   * @param o Object to test.
   */
  isFrozen(o: any): boolean;

  /**
   * Returns a value that indicates whether new properties can be added to an object.
   * @param o Object to test.
   */
  isExtensible(o: any): boolean;

  /**
   * Returns the names of the enumerable string properties and methods of an object.
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   */
  keys<O = undefined>(o: object): O extends undefined ? string[] : (keyof O)[];

  fromEntries<T extends Entries>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T };
}
