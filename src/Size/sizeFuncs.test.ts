import assert from 'assert';
import { MemConv, multipliers, suffixes } from './memConv';

test('Should convert memory sizes', () => {
  const testCases = [1, 10, 150, 1000, 74839.67346];
  const HRSuffixes = Object.values(suffixes);
  const roundDecimals = 2;
  const precision = Number(`0.${'0'.repeat(roundDecimals)}5`);
  const SCIENTIFIC_NOT_NUMBER_REGXP = /[-+]?[0-9]*.?[0-9]+([eE][-+]?[0-9]+)?/g;
  const SUFFIX_REGXP = /[a-z]+$/i;
  const CONVERSION_TO_REGXP = /(?<=to).*(?=hr+$)|(?<=to).*(?=hr+$)?/i;

  for (const conversionFrom of (Object.keys(MemConv) as (keyof typeof MemConv)[])) {
    for (const tCase of testCases) {
      const convFunc = MemConv[conversionFrom](tCase);
      for (const [conversionToFn, f] of Object.entries(convFunc)) {
        const conversionTo = (conversionToFn.match(CONVERSION_TO_REGXP) || [conversionToFn])[0];
        const expectedSuffix = suffixes[conversionTo.toLowerCase() as keyof typeof suffixes];
        const multiplier = multipliers[conversionFrom][conversionToFn as keyof typeof multipliers[typeof conversionFrom]];
        const expectedResult = tCase * multiplier > Number.MAX_SAFE_INTEGER
          ? Number.MAX_SAFE_INTEGER
          : tCase * multiplier;

        const result = f();
        const humanReadable = f({ hr: true });
        const rounded = f({ round: roundDecimals });
        const roundedAndHumanReadable = f({ hr: true, round: roundDecimals });

        const resHrNumber = Number((humanReadable.match(SCIENTIFIC_NOT_NUMBER_REGXP) || [''])[0]);
        const resHrSuffix = (humanReadable.match(SUFFIX_REGXP) || [0])[0];
        const resRoundHrNumber = Number((roundedAndHumanReadable.match(SCIENTIFIC_NOT_NUMBER_REGXP) || [''])[0]);
        const resRoundHrSuffix = (roundedAndHumanReadable.match(SUFFIX_REGXP) || [0])[0];

        if (/hr$/i.test(conversionToFn)) {
          const resNumber = Number((humanReadable.match(SCIENTIFIC_NOT_NUMBER_REGXP) || [''])[0]);
          const resSuffix = (humanReadable.match(SUFFIX_REGXP) || [0])[0];
          assert(typeof result === 'string');
          assert(typeof resSuffix === 'string');
          assert(typeof resRoundHrNumber === 'number');
          assert(typeof rounded === 'string');
          assert(result === humanReadable);
          assert(resSuffix === expectedSuffix);
          assert(resNumber <= expectedResult + precision && resNumber >= expectedResult - precision);
        } else {
          assert(typeof result === 'number');
          assert(result === resHrNumber);
          assert(typeof rounded === 'number');
          assert(result <= expectedResult + precision && result >= expectedResult - precision);
        }

        assert(typeof resHrSuffix === 'string');
        assert(typeof resHrNumber === 'number');
        assert(resHrSuffix === expectedSuffix);
        assert(resHrSuffix === resRoundHrSuffix);
        assert(HRSuffixes.includes(resHrSuffix));
      }
    }
  }
});
