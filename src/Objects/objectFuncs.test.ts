/* eslint-disable max-classes-per-file */
import * as jsonFuncs from './objectFuncs';
import * as DATA from './objectTestData';

describe('JSON utility functions test', () => {
  it('[objectPaths]: Should return all possible paths of an object', () => {
    const res = jsonFuncs.objectPaths(DATA.NestedObjArray);
    res.sort();
    const expectedResult = [...DATA.Results.ObjectPaths.NestedObjArray].sort();
    expect(res).toEqual(expectedResult);
  });

  it('[objectPathsWithValues]: Should return all possible paths of an object with respective values', () => {
    const res = jsonFuncs.objectPathsWithValues(DATA.NestedObjArray);
    const expectedResult = DATA.Results.objectPathsWithValues.NestedObjArray;
    expect(res).toEqual(expectedResult);
  });

  it('[valueByProperty]: Should return a value by a property name or pattern', () => {
    const res = jsonFuncs.valueByProperty(DATA.NestedObjArray2, 'value');
    expect(res).toEqual('Cor');

    const res2 = jsonFuncs.valueByProperty(DATA.NestedObjArray2, 'subItem');

    expect(res2).toEqual(DATA.Results.valueByProperty.NestedObjArray2);
  });

  it('[valuesByProperty]: Should return an array of values by a property name or pattern', () => {
    const res = jsonFuncs.valuesByProperty(DATA.restrictedLogInForms, /^data-cy/);

    expect(res).toEqual(expect.arrayContaining(DATA.Results.valuesByProperty.restrictedLogInForms));
    expect(res.length).toEqual(DATA.Results.valuesByProperty.restrictedLogInForms.length);
  });

  it('[getObjPathByKey]: Should return a path for a given key', () => {
    const res = jsonFuncs.getObjPathByKey({
      key: 'title',
      obj: DATA.ObjectWithNestedArray,
    });
    expect(res).toEqual(DATA.Results.getObjPathByKey.ObjectWithNestedArray);
  });

  it('[omitDeep]: Should remove keys from an object', () => {
    const res = jsonFuncs.omitDeep(DATA.ObjectWithNestedArray, ['createdAt', 'name']);
    expect(res).toEqual(DATA.Results.omitDeep.ObjectWithNestedArray);
  });

  it('[modKeyDeep]: Should modify keys from an object for a regex pattern', () => {
    const res = jsonFuncs.modKeyDeep(DATA.ObjWithDotsInKeys, /\./, '-');
    expect(res).toEqual(DATA.Results.modKeyDeep.ObjWithDotsInKeys);
  });

  it('[matchKeyDeep]: Should recursively filter object keys by a pattern', () => {
    const res = jsonFuncs.matchKeyDeep(DATA.ObjWithDotsInKeys, /\./);
    expect(res).toEqual(DATA.Results.matchKeyDeep.ObjWithDotsInKeys);
  });

  it('[matchKeyDeepInArray]: Should recursively filter an array of object keys by a pattern', () => {
    const res = jsonFuncs.matchKeyDeepInArray(DATA.ArrayOfObjsWithDotsInKeys, /\./);
    expect(res).toEqual(DATA.Results.matchKeyDeepInArray.ArrayOfObjsWithDotsInKeys);
  });

  it('[matchKeyShallow]: Should filter object keys by a pattern', () => {
    const res = jsonFuncs.matchKeyShallow(DATA.ObjWithDotsInKeys, /\./);
    expect(res).toEqual(DATA.Results.matchKeyShallow.ObjWithDotsInKeys);
  });

  it('[getValueByKey]: Should get the value of the first matching key', () => {
    const res = jsonFuncs.getValueByKey(DATA.ObjectWithNestedArray, 'title');
    expect(res).toEqual(DATA.Results.getValueByKey.ObjectWithNestedArray);
  });

  it('[rmvObjDuplicates]: Should get the key of the first matching value', () => {
    const res = jsonFuncs.rmvObjDuplicates(DATA.ObjArrayWithDuplicates);
    expect(res).toEqual(DATA.Results.rmvObjDuplicates.ObjArrayWithDuplicates);
  });

  it('[getObjPaths]: Should return an array of all possible paths of an object', () => {
    const res = jsonFuncs.getObjPaths(DATA.NestedObjArray);
    res.sort();
    const expectedResult = [...DATA.Results.getObjPaths.NestedObjArray].sort();
    expect(res).toEqual(expectedResult);
  });

  it('[filterObjUndefined]: Should recursively filter all undefined properties on an object', () => {
    const res = jsonFuncs.filterObjUndefined(DATA.NestedObjArrayWithUndefineds, false);
    expect(res).toEqual(DATA.Results.filterObjUndefined.NestedObjArrayWithUndefineds);
  });

  it('[filterObjectByKeyValue]: Should filter an object removing all key-value pairs found in the second object', () => {
    const res = jsonFuncs.filterObjectByKeyValue(DATA.SimpleObject, DATA.SimpleObject2);
    expect(res).toEqual(DATA.Results.filterObjectByKeyValue.SimpleObject);
  });

  it('[filterObjectKeys]: Should filter an object removing all key-value pairs found in the second object', () => {
    const res = jsonFuncs.filterObjectKeys(DATA.SimpleObject, ['id', 'createdAt']);
    expect(res).toEqual(DATA.Results.filterObjectKeys.SimpleObject);
  });

  it('[modObjPropsShallow]: Modifies Object properties by keys', () => {
    const res = jsonFuncs.modObjPropsShallow(DATA.SimpleObject, ['id', 'createdAt'], '10');
    expect(res).toEqual(DATA.Results.modObjPropsShallow.SimpleObject);
  });

  it('[groupBy]: Groups an array of objects by a given key', () => {
    const res = jsonFuncs.groupBy(DATA.NestedObjArray, 'id');
    expect(res).toEqual(DATA.Results.groupBy.NestedObjArray_GroupById);

    const res2 = jsonFuncs.groupBy(DATA.NestedObjArray, 'value');
    expect(res2).toEqual(DATA.Results.groupBy.NestedObjArray_GroupByValue);

    const resMultiKey = jsonFuncs.groupBy(DATA.NestedObjArray, (val) => {
      const subItem = val?.subItem?.[0];
      if (subItem) return `${val.value}-${subItem.value}`;
    });

    expect(resMultiKey).toEqual(DATA.Results.groupBy.NestedObjArray_GroupByMultiKey);
  });

  it('[groupByMulti]: Groups an array of objects by a given key', () => {
    const res = jsonFuncs.groupByMulti(DATA.carsArray, ['make', 'model']);
    expect(res).toEqual(DATA.Results.groupByMulti.carsArray_GroupByMakeAndModel);

    const res2 = jsonFuncs.groupByMulti(DATA.carsArray, ['make', 'model', 'year']);
    expect(res2).toEqual(DATA.Results.groupByMulti.carsArray_GroupByMakeModelAndYear);
  });

  it('[mergeObjArr]: Merges values of same keys into a new Object', () => {
    const res = jsonFuncs.mergeObjArr(DATA.simpleObjArr);
    expect(res).toEqual(DATA.Results.mergeObjArr.simpleObjArr);
  });

  it('[groupByAndMerge]: Combines the groupby and mergeObjArr functions', () => {
    const res = jsonFuncs.groupByAndMerge(DATA.toGroupAndMerge, 'id');
    expect(res).toEqual(DATA.Results.groupByAndMerge.toGroupAndMerge);
  });

  it('[safeJsonParse]: Parses a JSON if is a JSON, else, returns the same object', () => {
    const res = jsonFuncs.safeJsonParse(DATA.SimpleObject);
    expect(res).toEqual(DATA.SimpleObject);
    const res2 = jsonFuncs.safeJsonParse(JSON.stringify(DATA.SimpleObject));
    expect(res2).toEqual(DATA.SimpleObject);
  });

  it('[isObjectLiteral] Check if is a plain object and not some subclass of object', () => {
    class MyClass {}

    // eslint-disable-next-line require-jsdoc
    function MyProto() {
      // @ts-ignore
      Object.call(this as any, {});
    }
    MyProto.prototype = Object.assign(Object.create(Object.prototype), {
      constructor: MyProto,
      say() {
        // eslint-disable-next-line no-console
        console.log('hello');
      },
    });

    const testsCases = {
      objectLiteral: {},
      // eslint-disable-next-line no-new-object
      objectFromNew: new Object(),
      null: null,
      // eslint-disable-next-line object-shorthand
      undefined: undefined,
      number: 123,
      // eslint-disable-next-line no-new-func
      function: new Function(),
      array: new Array([1, 2, 3]),
      // eslint-disable-next-line no-new-wrappers
      string: new String('foobar'),
      bool: true,
      error: new Error('oups'),
      myClass: new MyClass(),
      // @ts-ignore
      myProto: new MyProto(),
    };

    expect(jsonFuncs.isLiteralObject(testsCases.objectLiteral)).toBe(true);
    expect(jsonFuncs.isLiteralObject(testsCases.objectFromNew)).toBe(true);
    expect(jsonFuncs.isLiteralObject(testsCases.null)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.undefined)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.number)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.function)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.array)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.string)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.bool)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.error)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.myClass)).toBe(false);
    expect(jsonFuncs.isLiteralObject(testsCases.myProto)).toBe(false);
  });

  it('[filterUndefinedObjProperties] Should filter all undefined properties that have "undefined" values', () => {
    const getAllObjValues = (obj: Record<string, unknown>) => {
      const values: unknown[] = [];
      const recurse = (o: Record<string, unknown>) => {
        Object.keys(o).forEach((key) => {
          const val = o[key];
          if (typeof val === 'object' && val !== null) {
            recurse(val as Record<string, unknown>);
          } else {
            values.push(o[key]);
          }
        });
      };
      recurse(obj);
      return values;
    };
    const testObj = {
      a: undefined,
      b: 'b',
      c: {
        d: undefined,
        e: 'e',
        f: {
          g: undefined,
          h: ['h'],
        },
      },
    };

    jsonFuncs.filterUndefinedObjProperties(testObj);
    expect(getAllObjValues(testObj).every((v) => typeof v !== 'undefined')).toEqual(true);
  });

  it('[reindexObjectArrayByValue] Should reindex an object by the value of a property', () => {
    const testObj = DATA.NestedObjArray;
    const key = 'value';
    const keys = Array.from(new Set(testObj.map((o) => o[key]).filter((v) => v))) as string[];
    const keysLng = keys.reduce((o, k) => ({
      ...o,
      [k]: testObj.filter((ob) => ob[key] && ob[key] === k).length,
    }), {} as {[key: string]: number});

    const res = jsonFuncs.reindexObjectArrayByValue(testObj, 'value');

    expect(Object.keys(res)).twoWayIncludes(keys);

    for (const [k, v] of Object.entries(keysLng)) {
      expect(res[k]).toHaveLength(v);
    }
  });

  test('[isObjectLiteral] Should check whether a value is an object literal', () => {
    class MyClass extends Object {
      constructor(args?: any) {
        super(args);
      }
    }

    // eslint-disable-next-line require-jsdoc
    function MyProto() {
      // @ts-expect-error
      Object.call(this, []);
    }
    MyProto.prototype = Object.assign(Object.create(Object.prototype), {
      constructor: MyProto,
    });

    const testsCases = {
      objectLiteral: {},
      // eslint-disable-next-line no-new-object
      objectFromNew: new Object(),
      null: null,
      undefined,
      number: 123,
      // eslint-disable-next-line no-new-func
      function: new Function(),
      array: new Array([1, 2, 3]),
      // eslint-disable-next-line no-new-wrappers
      string: new String('foobar'),
      bool: true,
      error: new Error('oups'),
      myClass: new MyClass(),
      // @ts-expect-error
      myProto: new MyProto(),
    };

    for (const [key, value] of Object.entries(testsCases)) {
      const isObject = jsonFuncs.isObjectLiteral(value);
      if (key === 'objectLiteral' || key === 'objectFromNew') expect(isObject).toEqual(true);
      else expect(isObject).toEqual(false);
    }
  });
});
