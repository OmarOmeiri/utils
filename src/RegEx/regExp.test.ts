import { getRandomInt } from '../Math';
import RandExp from './RandExp';

const regexToTest = [
  // Digits
  /^\d+$/,
  /^\d*\.\d+$/,
  /^\d*(\.\d+)?$/,
  /^-?\d*(\.\d+)?$/,
  /[-]?[0-9]+[,.]?[0-9]*([/][0-9]+[,.]?[0-9]*)*/,
  // Alphanumeric Characters
  /^[a-zA-Z0-9]*$/,
  /^[a-zA-Z0-9 ]*$/,
  // Email
  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
  /^([a-z0-9_.+-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
];

describe('RegExp function testing', () => {
  describe('[RandExp]', () => {
    test('Should generate a single random string', () => {
      const re = new RandExp(regexToTest);
      const result = re.generate();
      expect(result).toHaveType('string');
      expect(
        regexToTest.some((rg) => rg.test(result)),
      ).toEqual(true);
    });

    test('Should generate an array of strings', () => {
      const re = new RandExp(regexToTest);
      const n = getRandomInt(2, 20);
      const results = re.generate(n);
      expect(results).toHaveType('array');
      expect(
        results.every((res) => regexToTest.some((rg) => rg.test(res))),
      ).toEqual(true);
    });

    test('Should generate a single random string even if n = 0', () => {
      const re = new RandExp(regexToTest);
      const result = re.generate(0);
      expect(result).toHaveType('array');
      expect(result).toHaveLength(1);
      expect(
        result.every((res) => regexToTest.some((rg) => rg.test(res))),
      ).toEqual(true);
    });
    test('Should generate a single random string even if n < 0', () => {
      const re = new RandExp(regexToTest);
      const result = re.generate(getRandomInt(-1, -10));
      expect(result).toHaveType('array');
      expect(result).toHaveLength(1);
      expect(
        result.every((res) => regexToTest.some((rg) => rg.test(res))),
      ).toEqual(true);
    });
  });
});
